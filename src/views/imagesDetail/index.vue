<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue'
import {useRoute} from 'vue-router'
import BackGround from '@/components/Background/index.vue'
import {useImageDetail} from './hooks'
import CubeLoading from '@/components/CubeLoading/index.vue'
import {
  Fitness,
  Power,
  CloudDownload,
  SyncCircle,
} from '@vicons/ionicons5'
import Wow from 'wow.js'

const rightClick = (e: Event) => {
  e.preventDefault()
}

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
    scrollContainer: '#container-detail', // optional scroll container selector, otherwise use window
  })

  document.addEventListener('contextmenu', rightClick)

  wow.init()
})

const route = useRoute()
const query = route.query

const {detailData, detailMessage, imagesDownload} = useImageDetail(query)

onUnmounted(() => {
  document.removeEventListener('contextmenu', rightClick, false)
})

</script>

<template>
  <BackGround
      width="100vw"
      height="100vh"
      type="image"
      :url="detailData.exhibitionInfo.cover"
      :opacity="0.8"
  >
    <div class="container-detail" id="container-detail">
      <div class="image-detail-wrapper" id="image=detail-wrapper">
        <div class="detail-left">
          <div class="img-container wow bounceInDown">
            <NSpin
                :show="detailData.isLoading"
                :rotate="true"
                size="large"
            >
              <template #description>
                <span class="loading-text">
                  图片正在加载中,请稍后...
                </span>
              </template>
              <template #icon>
                <n-icon color="#b83b5e" :size="40">
                  <SyncCircle></SyncCircle>
                </n-icon>
              </template>

              <div class="img-content">
                <n-image
                    class="img"
                    object-fit="cover"
                    :src="detailData.exhibitionInfo.cover"
                    :show-toolbar="false"
                >
                  <template #placeholder>
                    <div class="loading">
                      <CubeLoading></CubeLoading>
                    </div>
                  </template>
                </n-image>
              </div>
            </NSpin>
          </div>
          <div class="bottom-content">
            <div class="tags-wrapper wow bounceInUp" v-if="detailData.tags.length > 0">
              <div class="tag" v-for="item in detailData.tags">
                #{{ item.name }}
              </div>
            </div>
            <div
                class="colors-wrapper wow bounceInUp"
                v-if="detailData.exhibitionInfo.palette && detailData.exhibitionInfo.palette != '' ">
              <div
                  class="color"
                  v-for="item in detailData.exhibitionInfo.palette.split('-')"
                  :style="{'--color': item}"
              >
              </div>
            </div>
          </div>
        </div>
        <div class="detail-right wow bounceInRight">
          <div class="right-wrapper">
            <div class="item" v-for="item in detailMessage">
              <div class="circle">
                <n-icon
                    :size="24"
                    :component="item.icon as any"
                ></n-icon>
              </div>
              <div class="label">{{ item.label }}</div>
              <div class="text">{{ item.render(detailData.exhibitionInfo) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-wrapper">
        <n-space vertical align="center" size="large">
          <n-tooltip
              trigger="hover"
              placement="left"
          >
            <template #trigger>
              <n-icon
                  :size="34"
                  class="icon"
                  @click="imagesDownload(detailData.exhibitionInfo.cover)"
              >
                <CloudDownload></CloudDownload>
              </n-icon>
            </template>
            下载
          </n-tooltip>
          <n-tooltip
              trigger="hover"
              placement="left"
          >
            <template #trigger>
              <n-icon
                  :size="34"
                  class="icon"
                  @click="$router.push({name: 'Images'})"
              >
                <Power></Power>
              </n-icon>
            </template>
            返回
          </n-tooltip>
        </n-space>
      </div>
    </div>
  </BackGround>
</template>

<style scoped lang="less">
.container-detail {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;

  .submit-wrapper {
    box-sizing: border-box;
    position: fixed;
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

.image-detail-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  transform-style: preserve-3d;
  overflow-y: auto;

  .detail-left {
    box-sizing: border-box;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    perspective: 900px;


    .img-container {
      box-sizing: border-box;
      width: 100%;
      border: 5px solid #b7bfd7;
      border-radius: 5px;

      .img-content {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;

        .loading-text {
          color: #b83b5e;
          font-size: 16px;
          font-weight: bolder;
        }

        .img {
          width: 100%;
          object-fit: cover;

          .loading {
            background-color: whitesmoke;
            box-sizing: border-box;
            width: 100%;
            height: 450px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .bottom-content {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .tags-wrapper {
        display: flex;
        margin-top: 15px;

        .tag {
          padding: 0 5px;
          border: 1px solid whitesmoke;
          color: whitesmoke;
          margin: 0 5px;
        }
      }

      .colors-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;

        .color {
          box-sizing: border-box;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background-color: var(--color);
        }
      }
    }
  }

  .detail-right {
    box-sizing: border-box;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 50px;

    .right-wrapper {
      .item {
        box-sizing: border-box;
        min-width: 200px;
        min-height: 50px;
        background-color: rgba(232, 74, 95, 0.5);
        backdrop-filter: saturate(100%) blur(45px);
        padding: 5px 15px;
        margin: 10px 0;
        border-radius: 4px;
        position: relative;

        .circle {
          box-sizing: border-box;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(232, 74, 95, 0.5);
          backdrop-filter: saturate(100%) blur(45px);
          border: 1px solid rgba(232, 74, 95, 0.5);
          position: absolute;
          left: -60px;
          top: 0;
          border-radius: 50%;
        }

        .label {
          font-size: 13px;
          color: #ffe2e2;
          font-weight: bold;
        }

        .text {
          font-size: 12px;
          color: whitesmoke;
          font-weight: bolder;
        }

        color: whitesmoke;
      }
    }
  }

}
</style>

<style>
#image-detail-wrapper .n-image img {
  width: 100%;
  height: 100%;
}
</style>