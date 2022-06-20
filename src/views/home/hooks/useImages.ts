/**
 * @Author: boyyang
 * @Date: 2022-04-09 17:21:30
 * @LastEditTime: 2022-06-20 17:10:16
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\home\hooks\useImages.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { h, reactive, watchEffect } from 'vue'
import { NImage, type UploadFileInfo, type FormInst } from 'naive-ui'
import { useUserStoreWithOut } from '@/store/modules/user'
import { publishImage, deleteImage, deleteUpload } from '@/api/banner'
import { useBanner } from './useBanner'

const { getBannerList } = useBanner()

const imagesData = reactive({
    showModal: false,
    isloading: false,
    userInfo: {} as any,
    headers: {
        token: '',
    },
    uploadData: {
        file_name: '',
        name: '',
        des: '',
        url: '',
        id: 0,
        tags: [],
    },
    defaultuploadData: {
        file_name: '',
        name: '',
        des: '',
        url: '',
        id: 0,
        tags: [],
    },
    uploadRules: {
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
        url: {
            required: true,
            message: '请输入图片名称',
            trigger: 'blur',
        },
    },
})

const useImages = () => {
    // 发布图片
    const submit = async (domRef: FormInst | null) => {
        let params = {
            url: imagesData.uploadData.url,
            file_name: imagesData.uploadData.file_name,
            name: imagesData.uploadData.name,
            des: imagesData.uploadData.des,
            tags: imagesData.uploadData.tags.join(','),
        }
        let p = new Promise((resolve, reject) => {
            domRef?.validate(errors => {
                if (!errors) {
                    publishImage(params)
                        .then(res => {
                            imagesData.showModal = false
                            imagesData.uploadData = { ...imagesData.defaultuploadData }
                            getBannerList()
                            resolve(true)
                        })
                        .catch(() => {
                            reject(false)
                        })
                }
            })
        })
        return await p
    }
    // 删除图片
    const del = (e: any) => {
        window.$dialog.error({
            title: '是否删除当前图片？',
            content: () => {
                return h(NImage, {
                    src: `${e.url}`,
                    style: {
                        objfit: 'cover',
                    },
                })
            },
            positiveText: '删除',
            negativeText: '取消',
            onPositiveClick: () => {
                let params = {
                    id: e.id,
                }
                deleteImage(params).then(res => {
                    window.$message.success('删除成功')
                })
            },
        })
    }
    // 图片上传成功 finsih
    const finish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
        let res = JSON.parse((event?.target as any).response as any)
        imagesData.uploadData.id = res.data.id
        imagesData.uploadData.url = res.data.url
        imagesData.uploadData.file_name = res.data.fileName
    }
    // 图片上传成功后删除 remove
    const remove = () => {
        let params = {
            id: imagesData.uploadData.id,
        }
        deleteUpload(params).then(res => {
            window.$message.success('删除成功')
        })
    }
    watchEffect(() => {
        const userStore = useUserStoreWithOut()
        imagesData.headers.token = userStore.getToken
        imagesData.userInfo = userStore.getUserInfo
    })
    // 返回方法和数据
    return {
        imagesData,
        submit,
        del,
        finish,
        remove,
    }
}

export { useImages }
