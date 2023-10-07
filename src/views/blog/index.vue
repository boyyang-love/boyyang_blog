<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Wow from 'wow.js'
import {PrintText} from '@/components/PrintText'
import {BackGround} from '@/components/Background'

import {useRoute} from 'vue-router'
import {useBlog} from './hooks/useBlog'
import {Power, Create} from '@vicons/ionicons5'

const route = useRoute()
const {blogData, getBlogDetail, editSubmit} = useBlog()

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
      class="wow bounceInDown"
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
      <div class="submit-wrapper wow bounceInRight">
        <n-space vertical align="center" size="large">
          <n-tooltip
              trigger="hover"
              placement="left"
          >
            <template #trigger>
              <n-icon
                  :size="34"
                  class="icon"
                  @click="blogData.isShowEdit = true"
              >
                <Create></Create>
              </n-icon>
            </template>
            编辑
          </n-tooltip>
          <n-tooltip
              trigger="hover"
              placement="left"
          >
            <template #trigger>
              <n-icon
                  :size="34"
                  class="icon"
                  @click="$router.back()"
              >
                <Power></Power>
              </n-icon>
            </template>
            返回
          </n-tooltip>
        </n-space>
      </div>
    </div>

    <n-modal
        v-model:show="blogData.isShowEdit"
        :style="{width: '80%',}"
        title="博客修改"
        preset="dialog"
        positive-text="确认修改"
        @positive-click="editSubmit"
    >
      <div class="blog-detail-content">
        <v-md-editor v-model="blogData.blogInfoEdit.content"  height="750px"></v-md-editor>
      </div>
    </n-modal>
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

  .submit-wrapper {
    box-sizing: border-box;
    position: absolute;
    right: 10px;
    bottom: 10px;

    .icon {
      border: 1px solid whitesmoke;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      padding: 5px;
      cursor: pointer;
      font-size: 24px;
      color: whitesmoke;
    }
  }
}

.blog-detail-content {
  box-sizing: border-box;
}
</style>
