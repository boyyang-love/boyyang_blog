/**
 * @Author: boyyang
 * @Date: 2023-02-02 09:22:37
 * @LastEditTime: 2023-02-16 14:54:20
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
    age: number
    avatar_url: string
    email: string
    following: number
    gender: number
    gitHub: string
    like: number
    motto: string
    publish: number
    qq: number
    thumbs_up: number
    username: string
    wechat: string
}

interface dashboard_dashboard {
    blog_publish_value: string
    exhibitions_publish_value: string
    name: string
}

interface dashboard_exhibitions {
    id: number
    title: string
    des: string
    cover: string
    user_id: number
}
