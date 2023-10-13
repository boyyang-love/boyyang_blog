import {infoArticle} from '@/api/article'
import {Tag, tagsInfo} from '@/api/tag'
import {env} from '@/utils/env'
import {reactive} from 'vue'
import {Article} from '@/api/article/type'
import {User} from '@/api/user/type'

const useArticleDetail = () => {
    const detailData = reactive({
        detail: {
            user_info: {},
        } as Article.ArticleInfo,
        tagInfo: [] as Tag.TagInfo[],
        cardInfo: {} as Article.CardInfo,
    })
    const getArticleDetail = (uid: number) => {
        let params = {
            uid: uid,
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

    const getTagInfo = (uids: string) => {
        tagsInfo({type: 'article', uids: uids}).then((res) => {
            detailData.tagInfo = res.data.tags_info
        })
    }

    return {
        detailData,
        getArticleDetail,
    }
}

export {
    useArticleDetail,
}