<!--
 * @Author: boyyang
 * @Date: 2023-02-09 09:51:58
 * @LastEditTime: 2023-02-12 14:02:08
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\components\topMenu.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import {Component, markRaw, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import Wow from 'wow.js'
import {
    HomeOutlined,
    FileImageOutlined,
    SendOutlined,
    UserOutlined,
    SettingOutlined,
    CloudUploadOutlined,
    NodeIndexOutlined,
} from '@vicons/antd'
import {userInfo} from 'os'

interface menuProps {
    menuList?: menuList[]
}

interface menuList {
    name: string
    com: Component
    path: string
    text: string
}

const props = withDefaults(defineProps<menuProps>(), {
    menuList: () => [
        {name: 'Home', com: markRaw(HomeOutlined), path: '/home', text: '首页'},
        {name: 'Images', com: markRaw(FileImageOutlined), path: '/images', text: '壁纸'},
        {name: 'Publish', com: markRaw(SendOutlined), path: '/publish', text: '上传博客'},
        {name: 'Upload', com: markRaw(CloudUploadOutlined), path: '/upload', text: '上传壁纸'},
        {name: 'TimeAxis', com: markRaw(NodeIndexOutlined), path: '/timeAxis', text: '时间轴'},
        {name: 'User', com: markRaw(UserOutlined), path: '/user', text: '我的'},
        {name: 'Admin', com: markRaw(SettingOutlined), path: '/admin', text: '设置'},
    ],
})

const active = ref<number>(0)

const route = useRoute()
const router = useRouter()

onMounted(() => {
    const wow = new Wow({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function () {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window
    })

    wow.init()

    props.menuList.forEach((item, i) => {
        if (item.name == route.name) {
            active.value = i
        }
    })
})

const menuClick = (item: menuList, index: number) => {
    active.value = index
    router.push({
        name: item.name,
    })
}
</script>

<template>
    <div class="menu-wrapper">
        <n-space size="large">
            <n-tooltip trigger="hover" v-for="(item, i) in props.menuList">
                <template #trigger>
                    <n-icon
                            class="wow bounceInLeft"
                            :key="item.path"
                            :component="item.com as any"
                            :size="23"
                            :data-wow-delay="i * 0.3 + 's'"
                            :color="active == i ? '#00adb5' : 'whitesmoke'"
                            @click="menuClick(item, i)"
                    ></n-icon>
                </template>
                {{ item.text }}
            </n-tooltip>
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
  // background-color: rgba(22, 24, 35, 0.3);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
