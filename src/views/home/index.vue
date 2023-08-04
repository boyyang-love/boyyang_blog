<script lang="ts" setup>
import {onMounted, nextTick} from 'vue'
import Wow from 'wow.js'
import Menu from './components/menu/index.vue'
import BackGround from '@/components/Background/index.vue'
import banner from '@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg'

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
  <BackGround
      :url="banner"
      class="wow slideInDown"
      height="100vh"
      width="100vw"
  >
    <div class="router-out">
      <Menu style="z-index: 9"></Menu>
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
  </BackGround>
</template>

<style lang="less" scoped>
.router-out {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
