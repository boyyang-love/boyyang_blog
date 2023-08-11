import {reactive} from 'vue'
import {env} from '@/utils/env'
import {router} from '@/router'
// api
import {blogList, blogDel} from '@/api/blog'
import {dashboard} from '@/api/dashboard'

const homeData = reactive({
    blog: {
        list: [] as Blog.BlogInfo[],
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
        homeData.blog.list =
            res.data.blog_info &&
            res.data.blog_info.map((item) => {
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                console.log(item)
                item.user_info.avatar_url = `${env.VITE_APP_IMG_URL}${item.user_info.avatar_url}`
                return item
            })
    })
}

const getDashboard = () => {
    dashboard().then(res => {
        homeData.chart.categories =
            res.data.dashboard &&
            res.data.dashboard.map(item => {
                return item.name
            })
        res.data.dashboard &&
        res.data.dashboard.forEach((item) => {
            homeData.chart.blogChartData.push(item.blog_publish_value || '0')
            homeData.chart.exhibitionChartData.push(item.exhibitions_publish_value || '0')
        })
        res.data.user_info.avatar_url = `${env.VITE_APP_IMG_URL}${res.data.user_info.avatar_url}`
        homeData.userInfo = res.data.user_info
    })
}

const del = (id: number) => {
    blogDel({id: id}).then(() => {
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

const useHomeMethods = () => {
    return {
        getBlogList,
        getDashboard,
        cardClick,
        pageChange,
        pageSizeChange,
        del,
    }
}

export {useHomeData, useHomeMethods}
