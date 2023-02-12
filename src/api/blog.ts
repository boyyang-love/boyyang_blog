import { http } from '@/utils/http'
import { Result } from '@/utils/http/types'

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
