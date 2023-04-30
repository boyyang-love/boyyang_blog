declare namespace Exhibition {
    interface ExhibitionListRes {
        count: number
        exhibitions: ExhibitionsInfo[]
    }

    interface ExhibitionsInfo {
        cover: string
        des: string
        id: number
        reject_res: string
        status: number
        sub_title: string
        title: string
        user_id: number
        user_info: UserInfo
    }

    interface UserInfo {
        avatarUrl: string
        gender: number
        id: number
        tel: number
        username: string
    }
}