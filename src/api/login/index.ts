import {http} from '@/utils/http'

// 登录
export const login = (data: { username: string; password: string }) => {
    return http.request<Login.loginRes>(
        {
            url: '/login ',
            method: 'post',
            data,
        },
        {
            withToken: false,
        },
    )
}

// 注册
export const register = (params: {
    username: string
    tel: string | number
    password: string
    repassword: string
    avatar_url: string
    background_image?: string
}) => {
    return http.request(
        {
            url: '/register',
            method: 'post',
            data: params,
        },
        {
            withToken: false,
        },
    )
}

export const loginBg = (params?: { page?: number, limit?: number }) => {
    return http.request<Login.LoginBgRes>(
        {
            url: '/tray',
            method: 'get',
            params,
        },
        {
            isShowMessage: false,
        },
    )
}
