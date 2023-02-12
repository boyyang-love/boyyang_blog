<script lang="ts" setup>
    import { onMounted } from 'vue'
    import Wow from 'wow.js'
    import { PrintText } from '@/components/PrintText'

    const text = `
    jjjjjjjf
    `

    onMounted(() => {
        const wow = new Wow({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 50, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            callback: function () {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: '#blog-container', // optional scroll container selector, otherwise use window
        })

        wow.init()
    })
</script>

<template>
    <div class="blog-wrapper container m-auto" id="blog-container">
        <div class="top-banner">
            <PrintText title="vue3.0" subtitle="vue3.0搭建"></PrintText>
        </div>
        <div class="blog-content wow fadeInUpBig" data-wow-delay="1s">
            <v-md-preview :text="text"></v-md-preview>
        </div>
    </div>
</template>

<style scoped lang="less">
    .blog-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        .top-banner {
            box-sizing: border-box;
            height: 650px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .blog-content {
            box-sizing: border-box;
            width: 100%;
            padding: 0 200px;
        }
    }
</style>
