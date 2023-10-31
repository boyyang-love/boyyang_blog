export namespace User {
    export interface UpdateUserInfo {
        uid: number | string
        username?: string
        age?: number
        gender?: number
        avatar_url?: string
        tel?: number
        wechat?: string
        email?: string
        address?: string
        motto?: string
        background_image?: string
        git_hub?: string
    }

    export interface UserInfo {
        user_info: Info
        user_detail: Detail
    }

    export interface Info {
        uid: number
        username: string
        gender: number
        avatar_url: string
        age: number | string
        email: string
        address: string
        qq: number | string
        wechat: string
        git_hub: string
        tel: number | string
        background_image: string
        motto: string
        role: string
    }

    export interface Detail {
        publish: number
        likes: number
        follows: number
        thumbs_up: number
    }

    export interface UserDetail {
        count: number
        upload: number
        download: number
        follow: number
        like: number
        star: number
        exhibition: Exhibition[]
        user_info: Info
        follow_ids: number[]
    }

    export interface Exhibition {
        cover: string
        created: number
        download: number
        thumbs_up: number
        title: string
        sub_title: string
        uid: number
    }

}