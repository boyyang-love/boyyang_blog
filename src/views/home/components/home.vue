<script lang="ts" setup>
    import { onMounted } from 'vue'
    import Wow from 'wow.js'
    import BlogCard from './blogCard.vue'
    import { BackGround } from '@/components/Background'
    import User from './user.vue'
    import Tags from './tags.vue'
    import HotBlog from './hotBlog.vue'
    import PublishChart from './publishChart.vue'
    import banner from '@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg'

    onMounted(() => {
        const wow = new Wow({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            callback: function (box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null, // optional scroll container selector, otherwise use window
        })

        wow.init()
    })
</script>

<template>
    <BackGround width="100vw" height="100vh" :url="banner" class="banner wow pulse"></BackGround>

    <div class="home container m-auto">
        <div class="content">
            <!-- <div class="title wow slideInDown">热门博客</div> -->
            <div class="hot-blog wow bounceInUp">
                <HotBlog v-for="item in 6"></HotBlog>
            </div>
            <div class="publish-charts wow bounceInUp">
                <PublishChart></PublishChart>
            </div>
            <div class="blog">
                <n-space vertical size="large">
                    <div class="title wow slideInDown">我的博客</div>
                    <BlogCard
                        v-for="(item, i) in 10"
                        :key="item"
                        class="wow bounceInLeft"
                        :is-reverse="(i + 1) % 2 == 0"
                    ></BlogCard>
                    <div class="pagination wow bounceInUp">
                        <n-pagination
                            :page-count="100"
                            show-size-picker
                            :page-sizes="[10, 20, 30, 40]"
                        />
                    </div>
                </n-space>
            </div>
        </div>
        <div class="right">
            <div class="user wow slideInDown">
                <User></User>
            </div>
            <div class="tags wow slideInDown">
                <Tags></Tags>
            </div>
            <div class="notice wow pulse">公告</div>

            <div class="calendar wow slideInDown">
                <!-- <n-calendar #="{ year, month, date }">{{ year }}{{ month }}{{ date }}</n-calendar> -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .banner {
        box-shadow: 0 10px 5px rgba(61, 59, 79, 0.5);
    }
    .title {
        font-family: inherit;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
    }
    .home {
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
                background-color: #393e46;
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 3px;
                box-shadow: 5px 6px 3px rgba(61, 59, 79, 0.5);
            }
            .tags {
                box-sizing: border-box;
                height: 280px;
                margin-bottom: 10px;
                border-radius: 3px;
                box-shadow: 5px 6px 3px rgba(61, 59, 79, 0.5);
            }
            .calendar {
                box-sizing: border-box;
                // height: 250px;
                // background-color: #fff;
            }

            .notice {
                background-color: #393e46;
                border-radius: 3px;
                box-shadow: 5px 6px 3px rgba(61, 59, 79, 0.5);
                min-height: 100px;
            }
        }
        .content {
            box-sizing: border-box;
            width: calc(100% - 600px);
            // background-color: rgba(61, 59, 79, 0.6);
            // box-shadow: 5px 6px 3px rgba(61, 59, 79, 0.5);
            // border-radius: 3px;

            padding: 10px;
            .hot-blog {
                height: 450px;
                margin-bottom: 10px;
                // background-color: #eeeeee;
                // box-shadow: 5px 6px 3px rgba(61, 59, 79, 0.5);
            }

            .publish-charts {
                height: 300px;
                margin-bottom: 10px;
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
</style>
