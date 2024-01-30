import {reactive, watch} from 'vue'
import {login, loginBg, register} from '@/api/login'
import {router} from '@/router'
import {useUserStoreWithOut} from '@/store/modules/user'
import {env} from '@/utils/env'

// 登录 注册 data
const loginData = reactive({
    isRegister: false, // 是否登录状态
    // 登录 账号 密码
    username: '',
    password: '',
    // 注册
    r_username: '',
    r_tel: '',
    r_password: '',
    r_repassword: '',
    r_isError: false,
    r_avatarUrl: '',
    isError: false,
})

const useLogin = () => {
    watch(
        [
            () => loginData.username,
            () => loginData.password,
            () => loginData.r_username,
            () => loginData.r_tel,
            () => loginData.r_password,
            () => loginData.r_repassword,
        ],
        () => {
            loginData.isError = !(loginData.username !== '' && loginData.password !== '')
            loginData.r_isError = !(
                loginData.r_username !== '' &&
                loginData.r_tel !== '' &&
                loginData.r_password !== '' &&
                loginData.r_repassword !== ''
            )
        },
        {
            immediate: true,
        },
    )

    // 登录 注册 提交
    const loginSubmit = () => {
        let params = {
            username: loginData.username,
            password: loginData.password,
        }
        // 登录
        if (params.username.trim() == '' || params.password.trim() == '') {
            window.$message.error('账号或密码不能为空')
            loginData.isError = true
            return
        }
        window.$loadingBar.start()
        login(params).then(res => {
            loginData.isError = false
            loginSuccess(res.data).then()
        }).catch(() => {
            loginData.isError = true
            window.$loadingBar.error()
            window.$message.error('登陆失败请稍后重试')
        })
    }

    const registerSubmit = () => {
        let params = {
            username: loginData.r_username,
            tel: loginData.r_tel,
            password: loginData.r_password,
            repassword: loginData.r_repassword,
            avatar_url: `avatar/${loginData.r_avatarUrl.split('/').pop()}`,
        }
        // 注册
        if (params.username.trim() == '' || params.password.trim() == '' || params.tel == '') {
            window.$message.error('用户名,手机号,密码不能为空')
            loginData.r_isError = true
            return
        }
        if (params.password.trim() != params.repassword.trim()) {
            loginData.r_isError = true
            window.$message.error('密码不一致')
            return
        }
        register(params).then(() => {
            const t = setTimeout(() => {
                loginData.isRegister = false
                loginData.username = loginData.r_username
                loginData.password = loginData.r_password
                loginSubmit()
                clearTimeout(t)
            }, 2000)
        })
    }

    // 登录成功
    const loginSuccess = async (data: Login.loginRes) => {
        const userStore = useUserStoreWithOut()
        data.info.avatar_url = `${env.VITE_APP_IMG_URL}/${data.info.avatar_url}`
        userStore.setToken(data.token)
        await userStore.getInfoDetail()

        router.replace({name: 'Home'}).then(() => {
            window.$loadingBar.finish()
        })
    }



    return {
        loginData,
        loginSubmit,
        registerSubmit,
    }
}

export {useLogin}
