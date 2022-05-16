/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:23:37
 * @LastEditTime: 2022-05-14 17:07:14
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\login\hooks\useLogin.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { login, register } from '@/api/login'
import { useUserStoreWithOut } from '@/store/modules/user'
import { createStorage } from '@/utils/storage'
import { router } from '@/router'

const loginData = reactive({
    username: '',
    password: '',
    repassword: '',
    isRember: true,
    isShowDialog: false,
    dialogContent: '',
    progress: 0,
})

const useLogin = () => {
    const userStore = useUserStoreWithOut()
    const storage = createStorage('user', localStorage)
    // 注册
    const signIn = () => {
        if (loginData.username.trim() === '' || loginData.password.trim() === '') {
            loginData.dialogContent = '请输入用户名和密码'
            loginData.isShowDialog = true
            return
        }
        let params = {
            username: loginData.username,
            password: loginData.password,
        }
        register(params).then(res => {
            const timer = setInterval(() => {
                loginData.progress += 5
                if (loginData.progress === 100) {
                    clearInterval(timer)
                    loginData.progress = 0
                    signUp()
                }
            }, 100)
        })
    }
    // 登录
    const signUp = () => {
        if (loginData.username.trim() === '' || loginData.password.trim() === '') {
            loginData.dialogContent = '请输入用户名和密码'
            loginData.isShowDialog = true
            return
        }
        let params = {
            username: loginData.username,
            password: loginData.password,
        }
        login(params)
            .then(res => {
                // storage.set('token', res.data.token)
                // storage.set('userInfo', res.data.info)
                userStore.setToken(res.data.token)
                userStore.setUserinfo(res.data.info)

                console.log(userStore)
                const timer = setInterval(() => {
                    loginData.progress += 5
                    if (loginData.progress === 100) {
                        clearInterval(timer)
                        let params = {
                            id: 111,
                            age: 222
                        }
                        router.replace({
                            name: 'Home',
                            params: params
                            // path: `/:${JSON.stringify(params)}`,
                            // params
                        })
                    }
                }, 100)
            })
            .catch(err => {
                loginData.dialogContent = err.response.data.msg
                loginData.isShowDialog = true
            })
    }
    return {
        loginData,
        signIn,
        signUp,
    }
}

export { useLogin }
