/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:30:36
 * @LastEditTime: 2022-05-08 11:24:28
 * @LastEditors: boyyang
 * @Description: 登录
 * @FilePath: \drawingBed\src\api\login.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

// import { http } from "@/utils/http"
import { http } from '@/utils/http'

interface BasicData<T = any> {
    code: number
    msg: string
    data: T
}

export const login = (data: { username: string; password: string }) => {
    return http.request(
        {
            url: '/api/login ',
            method: 'post',
            data
        },
        {
            withToken: false,
            isShowMessage: false,
        }
    )
}

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
