<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:31:01
 * @LastEditTime: 2023-02-11 21:28:41
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import {onMounted, nextTick} from 'vue'
import Wow from 'wow.js'
import TopMenu from './components/topMenu.vue'
import {BackGround} from '@/components/Background'
import banner from '@/assets/00008.png'

onMounted(() => {
    const wow = new Wow({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function () {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window
    })

    wow.init()
})
</script>

<template>
    <BackGround width="100vw" height="100vh" :url="banner" class="wow slideInDown">
        <div class="index">
            <TopMenu style="z-index: 99"></TopMenu>
            <!-- 路由出口 -->
            <router-view></router-view>
        </div>
    </BackGround>
</template>

<style scoped lang="less">
.index {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
