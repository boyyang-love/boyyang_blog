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
        wh: string
    }

    export interface UserInfo {
        avatar_url: string
        gender: number
        uid: number
        tel: number
        username: string
    }
}