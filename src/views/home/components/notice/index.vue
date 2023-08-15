<script lang="ts" setup>
import {NotificationOutlined} from '@vicons/antd'
</script>

<template>
  <div class="notice-wrapper">
    <n-space vertical>
      <div class="notice-title">
        <n-icon :component="NotificationOutlined as any" size="22" color="#fc5185"></n-icon>
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
  background: linear-gradient(145deg, #cfd6dc, #f6ffff);
  border-radius: 10px;

  .notice-title {
    color: #393e46;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      margin-left: 10px;
      font-weight: bold;
    }
  }

  .notice-content {
    color: #393e46;
  }
}
</style>
