/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:35:40
 * @LastEditTime: 2022-05-15 18:48:08
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\store\index.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
// import piniaPersist from 'pinia-persistedstate-plugin'

const store = createPinia()
// pinia 数据持久化
store.use(piniaPersist)

const setupStore = (app: App) => {
    app.use(store)
}

export { store, setupStore }
