<script lang="ts" setup>
import {onMounted} from 'vue'
import Wow from 'wow.js'
import BlogCard from '../blogCard/index.vue'
import PrintText from '@/components/PrintText/index.vue'
import User from '../user/index.vue'
import Tile from '../tile/index.vue'
import Notice from '../notice/index.vue'
import Carousel from '../carousel/index.vue'
import PublishChart from '../publishChart/index.vue'
import {ArrowDown} from '@vicons/ionicons5'
import MenuBeehive from '../menuBeehive/index.vue'
import Calendar from '../calendar/index.vue'
// hooks
import {useHome} from '../../hooks/useHome'
import {useExhibition} from '../../hooks/useExhibition'
import {useUserStore} from '@/store/modules/user'

const {
  homeData,
  paginationOpt,
  getBlogList,
  getDashboard,
  cardClick,
  pageChange,
  pageSizeChange,
  del,
  getNotice,
} = useHome()
const {exhibitionData, getExhibitionList} = useExhibition()
const userStore = useUserStore()

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
    scrollContainer: '#home-container', // optional scroll container selector, otherwise use window
  })

  wow.init()

  getBlogList()
  getExhibitionList()
  getDashboard()
  getNotice()
  userStore.getInfoDetail()
})
</script>

<template>
  <div id="home-container" class="home container m-auto">
    <div class="top-banner">
      <PrintText
          :title="userStore.info.username"
          :subtitle="userStore.info.motto"
      ></PrintText>

      <div class="home-bottom-arrow">
        <n-icon
            size="34"
            class="icon"
        >
          <ArrowDown></ArrowDown>
        </n-icon>
      </div>

      <div class="beehive-menu">
        <!--<MenuBeehive></MenuBeehive>-->
      </div>
    </div>
    <div class="home-content">
      <div class="content">
        <div class="publish-charts wow bounceInDow">
          <PublishChart
              :categories="homeData.chart.categories"
              :series-data-blog="homeData.chart.blogChartData"
              :series-data-exhibition="homeData.chart.exhibitionChartData"
          ></PublishChart>
        </div>
        <div class="tile wow bounceInUp">
          <div class="tile-left wow bounceInLeft">
            <Tile></Tile>
          </div>
          <div class="tile-right wow bounceInRight">
            <Carousel :list="exhibitionData.exhibitionList"></Carousel>
          </div>
        </div>
        <div class="blog">
          <n-space size="large" vertical>
            <div class="title wow slideInDown">我的博客</div>
            <n-empty
                description="是空的？"
                :show-icon="false"
                v-if="homeData.blog.list.length === 0"
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
            <BlogCard
                v-else
                v-for="(item, i) in homeData.blog.list"
                :key="item.uid"
                :class="['wow', (i + 1) % 2 == 0 ? 'bounceInLeft' : 'bounceInRight']"
                :options="{
                  id: item.uid,
                  title: item.title,
                  subtitle: item.sub_title,
                  author: item.user_info.username,
                  cover: item.cover,
                  cover_path: item.cover_path,
                  avatar_url: item.user_info.avatar_url,
                  isReverse: (i + 1) % 2 === 0,
                  time: item.created,
                }"
                @cardClick="cardClick(item.uid)"
                @delClick="del"
            ></BlogCard>
            <div class="pagination wow bounceInUp">
              <n-pagination
                  v-model:page="homeData.blog.page"
                  v-model:page-size="homeData.blog.limit"
                  @update:page-size="pageSizeChange"
                  @update:page="pageChange"
                  show-size-picker
                  :page-slot="5"
                  :item-count="homeData.blog.count"
                  :page-sizes="paginationOpt.pageSizes"
              />
            </div>
          </n-space>
        </div>
      </div>
      <div class="right">
        <div class="user wow slideInDown">
          <User></User>
        </div>
        <div class="notice wow pulse">
          <Notice :content="homeData.notice.content"></Notice>
        </div>
        <div class="calendar wow pulse">
          <Calendar></Calendar>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="@/assets/logo-ga.png" alt="" style="width: 20px;margin-right: 5px;">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?recordcode=51010602002116" target="_blank">
        川公网安备51010602002116号
      </a>

      <a href="https://beian.miit.gov.cn/" target="_blank" style="margin-left: 10px">
        蜀ICP备2024050890号-1
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
}

.home {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &:hover {
    will-change: scroll-position;
  }

  .top-banner {
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    position: relative;

    .home-bottom-arrow {
      position: absolute;
      bottom: 15px;

      .icon {
        animation: downUp .5s linear infinite;
      }

      @keyframes downUp {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(20px);
        }

        100% {
          transform: translateY(0);
        }
      }
    }

    .beehive-menu {
      position: absolute;
      bottom: 50px;
    }
  }

  .home-content {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 20px 0;

    .right {
      box-sizing: border-box;
      width: 300px;
      margin: 0 15px;

      .user {
        box-sizing: border-box;
        height: 320px;
        margin-bottom: 10px;
      }

      .tags {
        box-sizing: border-box;
        height: 280px;
        margin-bottom: 10px;
        border-radius: 3px;
        // box-shadow: 5px 6px 3px rgba(61, 59, 79, 0.5);
        box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);
      }

      .calendar {
        box-sizing: border-box;
      }

      .notice {
        border-radius: 3px;
        margin-bottom: 10px;
      }
    }

    .content {
      box-sizing: border-box;
      width: calc(100% - 600px);
      // background-color: whitesmoke;
      // box-shadow: 5px 6px 3px rgba(61, 59, 79, 0.5);
      border-radius: 3px;
      padding: 0 10px;

      .tile {
        box-sizing: border-box;
        height: 250px;
        margin-bottom: 10px;
        background: linear-gradient(145deg, #cfd6dc, #f6ffff);

        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);
        border-radius: 10px;

        .tile-left {
          flex: 1;
          height: 100%;
        }

        .tile-right {
          flex: 2;
          height: 100%;
        }
      }

      .publish-charts {
        //background: linear-gradient(145deg, #cfd6dc, #f6ffff);
        height: 300px;
        margin-bottom: 10px;
        box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: saturate(120%) blur(10px);
        border-radius: 10px;
      }

      .blog {
        .pagination {
          box-sizing: border-box;
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 25px 0;
          background: linear-gradient(145deg, #cfd6dc, #f6ffff);
          padding: 10px 0;
          border-radius: 5px;
        }
      }
    }
  }

  .footer {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: #b7bfd7;
    display: flex;
    justify-content: center;
    align-items: center;

    a:hover {
      color: whitesmoke;
    }
  }
}

@media screen and (max-width: 1200px) {
  .home {

    .home-content {

      .right {
        display: none;
      }

      .content {
        width: 100%;

        .tile {
          .tile-left {
            display: none;
          }
        }

        .blog {
          .pagination {
            margin: 10px 0;
            background: none;
          }
        }
      }
    }
  }
}
</style>
