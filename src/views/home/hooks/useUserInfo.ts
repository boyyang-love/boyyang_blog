
/**
 * @Author: boyyang
 * @Date: 2022-04-09 15:27:58
 * @LastEditTime: 2022-04-17 16:06:46
 * @LastEditors: boyyang
 * @Description: userInfo
 * @FilePath: \drawingBed\src\views\home\hooks\useUserInfo.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'
import { UploadFileInfo } from 'naive-ui'
import { updateUser } from '@/api/user'
import { createStorage } from '@/utils/storage'
import { router } from '@/router'

const userStore = useUserStoreWithOut()
const storage = createStorage('user', localStorage)

const editUserData = reactive({
    showModel: false,
    headers: {
        token: userStore.getToken,
    },
    form: {
        name: '',
        avater_url: '',
        age: '',
        sex: '',
        birthday: '',
        tel_phone: '',
        email: '',
    }
})

const userInfo = userStore.userInfo as any

const submit = async () => {
    let params = {
        ...userStore.getUserInfo
    }
    let p = new Promise((resolve, reject) => {
        updateUser(params).then((res: any) => {
            storage.set('userInfo', userInfo)
            resolve(true)
        }).catch(err => {
            reject(false)
        })
    })
    return await p
}

const finish = (options: { file: UploadFileInfo, event?: ProgressEvent }) => {
    let res = JSON.parse((event?.target as any).response as any)
    userInfo.avaterUrl = res.data.url
}

const logout = () => {
    storage.clear()
    router.replace('/login')
}

export {
    userInfo,
    submit,
    editUserData,
    finish,
    logout
}