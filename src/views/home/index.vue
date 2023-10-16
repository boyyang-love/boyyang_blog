<script lang="ts" setup>
import {onMounted, nextTick, computed} from 'vue'
import Wow from 'wow.js'
import Menu from './components/menu/index.vue'
import UploadMenu from './components/menuUpload/index.vue'
import BackGround from '@/components/Background/index.vue'
import {useUserStore} from '@/store/modules/user'
import {env} from '@/utils/env'
import UserInfo from '@/views/userInfo/index.vue'
import {useUserInfo} from '@/views/userInfo/hooks/useUserInfo'

const userStore = useUserStore()
const {userInfoData} = useUserInfo()

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

const background = computed(() => {
  const url = userStore.info.background_image
  return `${env.VITE_APP_IMG_URL}/${url}`
})
</script>

<template>
  <BackGround
      :url="background"
      class="wow slideInDown"
      height="100vh"
      width="100vw"
      :opacity="0.1"
  >
    <div class="router-out">
      <Menu style="z-index: 9"></Menu>
      <UploadMenu style="z-index: 9"></UploadMenu>

      <teleport to="body">
        <UserInfo v-model="userInfoData.isShow"></UserInfo>
      </teleport>
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
