<!--
 * @Author: boyyang
 * @Date: 2023-01-30 17:22:12
 * @LastEditTime: 2023-02-02 17:26:12
 * @LastEditors: boyyang
 * @Description: 轮播图
 * @FilePath: \blog_web\src\views\dashboard\components\carousel.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
interface carouselProps {
    list: carouselItem[]
}

interface carouselItem {
    url: string
    name?: string
}

const props = withDefaults(defineProps<carouselProps>(), {
    list: () => []
})
</script>

<template>
    <n-carousel
        effect="card"
        prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
        next-slide-style="transform: translateX(50%) translateZ(-800px);"
        style="height: 240px"
        autoplay
    >
        <n-carousel-item :style="{ width: '60%' }" v-for="item in props.list" :key="item.name">
            <img
                class="carousel-img"
                :src="item.url"
            />
        </n-carousel-item>
    </n-carousel>
</template>

<style scoped lang="less">
    .carousel-img {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
