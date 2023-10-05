import {App} from 'vue'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

const setupComponents = (app: App) => {
    app.use(VCalendar, {})
}

export {
    setupComponents,
}