/**
 * @Author: boyyang
 * @Date: 2022-07-04 17:20:14
 * @LastEditTime: 2022-07-07 08:29:42
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\plugin\markDown.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */
import { type App } from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

const setupMarkDown = (app: App) => {
    VueMarkdownEditor.use(vuepressTheme, {
        Prism,
    })
    VMdPreview.use(vuepressTheme, {
        Prism
    })
    app.use(VueMarkdownEditor)
    app.use(VMdPreview)
}

export { setupMarkDown }
