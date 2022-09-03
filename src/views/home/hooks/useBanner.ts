/**
 * @Author: boyyang
 * @Date: 2022-04-05 14:46:46
 * @LastEditTime: 2022-09-03 14:46:35
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\views\home\hooks\useBanner.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { h, reactive } from 'vue'
import { NImage, NIcon, type FormInst, NSpace, NAvatar } from 'naive-ui'
import { EditFilled } from '@vicons/antd'
import { banner, deleteImage, editImage } from '@/api/banner'
import { imageDownload } from '@/utils/fileDownload'
import { env } from '@/utils/env'
import { useUserStoreWithOut } from '@/store/modules/user'

import moment from 'moment'
const userStore = useUserStoreWithOut()

const bannerData = reactive({
    list: [] as any[],
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
        id: 0,
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
    userInfo: {
        ...userStore.getUserInfo,
    } as any,
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
    // 打开图片修改弹框
    const openEdit = (item: any) => {
        bannerData.isEditLoading = false
        bannerData.isShowEdit = true
        bannerData.editData = { ...item }
    }
    // 修改图片 submit
    const edit = async (domRef: FormInst | null) => {
        bannerData.isEditLoading = true
        let params = {
            id: bannerData.editData.id,
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
        getBannerList,
        openEdit,
        edit,
    }
}

export { useBanner }
