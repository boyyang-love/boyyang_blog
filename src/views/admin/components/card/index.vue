<script setup lang="ts">
import {SendSharp} from '@vicons/ionicons5'
import {Component, markRaw} from 'vue'
interface Props {
  icon: Component
  text: string
  num: number
}

const props = withDefaults(defineProps<Props>(), {
  icon: markRaw(SendSharp)
})
</script>

<template>
  <div class="card-wrapper">
    <div class="left-icon">
      <n-icon
          :size="34"
          :component="props.icon as any"
          color="#fff"
      ></n-icon>
    </div>
    <div class="right-content">
      <div class="title">{{props.text}}</div>
      <div class="num">{{props.num}}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  backdrop-filter: saturate(120%) blur(20px);
  background-color: rgba(249, 247, 247, 0.2);

  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  padding: 10px;

  .left-icon {
    margin-right: 10px;
    text-shadow: 5px 5px 5px rgba(0, 0, 0.5);
  }

  .title {
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  }

  .num {
    font-family: "Fira Code", sans-serif;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5)
  }
}
</style>