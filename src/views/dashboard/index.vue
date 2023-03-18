<!--
 * @Author: boyyang
 * @Date: 2023-01-30 17:19:54
 * @LastEditTime: 2023-02-06 10:52:49
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\dashboard\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
import {onMounted} from 'vue'
import Carousel from './components/carousel.vue'
import BottomChart from './components/bottomChart.vue'
import RightChart from './components/rightChart.vue'
import UserInfo from './components/userInfo.vue'

import '@/utils/cloudbase'

// hooks
import {useDashboard} from './hooks/useDashboard'

const {dashboardData, getDashboard} = useDashboard()

onMounted(() => {
    getDashboard()
})
</script>

<template>
    <div class="dashboard-wrapper">
        <div class="left">
            <!-- 轮播 -->
            <div class="banner">
                <carousel :list="dashboardData.exhibitions"></carousel>
            </div>
            <!-- 仪表 -->
            <div class="dashboard">
                <bottom-chart :chartData="dashboardData.dashboard"></bottom-chart>
            </div>
        </div>

        <!-- 右边用户信息 -->
        <div class="right">
            <div class="user-info">
                <div class="info">
                    <user-info :userInfo="dashboardData.user_info"></user-info>
                </div>
                <div class="info-charts">
                    <right-chart :roseData="dashboardData.rouseData"></right-chart>
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

      .info {
        box-sizing: border-box;
        width: 100%;
        height: 180px;
      }

      .info-charts {
        box-sizing: border-box;
        width: 100%;
        height: 300px;
      }
    }
  }
}
</style>
