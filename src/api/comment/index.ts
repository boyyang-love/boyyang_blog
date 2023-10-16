import {http} from '@/utils/http'
import {Comment} from './type'

export const commentCreate = (data: { type: string, content: string, content_id: number }) => {
    return http.request({
        url: '/comment/create',
        method: 'POST',
        data,
    })
}

export const commentInfo = (params: { page: number, limit: number, type: string, content_id: number }) => {
    return http.request<Comment.CommentRes>({
        url: '/comment/info',
        method: 'GET',
        params,
    })
}

