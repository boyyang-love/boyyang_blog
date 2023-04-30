<script lang="ts" setup>
import {onMounted} from 'vue'
import Wow from 'wow.js'
import BlogCard from './blogCard.vue'
import {PrintText} from '@/components/PrintText/index.ts'
import User from './user.vue'
import Tags from './tags.vue'
import Tile from './tile.vue'
import PublishChart from './publishChart.vue'
import Notice from './notice.vue'
import Carousel from './carousel.vue'

// hooks
import {useHome} from '../hooks/useHome'
import {useExhibition} from '../hooks/useExhibition'

const {
    homeData,
    getBlogList,
    getDashboard,
    cardClick,
    pageChange,
    pageSizeChange,
    paginationOpt,
} = useHome()
const {exhibitionData, getExhibitionList} = useExhibition()

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
})
</script>

<template>
    <div class="home container m-auto" id="home-container">
        <div class="top-banner">
            <PrintText></PrintText>
        </div>
        <div class="home-content">
            <div class="content">
                <!-- <div class="title wow slideInDown">热门博客</div> -->
                <div class="publish-charts wow bounceInDown">
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
                    <n-space vertical size="large">
                        <div class="title wow slideInDown">我的博客</div>
                        <BlogCard
                                v-for="(item, i) in homeData.blog.list"
                                :key="item.id"
                                :class="['wow', (i + 1) % 2 == 0 ? 'bounceInLeft' : 'bounceInRight']"
                                :is-reverse="(i + 1) % 2 == 0"
                                :title="item.title"
                                :subtitle="item.sub_title"
                                :cover="item.cover"
                                :author="item.user_info.username"
                                @cardClick="cardClick(item.id)"
                        ></BlogCard>
                        <div class="pagination wow bounceInUp">
                            <n-pagination
                                    v-model:page="homeData.blog.page"
                                    v-model:page-size="homeData.blog.limit"
                                    :item-count="homeData.blog.count"
                                    show-size-picker
                                    :page-sizes="paginationOpt.pageSizes"
                                    @update:page-size="pageSizeChange"
                                    @update:page="pageChange"
                            />
                        </div>
                    </n-space>
                </div>
            </div>
            <div class="right">
                <div class="user wow slideInDown">
                    <User :user-info="homeData.userInfo"></User>
                </div>
                <div class="tags wow slideInDown">
                    <Tags></Tags>
                </div>
                <div class="notice wow pulse">
                    <Notice></Notice>
                </div>

                <div class="calendar wow slideInDown">
                    <!-- <n-calendar #="{ year, month, date }">{{ year }}{{ month }}{{ date }}</n-calendar> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
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
            // background-color: rgba(61, 59, 79, 0.5);
            // padding: 10px;
            .user {
                box-sizing: border-box;
                height: 320px;
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 3px;
                background-color: rgba(57, 62, 70, 0.9);
                box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);
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
                // height: 250px;
                // background-color: #fff;
            }

            .notice {
                border-radius: 3px;
                min-height: 100px;
                background-color: rgba(57, 62, 70, 0.9);
                // box-shadow: 5px 6px 0px rgba(61, 59, 79, 0.9);
                box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);
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
                background-color: rgba(57, 62, 70, 0.9);
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);

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
                background-color: rgba(57, 62, 70, 0.9);
                // box-shadow: 5px 6px 0px rgba(61, 59, 79, 0.9);
                height: 300px;
                margin-bottom: 10px;
                box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);
            }

            .blog {
                .pagination {
                    box-sizing: border-box;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin: 25px 0;
                }
            }
        }
    }
}
</style>
