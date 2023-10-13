import {http} from '@/utils/http'
import {Article} from './type'

export const createArticle = (
    data: {
        title: string,
        sub_title: string
        content: string
        cover: string
        tag: string
        images: string
    },
) => {
    return http.request(
        {
            url: '/article/create',
            method: 'POST',
            data,
        },
        {
            isShowMessage: false,
        },
    )
}

export const delArticle = (params: { uid: number }) => {
    return http.request({
        url: '/article/delete',
        method: 'get',
        params,
    })
}

export const infoArticle = (params: {
    uid?: number | string
    user_id?: number | string
    page?: number
    limit?: number
    keyword?: string
}) => {
    return http.request<Article.ArticleInfoRes>(
        {
            url: '/article/info',
            method: 'GET',
            params,
        },
        {
            isShowMessage: false,
        },
    )
}