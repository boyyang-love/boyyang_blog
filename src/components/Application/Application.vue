<!--
 * @Author: boyyang
 * @Date: 2022-04-06 11:57:35
 * @LastEditTime: 2023-02-23 14:30:06
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\components\Application\Application.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
} from 'naive-ui'
import {MessageContent} from '@/components/MessageContent'
import {DialogContent} from '@/components/DialogContent'
import {NotificationContent} from '@/components/Notification'
import {Loading} from '@/components/Loading'
</script>

<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <DialogContent/>
            <n-notification-provider placement="bottom-right">
                <NotificationContent/>
                <n-message-provider>
                    <MessageContent/>
                    <Loading>
                        <slot slot="default"></slot>
                    </Loading>
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>
