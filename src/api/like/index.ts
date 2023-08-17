import {http} from '@/utils/http'

/**
 * likes_type 1 true 0 false
 * type 1图片 2博客
 */
export const changelike = (data: { uid: number | string, likes_type: number, type: number }) => {
    return http.request({
        url: '/like',
        method: 'post',
        data: data,
    })
}

export const changeStar = (data: { uid: number | string, star_type: number, type: number }) => {
    return http.request({
        url: '/star',
        method: 'post',
        data: data,
    })
}

