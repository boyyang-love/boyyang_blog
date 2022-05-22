<!--
 * @Author: boyyang
 * @Date: 2022-04-20 13:03:04
 * @LastEditTime: 2022-05-22 10:23:05
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\components\Background\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { computed } from 'vue'
    enum Type {
        image = 'image',
        video = 'video',
        color = 'color',
    }
    interface Background {
        type?: string // image video color
        url?: string
        color?: string
        width?: string
        height?: string
    }
    const props = withDefaults(defineProps<Background>(), {
        type: 'image',
        url: `${new URL('../../assets/女孩子少女宇宙航天服8k动漫壁纸彼岸图网.jpg', import.meta.url).href}`,
        color: 'white',
        width: '100%',
        height: '100%',
    })
    const background_img = computed(() => {
        if (props.type == Type.color) {
            return 'none'
        }
        return `url(${props.url})`
    })
</script>

<template>
    <div class="background">
        <video :src="props.url" loop muted autoplay v-if="props.type == Type.video"></video>
        <div class="background-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
    .background {
        box-sizing: border-box;
        width: v-bind('props.width');
        height: v-bind('props.height');
        // background-image: v-bind('background_img');
        background-image: url("@/assets/女孩子少女宇宙航天服8k动漫壁纸彼岸图网.jpg");
        background-position: center;
        background-size: cover;
        background-color: v-bind('props.color');
        position: relative;
        overflow: hidden;
        .background-content {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
        }
        video {
            width: 100%;
            height: 100%;
            object-fit: fill;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
</style>
