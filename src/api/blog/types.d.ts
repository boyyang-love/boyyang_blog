declare namespace Blog {
    interface BlogList {
        blog_info: BlogInfo[]
        count: number
    }

    interface BlogInfo {
        uid: number
        content: string
        cover: string
        sub_title: string
        thumbs_up: number
        title: string
        created: number
        updated: number
        user_info: BlogUserinfo
    }

    interface BlogUserinfo {
        avatar_url: string
        gender: number
        uid: number
        tel: number
        username: string
    }
}