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
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {
            show: false,
            fontColor: '#fff',
        },
        dataLabel: false,
        xAxis: {
            disableGrid: true,
            axisLine: false,
            fontColor: '#fff',
            scrollShow: true,
        },
        yAxis: {
            disabled: true,
            disableGrid: true,
            axisLine: false,
            fontColor: '#fff',
            data: [
                {
                    min: 0,
                },
            ],
        },
        extra: {
            mount: {
                type: 'sharp',
                widthRatio: 1.5,
            },
        },
    }

    const chartData = {
        series: [
            {
                data: [
                    { name: '周一', value: 82 },
                    { name: '周二', value: 63 },
                    { name: '周三', value: 86 },
                    { name: '周四', value: 65 },
                    { name: '周五', value: 79 },
                    { name: '', value: 79 },
                    { name: '五班', value: 79 },
                ],
            },
        ],
    }
</script>

<template>
    <qiun-vue-ucharts type="mount" :opts="opts" :chartData="chartData" />
</template>

<style scoped></style>
