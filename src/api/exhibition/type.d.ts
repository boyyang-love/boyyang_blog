declare namespace Exhibition {
    interface ExhibitionListRes {
        count: number
        exhibitions: ExhibitionsInfo[]
        likes_ids: number[]
        approved: number
        in_review: number
        review_rjection: number
    }


    interface ExhibitionsInfo {
        id: number
        cover: string
        cover_url: string
        des: string
        tags: string
        reject_res: string
        status: number
        sub_title: string
        title: string
        user_id: number
        user_info: UserInfo
        created: number
    }

    interface UserInfo {
        avatar_url: string
        gender: number
        id: number
        tel: number
        username: string
    }
}