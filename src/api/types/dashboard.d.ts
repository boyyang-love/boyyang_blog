/**
 * @Author: boyyang
 * @Date: 2023-02-02 09:22:37
 * @LastEditTime: 2023-02-02 15:27:18
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\api\types\dashboard.d.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

interface dashboardRes {
    user_info: dashboard_user_info
    dashboard: dashboard_dashboard[]
    exhibitions: dashboard_exhibitions[]
}

interface dashboard_user_info {
    id: number
    username: string
    gender: number
    avatarUrl: string
    tel: number
    thumbs_up: number
    like: number
    publish: number
}

interface dashboard_dashboard {
    name: string
    value: string
}

interface dashboard_exhibitions {
    id: number
    title: string
    des: string
    cover: string
    user_id: number
}
