<!--
 * @Author: boyyang
 * @Date: 2022-04-20 13:03:04
 * @LastEditTime: 2023-02-23 15:08:44
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\components\Background\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
import {computed} from 'vue'

enum Type {
    image = 'image',
    video = 'video',
    color = 'color',
}

interface Background {
    type?: 'image' | 'video' | 'color' // image video color
    url?: string
    color?: string
    width?: string
    height?: string
}

const props = withDefaults(defineProps<Background>(), {
    type: 'image',
    color: '#3d3b4f',
    width: '100%',
    height: '100%',
})

const background_img = computed(() => {
    if (props.type == 'color') {
        return 'none'
    }
    return `url(${new URL(props.url as any, import.meta.url).href})`
    // return ` url(${props.url})`
})
</script>

<template>
    <div class="background">
        <video v-if="props.type == Type.video" :src="props.url" autoplay loop muted></video>
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
  background-image: v-bind('background_img');
  background-position: center;
  background-size: cover;
  background-color: v-bind('props.color');
  position: relative;
  overflow: hidden;
  scroll-behavior: smooth;

  .background-content {
    scroll-behavior: smooth;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
