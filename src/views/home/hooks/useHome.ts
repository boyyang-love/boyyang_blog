import { reactive } from 'vue'
import { env } from '@/utils/env'
import { router } from '@/router'
// api
import { blogList } from '@/api/blog'

const homeData = reactive({
    blog: {
        list: [] as blog_blogInfo[],
        count: 0,
        page: 1,
        limit: 10,
    },
})

const getBlogList = () => {
    let params = {
        page: homeData.blog.page,
        limit: homeData.blog.limit,
    }
    blogList(params).then(res => {
        homeData.blog.count = res.data.count
        homeData.blog.list =
            res.data.blog_info &&
            res.data.blog_info.map((item: any) => {
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                return item
            })
    })
}

const cardClick = (id: number) => {
    router.push({
        name:"Blog",
        query: {
            id,
        },
    })
}

const useHome = () => {
    return {
        homeData,
        getBlogList,
        cardClick,
    }
}

export { useHome }
