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
        padding: [15, 10, 0, 15],
        dataLabel: false,
        dataPointShape: false,
        enableScroll: false,
        legend: {
            fontColor: '#fff',
        },
        xAxis: {
            disableGrid: true,
            fontColor: '#fff',
        },
        yAxis: {
            disabled: true,
            gridType: 'dash',
            dashLength: 2,
            data: [
                // {
                //     min: 0,
                //     max: 150,
                // },
            ],
        },
        extra: {
            line: {
                type: 'curve',
                width: 2,
                activeType: 'hollow',
                linearType: 'custom',
                onShadow: true,
                animation: 'horizontal',
            },
        },
    }

    const chartData = {
        categories: ['2018', '2019', '2020', '2021', '2022', '2023', '111', '2222'],
        series: [
            {
                name: '发布数',
                linearColor: [
                    [0, '#1890FF'],
                    [0.25, '#00B5FF'],
                    [0.5, '#00D1ED'],
                    [0.75, '#00E6BB'],
                    [1, '#90F489'],
                ],
                color: '#fff',
                setShadow: [3, 8, 10, '#1890FF'],
                data: [15, 45, 15, 45, 15, 45, 11, 22],
            },
        ],
    }
</script>

<template>
    <qiun-vue-ucharts type="line" :opts="opts" :chartData="chartData" />
</template>

<style scoped></style>
