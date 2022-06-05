/**
 * @Author: boyyang
 * @Date: 2022-04-09 15:27:58
 * @LastEditTime: 2022-06-05 12:02:01
 * @LastEditors: boyyang
 * @Description: userInfo
 * @FilePath: \drawingBed\src\views\home\hooks\useUserInfo.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { FormInst } from 'naive-ui'
import { useUserStoreWithOut } from '@/store/modules/user'
import { UploadFileInfo } from 'naive-ui'
import { updateUser } from '@/api/user'
import { createStorage } from '@/utils/storage'
import { router } from '@/router'

const userStore = useUserStoreWithOut()
const storage = createStorage('user', sessionStorage)

const userInfoData = reactive({
    showModel: false,
    headers: {
        token: userStore.getToken,
    },
    form: {
        ...userStore.getUserInfo,
    } as any,
    rules: {
        username: {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    },
})

const useUserInfo = () => {
    const submit = async (domRef: FormInst | null) => {
        let params = {
            ID: userInfoData.form.ID,
            username: userInfoData.form.username,
            tel_phone: userInfoData.form.tel_phone,
            email: userInfoData.form.email,
            age: userInfoData.form.age,
            sex: userInfoData.form.sex,
        }

        // return
        let p = new Promise((resolve, reject) => {
            updateUser(params)
                .then((res: any) => {
                    userStore.setUserinfo(params)
                    resolve(true)
                })
                .catch(err => {
                    reject(false)
                })
        })
        return await p
    }

    const logout = () => {
        storage.clear()
        router.replace('/login')
    }

    return {
        userInfoData,
        logout,
        submit,
    }
}

export { useUserInfo }
