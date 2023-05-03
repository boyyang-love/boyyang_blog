<script lang="ts" setup>
import {Component, markRaw, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import Wow from 'wow.js'
import {PaperPlane, ImagesSharp, Home, CloudUploadSharp, GitCommit, PersonSharp, SettingsSharp} from '@vicons/ionicons5'

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
        {name: 'Home', com: markRaw(Home), path: '/home', text: '首页'},
        {name: 'Images', com: markRaw(ImagesSharp), path: '/images', text: '壁纸'},
        {name: 'Publish', com: markRaw(PaperPlane), path: '/publish', text: '上传博客'},
        {name: 'Upload', com: markRaw(CloudUploadSharp), path: '/upload', text: '上传壁纸'},
        {name: 'TimeAxis', com: markRaw(GitCommit), path: '/timeAxis', text: '时间轴'},
        {name: 'User', com: markRaw(PersonSharp), path: '/user', text: '我的'},
        {name: 'Admin', com: markRaw(SettingsSharp), path: '/admin', text: '设置'},
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
            <n-tooltip v-for="(item, i) in props.menuList" trigger="hover">
                <template #trigger>
                    <n-icon
                            :key="item.path"
                            :color="active == i ? '#00adb5' : 'whitesmoke'"
                            :component="item.com as any"
                            :data-wow-delay="i * 0.3 + 's'"
                            :size="23"
                            class="wow bounceInLeft"
                            @click="menuClick(item, i)"
                    ></n-icon>
                </template>
                {{ item.text }}
            </n-tooltip>
        </n-space>
    </div>
</template>

<style lang="less" scoped>
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
