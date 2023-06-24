<script lang="ts" setup>
import {onMounted} from "vue"
import Wow from "wow.js"

import UserinfoCard from './components/userinfoCard.vue'
import LikeList from './components/likeList.vue'

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
    <div class="container m-auto">
        <div class="userinfo-wrapper wow fadeInLeftBig">
            <UserinfoCard></UserinfoCard>
        </div>
        <div class="bottom-content wow fadeInRightBig">
            <div v-for="item in 50" :key="item" class="bottom-card-wrapper">
                <LikeList :status="2"></LikeList>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 120px;
    overflow-y: auto;


    .userinfo-wrapper {
        width: 100%;
    }

    .bottom-content {
        box-sizing: border-box;
        width: 100%;
        height: 700px;
        margin-top: 25px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 15px;
        //justify-items: center;
        justify-content: space-between;
    }
}
</style>
