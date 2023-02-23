/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:54:24
 * @LastEditTime: 2022-09-03 16:40:09
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\shims-vue.d.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { MessageApi, DialogApi, NotificationApi } from 'naive-ui'
import type { LoadingApi } from './components/Loading'

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
