/**
 * @Author: boyyang
 * @Date: 2022-04-10 21:22:18
 * @LastEditTime: 2022-04-10 21:22:18
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\api\user.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { http } from "@/utils/http"

export const updateUser = (data?: any) => {
    // /api/getAllImgs
    return http.request({
        url: '/api/updateUser',
        method: 'post',
        data
    })
}