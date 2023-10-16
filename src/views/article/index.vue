<script setup lang="ts">
import {onMounted} from 'vue'
import PrintText from '@/components/PrintText/index.vue'
import CardWrapper from './components/cardWrapper/index.vue'
import Card from './components/card/index.vue'
import UserCard from './components/userCard/index.vue'
import HotCard from './components/hotCard/index.vue'
import TagCard from './components/tagCard/index.vue'
import {useUserStore} from '@/store/modules/user'
import {useArticle} from './hooks'
import {Search} from '@vicons/ionicons5'
import Wow from 'wow.js'

const userStore = useUserStore()
const {
  articleData,
  hotArticleData,
  pageSizes,
  tabs,
  tabChange,
  tabActice,
  getArticleList,
  getHotArticleList,
  toDetail,
  createTag,
  getTagInfo,
  delArticleClick,
  pageChange,
  pageSizeChange,
} = useArticle()
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
    scrollContainer: '#article-wrapper', // optional scroll container selector, otherwise use window
  })

  wow.init()

  getArticleList()
  getTagInfo()
  getHotArticleList()
})
</script>

<template>
  <div class="article-wrapper container m-auto" id="article-wrapper">
    <div class="top-content">
      <PrintText
          title="文章"
          :subtitle="userStore.info.motto"
      ></PrintText>
    </div>


    <div class="article-content">
      <div class="article-content-left">
        <div class="tabs-container">
          <div
              :class="['tab', item.id === tabActice ? 'active' : '']"
              v-for="item in tabs"
              @click="tabChange(item.id)"
          >{{ item.name }}
          </div>
        </div>
        <n-empty
            v-if="articleData.list.length === 0"
            description="暂无数据"
        >
        </n-empty>
        <div
            class="card"
            v-else
            v-for="item in articleData.list"
        >
          <Card
              class="wow bounceInLeft"
              v-bind="{
                uid: item.uid,
                title: item.title,
                subTitle: item.sub_title,
                cover: item.cover,
                avatar: item.user_info.avatar_url,
                username: item.user_info.username,
                time: item.created,
                userId: item.user_info.uid,
                badges: [item.thumbs_up || 0, item.comment || 0, 0]
              }"
              @cardClick="toDetail"
              @delClick="delArticleClick(item.uid, item.images, item.cover)"
          ></Card>
        </div>
        <div class="pagination wow bounceInUp">
          <n-pagination
              v-model:item-count="articleData.count"
              v-model:page="articleData.page"
              v-model:page-size="articleData.limit"
              v-model:page-sizes="pageSizes"
              @update:page-size="pageSizeChange"
              @update:page="pageChange"
              :page-slot="5"
              show-size-picker
          >
            <template #prefix="{ itemCount }">
              共 {{ itemCount }} 项
            </template>
          </n-pagination>
        </div>

      </div>
      <div class="article-content-right">
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
            >
            </n-input>
          </div>
          <div class="search-btn">
            <n-icon
                clsss="search-icon"
                color="rgba(255,255,255,1)"
                :size="20"
            >
              <Search></Search>
            </n-icon>
          </div>
        </div>

        <div class="user-info card wow bounceInRight">
          <UserCard
              v-bind="{
                avatar: articleData.userInfo.avatar_url,
                username: articleData.userInfo.username,
                follow: articleData.userCardInfo.follow,
                fans: articleData.userCardInfo.fans,
                thumb: articleData.userCardInfo.thumb,
                article: articleData.userCardInfo.article,
                comment: articleData.userCardInfo.comment
              }"
          ></UserCard>
        </div>
        <div class="hot-articles wow bounceInRight">
          <CardWrapper title="热门文章">
            <template #content>
              <n-empty description="暂时无数据" v-if="hotArticleData.list.length === 0"></n-empty>
              <HotCard
                  v-else
                  v-for="(item, i) in hotArticleData.list"
                  v-bind="{
                    uid: item.uid,
                    no: i + 1,
                    title: item.title,
                    subtitle: item.sub_title,
                    cover: item.cover,
                  }"
                  @toDetail="toDetail"
              ></HotCard>
            </template>
          </CardWrapper>
        </div>

        <div class="tags wow bounceInRight">
          <CardWrapper
              title="标签"
              :show-suffix="true"
              @iconClick="createTag"
          >
            <template #content>
              <TagCard
                  :tags="articleData.tags.map(t => t.name)"
              ></TagCard>
            </template>
          </CardWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.article-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 0 50px;
  overflow-y: auto;

  .top-content {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .article-content {
    margin: 0 150px;
    display: flex;
    justify-content: center;
    gap: 20px;

    .article-content-left {
      box-sizing: border-box;
      width: 740px;
      display: flex;
      flex-direction: column;
      grid-gap: 30px;

      .tabs-container {
        box-sizing: border-box;
        width: 100%;
        height: 48px;
        background-color: rgba(245, 245, 245, 0.4);
        backdrop-filter: saturate(120%) blur(105px);
        border-radius: 5px;
        display: flex;
        align-items: center;

        .tab {
          font-size: 16px;
          font-weight: bold;
          color: whitesmoke;
          margin: 0 10px;
          padding: 10px 0;
          cursor: pointer;
          transition: all 0.4s linear;
        }

        .active {
          color: #fc5185;
        }
      }

      .card {
        width: 100%;
        height: 200px;
      }

      .pagination {
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(245, 245, 245, 0.4);
        backdrop-filter: saturate(120%) blur(5px);
        border-radius: 5px;
      }
    }

    .article-content-right {
      box-sizing: border-box;
      width: 320px;

      .search-wrapper {
        box-sizing: border-box;
        height: 45px;
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

      .card {
        background-color: rgba(245, 245, 245, 0.4);
        backdrop-filter: saturate(120%) blur(50px);
      }

      .user-info {
        box-sizing: border-box;
        width: 100%;
        //height: 250px;
        margin-top: 50px;
        border-radius: 5px;
      }

      .hot-articles {
        box-sizing: border-box;
        width: 100%;
        //height: 450px;
        margin-top: 20px;
        border-radius: 5px;
        overflow-y: auto;
        position: relative;
      }

      .tags {
        box-sizing: border-box;
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }

  }
}
</style>