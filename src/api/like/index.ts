import {http} from '@/utils/http'

export const likeList = (data: {exhibition_id: number | string, likes_type: number}) => {
    return http.request({
        url: '/like',
        method: 'post',
        data: data,
    })
}