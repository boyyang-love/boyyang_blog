<script setup lang="ts">
import {Component, markRaw} from 'vue'
import {Create} from '@vicons/ionicons5'

interface Props {
  icon: Component
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: markRaw(Create),
  text: '',
})
</script>

<template>
  <div class="action-card-wrapper">
    <div class="card">
      <div class="icon">
        <n-icon
            :size="24"
            color="#fff"
            :component="props.icon as any"
        ></n-icon>
      </div>
      <div class="text">
        {{ props.text }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.action-card-wrapper {
  box-sizing: border-box;
  height: 100%;
  backdrop-filter: saturate(120%) blur(20px);
  background-color: rgba(249, 247, 247, 0.2);
  padding: 10px;

  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  .card {
    display: flex;
    flex-direction: column;
    cursor: pointer;


    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
    }

    .text {
      color: whitesmoke;
      font-size: 13px;
    }
  }
}
</style>