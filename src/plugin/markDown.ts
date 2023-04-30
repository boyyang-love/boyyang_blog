import {type App} from 'vue'
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
        Prism,
    })
    app.use(VueMarkdownEditor)
    app.use(VMdPreview)
}

export {setupMarkDown}
