<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:28:46
 * @LastEditTime: 2022-06-04 23:57:24
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\login\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import BackGround from '@/components/Background/index.vue'
    import SignUp from './components/signUp.vue'
    // 背景图片
    import bg_url from '@/assets/赛博朋克风格奇幻少女_集原美电脑4k壁纸3840x2160_彼岸图网.jpg'
</script>

<template>
    <back-ground width="100vw" height="100vh" :url="bg_url">
        <n-space>
            <sign-up></sign-up>
        </n-space>
    </back-ground>
</template>

<style scoped lang="less">
    .login-container {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
