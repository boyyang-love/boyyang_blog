<script lang="ts" setup>
import {onMounted} from 'vue'
import moment from 'moment/moment'
import wow from 'wow.js'
// hooks
import {useTimeAxisData, useTimeAxisMethods} from './hooks/useTimeAxis'
import {Fitness} from '@vicons/ionicons5'
import Wow from 'wow.js'

const {timeAxisData} = useTimeAxisData()
const {getData} = useTimeAxisMethods()


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
        scrollContainer: '#time-axis-wrapper', // optional scroll container selector, otherwise use window
    })

    wow.init()
    getData()
})
</script>

<template>
    <div id="time-axis-wrapper" class="container m-auto time-axis-wrapper">
        <div class="time-axis-box">
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
                                class="img wow bounceInRight"
                                lazy
                            >
                                <template #placeholder>
                                    <div class="loading">
                                        <n-icon
                                            :component="Fitness as any"
                                            class="icon"
                                            color="#f00056"
                                            size="55"
                                        ></n-icon>
                                    </div>
                                </template>
                            </n-image>
                        </div>
                    </template>
                    <template #footer>
                        <div class="time">
                            <span>
                                {{ moment(item.created * 1000).format('YYYY-MM-DD hh:mm:ss') }}
                            </span>
                            <span>
                                {{ item.user_info.username }}
                            </span>
                        </div>
                    </template>
                </n-timeline-item>
            </n-timeline>
        </div>
    </div>
</template>

<style lang="less">
.time-axis-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 100px;

    .time-axis-box {
        box-sizing: border-box;

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
            font-weight: bolder;
            color: whitesmoke;

            span {
                margin: 0 15px;
            }
        }
    }

}
</style>