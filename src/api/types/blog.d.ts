interface blog_blogList {
    blog_info: blog_blogInfo[]
    count: number
}

interface blog_blogInfo {
    id: number
    content: string
    cover: string
    sub_title: string
    thumbs_up: number
    title: string
    user_info: blog_user_info
}

interface blog_user_info {
    avatarUrl: string
    gender: number
    id: number
    tel: number
    username: string
}
