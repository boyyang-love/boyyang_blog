<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from 'vue'
import Wow from 'wow.js'
import {Search, Add} from '@vicons/ionicons5'
import PrintText from '@/components/PrintText/index.vue'
import ImgCard from './components/imgCard.vue'
import {useUserStore} from '@/store/modules/user'

// hooks
import {useImagesData, useImagesMethods} from './hooks/useImages'

const {imagesData, SortOptions} = useImagesData()
const {
  getList,
  pageChange,
  pageSizeChange,
  del,
  like,
  star,
  setBackground,
  updateDownloadStatus,
  toDetail,
  tagClick,
  addTags,
} = useImagesMethods()
const userStore = useUserStore()


const wrapper = ref<Element | null>(null)

const rightClick = (e: Event) => {
  e.preventDefault()
}

onMounted(() => {
  const wow = new Wow({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 10, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function () {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: '#images-container', // optional scroll container selector, otherwise use window
  })

  document.addEventListener('contextmenu', rightClick)

  wow.init()

  getList()
})

onUnmounted(() => {
  document.removeEventListener('contextmenu', rightClick, false)
})
</script>

<template>
  <div
      id="images-container"
      ref="wrapper"
      class="images-wrapper container m-auto"
  >
    <div class="top-banner">
      <PrintText
          title="壁纸"
          :subtitle="userStore.info.motto"
      ></PrintText>

      <div class="search-wrapper">
        <div class="left-input-container">
          <n-input
              size="large"
              placeholder="请输入关键字"
              :bordered="false"
              :style="{
                background: 'transparent',
                width: '100%'
              }"
              :clearable="true"
              v-model:value="imagesData.keywords"
              @keyup.enter="imagesData.page = 1;getList()"
          >
          </n-input>
        </div>
        <div class="search-btn">
          <n-icon
              clsss="search-icon"
              color="rgba(255,255,255,1)"
              :size="20"
              @click="imagesData.page = 1;getList()"
          >
            <Search></Search>
          </n-icon>
        </div>
      </div>

      <div class="tags">
        <div
            :class="['tag', item.uid === imagesData.selectedTags ? 'active' : '']"
            v-for="item in imagesData.tags"
            @click="tagClick(item.uid)"
        >
          #{{ item.name }}
        </div>
        <div class="add-tag" @click="addTags">
          <n-icon :size="18">
            <Add></Add>
          </n-icon>
        </div>
      </div>
    </div>

    <div class="images-content wow fadeInUpBig" data-wow-delay="1s">
      <n-empty
          description="是空的？"
          :show-icon="false"
          v-if="imagesData.list.length === 0"
          style="
              background-color: rgba(0, 0, 0, 0.5);
              margin: 10px 0;
              padding: 20px 0;
              border-radius: 5px;
        "
      >
        <template #extra>
          <div class="empty-wrapper">
            <img src="@/assets/empty.png" alt="呆萌" style="height: 300px"/>
          </div>
        </template>
      </n-empty>
      <div class="images-wrapper" v-else>
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
            v-bind="{
                name: item.title,
                url: item.cover,
                path : item.path,
                tags: item.tags,
                id: item.uid,
                isLike: imagesData.likes.includes(item.uid),
                isStar: imagesData.star.includes(item.uid),
                time: item.created,
                info: item.user_info,
                star: item.thumbs_up,
                size: item.px,
                colors: item.palette.split('-'),
                options: imagesData.tags
            }"
            @like="like"
            @star="star"
            @del="del"
            @set-background="setBackground"
            @download-sucess="updateDownloadStatus"
            @to-detail="toDetail"
        ></ImgCard>
      </div>
    </div>
    <div class="pagination wow bounceInUp">
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
        >
          <template #prefix="{ itemCount }">
            共 {{ itemCount }} 项
          </template>
        </n-pagination>

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
    flex-direction: column;
    position: relative;


    .search-wrapper {
      box-sizing: border-box;
      width: 50%;
      height: 45px;

      position: absolute;
      bottom: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;

      .search-icon {
        cursor: pointer;
      }

      .left-input-container {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        background-color: rgba(245, 245, 245, 0.5);
        backdrop-filter: saturate(100%) blur(30px);
        margin: 0 10px 0 0;
        border-radius: 3px;
      }

      .search-btn {
        background-color: rgba(245, 245, 245, 0.5);
        backdrop-filter: saturate(100%) blur(30px);
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 3px;
      }
    }

    .tags {
      display: flex;
      position: absolute;
      bottom: 0;

      .tag {
        background-color: rgba(17, 17, 17, 0.4);
        backdrop-filter: contrast(100%) saturate(100%) blur(30px);
        color: #f1f5f9;
        padding: 0 5px;
        border: 1px solid #23d69b;
        margin: 0 5px;
        cursor: pointer;
      }

      .active {
        color: deeppink;
      }

      .add-tag {
        color: whitesmoke;
        border: 1px solid #23d69b;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 4px;
        cursor: pointer;
      }
    }
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
