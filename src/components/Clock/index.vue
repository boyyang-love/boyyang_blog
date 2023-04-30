<!--
 * @Author: boyyang
 * @Date: 2023-01-03 14:56:42
 * @LastEditTime: 2023-01-05 15:36:17
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\components\Clock\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'

interface clockProps {
    num: number
}

const props = withDefaults(defineProps<clockProps>(), {
    num: 2,
})

const show_num_bottom = ref<number>(0)
const show_num_top = ref<number>(1)
const isAni = ref<boolean>(false)
const isFlipping = ref<boolean>(false)

watch(
    () => props.num,
    n_val => {
        if (isFlipping.value) {
            return
        }
        aniStatus(n_val)
    },
)

const aniStatus = (num: number) => {
    if (num == 0) {
        return
    }
    show_num_top.value = num
    show_num_bottom.value = num - 1
    isAni.value = true
    isFlipping.value = true
    const t = setTimeout(() => {
        show_num_bottom.value = num
        isFlipping.value = false
        isAni.value = false
        clearTimeout(t)
    }, 800)
}
</script>

<template>
    <div class="clock-wrapper">
        <div class="clock-card card-1">{{ show_num_top }}</div>
        <div :class="['clock-card card-2', { 'card-ani2': isAni }]">
            {{ show_num_top }}
        </div>
        <div :class="['clock-card card-3', { 'card-ani3': isAni }]">{{ show_num_bottom }}</div>
        <div class="clock-card card-4">{{ show_num_bottom }}</div>
    </div>
</template>

<style scoped lang="less">
.clock-wrapper {
    box-sizing: border-box;
    width: 70px;
    height: 80px;
    overflow: hidden;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #3d3b4f;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);

    &::before {
        content: '';
        width: 100%;
        background-color: rgba(255, 255, 255, 0.4);
        height: 3px;
        z-index: 99;
    }

    .clock-card {
        box-sizing: border-box;
        width: 100%;
        height: 50%;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 50px;
        font-weight: bold;
        text-align: center;
        overflow: hidden;
        background-color: #3d3b4f;
        color: whitesmoke;
        line-height: 80px;
    }

    .card-1 {
        top: 0;
        left: 0;
        z-index: 1;
    }

    .card-2 {
        top: 50%;
        left: 0;
        transform-origin: center top;
        z-index: 2;
        line-height: 0;
        backface-visibility: hidden;
        transform-origin: center top;
        transform: rotateX(180 * 1deg);
    }

    .card-3 {
        backface-visibility: hidden;
        z-index: 2;
        transform-origin: center bottom;
    }

    .card-4 {
        top: 50%;
        line-height: 0;
        z-index: 1;
    }
}

.card-ani2 {
    animation: ani-card2 0.8s linear;
    // animation: ani-card3 1s linear;
}

.card-ani3 {
    animation: ani-card3 0.8s linear;
}

@keyframes ani-card2 {
    100% {
        transform: rotateX(0);
    }
}

@keyframes ani-card3 {
    100% {
        transform: rotateX(-180deg);
    }
}
</style>
