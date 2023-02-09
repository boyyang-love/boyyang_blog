<!--
 * @Author: boyyang
 * @Date: 2023-02-09 09:51:58
 * @LastEditTime: 2023-02-09 11:18:19
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\components\topMenu.vue
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
        menuList?: menuList[]
    }

    interface menuList {
        name: string
        com: Component
        path: string
    }

    const props = withDefaults(defineProps<menuProps>(), {
        menuList: () => [
            { name: 'Home', com: markRaw(HomeOutlined), path: '/home' },
            { name: 'Images', com: markRaw(FileImageOutlined), path: '/images' },
            { name: 'Publish', com: markRaw(SendOutlined), path: '/publish' },
            { name: 'User', com: markRaw(UserOutlined), path: '/user' },
            { name: 'Admin', com: markRaw(SettingOutlined), path: '/admin' },
        ],
    })
</script>

<template>
    <div class="menu-wrapper">
        <n-space size="large">
            <n-icon
                v-for="item in props.menuList"
                :key="item.path"
                :component="item.com"
                :size="25"
                color="whitesmoke"
            ></n-icon>
        </n-space>
    </div>
</template>

<style scoped lang="less">
    .menu-wrapper {
        position: fixed;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        background-color: rgba(22, 24, 35, 0.3);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 20px;
    }
</style>
