import {Component, onMounted, reactive, h} from 'vue'
import {
    Star,
    Sparkles,
    ChatboxEllipses,
    EllipsisHorizontal,
} from '@vicons/ionicons5'
import {infoArticle, delArticle} from '@/api/article'
import {Article} from '@/api/article/type'
import {env} from '@/utils/env'
import {router} from '@/router'
import {NInput} from 'naive-ui'
import {Tag, tagsCreate, tagsInfo} from '@/api/tag'
import {delUpload} from '@/api/upload'
import {userInfo} from '@/api/user'
import {useUserStoreWithOut} from '@/store/modules/user'
import {User} from '@/api/user/type'

export interface actionBtnItem {
    name: string
    icon: Component
}

const useArticle = () => {
    const actionBtns: actionBtnItem[] = [
        {
            name: '点赞',
            icon: Sparkles,
        },
        {
            name: '评论',
            icon: ChatboxEllipses,
        },
        {
            name: '详情',
            icon: EllipsisHorizontal,
        },
    ]

    const articleData = reactive({
        count: 0,
        page: 1,
        limit: 10,
        list: [] as Article.ArticleInfo[],
        tags: [] as Tag.TagInfo[],
        userCardInfo: {} as Article.CardInfo,
        userInfo: {} as User.Info,
    })

    const pageSizes = [
        {
            label: '10/每页',
            value: 10,
        },
        {
            label: '20/每页',
            value: 20,
        },
    ]


    const getArticleList = () => {
        const userStore = useUserStoreWithOut()
        let params = {
            page: articleData.page,
            limit: articleData.limit,
            user_id: userStore.info.uid,
        }
        articleData.userInfo = {
            ...userStore.info,
            avatar_url: `${env.VITE_APP_IMG_URL}/${userStore.info.avatar_url}`,
        }
        console.log(articleData.userInfo)
        infoArticle(params).then((res) => {
            articleData.list = res.data.article_info.length && res.data.article_info.map((a) => {
                return {
                    ...a,
                    cover: `${env.VITE_APP_IMG_URL}/${a.cover}`,
                    user_info: {
                        ...a.user_info,
                        avatar_url: `${env.VITE_APP_IMG_URL}/${a.user_info.avatar_url}`,
                    },
                }
            }) || []

            articleData.userCardInfo = res.data.card_info

            console.log(articleData.userCardInfo)
        })
    }

    const toDetail = (uid: number) => {
        router.push({
            path: 'articleDetail',
            query: {
                uid: uid,
            },
        }).then()
    }

    const getTagInfo = () => {
        tagsInfo({type: 'article'}).then((res) => {
            articleData.tags = res.data.tags_info
        })
    }

    const delArticleClick = async (uid: number, images: string, cover: string) => {
        await delArticle({uid: uid})
        getArticleList()
        let shouldDeleteImage = (images.split(',') || []).concat(cover.split('/').slice(-3).join('/'))
        if (shouldDeleteImage.length !== 0) {
            shouldDeleteImage.forEach((s) => {
                delUpload({key: s})
            })
        }
    }

    const createTag = () => {
        let tagName = ''
        window.$dialog.create({
            title: '创建标签',
            type: 'info',
            content: () => {
                return h(NInput, {
                    placeholder: '请输入标签名称',
                    onChange: (e) => {
                        tagName = e
                    },
                })
            },
            positiveText: '确认',
            onPositiveClick: async () => {
                if (tagName.trim() === '') {
                    window.$message.error('名称不能为空')
                    return false
                }
                let data = {
                    type: 'article',
                    name: tagName,
                }
                await tagsCreate(data)
                getTagInfo()
                return true
            },
        })
    }

    const pageChange = (n: number) => {
        articleData.page = n
        getArticleList()
    }

    const pageSizeChange = (n: number) => {
        articleData.page = 1
        articleData.limit = n
        getArticleList()
    }

    return {
        actionBtns,
        articleData,
        getArticleList,
        pageSizes,
        toDetail,
        createTag,
        getTagInfo,
        delArticleClick,
        pageChange,
        pageSizeChange,
    }
}

export {
    useArticle,
}