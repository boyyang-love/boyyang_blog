<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:30:33
 * @LastEditTime: 2023-02-07 17:03:02
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\login\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { onMounted, nextTick, ref } from 'vue'
    // import bgImg from "@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg"
    import { BackGround } from '@/components/Background'
    import signInAndUp from './components/signInAndUp.vue'
    // bg
    import { bgInit } from './hooks/bg'

    const bgWrapper = ref<Element | null>(null)

    onMounted(() => {
        nextTick(() => {
            bgInit(bgWrapper.value)
        })
    })
</script>

<template>
    <BackGround width="100vw" height="100vh">
        <div class="bg" ref="bgWrapper">
            <signInAndUp style="position: absolute;"></signInAndUp>
        </div>
    </BackGround>
</template>

<style scoped lang="less">
    .bg {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
