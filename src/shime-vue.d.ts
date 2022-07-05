/**
 * @Author: boyyang
 * @Date: 2022-04-04 23:54:24
 * @LastEditTime: 2022-07-04 17:32:18
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\shime-vue.d.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { MessageApi, DialogApi, NotificationApi } from 'naive-ui'

declare module 'qs'
declare global {
    interface Window {
        $message: MessageApi
        $dialog: DialogApi
        $notification: NotificationApi
        VANTA: any
    }
}
