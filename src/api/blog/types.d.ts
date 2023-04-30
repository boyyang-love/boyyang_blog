declare namespace Blog {
    interface BlogList {
        blog_info: BlogInfo[]
        count: number
    }

    interface BlogInfo {
        id: number
        content: string
        cover: string
        sub_title: string
        thumbs_up: number
        title: string
        user_info: BlogUserinfo
    }

    interface BlogUserinfo {
        avatarUrl: string
        gender: number
        id: number
        tel: number
        username: string
    }
}