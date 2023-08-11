<script setup lang="ts">
import {NInput} from 'naive-ui'
</script>

<template>
  <div class="tag-wrapper">
    <div class="tags-boxes">
      <div class="tags-list"></div>
      <NInput
          :bordered="false"
      ></NInput>
    </div>
  </div>
</template>

<style scoped lang="less">
.tag-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #cfd6dc, #f6ffff);
  border-radius: 10px;
  padding: 10px;
}
</style>