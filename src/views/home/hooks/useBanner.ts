/**
 * @Author: boyyang
 * @Date: 2022-04-05 14:46:46
 * @LastEditTime: 2022-06-05 19:35:45
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\home\hooks\useBanner.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { h, onMounted, reactive, watchEffect } from 'vue'
import { banner, deleteImage } from '@/api/banner'
import { imageDownload } from '@/utils/fileDownload'
import { env } from '@/utils/env'
import { NImage } from 'naive-ui'
import moment from 'moment'

const bannerData = reactive({
    list: [] as any,
    isShowAll: false,
    isLoading: false,
})

const useBanner = () => {
    const getBannerList = async () => {
        let params = {
            // page: 1,
            // limit: 10,
        }
        const res = await banner()
        bannerData.list =
            res.data &&
            res.data.map((item: any) => {
                item.url = `${env.VITE_APP_IMG_URL}${item.url}`
                return item
            })
    }
    const download = (url: string, name: string) => {
        const d = window.$dialog.info({
            title: `是否下载当前图片？`,
            content: () => {
                return h(NImage, {
                    src: `${url}`,
                    style: {
                        // width:'450px',
                        // height:'200px',
                        objfit: 'cover',
                    },
                })
            },
            positiveText: '下载',
            negativeText: '取消',
            onPositiveClick: () => {
                d.loading = true
                return new Promise((resolve, reject) => {
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
        if (!bannerData.isShowAll) {
            bannerData.list.forEach((item: any) => {
                window.$notification.create({
                    title: item.name,
                    description: item.des,
                    meta: moment(item.CreatedAt).format('YYYY-MM-DD'),
                    content: () => {
                        return h(NImage, {
                            src: `${item.url}`,
                            style: {
                                // width:'450px',
                                // height:'200px',
                                objfit: 'cover',
                            },
                        })
                    },
                    onClose: async () => {
                        let p = new Promise((resolve, reject) => {
                            window.$dialog.warning({
                                title: '是否删除当前图片？',
                                positiveText: '删除',
                                negativeText: '取消',
                                content: () => {
                                    return h(NImage, {
                                        src: `${item.url}`,
                                        style: {
                                            // width:'450px',
                                            // height:'200px',
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
                })
            })
            setTimeout(() => {
                bannerData.isLoading = false
                bannerData.isShowAll = true
            }, 1000)
        } else {
            window.$notification.destroyAll()
            bannerData.isLoading = false
            bannerData.isShowAll = false
        }
    }
    return { bannerData, download, showAll, getBannerList }
}

export { useBanner }
