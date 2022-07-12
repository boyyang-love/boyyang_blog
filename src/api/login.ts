/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:30:36
 * @LastEditTime: 2022-07-12 09:53:32
 * @LastEditors: boyyang
 * @Description: 登录
 * @FilePath: \blog\web\src\api\login.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { http } from '@/utils/http'

// 登录
export const login = (data: { username: string; password: string }) => {
    return http.request(
        {
            url: '/api/login ',
            method: 'post',
            data
        },
        {
            withToken: false,
        }
    )
}

// 注册
export const register = (data: { username: string; password: string }) => {
    return http.request(
        {
            url: '/api/register',
            method: 'post',
            data
        },
        {
            withToken: false
        }
    )
}
