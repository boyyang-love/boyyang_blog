import {App} from 'vue'

const setupGlobal = (app: App) => {
    app.config.globalProperties.$message = (msg: string) => {
        console.log(msg)
    }
}

export {
    setupGlobal,
}