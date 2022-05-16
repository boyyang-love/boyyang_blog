/**
 * @Author: boyyang
 * @Date: 2022-04-10 17:26:46
 * @LastEditTime: 2022-04-17 16:06:28
 * @LastEditors: boyyang
 * @Description: 发布作品
 * @FilePath: \drawingBed\src\views\home\hooks\usePublish.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from "vue"
import { env } from '@/utils/env'
import { useUserStoreWithOut } from "@/store/modules/user"
import { UploadFileInfo } from "naive-ui"
import { publishImage } from '@/api/banner'

// hooks
import { getImgList } from './useImages'

const userStore = useUserStoreWithOut()

const publishData = reactive({
    showModel: false,
    headers: {
        token: userStore.getToken,
    },
    form: {
        url: '',
        name: '',
        description: '',
    },
    rules: {
        url: { required: true, message: '请上传作品图片', trigger: 'blur' },
        name: { required: true, message: '请输入作品名称', trigger: 'blur' },
        description: { required: true, message: '请输入作品描述', trigger: 'blur' },
    },
})

const submit = async (domRef: any) => {
    let params = {
        name: publishData.form.name,
        url: publishData.form.url,
        des: publishData.form.description,
    }
    let p = new Promise((resolve, reject) => {
        domRef.validate((valid: any) => {
            if (!valid) {
                publishImage(params).then(res => {
                    publishData.form.url = ''
                    publishData.form.name = ''
                    publishData.form.description = ''
                    getImgList()
                    resolve(true)
                }).catch(err => {
                    reject(false)
                })
            } else {
                reject(false)
            }
        })
    })
    return await p
}

const finish = (options: { file: UploadFileInfo, event?: ProgressEvent }) => {
    let res = JSON.parse((event?.target as any).response as any)
    publishData.form.url = res.data.url
    window.$message.success(`${res.data.name}上传成功`)
}

export {
    publishData,
    submit,
    finish
}