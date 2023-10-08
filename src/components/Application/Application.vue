<script lang="ts" setup>
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from 'naive-ui'
import {MessageContent} from '@/components/MessageContent'
import {DialogContent} from '@/components/DialogContent'
import {NotificationContent} from '@/components/NotificationContent'
import {LoadingBarContent} from '@/components/LoadingBarContent'
</script>

<template>
  <n-loading-bar-provider>
    <LoadingBarContent/>
    <n-dialog-provider>
      <DialogContent/>
      <n-notification-provider placement="bottom-right">
        <NotificationContent/>
        <n-message-provider>
          <MessageContent/>
          <slot slot="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>
