/**
 * @Author: boyyang
 * @Date: 2022-07-05 16:25:32
 * @LastEditTime: 2022-07-07 08:18:59
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\api\blog.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { http } from '@/utils/http'

// 获取博客列表
export const blogList = (params: { page: number; limit: number }) => {
    return http.request({
        url: '/api/articles',
        method: 'get',
        params,
    })
}

// 获取博客详情
export const getBlogDetailById = (params: { id: number | string }) => {
    return http.request({
        url: '/api/articlesDetail',
        method: 'get',
        params,
    })
}

// 博客发布
export const submit = (data: { title: string; subtitle: string; content: string }) => {
    return http.request({
        url: '/api/addArticle',
        method: 'post',
        data,
    })
}
