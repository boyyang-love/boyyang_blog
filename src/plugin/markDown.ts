/**
 * @Author: boyyang
 * @Date: 2022-07-04 17:20:14
 * @LastEditTime: 2022-07-04 17:32:55
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\plugin\markDown.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */
import { type App } from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

const setupMarkDown = (app: App) => {
    VueMarkdownEditor.use(vuepressTheme, {
        Prism,
    })
    app.use(VueMarkdownEditor)
}

export { setupMarkDown }
