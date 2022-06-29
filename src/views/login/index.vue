<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:28:46
 * @LastEditTime: 2022-06-29 17:42:40
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\login\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { nextTick } from 'vue'
    import BackGround from '@/components/Background/index.vue'
    import SignUp from './components/signUp.vue'
    import SignIn from './components/signIn.vue'
    // 背景图片
    import bg_url from '@/assets/赛博朋克风格奇幻少女_集原美电脑4k壁纸3840x2160_彼岸图网.jpg'
    // 渲染背景
    nextTick(() => {
        window.VANTA.GLOBE({
            el: '#GLOBE',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            // minHeight: 200.0,
            minWidth: 200.0,
            scale: 0.5,
            scaleMobile: 1.0,
        })
    })
</script>

<template>
    <back-ground width="100vw" height="100vh" id="GLOBE">
        <n-space>
            <sign-up></sign-up>
            <sign-in></sign-in>
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
