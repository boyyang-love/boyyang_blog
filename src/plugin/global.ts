/**
 * @Author: boyyang
 * @Date: 2022-04-05 10:28:06
 * @LastEditTime: 2023-02-10 09:38:38
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\plugin\global.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import {App} from 'vue'

const setupGlobal = (app: App) => {
    app.config.globalProperties.$message = (msg: string) => {
        console.log(msg)
    }
}

export {
    setupGlobal,
}