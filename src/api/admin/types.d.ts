import {adminStat} from '@/api/admin/index'

export namespace Admin {
    export interface AdminExhibitionReq {
        page: number
        limit: number
        type: number
        sort?: string
    }

    export interface AdminExhibitionRes {
        count: number
        exhibitions: ExhibitionsInfo[]
    }

    export interface ExhibitionsInfo {
        uid: number
        cover: string
        des: string
        tags: string
        reject_res: string
        status: number
        sub_title: string
        title: string
        user_id: number
        user_info: UserInfo
        created: number
        thumbs_up: number
        size: number
        px: string
    }

    export interface UserInfo {
        avatar_url: string
        gender: number
        uid: number
        tel: number
        username: string
    }

    export interface adminStatRes {
        user_count: number
        image_count: number
        image_download_count: number
        blog_count: number
        article_count: number
    }

    export interface InfoNoticeRes {
        infos: InfoNotice[]
    }

    export interface InfoNotice {
        content: string
        uid: number
        user_id: number
    }
}