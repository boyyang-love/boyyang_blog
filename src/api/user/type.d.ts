export namespace User {
    export interface UpdateUserInfo {
        username?: string
        age?: number
        gender?: number
        avatarUrl?: string
        tel?: number
        email?: string
        address?: string
    }

    export interface UserInfo {
        user_info: Info
        user_detail: Detail
    }

    export interface Info {
        id: number
        username: string
        gender: number
        avatar_url: string
        age: number
        email: string
        address: string
        qq: number
        wechat: string
        git_hub: string
        tel: number
        background_image: string
        motto: string
    }

    export interface Detail {
        publish: number
        likes: number
        follows: number
        thumbs_up: number
    }

}