<!--
 * @Author: boyyang
 * @Date: 2023-01-30 16:07:14
 * @LastEditTime: 2023-01-30 17:18:11
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\components\dashboard.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import qiunVueUcharts from '@qiun/vue-ucharts'

const opts = {
    color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
    padding: [15, 15, 0, 5],
    enableScroll: false,
    legend: {},
    xAxis: {
        disableGrid: true
    },
    yAxis: {
        data: [
            {
                min: -100,
                max: 100
            }
        ],
        splitNumber: 4
    },
    extra: {
        mount: {
            type: "mount",
            widthRatio: 1.5,
            borderWidth: 0,
            linearType: "custom"
        }
    }
}



const chartData = {
    series: [
        {
            data: [
                { "name": "一班", "value": 82 },
                { "name": "二班", "value": -63 },
                { "name": "三班", "value": 86 },
                { "name": "四班", "value": -75 },
                { "name": "五班", "value": 79 }
            ]
        }
    ]
}


const opts_1 = {
    color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
    padding: [5, 5, 5, 5],
    dataLabel: true,
    dataPointShape: false,
    enableScroll: false,
    legend: {
        show: false,
        position: "right",
        lineHeight: 25
    },
    extra: {
        radar: {
            gridType: "circle",
            gridColor: "#CCCCCC",
            gridCount: 3,
            opacity: 1,
            max: 240,
            labelShow: true,
            linearType: "custom",
            border: false
        }
    }
}

const chartData_1 = {
    categories: ["维度1", "维度2", "维度3", "维度4", "维度5", "维度6"],
    series: [
        {
            name: "成交量1",
            data: [90, 110, 165, 195, 187, 172]
        }
    ]
}


</script>

<template>
    <div class="dashboard-wrapper">
        <div class="left">
            <div class="banner">
                <n-carousel effect="card" prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
                    next-slide-style="transform: translateX(50%) translateZ(-800px);" style="height: 240px"
                    :show-dots="false">
                    <n-carousel-item :style="{ width: '60%' }">
                        <img class="carousel-img"
                            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
                    </n-carousel-item>
                    <n-carousel-item :style="{ width: '60%' }">
                        <img class="carousel-img"
                            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
                    </n-carousel-item>
                    <n-carousel-item :style="{ width: '60%' }">
                        <img class="carousel-img"
                            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
                    </n-carousel-item>
                    <n-carousel-item :style="{ width: '60%' }">
                        <img class="carousel-img"
                            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
                    </n-carousel-item>
                </n-carousel>
            </div>

            <div class="dashboard">
                <qiun-vue-ucharts type="mount" :opts="opts" :chartData="chartData" />
            </div>
        </div>

        <div class="right">
            <div class="user-info">

                <div class="info"></div>
                <div class="info-charts">
                    <qiun-vue-ucharts type="radar" :opts="opts_1" :chartData="chartData_1" />
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="less">
.dashboard-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .left {
        box-sizing: border-box;
        width: 75%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        .banner {
            box-sizing: border-box;
            width: 100%;
            height: 280px;
            background-color: #eeeeee;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            .carousel-img {
                margin: 0 auto;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .dashboard {
            box-sizing: border-box;
            width: 100%;
            height: calc(100% - 290px);
            background-color: #eeeeee;

            .charts-box {
                width: 500px;
                height: 300px;
            }

        }

    }

    .right {
        box-sizing: border-box;
        width: calc(25% - 10px);
        height: 100%;

        .user-info {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background-color: #eeeeee;

            .info-charts {
                box-sizing: border-box;
                width: 100%;
                height: 300px;
            }
        }

    }

}
</style>