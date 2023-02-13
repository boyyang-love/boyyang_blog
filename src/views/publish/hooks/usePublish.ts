import { h, reactive, watchEffect } from 'vue'
import { NAvatar, SelectRenderLabel, SelectRenderTag } from 'naive-ui'

// api
import { exhibitionList } from '@/api/exhibition'
import { createBlog } from '@/api/blog'

import { env } from '@/utils/env'

const publishData = reactive({
    submit: {
        title: '',
        subtitle: '',
        text: '',
    },
    modal: {
        show: false,
        options: [
            // {
            //     label: '',
            //     value: '',
            //     cover: '',
            // },
        ] as any,
        value: '',
        count: 0,
        page: 1,
        limit: 10,
        isMore: true,
        isMoreLoading: false,
    },
})

const paginationOpt = {
    pageSizes: [
        {
            label: '10 每页',
            value: 10,
        },
        {
            label: '20 每页',
            value: 20,
        },
        {
            label: '30 每页',
            value: 30,
        },
    ],
}

const submit = (type?: boolean) => {
    if (
        publishData.submit.title == '' ||
        publishData.submit.subtitle == '' ||
        publishData.submit.text == ''
    ) {
        window.$notification.create({
            type: 'error',
            title: '提示',
            content: '标题 描述 内容为必填项！',
            duration: 3000,
        })

        return
    }

    if (type === true) {
        //
        let params = {
            title: publishData.submit.title,
            sub_title: publishData.submit.subtitle,
            content: publishData.submit.text,
            cover: publishData.modal.value,
        }
        createBlog(params).then(res => {
            console.log(res)
            publishData.submit = {
                title: '',
                subtitle: '',
                text: '',
            }
            publishData.modal.value = ''
        })
        return
    }

    if (type === false) {
        publishData.modal.show = false
    }

    publishData.modal.show = true
    getList()
}

const getList = () => {
    let imgParams = {
        page: publishData.modal.page,
        limit: publishData.modal.limit,
    }
    publishData.modal.isMoreLoading = true
    exhibitionList(imgParams).then(res => {
        publishData.modal.count = res.data.count
        publishData.modal.options = publishData.modal.options.concat(
            res.data.exhibitions.map(item => {
                return {
                    label: item.title,
                    value: item.cover,
                    cover: `${env.VITE_APP_IMG_URL}${item.cover}`,
                }
            })
        )

        if (publishData.modal.options.length >= publishData.modal.count) {
            publishData.modal.isMore = false
        }
        
        publishData.modal.isMoreLoading = false
    })
}

const more = () => {
    if (publishData.modal.isMore) {
        publishData.modal.page++
        getList()
    }
}

// watchEffect(() => {
//     getList()
// })

const renderLabel: SelectRenderTag = option => {
    return h(
        'div',
        {
            style: {
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
            },
        },
        [
            h('img', {
                src: (option as any).cover,
                style: {
                    border: '2px solid #fff',
                    'box-shadow': '2px 2px 2px black',
                },
            }),
        ]
    )
}
const renderSingleSelectTag: SelectRenderLabel = ({ option }) => {
    console.log(option)
    if ((option as any).value == '') {
        return h('div', {
            style: {
                height: '45px',
            },
        })
    }
    return h(
        'div',
        {
            style: {
                display: 'flex',
                alignItems: 'center',
                height: '200px',
                overflow: 'hidden',
            },
        },
        [
            h('img', {
                src: (option as any).cover,
                style: {
                    height: '80%',
                    width: '100%',
                    'object-fit': 'cover',
                    border: '2px solid white',
                },
            }),
        ]
    )
}

const handleScroll = (e: Event) => {
    const currentTarget = e.currentTarget as HTMLElement
    if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
        if (publishData.modal.options.length < publishData.modal.count) {
            publishData.modal.page++
            getList()
        }
    }
}

const usePublish = () => {
    return {
        publishData,
        submit,
        getList,
        renderLabel,
        renderSingleSelectTag,
        paginationOpt,
        handleScroll,
        more,
    }
}

export { usePublish }
