<script lang="ts" setup>
import {computed} from 'vue'
import {Background} from './types/props'
import CubeLoading from '@/components/CubeLoading/index.vue'

const props = withDefaults(defineProps<Background.Props>(), {
  type: 'image',
  color: '#3d3b4f',
  width: '100%',
  height: '100%',
  url: '',
  opacity: 0.1,
})

// 背景图片
const background_img = computed(() => {
  if (props.type == 'color') {
    return 'none'
  }
  return `url("${new URL(props.url, import.meta.url).href}")`
})

const opacity = computed(() => {
  return `rgba(0, 0, 0, ${props.opacity})`
})

</script>

<template>
  <div class="background">
    <video
        v-if="props.type === 'video'"
        :src="props.url"
        autoplay
        class="video"
        loop
        muted
    ></video>
    <div class="background-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.background {
  box-sizing: border-box;
  width: v-bind('props.width');
  height: v-bind('props.height');
  background-image: v-bind(background_img);
  background-position: center;
  background-size: cover;
  background-color: v-bind('props.color');
  position: relative;
  overflow: hidden;

  transition: background-image .4s linear;

  .background-content {
    scroll-behavior: smooth;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: v-bind('opacity');
  }

  .video {
    width: 100%;
    height: 100%;
    object-fit: fill;
    position: absolute;
    top: 0;
    left: 0;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
