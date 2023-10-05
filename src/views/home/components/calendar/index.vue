<script setup lang="ts">
import {ref} from 'vue'

const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'red',
      fillMode: 'solid',
      contentClass: 'italic',
    },
    dates: new Date(),
    popover: {
      label: '希望每一天，你都能有个好心情。',
      visibility: 'hover',
      hideIndicator: true,
    },
  },
])
</script>

<template>
  <div class="calendar-wrapper">
    <VCalendar
        transparent
        expanded
        locale="zh"
        :attributes="attrs"
    >
    </VCalendar>
  </div>
</template>

<style scoped lang="less">
.calendar-wrapper {
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(218, 224, 228);
  border-radius: 10px;
}
</style>