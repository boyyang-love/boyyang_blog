<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:30:33
 * @LastEditTime: 2023-02-10 17:37:10
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\login\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { onMounted } from 'vue'
    import Wow from 'wow.js'
    import bgImg from '@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg'
    import { BackGround } from '@/components/Background'
    import signInAndUp from './components/signInAndUp.vue'

    onMounted(() => {
        const wow = new Wow({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            callback: function (box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null, // optional scroll container selector, otherwise use window
        })

        wow.init()
    })
</script>

<template>
    <div class="bg-wrapper">
        <BackGround width="100vw" height="100vh" :url="bgImg" class="wow pulse">
            <div class="bg" ref="bgWrapper">
                <signInAndUp style="position: absolute"></signInAndUp>
            </div>
        </BackGround>
    </div>
</template>

<style scoped lang="less">
    .bg-wrapper {
        background-color: #3d3b4f;
        overflow: hidden;
    }
    .bg {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
