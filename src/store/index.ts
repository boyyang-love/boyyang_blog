/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:35:40
 * @LastEditTime: 2022-05-20 19:30:15
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\store\index.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import type { App } from 'vue'
import { createApp } from 'vue'
import ap from '@/App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia().use(piniaPluginPersistedstate)

const app = createApp(ap)
app.use(store)

// pinia 数据持久化
const setupStore = (app: App) => {
    const store = createPinia().use(piniaPluginPersistedstate)
    app.use(store)
}

export { setupStore, store }
