/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:35:40
 * @LastEditTime: 2022-05-20 19:54:01
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\store\index.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import type {App} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)
// pinia 数据持久化
const setupStore = (app: App) => {
    app.use(store)
}

export {setupStore, store}
