<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:29:18
 * @LastEditTime: 2022-06-05 15:17:36
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
    const { bannerData, download } = useBanner()
</script>

<template>
    <background width="100vw" height="100vh" :url="bg">
        <div class="w-full h-full flex justify-center items-center">
            <div
                class="container h-4/5 bg-black bg-opacity-50 rounded-md ring-8 ring-yellow-500 ring-opacity-50 shadow-lg"
            >
                <n-carousel show-arrow :show-dots="false">
                    <div v-for="item in bannerData.list" :key="item.ID" class="h-full relative">
                        <img
                            :src="item.url"
                            class="carousel-img"
                            @click="download(item.url, item.name)"
                        />
                    </div>
                </n-carousel>
            </div>
        </div>
        <div class="bottom-menu w-full bg-white absolute bottom-0 flex justify-center py-2">
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
