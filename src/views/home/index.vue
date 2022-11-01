<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:29:18
 * @LastEditTime: 2022-09-15 18:11:22
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { nextTick } from 'vue'
    import { MenuOutlined, CaretDownFilled } from '@vicons/antd'
    // 组件
    import Background from '@/components/Background/index.vue'
    import BottomMenu from './components/bottomMenu.vue'
    import imagesList from './components/imagesList.vue'
    // hooks
    import { useBanner } from './hooks/useBanner'
    import { useHooks } from '@/hooks'
    import { useMenu } from './hooks/useMenu'
    // hooks
    const { scrollToBottom } = useHooks()
    const { bannerData, download, getBannerList } = useBanner()
    const { menuOptions, menuClick } = useMenu()
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
    <background width="100vw" height="200vh" id="NET">
        <div class="w-full h-full flex items-center flex-col overflow-y-auto">
            <!-- 首屏 -->
            <div class="w-full h-1/2 relative">
                <div class="top-menu flex items-center px-5 py-2 fixed top-0">
                    <n-dropdown
                        trigger="click"
                        :options="menuOptions"
                        :show-arrow="true"
                        @select="menuClick"
                    >
                        <n-icon
                            :component="MenuOutlined"
                            :size="24"
                            color="white"
                            class="cursor-pointer"
                        ></n-icon>
                    </n-dropdown>
                </div>
                <div class="w-full flex justify-center items-center bottom-arrow absolute bottom-3">
                    <n-icon
                        :component="CaretDownFilled"
                        :size="35"
                        color="white"
                        class="cursor-pointer"
                        @click="scrollToBottom(15)"
                    ></n-icon>
                </div>
            </div>
            <!-- 底部图片墙 -->
            <div class="container h-1/2 flex justify-center items-center">
                <div
                    class="h-4/5 mx-5 bg-black bg-opacity-10 rounded-md ring-8 ring-yellow-500 ring-opacity-50 shadow-lg"
                >
                    <n-carousel
                        :show-dots="true"
                        :interval="6000"
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
        <div class="bottom-menu w-full sticky bottom-0 flex justify-center py-2">
            <bottom-menu></bottom-menu>
        </div>
    </background>
    <images-list></images-list>
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
