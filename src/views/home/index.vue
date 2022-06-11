<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:29:18
 * @LastEditTime: 2022-06-11 19:57:10
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import Background from '@/components/Background/index.vue'
    import BottomMenu from './components/bottomMenu.vue'
    import { useBanner } from './hooks/useBanner'
    // 背景图片
    import bg from '@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg'

    // hooks
    const { bannerData, download, getBannerList } = useBanner()
    // 加载图片列表
    getBannerList()
</script>

<template>
    <background width="100vw" height="100vh" :url="bg">
        <div class="w-full h-full flex justify-center items-center">
            <div
                class="container h-4/5 bg-black bg-opacity-10 rounded-md ring-8 ring-yellow-500 ring-opacity-50 shadow-lg"
            >
                <n-carousel
                    :show-dots="true"
                    show-arrow
                    dot-placement="right"
                    direction="vertical"
                    autoplay
                >
                    <div v-for="item in bannerData.list" :key="item.ID" class="h-full relative">
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
                                    :key="tag.ID"
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
        <div
            class="bottom-menu w-full bg-black bg-opacity-30 absolute bottom-0 flex justify-center py-2"
        >
            <bottom-menu></bottom-menu>
        </div>
    </background>
</template>

<style scoped lang="less">
    .container {
        overflow-y: auto;
    }

    .carousel-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
