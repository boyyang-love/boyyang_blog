<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:31:01
 * @LastEditTime: 2022-12-30 14:23:05
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import { BackGround } from '@/components/Background'

    nextTick(() => {
        window.VANTA.NET({
            el: '#NET',
        })
    })
</script>

<template>
    <BackGround width="100vw" height="100vh" id="NET"></BackGround>
</template>

<style scoped></style>
