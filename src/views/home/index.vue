<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:31:01
 * @LastEditTime: 2023-01-29 16:12:38
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import { BackGround } from '@/components/Background'
    import ExhibitionList from './components/exhibitionList.vue'
    import Menu from './components/menu.vue'

    // nextTick(() => {
    //     window.VANTA.NET({
    //         el: '#NET',
    //     })
    // })
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
            // padding: 30px 0px;
            display: flex;
            justify-content: center;
            align-items: center;

            .content {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
