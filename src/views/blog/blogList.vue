<!--
 * @Author: boyyang
 * @Date: 2022-07-05 18:22:06
 * @LastEditTime: 2022-07-05 18:44:37
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\blog\blogList.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import Background from '@/components/Background/index.vue'
    import { useBlog } from './hooks/useBlog'

    // hooks
    const { getBlogList } = useBlog()
    nextTick(() => {
        window.VANTA.CELLS({
            el: '#CELLS',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
        })
    })

    getBlogList()
</script>

<template>
    <background width="100vw" height="100vh" id="CELLS">
        <div class="container mx-auto w-full h-full"></div>
    </background>
</template>

<style scoped></style>
