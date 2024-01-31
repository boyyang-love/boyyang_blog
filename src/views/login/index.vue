<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import Wow from 'wow.js'
import defaultBg from '@/assets/赛博朋克风格奇幻少女_集原美电脑4k壁纸3840x2160_彼岸图网.jpg'
import {BackGround} from '@/components/Background/index.ts'
import Login from './components/loginBox/index.vue'
import Register from './components/registerBox/index.vue'
import {useLogin} from './hooks/useLogin'

const {loginData} = useLogin()

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
  <div class="bg-wrapper">
    <BackGround
        :url="defaultBg"
        :opacity="0.2"
        height="100vh"
        width="100vw"
        class="wow bounce"
    >
      <div ref="bgWrapper" class="bg">
        <Login class="wow swing" data-wow-delay="0.6s"></Login>
        <Register v-model="loginData.isRegister"></Register>
        <div class="bottom">
          <img src="@/assets/logo-ga.png" alt="" style="width: 20px;margin-right: 5px;">
          <a href="https://beian.mps.gov.cn/#/query/webSearch?recordcode=51010602002116" target="_blank">
            川公网安备51010602002116号
          </a>

          <a href="https://beian.miit.gov.cn/" target="_blank" style="margin-left: 10px">
            蜀ICP备2024050890号-1
          </a>
        </div>
      </div>
    </BackGround>
  </div>
</template>

<style lang="less" scoped>
.bg-wrapper {
  background-color: #3d3b4f;
  overflow: hidden;
  position: relative;

  .bg {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    .bottom {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.8);
      color: #b7bfd7;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 99;

      a:hover {
        color: white;
      }
    }
  }
}

.bg {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
