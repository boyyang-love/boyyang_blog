import {User} from '../user/type'

export namespace Article {
    export interface ArticleInfoRes {
        count: number
        article_info: ArticleInfo[]
        card_info: CardInfo
    }

    export interface ArticleInfo {
        uid: number
        title: string
        sub_title: string
        content: string
        cover: string
        images: string
        tags: string
        user_info: User.Info
        created: number
        comment: number
        thumbs_up: number
    }

    export interface CardInfo {
        follow: number
        fans: number
        thumb: number
        article: number
        comment: number
        follow_ids: number[]
    }
}