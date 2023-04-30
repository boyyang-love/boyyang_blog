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
