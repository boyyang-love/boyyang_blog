<script lang="ts" setup>
import {onMounted} from 'vue'
import {useTimeAxis} from './hooks/useTimeAxis'
// hooks
const {timeAxisData, getData} = useTimeAxis()

onMounted(() => {
    console.log(timeAxisData)
    getData()
})
</script>

<template>
    <div class="container m-auto time-axis-wrapper">
        <n-timeline>
            <n-timeline-item
                    v-for="item in timeAxisData.list"
                    :key="item.id"
                    type="success"
                    title=""
                    time="item.time"
            >
                <template #header>
                    <div class="item-title">
                        {{ item.title }}
                    </div>
                    <div class="item-content">
                        <img :src="item.cover" alt="图片">
                    </div>
                </template>
            </n-timeline-item>
        </n-timeline>
    </div>
</template>

<style lang="less">
.time-axis-wrapper {
    padding: 100px;

    .item-title {
        color: #f5f5f5;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .item-content {
        img {
            box-sizing: border-box;
            height: 250px;
            border: 2px solid antiquewhite;
        }
    }
}
</style>