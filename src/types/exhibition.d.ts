/**
 * @Author: boyyang
 * @Date: 2022-12-30 15:47:16
 * @LastEditTime: 2022-12-30 15:54:53
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\types\exhibition.d.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

interface exhibitionListRes {
    count: number
    exhibitions: exhibitionsInfo[]
}

interface exhibitionsInfo {
    cover: string
    des: string
    id: number
    reject_res: string
    status: number
    sub_title: string
    title: string
    user_id: number
    user_info: userInfo
}

interface userInfo {
    avatarUrl: string
    gender: number
    id: number
    tel: number
    username: string
}
