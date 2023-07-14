import {http} from '@/utils/http'

export const createBlog = (data: {
    title: string
    sub_title: string
    content: string
    cover?: string
    tags?: string
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
}) => {
    return http.request<Blog.BlogList>(
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

export const blogDetail = (params: { ids: string }) => {
    return http.request<Blog.BlogList>(
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

export const blogDel = (params: { id: number }) => {
    return http.request(
        {
            url: '/blog/delete',
            method: 'get',
            params,
        },
    )
}

