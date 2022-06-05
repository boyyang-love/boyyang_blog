<!--
 * @Author: boyyang
 * @Date: 2022-04-06 11:57:35
 * @LastEditTime: 2022-06-05 18:11:55
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\components\Application\Application.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import {
        NDialogProvider,
        NNotificationProvider,
        NMessageProvider,
        NLoadingBarProvider,
    } from 'naive-ui'
    import { MessageContent } from '@/components/MessageContent'
    import { DialogContent } from '@/components/DialogContent'
    import { NotificationContent } from '@/components/Notification'
</script>

<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <DialogContent />
            <n-notification-provider>
                <NotificationContent />
                <n-message-provider>
                    <MessageContent />
                    <slot slot="default"></slot>
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>
