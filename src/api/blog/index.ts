import {http} from '@/utils/http'
import {Result} from '@/utils/http/types'
export const createBlog = (data: {
    title: string
    sub_title: string
    content: string
    cover: string
}) => {
    return http.request({
        url: '/blog/create',
        method: 'post',
        data,
    })
}

export const blogList = (params: {
    page: number
    limit: number
}): Promise<Result<Blog.BlogList>> => {
    return http.request(
        {
            url: '/blog/info',
            method: 'get',
            params,
        },
        {
            isShowSuccessMessage: false,
        },
    )
}

export const blogDetail = (params: { ids: string }): Promise<Result<Blog.BlogList>> => {
    return http.request(
        {
            url: '/blog/info',
            method: 'get',
            params,
        },
        {
            isShowSuccessMessage: false,
        },
    )
}

