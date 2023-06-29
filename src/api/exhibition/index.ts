import {http} from '@/utils/http'
import {Result} from '@/utils/http/types'

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
}): Promise<Result<Exhibition.ExhibitionListRes>> => {
    return http.request(
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
