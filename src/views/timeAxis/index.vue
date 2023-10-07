<script lang="ts" setup>
import {onMounted, onUnmounted} from 'vue'
import moment from 'moment/moment'
import wow from 'wow.js'
// hooks
import {useTimeAxisData, useTimeAxisMethods} from './hooks/useTimeAxis'
import {Fitness, CalendarNumber, Image} from '@vicons/ionicons5'
import Wow from 'wow.js'

const {timeAxisData} = useTimeAxisData()
const {getData} = useTimeAxisMethods()

const rightClick = (e: Event) => {
  e.preventDefault()
}

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
    scrollContainer: '#time-axis-wrapper', // optional scroll container selector, otherwise use window
  })

  document.addEventListener('contextmenu', rightClick)

  wow.init()
  getData()
})

onUnmounted(() => {
  document.removeEventListener('contextmenu', rightClick, false)
})
</script>

<template>
  <div id="time-axis-wrapper" class="container m-auto time-axis-wrapper">
    <div class="time-axis-box">
      <n-timeline>
        <n-timeline-item
            v-for="(item, index) in timeAxisData.list"
            :key="item.uid"
            :type="['default', 'success', 'info', 'warning', 'error'][parseInt(Math.random() * 4 as string)]"
        >
          <template #header>
            <div class="header-wrapper">
              <div class="item-title">
                  <span>
                    <n-icon :size="20" class="icon">
                      <Image></Image>
                    </n-icon>
                    {{ item.title }}
                  </span>
              </div>
              <div class="item-content">
                <n-image
                    :src="item.cover"
                    class="img wow bounceIn"
                    lazy
                    object-fit="cover"
                    data-wow-delay="0.5s"
                >
                  <template #placeholder>
                    <div
                        class="loading"
                        :style="{
                            width: item.px.split('X')[0],
                            height: item.px.split('X')[1]
                        }"
                    >
                      <n-icon
                          :component="Fitness as any"
                          class="icon"
                          color="#f00056"
                          size="55"
                      ></n-icon>
                    </div>
                  </template>
                </n-image>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="time">
                <span>
                  <n-icon :size="18" class="icon">
                  <CalendarNumber></CalendarNumber>
                  </n-icon>
                  {{ moment(item.created * 1000).format('YYYY-MM-DD hh:mm:ss') }}
                </span>
              <span>
                  {{ item.user_info.username }}
                </span>
            </div>
          </template>
        </n-timeline-item>
      </n-timeline>
    </div>
  </div>
</template>

<style lang="less">
.time-axis-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 100px;

  .time-axis-box {
    box-sizing: border-box;
    display: flex;

    .header-wrapper {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;

      .item-title {
        box-sizing: border-box;
        color: #fff;
        font-size: 16px;
        font-weight: bolder;
        margin-bottom: 5px;
        display: flex;
        align-items: center;

        span {
          display: flex;
          padding: 10px 15px;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: saturate(180%) blur(10px);
          border-radius: 5px;
          text-align: center;

          .icon {
            margin-right: 10px;
          }
        }
      }

      .item-content {
        box-sizing: border-box;
        display: inline-block;

        img {
          box-sizing: border-box;
          height: 300px;
          width: 570px;
          object-fit: cover;
          border: 4px solid rgba(17, 17, 17, 1);
          border-radius: 5px;
        }

        .loading {
          box-sizing: border-box;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: saturate(100%) blur(5px);
          height: 300px;
          width: 570px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
        }
      }
    }

    .time {
      display: flex;
      font-weight: bolder;
      color: #b7bfd7;
      font-size: 13px;
      text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);

      span {
        display: flex;
        align-items: center;
        margin: 0 5px 0 0;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: saturate(100%) blur(3px);
        border-radius: 5px;
        text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);

        .icon {
          margin-right: 10px;
        }
      }
    }
  }

}
</style>