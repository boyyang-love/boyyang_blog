<script lang="ts" setup>
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from 'naive-ui'
import {MessageContent} from '@/components/MessageContent/index'
import {DialogContent} from '@/components/DialogContent/index'
import {NotificationContent} from '@/components/Notification/index'
import {Loading} from '@/components/Loading/index'
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
