<!--
 * @Author: boyyang
 * @Date: 2023-01-30 15:02:10
 * @LastEditTime: 2023-02-09 09:38:59
 * @LastEditors: boyyang
 * @Description: 所有图片展示
 * @FilePath: \blog_web\src\views\images\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
import {onMounted, nextTick, ref} from 'vue'
// import { init } from './hooks/three'

const wrapper = ref<Element | null>(null)


</script>

<template>
    <div class="images-wrapper" ref="wrapper">

    </div>
</template>

<style scoped lang="less">
.images-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>