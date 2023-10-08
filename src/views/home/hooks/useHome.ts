import {reactive} from 'vue'
import {env} from '@/utils/env'
import {router} from '@/router'
// api
import {blogList, blogDel} from '@/api/blog'
import {dashboard} from '@/api/dashboard'
import {delUpload} from '@/api/upload'
import {infosNotice} from '@/api/admin'
import {Admin} from '@/api/admin/types'

const homeData = reactive({
    blog: {
        list: [] as (Blog.BlogInfo & { cover_path: string })[],
        count: 0,
        page: 1,
        limit: 5,
    },
    chart: {
        categories: [] as string[],
        blogChartData: [] as string[],
        exhibitionChartData: [] as string[],
        exhibitionPublishData: [] as string[],
    },
    userInfo: {} as Dashboard.DashboardUserinfo,
    notice: {} as Admin.InfoNotice,
})

const paginationOpt = {
    pageSizes: [
        {
            label: '5/页',
            value: 5,
        },
        {
            label: '10/页',
            value: 10,
        },
        {
            label: '20/页',
            value: 20,
        },
    ],
}

const getBlogList = () => {
    let params = {
        page: homeData.blog.page,
        limit: homeData.blog.limit,
    }
    blogList(params).then(res => {
        homeData.blog.count = res.data.count
        const blog_info = res.data.blog_info as (Blog.BlogInfo & { cover_path: string })[]
        homeData.blog.list =
            blog_info &&
            blog_info.map((item) => {
                item.cover_path = item.cover
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                item.user_info.avatar_url = `${env.VITE_APP_IMG_URL}${item.user_info.avatar_url}`
                return item
            })
    })
}

const getDashboard = () => {
    let categories = []
    let blogChartData = [] as string[]
    let exhibitionChartData = [] as string[]
    dashboard().then(res => {
        categories =
            res.data.dashboard &&
            res.data.dashboard.map(item => {
                return item.name
            })

        res.data.dashboard &&
        res.data.dashboard.forEach((item) => {
            blogChartData.push(item.blog_publish_value || '0')
            exhibitionChartData.push(item.exhibitions_publish_value || '0')
        })

        res.data.user_info.avatar_url = `${env.VITE_APP_IMG_URL}${res.data.user_info.avatar_url}`
        homeData.userInfo = res.data.user_info
        homeData.chart.categories = categories
        homeData.chart.blogChartData = blogChartData
        homeData.chart.exhibitionChartData = exhibitionChartData
    })
}

const del = async (id: number, cover_path: string) => {
    await delUpload({key: cover_path})
    blogDel({uid: id}).then(() => {
        getBlogList()
    })
}

const cardClick = (id: number) => {
    router.push({
        name: 'Blog',
        query: {
            id,
        },
    }).then(() => {
    })
}

const pageChange = (n: number) => {
    homeData.blog.page = n
    getBlogList()
}

const pageSizeChange = (n: number) => {
    homeData.blog.page = 1
    homeData.blog.limit = n
    getBlogList()
}


const useHomeData = () => {
    return {
        homeData,
        paginationOpt,
    }
}

const getNotice = () => {
    infosNotice({page: 1, limit: 1}).then(res => {
        homeData.notice = res.data.infos[0]
    })
}

const useHomeMethods = () => {
    return {
        getBlogList,
        getDashboard,
        cardClick,
        pageChange,
        pageSizeChange,
        del,
        getNotice,
    }
}

export {useHomeData, useHomeMethods}
