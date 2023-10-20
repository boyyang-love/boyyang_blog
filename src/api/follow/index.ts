import {http} from '@/utils/http'

export const follow = (params: { follow_id: number, follow_type: 1 | 0 }) => {
    return http.request({
        url: '/follow',
        method: 'GET',
        params,
    })
}