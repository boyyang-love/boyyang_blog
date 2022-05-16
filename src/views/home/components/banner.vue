<!--
 * @Author: boyyang
 * @Date: 2022-04-09 16:17:05
 * @LastEditTime: 2022-04-18 16:07:22
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\banner.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { NCarousel, NCarouselItem } from 'naive-ui'

    export interface BannerInfoItem {
        url: string
        ID: number
    }

    export interface BannerInfo {
        list: BannerInfoItem[]
    }

    const props = withDefaults(defineProps<BannerInfo>(), {
        list: () => [],
    })
</script>

<template>
    <n-carousel effect="card" style="height: 360px" :show-dots="true" autoplay dot-type="line">
        <n-carousel-item :style="{ width: '60%' }" v-for="item in props.list" :key="item.ID">
            <img class="carousel-img" :src="item.url" />
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
