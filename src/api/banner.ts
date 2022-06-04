/**
 * @Author: boyyang
 * @Date: 2022-04-05 14:42:39
 * @LastEditTime: 2022-06-04 10:59:27
 * @LastEditors: boyyang
 * @Description: banner
 * @FilePath: \drawingBed\src\api\banner.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { http } from '@/utils/http'

export const banner = (params: { page: number; limit: number }) => {
    // /api/getAllImgs
    return http.request(
        {
            url: '/api/getPictures',
            method: 'get',
            params,
        },
        {
            isShowMessage: false,
        }
    )
}

export const getImgs = (params?: { page?: number; limit?: number }) => {
    return http.request(
        {
            url: '/api/getPictures',
            method: 'get',
            params,
        },
        {
            isShowMessage: false,
        }
    )
}

export const publishImage = (data: any) => {
    return http.request({
        url: '/api/uploadPicture',
        method: 'post',
        data,
    })
}

export const editImage = (data: any) => {
    return http.request({
        url: '/api/updatePicture',
        method: 'post',
        data,
    })
}

export const deleteImage = (params: any) => {
    return http.request({
        url: '/api/deletePicture',
        method: 'get',
        params,
    })
}
