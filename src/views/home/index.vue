<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:29:18
 * @LastEditTime: 2022-07-01 14:01:55
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { nextTick } from 'vue'
    import Background from '@/components/Background/index.vue'
    import BottomMenu from './components/bottomMenu.vue'
    import { useBanner } from './hooks/useBanner'
    // 背景图片
    import bg from '@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg'
    // hooks
    const { bannerData, download, getBannerList } = useBanner()
    // 加载图片列表
    getBannerList()
    // 渲染背景
    nextTick(() => {
        window.VANTA.NET({
            el: '#NET',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            points: 15.0,
            maxDistance: 24.0,
            spacing: 16.0,
        })
    })
</script>

<template>
    <!-- <div id="RINGS" class="w-full banner">
        <p class="banner-text">第一行没有你，第二行没有你，第三行没有也罢。</p>
    </div> -->
    <background width="100vw" height="200vh" id="NET">
        <div class="w-full h-full flex items-center flex-col overflow-y-auto">
            <!-- 首屏 -->
            <div class="container h-1/2"></div>
            <!-- 底部图片墙 -->
            <div class="container h-1/2 flex justify-center items-center">
                <div
                    class="h-4/5 mx-5 bg-black bg-opacity-10 rounded-md ring-8 ring-yellow-500 ring-opacity-50 shadow-lg"
                >
                    <n-carousel
                        :show-dots="true"
                        show-arrow
                        dot-placement="right"
                        direction="vertical"
                        autoplay
                    >
                        <div v-for="item in bannerData.list" :key="item.id" class="h-full relative">
                            <img
                                :src="item.url"
                                class="carousel-img"
                                @click="download(item.url, item.name)"
                            />
                            <div class="absolute bottom-2 left-2">
                                <n-space>
                                    <n-tag
                                        strong
                                        v-for="tag in item.tags"
                                        :key="tag.id"
                                        :type="
                                            [
                                                'default',
                                                'primary',
                                                'info',
                                                'success',
                                                'warning',
                                                'error',
                                            ][Math.floor(Math.random() * 6)]
                                        "
                                    >
                                        {{ tag }}
                                    </n-tag>
                                </n-space>
                            </div>
                        </div>
                    </n-carousel>
                </div>
            </div>
        </div>
        <div
            class="bottom-menu w-full bg-black bg-opacity-30 fixed bottom-0 flex justify-center py-2"
        >
            <bottom-menu></bottom-menu>
        </div>
    </background>
</template>

<style scoped lang="less">
    .banner {
        height: 100vh;
        // margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .banner-text {
            position: absolute;
            bottom: 15px;
            right: 0;
            font-size: 19px;
            font-weight: bolder;
            color: whitesmoke;
        }
    }
    .container {
        overflow-y: auto;
    }

    .carousel-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
