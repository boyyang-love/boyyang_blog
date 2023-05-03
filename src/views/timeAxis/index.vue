<script lang="ts" setup>
import {onMounted} from 'vue'
import moment from 'moment/moment'
// hooks
import {useTimeAxisData, useTimeAxisMethods} from './hooks/useTimeAxis'
import {Fitness} from '@vicons/ionicons5'

const {timeAxisData} = useTimeAxisData()
const {getData} = useTimeAxisMethods()


onMounted(() => {
    getData()
})
</script>

<template>
    <div class="container m-auto time-axis-wrapper">
        <n-timeline>
            <n-timeline-item
                    v-for="item in timeAxisData.list"
                    :key="item.id"
                    :type="['default', 'success', 'info', 'warning', 'error'][parseInt(Math.random() * 4 as string)]"
            >
                <template #header>
                    <div class="item-title">
                        {{ item.title }}
                    </div>
                    <div class="item-content">
                        <n-image
                                :src="item.cover"
                                class="img"
                                lazy
                        >
                            <template #placeholder>
                                <div class="loading">
                                    <n-icon :component="Fitness as any" class="icon" color="#f00056" size="55"></n-icon>
                                </div>
                            </template>
                        </n-image>
                    </div>
                </template>
                <template #footer>
                    <div class="time">
                        <span>
                            {{ moment(item.created * 1000).format('YYYY-MM-DD') }}
                        </span>
                        <span>
                            {{ item.user_info.username }}
                        </span>
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
        box-sizing: border-box;
        display: inline-block;

        img {
            box-sizing: border-box;
            height: 250px;
            width: 450px;
            object-fit: cover;
            border: 2px solid antiquewhite;
        }
    }

    .time {
        display: flex;
        font-width: bloder;
        color: whitesmoke;

        span {
            margin: 0 15px;
        }
    }
}
</style>