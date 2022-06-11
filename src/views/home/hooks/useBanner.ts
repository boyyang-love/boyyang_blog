/**
 * @Author: boyyang
 * @Date: 2022-04-05 14:46:46
 * @LastEditTime: 2022-06-12 02:42:03
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\home\hooks\useBanner.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { h, reactive } from 'vue'
import { NImage, NIcon, type FormInst, NSpace } from 'naive-ui'
import { DeleteFilled, EditFilled } from '@vicons/antd'
import { banner, deleteImage, editImage } from '@/api/banner'
import { imageDownload } from '@/utils/fileDownload'
import { env } from '@/utils/env'

import moment from 'moment'

const bannerData = reactive({
    list: [] as any,
    count: 0,
    page: 1,
    limit: 10,
    isShowAll: false,
    isLoading: false,
    isShowEdit: false,
    isEditLoading: false,
    editData: {
        file_name: '',
        name: '',
        des: '',
        url: '',
        ID: 0,
        tags: [],
    },
    editDataRules: {
        name: {
            required: true,
            message: '请输入图片名称',
            trigger: 'blur',
        },
        des: {
            required: true,
            message: '请输入图片描述',
            trigger: 'blur',
        },
    },
})

const useBanner = () => {
    // 获取轮播列表
    const getBannerList = async () => {
        let params = {
            page: bannerData.page,
            limit: bannerData.limit,
        }
        const res = await banner(params)
        bannerData.list =
            res.data &&
            res.data.map((item: any) => {
                item.url = `${env.VITE_APP_IMG_URL}${item.url}`
                item.tags = item.tags.map((tag: any) => tag.tag_name)
                return item
            })
        bannerData.count = res.count
    }
    // 下载图片文件
    const download = (url: string, name: string) => {
        const d = window.$dialog.info({
            title: `是否下载当前图片？`,
            content: () => {
                return h(NImage, {
                    src: `${url}`,
                    style: {
                        objfit: 'cover',
                    },
                })
            },
            positiveText: '下载',
            negativeText: '取消',
            onPositiveClick: () => {
                d.loading = true
                return new Promise(resolve => {
                    imageDownload(url, name).then(() => {
                        d.loading = false
                        resolve(true)
                    })
                })
            },
        })
    }
    // 查看所有图片
    const showAll = () => {
        bannerData.isLoading = true
        let num = 0
        if (!bannerData.isShowAll) {
            bannerData.list.forEach((item: any) => {
                window.$notification.create({
                    title: item.name,
                    description: item.des,
                    meta: () => {
                        return h(
                            NSpace,
                            {
                                justify: 'space-between',
                                class: 'w-full',
                            },
                            [
                                h(
                                    'span',
                                    { style: { marginRight: '15px' } },
                                    moment(item.CreatedAt).format('YYYY-MM-DD')
                                ),
                                h(NIcon, {
                                    component: EditFilled,
                                    size: 20,
                                    style: { cursor: 'pointer' },
                                    onClick: () => {
                                        bannerData.editData = item
                                        bannerData.editData.tags = item.tags
                                        bannerData.isShowEdit = true
                                    },
                                }),
                                h(NIcon, {
                                    component: DeleteFilled,
                                    size: 20,
                                    style: { cursor: 'pointer' },
                                    onClick: async () => {
                                        let p = new Promise(resolve => {
                                            window.$dialog.warning({
                                                title: '是否删除当前图片？',
                                                positiveText: '删除',
                                                negativeText: '取消',
                                                content: () => {
                                                    return h(NImage, {
                                                        src: `${item.url}`,
                                                        style: {
                                                            objfit: 'cover',
                                                        },
                                                    })
                                                },
                                                onPositiveClick: () => {
                                                    let params = {
                                                        id: item.ID,
                                                    }
                                                    deleteImage(params).then(res => {
                                                        getBannerList()
                                                        resolve(true)
                                                    })
                                                },
                                            })
                                        })
                                        return await p
                                    },
                                }),
                            ]
                        )
                    },
                    content: () => {
                        return h('img', {
                            src: `${item.url}`,
                            style: {
                                objfit: 'cover',
                            },
                        })
                    },
                    onClose: async () => {
                        num++
                        if (num >= bannerData.list.length) {
                            bannerData.isShowAll = false
                        }
                    },
                })
            })
            bannerData.isLoading = false
            bannerData.isShowAll = true
        } else {
            window.$notification.destroyAll()
            bannerData.isLoading = false
            bannerData.isShowAll = false
        }
    }
    // 修改图片
    const edit = async (domRef: FormInst | null) => {
        bannerData.isEditLoading = true
        let params = {
            ID: bannerData.editData.ID,
            name: bannerData.editData.name,
            des: bannerData.editData.des,
            tags: (bannerData.editData.tags as any[])
                .map(tag => {
                    if (tag.label || tag.value) {
                        return tag.label || tag.value
                    } else {
                        return tag
                    }
                })
                .join(','),
        }
        let p = new Promise((resolve, reject) => {
            domRef?.validate(error => {
                if (!error) {
                    editImage(params)
                        .then(() => {
                            getBannerList()
                            bannerData.isEditLoading = false
                            resolve(true)
                        })
                        .catch(() => {
                            bannerData.isEditLoading = false
                            reject(false)
                        })
                } else {
                    bannerData.isEditLoading = false
                    reject(false)
                }
            })
        })
        return await p
    }
    // 返回数据以及方法
    return {
        bannerData,
        download,
        showAll,
        getBannerList,
        edit,
    }
}

export { useBanner }
