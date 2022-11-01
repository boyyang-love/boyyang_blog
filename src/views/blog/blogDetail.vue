<!--
 * @Author: boyyang
 * @Date: 2022-07-05 18:00:44
 * @LastEditTime: 2022-09-15 18:14:00
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\blog\blogDetail.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import { ArrowLeftOutlined } from '@vicons/antd'
    import Background from '@/components/Background/index.vue'
    import { useBlog } from './hooks/useBlog'
    // hooks
    const { blogData, getBlogDetail } = useBlog()

    nextTick(() => {
        window.VANTA.FOG({
            el: '#FOG',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
        })
    })
    getBlogDetail()
</script>

<template>
    <background width="100vw" height="100vh" id="FOG">
        <div class="container mx-auto w-full h-full overflow-y-auto py-28">
            <div class="rounded-md overflow-hidden shadow-xl">
                <v-md-preview :text="blogData.blogDetail.content" height="60vh"></v-md-preview>
            </div>
        </div>
        <div
            class="back fixed bottom-0 flex justify-center items-center w-full bg-black bg-opacity-50 py-3 z-10"
        >
            <div
                class="title h-full absolute left-0 px-3 flex justify-center items-center bg-gray-900 text-white text-xs"
            >
                {{ blogData.blogDetail.title }}
            </div>
            <n-icon
                class="cursor-pointer"
                :component="ArrowLeftOutlined"
                size="26"
                color="white"
                @click="$router.back()"
            ></n-icon>
        </div>
    </background>
</template>

<style scoped lang="less">
    .container {
        scroll-behavior: smooth;
    }
</style>
