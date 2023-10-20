import {h, onMounted, reactive, watch} from 'vue'
import {env} from '@/utils/env'

import {useUserStoreWithOut} from '@/store/modules/user'

// api
import {Exhibition} from '@/api/exhibition/type'
import {exhibitionList, deleteExhibition} from '@/api/exhibition'
import {changelike, changeStar} from '@/api/like'
import {updateUserInfo} from '@/api/user'
import {delUpload} from '@/api/upload'
import {Tag, tagsInfo, tagsCreate} from '@/api/tag'
import {updateDownload} from '@/api/exhibition'
import {router} from '@/router'
import {NInput} from 'naive-ui'

const imagesData = reactive({
    page: 1,
    limit: 9,
    count: 0,
    list: [] as (Exhibition.ExhibitionsInfo & {
        path: string,
        cover_url: string
    })[],
    likes: [] as number[],
    star: [] as number[],
    pageSizes: [
        {
            label: '9/每页',
            value: 9,
        },
        {
            label: '12/每页',
            value: 12,
        },
    ],
    sort: 'created desc',
    tags: [] as Tag.TagInfo[],
    keywords: '',
    selectedTags: '' as string | number,
})

const SortOptions = [
    {
        label: '发布时间升序',
        value: 'created asc',
    },
    {
        label: '发布时间降序',
        value: 'created desc',
    },
    {
        label: '更新时间升序',
        value: 'updated asc',
    },
    {
        label: '更新时间降序',
        value: 'updated desc',
    },
    {
        label: '点赞升序',
        value: 'thumbs_up asc',
    },
    {
        label: '点赞降序',
        value: 'thumbs_up desc',
    },
]

watch(() => imagesData.sort, () => {
    getList()
})


const getList = () => {
    let params = {
        page: imagesData.page,
        limit: imagesData.limit,
        type: 2,
        public: true,
        sort: imagesData.sort,
        keywords: imagesData.keywords,
        tags: imagesData.selectedTags,
    }
    window.$loadingBar.start()
    exhibitionList(params).then(res => {
        imagesData.count = res.data.count
        const exhibitions = res.data.exhibitions as (Exhibition.ExhibitionsInfo & {
            path: string,
            cover_url: string
        })[]
        imagesData.list = exhibitions.map((item: Exhibition.ExhibitionsInfo & {
            path: string,
            cover_url: string
        }) => {
            item.cover_url = item.cover
            item.path = item.cover
            item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
            return item
        })
        imagesData.likes = res.data.likes_ids || []
        imagesData.star = res.data.star_ids || []
        window.$loadingBar.finish()
    }).catch(() => {
        window.$loadingBar.error()
    })
}


const pageChange = (n: number) => {
    imagesData.page = n
    getList()
}

const pageSizeChange = (n: number) => {
    imagesData.page = 1
    imagesData.limit = n
    getList()
}

const del = (id: number | string, path: string) => {
    window.$dialog.create({
        type: 'error',
        title: '提示',
        content: '确定要删除吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            deleteExhibition({uid: id}).then(() => {
                window.$notification.success({
                    title: '提示',
                    content: '图片删除成功',
                    duration: 3000,
                })
                delUpload({key: path}).then(() => {
                    getList()
                })
            })
        },
    })
}

const like = (id: number | string, isLike: boolean) => {
    changelike({uid: id, likes_type: isLike ? 1 : 0, type: 1}).then(() => {
        if (isLike) {
            imagesData.likes.push(id as number)
        } else {
            imagesData.likes = imagesData.likes.filter(it => it !== (id as number))
        }
    })
}

const star = (id: number | string, isStar: boolean) => {
    changeStar({uid: id, star_type: isStar ? 1 : 0, type: 1}).then(() => {
        if (isStar) {
            imagesData.star.push(id as number)
            // 点赞数++
            imagesData.list.forEach((it) => {
                if (it.uid === id) {
                    it.thumbs_up++
                }
            })
        } else {
            imagesData.star = imagesData.star.filter(it => it !== id as number)
            // 点赞数--
            imagesData.list.forEach((it) => {
                if (it.uid === id) {
                    it.thumbs_up--
                }
            })
        }
    })
}

const setBackground = async (id: number | string) => {
    const userStore = useUserStoreWithOut()
    const background_image = imagesData.list.filter(it => it.uid === id)[0].cover_url
    let params = {
        uid: userStore.info.uid,
        background_image: background_image,
    }

    window.$loadingBar.start()
    await updateUserInfo(params)
    window.$loadingBar.finish()

    userStore.$patch((state) => {
        state.info.background_image = background_image
        state.info.background_image = background_image
    })
}

const tagClick = (uid: string | number) => {
    imagesData.page = 1
    if (imagesData.selectedTags === uid) {
        imagesData.selectedTags = ''
        getList()
        return
    }
    imagesData.selectedTags = uid
    getList()
}

const useImagesData = () => {
    onMounted(() => {
        getTagInfo()
    })
    return {
        imagesData,
        SortOptions,
    }
}

const getTagInfo = () => {
    tagsInfo({type: 'image'}).then((res) => {
        imagesData.tags = res.data.tags_info
    })
}

const updateDownloadStatus = async (uid: string | number) => {
    await updateDownload({uid: uid})
}

const toDetail = (uid: string | number) => {
    router.push({
        path: '/detail',
        query: {
            uid: uid,
            type: 'images'
        },
    })
    // const path = router.resolve({
    //     path: '/detail',
    //     query: {
    //         uid: uid,
    //         type: 'images'
    //     },
    // })
    // window.open(path.href, 'blank')
}

const addTags = () => {
    let tagName = ''
    window.$dialog.create({
        title: '增加标签',
        type: 'info',
        content: () => {
            return h(NInput, {
                placeholder: '请输入标签名称',
                onChange: (e) => {
                    tagName = e
                },
            })
        },
        positiveText: '确认',
        onPositiveClick: async () => {
            if (tagName.trim() === '') {
                window.$message.error('名称不能为空')
                return false
            }
            let data = {
                type: 'image',
                name: tagName,
            }
            await tagsCreate(data)
            getTagInfo()
            return true
        },
    })
}

const useImagesMethods = () => {
    return {
        getList,
        pageChange,
        pageSizeChange,
        del,
        like,
        star,
        setBackground,
        updateDownloadStatus,
        toDetail,
        tagClick,
        addTags,
    }
}

export {useImagesData, useImagesMethods}
