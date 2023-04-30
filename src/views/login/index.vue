<script lang="ts" setup>
import {onMounted} from 'vue'
import Wow from 'wow.js'
import bgImg from '@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg'
import {BackGround} from '@/components/Background/index.ts'
import signInAndUp from './components/signInAndUp.vue'
import Loading from '@/components/Loading/index.vue'

onMounted(() => {
    const wow = new Wow({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function () {
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
        <BackGround :url="bgImg" class="wow pulse" height="100vh" width="100vw">
            <div ref="bgWrapper" class="bg">
                <signInAndUp style="position: absolute"></signInAndUp>
            </div>
        </BackGround>
    </div>
</template>

<style lang="less" scoped>
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
