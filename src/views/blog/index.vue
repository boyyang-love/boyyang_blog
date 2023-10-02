<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Wow from 'wow.js'
import {PrintText} from '@/components/PrintText'
import {BackGround} from '@/components/Background'

import {useRoute} from 'vue-router'
import {useBlog} from './hooks/useBlog'

const route = useRoute()
const {blogData, getBlogDetail} = useBlog()

const mdPreview = ref<any | null>(null)

onMounted(() => {
  const wow = new Wow({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 50, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function () {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: '#blog-container', // optional scroll container selector, otherwise use window
  })

  wow.init()

  getBlogDetail(route.query)
})
</script>

<template>
  <BackGround
      width="100vw"
      height="100vh"
      :url="blogData.blogInfo.cover"
  >
    <div class="blog-wrapper container m-auto" id="blog-container">
      <div class="top-banner">
        <PrintText
            :title="blogData.blogInfo.title"
            :subtitle="blogData.blogInfo.sub_title"
        ></PrintText>
      </div>
      <div class="blog-content wow fadeInUpBig" data-wow-delay="1s">
        <div class="content-wrapper">
          <v-md-preview
              :text="blogData.blogInfo.content"
              :include-level="[3, 4]"
              ref="mdPreview"
          ></v-md-preview>
        </div>
      </div>
    </div>
  </BackGround>
</template>

<style scoped lang="less">
.blog-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .top-banner {
    box-sizing: border-box;
    height: 450px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .blog-content {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding: 0 0 50px;

    .content-wrapper {
      width: 70%;
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
