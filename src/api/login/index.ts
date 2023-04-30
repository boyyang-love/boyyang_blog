import {http} from '@/utils/http'
import {Result} from '@/utils/http/types'

// 登录
export const login = (data: { username: string; password: string }): Promise<Result<Login.loginRes>> => {
    return http.request(
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
export const register = (data: {
    username: string
    tel: string | number
    password: string
}): Promise<Result> => {
    return http.request(
        {
            url: '/register',
            method: 'post',
            data,
        },
        {
            withToken: false,
        },
    )
}
