import {User} from '@/api/user/type'

export namespace Comment {

    export interface CommentRes {
        count: number
        infos: CommentInfo[]
    }

    export interface CommentInfo {
        uid: number
        created: number
        content: string
        thumbs_up: number
        user_info: User.Info
    }
}