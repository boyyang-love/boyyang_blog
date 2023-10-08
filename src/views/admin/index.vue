<script lang="ts" setup>
import {BackGround} from '@/components/Background'
import {useAdmin} from './hooks/useAdmin'
import Card from './components/card/index.vue'
import ActionCard from './components/actionCard/index.vue'
import ImageCard from './components/imageCard/index.vue'
import {computed, nextTick, onMounted} from 'vue'
import Wow from 'wow.js'
import {useUserStore} from '@/store/modules/user'
import {env} from '@/utils/env'
import {useMenu} from './hooks/useMenu'
import {router} from '@/router'
import {useCard} from './hooks/useCard'
import moment from 'moment/moment'

const {adminData, getList, changeStatus, menuIconClick} = useAdmin()
const {menu, active, menuClick} = useMenu()
const {noticeData, cards, actionCards, actionCardClick, noticeSubmit} = useCard()

getList()

onMounted(() => {
  nextTick(() => {
    const wow = new Wow({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 1, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function () {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: '#admin-container', // optional scroll container selector, otherwise use window
    })

    wow.init()
  })
})

const url = computed(() => {
  const userStore = useUserStore()
  return `${env.VITE_APP_IMG_URL}${userStore.info.background_image}`
})

</script>

<template>
  <BackGround
      :url="url"
      type="image"
      class="wow slideInDown"
      :opacity="0.7"
  >
    <div class="admin-container" id="admin-container">
      <div class="top-cards">
        <div class="left-card">
          <div
              class="card-wrapper"
              v-for="item in cards"
          >
            <Card
                :icon="item.icon"
                :num="item.num"
                :text="item.text"
            ></Card>
          </div>
        </div>

        <div class="right-card">
          <div
              class="card-wrapper"
              v-for="item in actionCards"
          >
            <ActionCard
                :icon="item.icon"
                :text="item.text"
                @click="actionCardClick(item)"
            ></ActionCard>
          </div>
        </div>
      </div>
      <div class="empty" v-if="adminData.list.length == 0">
        <n-empty size="large" description="啥也没有?"></n-empty>
      </div>
      <div class="content" id="admin-content" v-else>
        <div
            class="image-card-box wow bounceIn"
            v-for="item in adminData.list"
            :key="item.uid"
        >
          <ImageCard
              :url="item.cover"
              :name="item.title"
              :is-show="item.isShow"
              :is-show-del="item.isShowDel"
              :is-show-approved="active != 2"
              :is-show-rejected="active != 3"
              :image-info="{
                name: item.title,
                username: item.user_info.username,
                date: item.created,
                size: item.size,
                px: item.px,
              }"
              @del-click="(e) => item.isShowDel = e"
              @detail-click="(e) => item.isShow = e"
              @approved="(e) => changeStatus(e, item.uid, '')"
              @rejected="(status, reason) => changeStatus(status, item.uid, reason, item)"
          ></ImageCard>
        </div>
      </div>
      <div class="bottom">
        <div class="page">
          <n-pagination
              v-model:page="adminData.page"
              v-model:page-size="adminData.limit"
              :item-count="adminData.count"
              :page-sizes="
            [
                {label: '9/页', value: 9},
                {label: '12/页', value: 12},
            ]"
              show-size-picker
              @page="(e: number) => adminData.page = e"
              @update:page-size="(e: number) => adminData.limit = e"
          >
            <template #prefix="{ itemCount, startIndex }">
              <span style="color:#fff">共 {{ itemCount }} 张</span>
            </template>
          </n-pagination>
        </div>
      </div>
      <div class="menu-wrapper">
        <n-space>
          <div
              :class="['menu-item', item.id === active ? 'menu-item-active' : '']"
              v-for="item in menu"
              :key="item.id"
              @click="menuIconClick(item.id); menuClick(item.id)"
          >
            <n-tooltip trigger="hover" placement="left">
              <template #trigger>
                <span>
                  <n-icon
                      size="24"
                      class="icon"
                      :color="item.color"
                      :component="item.icon as any"
                  />
                </span>
              </template>
              {{ item.name }}
            </n-tooltip>
          </div>
        </n-space>
      </div>
    </div>

    <n-modal
        v-model:show="noticeData.isShow"
        preset="dialog"
        title="修改公告信息"
        positive-text="发布"
        negative-text="算了"
        @positiveClick="noticeSubmit"
    >
      <div class="modal-content">
        <div class="input-wrapper">
          <n-input
              type="textarea"
              placeholder="请输入公告信息"
              v-model:value="noticeData.content"
              :autosize="{minRows: 5, maxRows: 7}"
          ></n-input>
        </div>
      </div>
    </n-modal>

  </BackGround>
</template>

<style lang="less" scoped>
.admin-container {
  box-sizing: border-box;
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  padding: 20px 70px;
  overflow-y: hidden;

  .top-cards {
    box-sizing: border-box;
    width: 100%;
    height: 105px;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    .left-card,
    .right-card {
      display: flex;
      gap: 0 10px;
    }

  }

  .content {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
    background-color: rgba(249, 247, 247, 0.5);
    backdrop-filter: saturate(120%) blur(20px);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

    display: grid;
    grid-template-columns:  repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 10px;

    .image-card-box {
      box-sizing: border-box;
      width: 100%;
      min-height: 245px;
    }
  }

  .empty {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(249, 247, 247, 0.2);
    backdrop-filter: saturate(120%) blur(2px);
  }

  .bottom {
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    border-radius: 5px;
    background-color: rgba(249, 247, 247, 0.2);
    backdrop-filter: saturate(120%) blur(2px);

    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .menu-item {
      display: flex;
      border: 1px solid whitesmoke;
      //justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 3px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: saturate(120%) blur(10px);

      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon {
        color: whitesmoke;
      }
    }

    .menu-item-active {
      border-color: rgb(35, 214, 155);
    }
  }

}


</style>
