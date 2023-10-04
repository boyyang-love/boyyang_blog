import {http} from '@/utils/http'

export declare namespace Tag {

    export interface TagInfoRes {
        tags_info: TagInfo[];
    }

    export interface TagInfo {
        uid: number
        name: string
        type: string
    }
}

export const tagsInfo = (params: { type: string }) => {
    return http.request<Tag.TagInfoRes>({
            url: 'tags/info',
            method: 'GET',
            params,
        },
        {
            isShowMessage: false,
        },
    )
}