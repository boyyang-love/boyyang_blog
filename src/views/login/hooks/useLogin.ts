/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:23:37
 * @LastEditTime: 2022-06-05 10:35:50
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
    isShowRegister: false,
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
        repassword: {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
        },
    },
})

const useLogin = () => {
    const userStore = useUserStoreWithOut()
    // 注册
    const signIn = async (domRef: FormInst | null) => {
        let params = {
            username: loginData.username,
            password: loginData.password,
        }
        let p = new Promise((resolve, reject) => {
            domRef?.validate(errors => {
                if (!errors) {
                    if (loginData.password.trim() !== loginData.repassword.trim()) {
                        window.$message.error('两次密码不一致')
                        return
                    }
                    register(params)
                        .then(res => {
                            resolve(true)
                            window.$message.success('注册成功,请点击登录')
                        })
                        .catch(() => {
                            reject(false)
                        })
                }
            })
        })
        return await p
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
                login(params)
                    .then(res => {
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
                    .catch(() => {
                        loginData.loading = false
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
