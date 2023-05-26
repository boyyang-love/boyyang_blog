<script lang="ts" setup>
import {StarOutlined} from '@vicons/antd'
import {Fitness} from '@vicons/ionicons5'

interface imgCardProps {
    url?: string
    name?: string
}

const props = withDefaults(defineProps<imgCardProps>(), {
    url: '',
    name: '',
})
</script>

<template>
    <div class="imgcard-wrapper">
        <n-image
            :src="props.url"
            class="img"
            lazy
            object-fit="cover"
        >
            <template #placeholder>
                <div class="loading">
                    <n-icon :component="Fitness as any" class="icon" color="#f00056" size="55"></n-icon>
                </div>
            </template>
        </n-image>
        <div class="imgcard-bottom">
            <div class="left-text">
                <n-ellipsis style="max-width: 240px">
                    {{ props.name }}
                </n-ellipsis>
            </div>
            <div class="right-icon">
                <n-space :size="500" align="center" justify="center"></n-space>
                <n-icon :component="StarOutlined as any" class="icon" size="25"></n-icon>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.imgcard-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 250px;
    background-color: #3d3b4f;
    border: 4px solid whitesmoke;
    border-radius: 2px;
    box-shadow: 5px 2px 3px #393e46;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;

    .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: left top;
        transition: all 1s linear;

        &:hover {
            object-position: right bottom;
        }

        .loading {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &:hover {
        z-index: 9;
        transform: scale(1.1);
        //border: 1px solid black;
    }

    .imgcard-bottom {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 45px;
        background-color: rgba(57, 62, 70, 0.6);
        color: whitesmoke;
        padding: 5px 10px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .right-icon {
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
                cursor: pointer;
            }
        }
    }
}
</style>
