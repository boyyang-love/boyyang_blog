import {infoArticle} from '@/api/article'
import {Tag, tagsInfo} from '@/api/tag'
import {env} from '@/utils/env'
import {reactive} from 'vue'
import {Article} from '@/api/article/type'
import {commentCreate, commentInfo} from '@/api/comment'
import {Comment} from '@/api/comment/type'
import {follow} from '@/api/follow'
import {changeStar} from '@/api/like'

const detailData = reactive({
    detail: {
        user_info: {},
    } as Article.ArticleInfo,
    tagInfo: [] as Tag.TagInfo[],
    cardInfo: {} as Article.CardInfo,
    isFollow: false,
    isStar: false,
})
const commentData = reactive({
    list: [] as Comment.CommentInfo[],
    content: '',
})

const useArticleDetail = () => {
    const getArticleDetail = (uid: number, userId: number) => {
        let params = {
            uid: uid,
            user_id: userId,
        }
        infoArticle(params).then((res) => {
            detailData.detail = res.data.article_info.map((a) => {
                return {
                    ...a,
                    cover: `${env.VITE_APP_IMG_URL}/${a.cover}`,
                    user_info: {
                        ...a.user_info,
                        avatar_url: `${env.VITE_APP_IMG_URL}/${a.user_info.avatar_url}`,
                    },
                }
            })[0]

            detailData.cardInfo = res.data.card_info
            detailData.isFollow = res.data.card_info.follow_ids.includes(detailData.detail.user_info.uid)
            detailData.isStar = res.data.card_info.star_ids.includes(detailData.detail.uid)
            getTagInfo(res.data.article_info[0].tags)
        })
    }

    const getComments = (uid: number) => {
        let params = {
            page: 1,
            limit: 10,
            type: 'article',
            content_id: uid,
        }
        commentInfo(params).then((res) => {
            commentData.list = res.data.infos.map(info => {
                return {
                    ...info,
                    user_info: {
                        ...info.user_info,
                        avatar_url: `${env.VITE_APP_IMG_URL}/${info.user_info.avatar_url}`,
                    },
                }
            })
        })
    }

    const getTagInfo = (uids: string) => {
        tagsInfo({type: 'article', uids: uids}).then((res) => {
            detailData.tagInfo = res.data.tags_info
        })
    }

    const createComment = async (uid: number, userId: number) => {
        if (commentData.content.trim() == '') {
            window.$message.error('评论内容不能为空')
            return
        }
        let data = {
            content_id: uid,
            content: commentData.content,
            type: 'article',
        }
        await commentCreate(data)
        commentData.content = ''
        getComments(uid)
        getArticleDetail(uid, userId)
    }

    const addFollow = async () => {
        const params = {
            follow_id: detailData.detail.user_info.uid,
            follow_type: detailData.isFollow ? 0 : 1,
        } as const
        await follow(params)
        detailData.isFollow = !detailData.isFollow
    }

    const imageStar = async (uid: number) => {
        const data = {
            uid: uid,
            star_type: detailData.isStar ? 0 : 1,
            type: 3,
        }
        await changeStar(data)
        // detailData.isStar = !detailData.isStar
        getArticleDetail(detailData.detail.uid, detailData.detail.user_info.uid)
    }

    return {
        detailData,
        commentData,
        getArticleDetail,
        getComments,
        createComment,
        addFollow,
        imageStar,
    }
}

export {
    useArticleDetail,
}