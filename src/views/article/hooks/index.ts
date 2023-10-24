import {Component, reactive, h, ref} from 'vue'
import {
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
import {useUserStoreWithOut} from '@/store/modules/user'
import {User} from '@/api/user/type'

export interface actionBtnItem {
    name: string
    icon: Component
    num: number
}

const useArticle = () => {
    const tabActice = ref<number>(1)

    const articleData = reactive({
        count: 0,
        page: 1,
        limit: 5,
        list: [] as Article.ArticleInfo[],
        tags: [] as Tag.TagInfo[],
        userCardInfo: {} as Article.CardInfo,
        userInfo: {} as User.Info,
    })

    const hotArticleData = reactive({
        list: [] as Article.ArticleInfo[],
    })
    const actionBtns: actionBtnItem[] = [
        {
            name: '点赞',
            icon: Sparkles,
            num: 0,
        },
        {
            name: '评论',
            icon: ChatboxEllipses,
            num: 0,
        },
        // {
        //     name: '详情',
        //     icon: EllipsisHorizontal,
        //     num: 0,
        // },
    ]

    const tabs = [
        {
            name: '我的',
            id: 1,
        },
        {
            name: '推荐',
            id: 2,
        },
    ]

    const pageSizes = [
        {
            label: '5/每页',
            value: 5,
        },
        {
            label: '10/每页',
            value: 10,
        },
        {
            label: '15/每页',
            value: 15,
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
            type: tabActice.value,
            user_id: tabActice.value === 1 ? userStore.info.uid : '',
        }
        articleData.userInfo = {
            ...userStore.info,
            avatar_url: `${env.VITE_APP_IMG_URL}/${userStore.info.avatar_url}`,
        }
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
            articleData.count = res.data.count
        })
    }

    const getHotArticleList = () => {
        let params = {
            page: 1,
            limit: 10,
            sort: 'comment desc',
            type: 3,
        }

        infoArticle(params).then((res) => {
            hotArticleData.list = res.data.article_info.length && res.data.article_info.map((a) => {
                return {
                    ...a,
                    cover: `${env.VITE_APP_IMG_URL}/${a.cover}`,
                    user_info: {
                        ...a.user_info,
                        avatar_url: `${env.VITE_APP_IMG_URL}/${a.user_info.avatar_url}`,
                    },
                }
            }) || []
        })
    }

    const toDetail = (uid: number, userId: number) => {
        // const url = router.resolve({
        //     path: '/articleDetail',
        //     query: {
        //         uid: uid,
        //         user_id: userId,
        //     },
        // })
        // window.open(url.href, '__blank')
        router.push({
            path: 'articleDetail',
            query: {
                uid: uid,
                user_id: userId,
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
        let shouldDeleteImage: string[] = []
        if (images.trim() !== '') {
            shouldDeleteImage.push(...images.split(','))
        }
        if (cover !== '') {
            shouldDeleteImage.push(...cover.split('/').slice(-3).join('/'))
        }
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

    const userDetail = (uid: number) => {
        router.push({
            path: '/userDetail',
            query: {
                uid: uid,
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

    const tabChange = (id: number) => {
        tabActice.value = id
        getArticleList()
    }

    return {
        actionBtns,
        articleData,
        hotArticleData,
        pageSizes,
        tabs,
        tabActice,
        userDetail,
        tabChange,
        getArticleList,
        getHotArticleList,
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