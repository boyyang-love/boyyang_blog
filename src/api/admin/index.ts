import {http} from '@/utils/http'
import {Admin} from '@/api/admin/types'

export const adminExhibitions = (params: Admin.AdminExhibitionReq) => {
    return http.request<Admin.AdminExhibitionRes>({
        url: '/admin/exhibitions',
        method: 'get',
        params,
    })
}