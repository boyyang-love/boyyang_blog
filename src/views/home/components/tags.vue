<script lang="ts" setup>
import qiunVueUcharts from '@qiun/vue-ucharts'

const opts = {
    color: [
        '#1890FF',
        '#91CB74',
        '#FAC858',
        '#EE6666',
        '#73C0DE',
        '#3CA272',
        '#FC8452',
        '#9A60B4',
        '#ea7ccc',
    ],
    padding: undefined,
    enableScroll: false,
    extra: {
        word: {
            type: 'normal',
            autoColors: false,
        },
    },
}

const chartData = {
    series: [
        {
            name: '跨全端图表',
            textSize: 25,
            data: undefined,
        },
        {
            name: '微信小程序',
            textSize: 20,
            data: undefined,
        },
        {
            name: '支付宝小程序',
            textSize: 20,
            data: undefined,
        },
        {
            name: '百度小程序',
            textSize: 20,
            data: undefined,
        },
        {
            name: 'QQ小程序',
            textSize: 20,
            data: undefined,
        },
        {
            name: '头条小程序',
            textSize: 20,
            data: undefined,
        },
        {
            name: '抖音小程序',
            textSize: 20,
            data: undefined,
        },
        {
            name: '360小程序',
            textSize: 20,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 10,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 12,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 10,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 12,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 10,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 12,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 10,
            data: undefined,
        },
        {
            name: '跨全端',
            textSize: 12,
            data: undefined,
        },
    ],
}
</script>

<template>
    <qiun-vue-ucharts type="word" :opts="opts" :chartData="chartData"/>
</template>

<style scoped></style>
