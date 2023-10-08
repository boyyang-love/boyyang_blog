import {http} from '@/utils/http'
import {Admin} from '@/api/admin/types'

export const adminExhibitions = (params: Admin.AdminExhibitionReq) => {
    return http.request<Admin.AdminExhibitionRes>(
        {
            url: '/admin/exhibitions',
            method: 'get',
            params,
        },
        {
            isShowMessage: false,
        },
    )
}

export const adminStat = () => {
    return http.request<Admin.adminStatRes>({
        url: '/admin/stat',
        method: 'get',
    }, {
        isShowMessage: false,
    })
}

export const createNotice = (data: { content: string }) => {
    return http.request({
        url: '/notice/create',
        method: 'post',
        data,
    })
}

export const infosNotice = (params: { page: number, limit: number }) => {
    return http.request<Admin.InfoNoticeRes>({
        url: '/notice/info',
        method: 'get',
        params,
    }, {
        isShowMessage: false,
    })
}