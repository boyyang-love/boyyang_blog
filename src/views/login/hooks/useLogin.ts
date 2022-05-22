/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:23:37
 * @LastEditTime: 2022-05-21 13:59:30
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\login\hooks\useLogin.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { login, register } from '@/api/login'
import { useUserStoreWithOut } from '@/store/modules/user'
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
                userStore.setToken(res.data.token)
                userStore.setUserinfo(res.data.info)
                const timer = setInterval(() => {
                    loginData.progress += 10
                    if (loginData.progress === 100) {
                        clearInterval(timer)
                        router.replace({
                            path: '/',
                        })
                    }
                }, 100)
                console.log(userStore.$state)
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
