<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:31:01
 * @LastEditTime: 2023-01-30 16:29:17
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import { BackGround } from '@/components/Background'
import Menu from './components/menu.vue'
</script>

<template>
    <BackGround width="100vw" height="100vh" id="NET">
        <div class="home">
            <div class="menu-wrapper">
                <!-- 首页菜单 -->
                <Menu></Menu>
            </div>
            <div class="router-view-wrapper">
                <div class="content">
                    <!-- 路由出口 -->
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </BackGround>
</template>

<style scoped lang="less">
.home {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #393e46;

    .menu-wrapper {
        .exhibition-list {
            position: absolute;
            top: 0;
        }
    }

    .router-view-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            box-sizing: border-box;
            width: 75%;
            height: 85%;
            padding: 15px 20px;
            background-color: rgba(22, 24, 35, 0.5);
            box-shadow: 2px 3px 2px rgba(61, 59, 79, 0.4);
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
