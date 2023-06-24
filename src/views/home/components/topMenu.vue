<script lang="ts" setup>
import {Component, markRaw, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import Wow from 'wow.js'
import {
    ImagesSharp,
    Home,
    CloudUploadSharp,
    GitCommit,
    PersonCircleSharp,
    SettingsSharp,
    RocketSharp,
} from '@vicons/ionicons5'

interface menuProps {
    menuList?: menuList[]
}

interface menuList {
    name: string
    com: Component
    path: string
    text: string
    color: string
}

const props = withDefaults(defineProps<menuProps>(), {
    menuList: () => [
        {
            name: 'Home',
            com: markRaw(Home),
            path: '/home',
            text: '首页',
            color: '#ffde7d',
        },
        {
            name: 'Images',
            com: markRaw(ImagesSharp),
            path: '/images',
            text: '壁纸',
            color: '#f6416c',
        },
        {
            name: 'Publish',
            com: markRaw(RocketSharp),
            path: '/publish',
            text: '上传博客',
            color: '#00b8a9',
        },
        {
            name: 'Upload',
            com: markRaw(CloudUploadSharp),
            path: '/upload',
            text: '上传壁纸',
            color: '#fc5185',
        },
        {
            name: 'TimeAxis',
            com: markRaw(GitCommit),
            path: '/timeAxis',
            text: '时间轴',
            color: '#ff9a00',
        },
        {
            name: 'User',
            com: markRaw(PersonCircleSharp),
            path: '/user',
            text: '我的',
            color: '#3ec1d3',
        },
        {
            name: 'Admin',
            com: markRaw(SettingsSharp),
            path: '/admin',
            text: '设置',
            color: '#9896f1',
        },
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
                        :class="[ 'wow bounceInLeft',i === active ? 'active' : 'normal' ]"
                        :color="item.color"
                        :component="item.com as any"
                        :data-wow-delay="i * 0.3 + 's'"
                        :size="20"
                        :style="{'--i': i}"
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

.active {
    //animation: heart 1s linear infinite;
    position: relative;
    display: flex;
    justify-content: center;

}

.active::before {
    content: '';
    position: absolute;
    bottom: -10px;
    width: 20px;
    height: 1px;
    background-color: #fff;
    animation: heart 1s linear infinite;

}


@keyframes heart {
    0% {
        transform: scale(0.5);
        background-color: whitesmoke;
    }

    50% {
        transform: scale(1.6);
        background-color: #00adb5;
    }

    100% {
        transform: rotate(0.5);
        background-color: whitesmoke;
    }
}

</style>
