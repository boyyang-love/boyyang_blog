<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Wow from 'wow.js'

// import { init } from './hooks/three'
import PrintText from '@/components/PrintText/index.vue'
import ImgCard from './components/imgCard.vue'

// hooks
import {useImagesData, useImagesMethods} from './hooks/useImages'

const {imagesData, SortOptions} = useImagesData()
const {getList, pageChange, pageSizeChange, del, like, star, setBackground} = useImagesMethods()


const wrapper = ref<Element | null>(null)

onMounted(() => {
  const wow = new Wow({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 100, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function () {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: '#images-container', // optional scroll container selector, otherwise use window
  })

  wow.init()

  getList()
})
</script>

<template>
  <div
      id="images-container"
      ref="wrapper"
      class="images-wrapper container m-auto"
  >
    <div class="top-banner">
      <PrintText title="壁纸"></PrintText>
    </div>

    <div class="images-content wow wow fadeInUpBig" data-wow-delay="1s">
      <div class="images-wrapper">
        <ImgCard
            v-for="(item, i) in imagesData.list"
            :key="item.uid"
            :class="[
                    'wow',
                    i % 2 == 0 ?
                    'fadeInDownBig' :
                    i % 3 == 0 ?
                    'fadeInRightBig' :
                    'fadeInLeftBig'
                ]"
            :name="item.title"
            :url="item.cover"
            :path="item.path"
            :tags="item.tags"
            :id="item.uid"
            :is-like="imagesData.likes.includes(item.uid)"
            :is-star="imagesData.star.includes(item.uid)"
            :time="item.created"
            :info="item.user_info"
            :star="item.thumbs_up"
            :size="item.wh"
            @like="like"
            @star="star"
            @del="del"
            @set-background="setBackground"
        ></ImgCard>
      </div>
    </div>
    <div class="pagination wow bounceInUp" data-wow-delay="0.5s">
      <n-space>
        <n-pagination
            v-model:item-count="imagesData.count"
            v-model:page="imagesData.page"
            v-model:page-size="imagesData.limit"
            v-model:page-sizes="imagesData.pageSizes"
            @update:page-size="pageSizeChange"
            @update:page="pageChange"
            :page-slot="5"
            show-size-picker
        />

        <n-select
            size="small"
            v-model:value="imagesData.sort"
            :options="SortOptions"
            :consistent-menu-width="false"
        />
      </n-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
.images-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;

  &:hover {
    will-change: scroll-position;
  }

  .top-banner {
    width: 100%;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .images-content {
    padding: 50px 70px;

    .images-wrapper {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: 15px;
      padding: 25px;
      border-radius: 10px;
      background: linear-gradient(145deg, #cfd6dc, #f6ffff);
      overflow: hidden;
    }
  }

  .pagination {
    //width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
    margin: 20px 70px 170px;
    padding: 10px 0;
    border-radius: 5px;
  }
}


@media screen and (max-width: 1200px) {
  .images-wrapper {
    .images-content {
      padding: 25px 10px;

      .images-wrapper {
        grid-template-columns: 1fr;
        grid-gap: 10px;
        padding: 10px;

      }
    }

    .pagination {
      background: none;
      padding: 0 0 20px;
      margin-bottom: 60px;
    }
  }

}

</style>
