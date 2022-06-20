/**
 * @Author: boyyang
 * @Date: 2022-04-05 14:42:39
 * @LastEditTime: 2022-06-20 17:18:24
 * @LastEditors: boyyang
 * @Description: banner
 * @FilePath: \blog\web\src\api\banner.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { http } from '@/utils/http'

// 获取轮播图
export const banner = (params?: { page: number; limit: number }) => {
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

// 发布图片墙信息
export const publishImage = (data: any) => {
    return http.request({
        url: '/api/uploadPicture',
        method: 'post',
        data,
    })
}

// 编辑图片墙信息
export const editImage = (data: any) => {
    return http.request({
        url: '/api/updatePicture',
        method: 'post',
        data,
    })
}

// 删除图片墙
export const deleteImage = (params: any) => {
    return http.request({
        url: '/api/deletePicture',
        method: 'get',
        params,
    })
}

// 删除上传的图片
export const deleteUpload = (params: { id: number }) => {
    return http.request({
        url: '/api/deleteUpload',
        method: 'get',
        params,
    })
}
