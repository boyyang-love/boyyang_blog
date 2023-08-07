import {reactive, watch} from 'vue'
import {login, register} from '@/api/login'
import {router} from '@/router'
import {useUserStoreWithOut} from '@/store/modules/user'

// 登录 注册 data
const loginData = reactive({
    isSignIn: true, // 是否登录状态
    // 账号 密码
    username: '',
    tel: '',
    password: '',
    repassword: '',
    isError: false,
})

watch(
    [() => loginData.username, () => loginData.password],
    () => {
        loginData.isError = !(loginData.username !== '' && loginData.password !== '')
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
    window.$loading.loadingStart()
    login(params).then(res => {
        loginData.isError = false
        loginSuccess(res.data)
    }).catch(err => {
        loginData.isError = true
        window.$message.error('登陆失败请稍后重试')
    })
}

const registerSubmit = () => {
    let params = {
        username: loginData.username,
        tel: loginData.tel,
        password: loginData.password,
        repassword: loginData.repassword,
    }
    // 注册
    if (params.username.trim() == '' || params.password.trim() == '' || params.tel == '') {
        window.$message.error('用户名,手机号,密码不能为空')
        loginData.isError = true
        return
    }
    if (params.password.trim() != params.repassword.trim()) {
        loginData.isError = true
        window.$message.error('密码不一致')
        return
    }
    register(params).then(res => {
        const t = setTimeout(() => {
            loginSubmit()
            clearTimeout(t)
        }, 2000)
    })
}

// 登录成功
const loginSuccess = (data: Login.loginRes) => {
    const userStore = useUserStoreWithOut()
    userStore.setToken(data.token)
    userStore.setUserinfo(data.info)
    window.$loading.loadingEnd()

    router.replace({name: 'Home'}).then(r => {
    })
}

const useLogin = () => {
    return {
        loginData,
        loginSubmit,
        registerSubmit,
    }
}

export {useLogin}
