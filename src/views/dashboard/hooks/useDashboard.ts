import {reactive} from 'vue'
import {env} from '@/utils/env'
import {dashboard} from '@/api/dashboard/index'

interface rouseData {
    name: string
    value: number | string
}

interface exhibitions {
    name: string
    url: string
}

const dashboardData = reactive({
    dashboard: [] as Dashboard.Dashboard[],
    user_info: {} as Dashboard.DashboardUserinfo,
    rouseData: [] as rouseData[],
    exhibitions: [] as exhibitions[],
})

// 获取dashboard数据
const getDashboard = () => {
    dashboard().then(res => {
        dashboardData.dashboard = res.data.dashboard
        dashboardData.user_info = res.data.user_info
        dashboardData.rouseData = [
            {name: '获赞数', value: res.data.user_info.thumbs_up},
            {name: '发布数', value: res.data.user_info.publish},
            {name: '收藏数', value: res.data.user_info.like},
            {name: '粉丝数', value: res.data.user_info.following},
        ]
        dashboardData.exhibitions = res.data.exhibitions.map(item => {
            return {
                name: item.title,
                url: `${env.VITE_APP_IMG_URL}${item.cover}`,
            }
        })
    })
}

export const useDashboard = () => {
    return {
        dashboardData,
        getDashboard,
    }
}
