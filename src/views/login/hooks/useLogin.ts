/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:23:37
 * @LastEditTime: 2022-06-05 00:26:48
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\login\hooks\useLogin.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { login, register } from '@/api/login'
import { useUserStoreWithOut } from '@/store/modules/user'
import { router } from '@/router'
import { FormInst } from 'naive-ui'

const loginData = reactive({
    username: '',
    password: '',
    repassword: '',
    loading: false,
    rules: {
        username: {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
        },
        password: {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    },
})

const useLogin = () => {
    const userStore = useUserStoreWithOut()
    // 注册
    const signIn = () => {
        let params = {
            username: loginData.username,
            password: loginData.password,
        }
        register(params).then(res => {})
    }
    // 登录
    const signUp = (domRef: FormInst | null) => {
        let params = {
            username: loginData.username,
            password: loginData.password,
        }
        domRef?.validate(errors => {
            if (!errors) {
                loginData.loading = true
                login(params).then(res => {
                    userStore.setToken(res.data.token)
                    userStore.setUserinfo(res.data.info)
                    let timer = setTimeout(() => {
                        router.replace({
                            path: '/',
                        })
                        loginData.loading = false
                        clearTimeout(timer)
                    }, 1500)
                })
            } else {
                window.$message.error('请输入用户名和密码~~')
            }
        })
    }
    return {
        loginData,
        signIn,
        signUp,
    }
}

export { useLogin }
