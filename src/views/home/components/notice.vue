<script lang="ts" setup>
import {NotificationOutlined} from '@vicons/antd'
</script>

<template>
  <div class="notice-wrapper">
    <n-space vertical>
      <div class="notice-title">
        <n-icon :component="NotificationOutlined" size="22" color="#fc5185"></n-icon>
        <span>公告~~</span>
      </div>
      <div class="notice-content">jfaljjfddddddddddddddshei</div>
    </n-space>
  </div>
</template>

<style scoped lang="less">
.notice-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;

  .notice-title {
    color: whitesmoke;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      margin-left: 10px;
      font-weight: bold;
      text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
    }
  }

  .notice-content {
    color: whitesmoke;
  }
}
</style>
