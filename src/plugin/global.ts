/**
 * @Author: boyyang
 * @Date: 2022-04-05 10:28:06
 * @LastEditTime: 2022-04-05 10:30:03
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\plugin\global.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { App } from "vue"

const setupGlobal = (app: App) => {
    app.config.globalProperties.$message = (msg: string) => {
        console.log(msg)
    }
}

export {
    setupGlobal
}