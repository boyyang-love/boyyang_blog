<!--
 * @Author: boyyang
 * @Date: 2022-04-08 20:47:58
 * @LastEditTime: 2022-07-04 18:48:57
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\blog\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import Background from '@/components/Background/index.vue'
    import { useBlog } from './hooks/useBlog'
    // hooks
    const { blogData } = useBlog()

    // 渲染背景
    nextTick(() => {
        window.VANTA.WAVES({
            el: '#WAVES',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
        })
    })
</script>

<template>
    <background width="100vw" height="100vh" id="WAVES">
        <div class="container mx-auto w-full h-full flex justify-center items-center">
            <v-md-editor v-model="blogData.blogContent" height="75vh"></v-md-editor>
        </div>
    </background>
</template>

<style scoped></style>
