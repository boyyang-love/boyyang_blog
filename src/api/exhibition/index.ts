import {http} from '@/utils/http'

export const createExhibition = (
    data: {
        title: string;
        des: string;
        cover: string,
        tags: string,
        size: number,
        wh: string,
        type: string,
    },
) => {
    return http.request({
        url: '/exhibition/create',
        method: 'post',
        data,
    })
}

export const exhibitionList = (
    params: {
        uids?: string
        page?: number
        limit?: number
        type?: number
        public?: boolean
        sort?: string
    },
) => {
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

export const deleteExhibition = (data: { uid: string | number }) => {
    return http.request({
        url: '/exhibition/del',
        method: 'post',
        data,
    })
}

export const changeExhibitionStatus = (data: { uid: string | number, status: number, reason: string }) => {
    return http.request({
        url: '/exhibition/approval',
        method: 'post',
        data,
    })
}
