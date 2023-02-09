<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:31:01
 * @LastEditTime: 2023-02-09 12:40:48
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { onMounted, nextTick } from 'vue'
    import { BackGround } from '@/components/Background'
    import TopMenu from './components/topMenu.vue'
    // 图片
    import banner from '@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg'

    onMounted(() => {
        nextTick(() => {
            // window.VANTA.NET({
            //     el: '#NET',
            //     mouseControls: true,
            //     touchControls: true,
            //     gyroControls: false,
            //     minHeight: 200.0,
            //     minWidth: 200.0,
            //     scale: 1.0,
            //     scaleMobile: 1.0,
            // })
            window.VANTA.RINGS({
                el: '#RINGS',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.0,
                minWidth: 200.0,
                scale: 1.0,
                scaleMobile: 1.0,
            })
        })
    })
</script>

<template>
    <BackGround width="100vw" height="100vh" id="RINGS">
        <div class="index">
            <TopMenu style="z-index: 99"></TopMenu>
            <BackGround width="100vw" :url="banner"></BackGround>
            <!-- 路由出口 -->
            <router-view></router-view>
        </div>
    </BackGround>
</template>

<style scoped lang="less">
    .index {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: auto;
        // background-color: rgba(22, 24, 35, 1);
    }
</style>
