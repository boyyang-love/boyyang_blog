<script lang="ts" setup></script>

<template>
    <n-carousel
        direction="vertical"
        dot-placement="right"
        show-arrow
        style="width: 100%; height: 250px"
    >
        <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
        <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
        <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
        <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
    </n-carousel>
</template>

<style scoped lang="less">
    .carousel-img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
