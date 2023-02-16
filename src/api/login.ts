/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:30:36
 * @LastEditTime: 2023-02-14 10:57:54
 * @LastEditors: boyyang
 * @Description: 登录
 * @FilePath: \blog_web\src\api\login.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { http } from '@/utils/http'
import { Result } from '@/utils/http/types'

// 登录
export const login = (data: { username: string; password: string }): Promise<Result<loginRes>> => {
    return http.request(
        {
            url: '/login ',
            method: 'post',
            data,
        },
        {
            withToken: false,
        }
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
        }
    )
}
