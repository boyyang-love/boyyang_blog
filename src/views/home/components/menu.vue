<!--
 * @Author: boyyang
 * @Date: 2023-01-10 15:43:29
 * @LastEditTime: 2023-01-29 16:47:35
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\components\menu.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { Component, markRaw, onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    import {
        HomeOutlined,
        FileImageOutlined,
        SendOutlined,
        UserOutlined,
        SettingOutlined,
    } from '@vicons/antd'

    interface menuProps {
        menuList: menuList[]
    }

    interface menuList {
        name: string
        com: Component
        path: string
    }

    const props = withDefaults(defineProps<menuProps>(), {
        menuList: () => [
                { name: 'Home', com: markRaw(HomeOutlined), path: '/' },
                { name: 'Image', com: markRaw(FileImageOutlined), path: '/' },
                { name: 'Send', com: markRaw(SendOutlined), path: '/' },
                { name: 'User', com: markRaw(UserOutlined), path: '/' },
                { name: 'Admin', com: markRaw(SettingOutlined), path: '/' },
        ],
    })

    const route = useRoute()
    const router = useRouter()

    // const menuList: menuList[] = [
    //     { name: 'Home', com: markRaw(HomeOutlined), path: '/' },
    //     { name: 'Image', com: markRaw(FileImageOutlined), path: '/' },
    //     { name: 'Send', com: markRaw(SendOutlined), path: '/' },
    //     { name: 'User', com: markRaw(UserOutlined), path: '/' },
    //     { name: 'Admin', com: markRaw(SettingOutlined), path: '/' },
    // ]

    const active = ref<number>(0)
    const list = ref<menuList[]>([])

    onMounted(() => {
        addItem(props.menuList, route.name as string)
    })

    const addItem = (menuList: menuList[], routerName: string) => {
        const len = menuList.length
        let index = 0
        let t: null | NodeJS.Timer = null
        t = setInterval(() => {
            if (index <= len - 1) {
                list.value.push(menuList[index])
                if (menuList[index].name === routerName) {
                    active.value = index
                }
                index++
            } else {
                t && clearInterval(t)
            }
        }, 500)
    }

    const menuClick = (item: menuList, index: number) => {
        active.value = index
        router.push({
            name: item.name,
        })
    }
</script>

<template>
    <div class="menu-wrapper">
        <div class="menu-btn-wrapper">
            <div class="left"></div>
            <transition-group tag="ul" name="list" class="right">
                <div
                    :class="['btn', { 'btn-active': active == i }]"
                    v-for="(item, i) in list"
                    :key="'list-' + i"
                    @click="menuClick(item, i)"
                >
                    <n-icon
                        :component="item.com"
                        :color="active == i ? '#3d3b4f' : '#fff'"
                        size="25"
                    ></n-icon>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<style scoped lang="less">
    .menu-wrapper {
        box-sizing: border-box;
        height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        .menu-btn-wrapper {
            box-sizing: border-box;
            width: 70px;
            height: 60%;
            background-color: #3d3b4f;
            border-radius: 0 10px 10px 0;
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
            display: flex;
            z-index: 9;

            .left {
                width: 20px;
                height: 100%;
                background-color: #1bd1a5;
                box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
            }

            .right {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: flex-start;
                flex-direction: column;

                .btn {
                    box-sizing: border-box;
                    width: 45px;
                    height: 45px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    background-color: #1bd1a5;
                    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
                    transition: all 0.6s ease-in-out;
                }

                .btn:hover {
                    width: 120%;
                    border-radius: 0 0 15px 0;
                }

                .btn-active {
                    width: 120%;
                    border-radius: 0 0 15px 0;
                }
            }
        }
    }

    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 1s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }
    /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
    .list-leave-active {
        position: absolute;
    }
</style>
