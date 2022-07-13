/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:23:37
 * @LastEditTime: 2022-07-12 18:48:22
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\login\hooks\useLogin.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { computed, reactive } from 'vue'
import { login, register } from '@/api/login'
import { useUserStoreWithOut } from '@/store/modules/user'
import { router } from '@/router'
import { FormInst } from 'naive-ui'

const loginData = reactive({
    username: '',
    email: '',
    password: '',
    repassword: '',
    loading: false,
    isShowRegister: false,
})

const rules = {
    username: {
        required: true,
        message: '请输入账号',
        trigger: 'blur',
    },
    email: {
        required: true,
        message: '请输入注册邮箱',
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
}

// emailOptions
const emailOptions = computed(() => {
    return ['@gmail.com', '@163.com', '@qq.com', '@outlook.com'].map(suffix => {
        const prefix = loginData.email.split('@')[0]
        return {
            label: prefix + suffix,
            value: prefix + suffix,
        }
    })
})

const useLogin = () => {
    const userStore = useUserStoreWithOut()
    // 注册
    const signIn = async (domRef: FormInst | null) => {
        let params = {
            username: loginData.username,
            password: loginData.password,
            email: loginData.email,
        }
        let p = new Promise((resolve, reject) => {
            domRef?.validate(errors => {
                if (!errors) {
                    if (loginData.password.trim() !== loginData.repassword.trim()) {
                        window.$message.error('两次密码不一致')
                        return
                    }
                    register(params)
                        .then(() => {
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
        emailOptions,
        rules,
    }
}

export { useLogin }
