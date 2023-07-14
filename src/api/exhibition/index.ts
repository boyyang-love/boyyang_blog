import {http} from '@/utils/http'

export const createExhibition = (data: { title: string; des: string; cover: string }) => {
    return http.request({
        url: '/exhibition/create',
        method: 'post',
        data,
    })
}

export const exhibitionList = (params: {
    ids?: string
    page?: number
    limit?: number
    type?: number
}) => {
    return http.request<Exhibition.ExhibitionListRes>(
        {
            url: '/exhibition/info',
            method: 'get',
            params,
        },
        {
            isShowSuccessMessage: false,
        },
    )
}

export const deleteExhibition = (data: { id: string | number }) => {
    return http.request({
        url: '/exhibition/del',
        method: 'post',
        data,
    })
}
