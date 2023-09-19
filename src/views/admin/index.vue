<script lang="ts" setup>
import {BackGround} from '@/components/Background'
import {useAdmin} from './hooks/useAdmin'
import Card from './components/card/index.vue'
import ImageCard from './components/imageCard/index.vue'
import {onMounted} from 'vue'
import Wow from 'wow.js'

const {adminData, getList, changeStatus} = useAdmin()

getList()

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
    scrollContainer: '#admin-content', // optional scroll container selector, otherwise use window
  })

  wow.init()
})

</script>

<template>
  <BackGround type="color">
    <div class="container m-auto" id="admin-container">
      <div class="top-cards">
        <div class="card">
          <Card></Card>
        </div>
        <div class="card">
          <Card></Card>
        </div>
        <div class="card">
          <Card></Card>
        </div>
        <div class="card">
          <Card></Card>
        </div>
      </div>

      <div class="content" id="admin-content">
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
              :image-info="{
                name: item.title,
                username: item.user_info.username,
                date: item.created,
                size: item.size,
                resolution: item.wh,
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
                {label: '24/页', value: 24}
            ]"
              show-size-picker
              @page="(e: number) => adminData.page = e"
              @update:page-size="(e: number) => adminData.limit = e"
          >
            <template #prefix="{ itemCount, startIndex }">
              共 {{ itemCount }} 张
            </template>
          </n-pagination>
        </div>
      </div>
    </div>
  </BackGround>
</template>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .top-cards {
    box-sizing: border-box;
    width: 100%;
    height: 105px;
    padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;

    .card {
      box-sizing: border-box;
      height: 100%;
    }
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
    background-color: #f9f7f7;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

    display: grid;
    grid-template-columns:  repeat(3, 1fr);
    grid-gap: 10px;

    .image-card-box {
      box-sizing: border-box;
      width: 100%;
      //height: 100%;
      min-height: 245px;
    }
  }

  .bottom {
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    border-radius: 5px;
    background-color: #f9f7f7;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

</style>
