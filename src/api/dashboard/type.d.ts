declare namespace Dashboard {
    interface DashboardRes {
        user_info: DashboardUserinfo
        dashboard: Dashboard[]
        exhibitions: DashboardExhibitions[]
    }

    interface DashboardUserinfo {
        age: number
        avatar_url: string
        email: string
        following: number
        gender: number
        gitHub: string
        like: number
        motto: string
        publish: number
        qq: number
        thumbs_up: number
        username: string
        wechat: string
    }

    interface Dashboard {
        blog_publish_value: string
        exhibitions_publish_value: string
        name: string
    }

    interface DashboardExhibitions {
        uid: number
        title: string
        des: string
        cover: string
        user_id: number
    }
}