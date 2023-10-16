import {infoArticle} from '@/api/article'
import {Tag, tagsInfo} from '@/api/tag'
import {env} from '@/utils/env'
import {reactive} from 'vue'
import {Article} from '@/api/article/type'
import {commentCreate, commentInfo} from '@/api/comment'
import {Comment} from '@/api/comment/type'

const detailData = reactive({
    detail: {
        user_info: {},
    } as Article.ArticleInfo,
    tagInfo: [] as Tag.TagInfo[],
    cardInfo: {} as Article.CardInfo,
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

    return {
        detailData,
        commentData,
        getArticleDetail,
        getComments,
        createComment,
    }
}

export {
    useArticleDetail,
}