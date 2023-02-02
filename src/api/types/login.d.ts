/**
 * @Author: boyyang
 * @Date: 2022-12-30 15:24:14
 * @LastEditTime: 2022-12-30 15:26:33
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\types\login.d.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */


// 登录
interface loginRes {
    info: {
        id: number
        username: string
        gender: number
        avatarUrl: string
        tel: string
    }
    token: string
}

// 注册

