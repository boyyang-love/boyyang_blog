import {MessageApi, DialogApi, NotificationApi} from 'naive-ui'
import type {LoadingApi} from './components/Loading'

declare global {
    interface Window {
        $message: MessageApi
        $dialog: DialogApi
        $notification: NotificationApi
        $loading: LoadingApi
        THREE: any
        VANTA: {
            RINGS: any
            WAVES: any
            NET: any
            FOG: any
            CELLS: any
            BIRDS: any
            TRUNK: any
            GLOBE: any
            HALO: any
        }
    }
}
