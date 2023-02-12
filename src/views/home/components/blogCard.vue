<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import {
        EyeOutlined,
        HeartOutlined,
        StarOutlined,
        CommentOutlined,
        SendOutlined,
    } from '@vicons/antd'

    interface blogCardProps {
        isReverse: boolean
    }

    const router = useRouter()

    const props = withDefaults(defineProps<blogCardProps>(), {
        isReverse: false,
    })

    const toBlogDetail = () => {
        router.push({
            name: 'Blog',
        })
    }
</script>

<template>
    <div :class="['card-wrapper', { 'is-reverse': props.isReverse }]">
        <div class="left">
            <div class="mask" @click="toBlogDetail">
                <n-icon
                    :component="SendOutlined"
                    class="send-icon"
                    color="whitesmoke"
                    size="25"
                ></n-icon>
            </div>

            <img src="@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg" alt="" />
        </div>
        <div class="right">
            <div class="title">
                <n-ellipsis :line-clamp="1" style="max-width: 520px" width="trigger">
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                </n-ellipsis>
            </div>
            <div class="sub-title">
                <n-ellipsis :line-clamp="3" style="max-width: 520px" :tooltip="false">
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                </n-ellipsis>
            </div>
            <!-- <div class="content">
                <n-ellipsis :line-clamp="3" style="max-width: 520px" :tooltip="false">
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                </n-ellipsis>
            </div> -->
            <div class="bottom">
                <div class="bottom-left">
                    <n-space vertical>
                        <div>作者：yang</div>
                        <div>时间：2022-01-01</div>
                    </n-space>
                </div>
                <div class="bottom-right">
                    <n-badge
                        :value="10"
                        :max="999"
                        :dot="false"
                        color="none"
                        :offset="[70, -50]"
                        type="error"
                    >
                        <n-icon :component="EyeOutlined" size="27" color="#eeeeee"></n-icon>
                    </n-badge>
                    <n-badge
                        :value="10"
                        :max="999"
                        :dot="false"
                        color="none"
                        :offset="[70, -50]"
                        type="error"
                    >
                        <n-icon :component="HeartOutlined" size="27" color="#eeeeee"></n-icon>
                    </n-badge>
                    <n-badge
                        :value="10"
                        :max="999"
                        :dot="false"
                        color="none"
                        :offset="[70, -50]"
                        type="error"
                    >
                        <n-icon :component="StarOutlined" size="27" color="#eeeeee"></n-icon>
                    </n-badge>
                    <n-badge
                        :value="10"
                        :max="999"
                        :dot="false"
                        color="none"
                        :offset="[70, -50]"
                        type="error"
                    >
                        <n-icon :component="CommentOutlined" size="27" color="#eeeeee"></n-icon>
                    </n-badge>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .is-reverse {
        flex-direction: row-reverse;
    }
    .card-wrapper {
        box-sizing: border-box;
        height: 220px;
        background-color: rgba(57, 62, 70, 0.9);
        display: flex;
        justify-content: space-between;
        box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.5);
        .left {
            box-sizing: border-box;
            width: 400px;
            height: 100%;
            // border-radius: 5px;
            // overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding: 10px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.5s linear;
                box-shadow: 5px 5px 4px rgba(57, 62, 70, 0.9);
                border-radius: 4px;
                border: 5px solid #00adb5;
            }

            .mask {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                // background-color: rgba(61, 59, 79, 0.5);
                // box-shadow: inset 3px 3px rgba(61, 59, 79, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: all 1s linear;
            }

            &:hover {
                img {
                    transform: scale(1.2);
                    // transform: translateY(-50px);
                }
                .mask {
                    opacity: 1;
                    z-index: 9;
                }
            }
        }
        .right {
            box-sizing: border-box;
            padding-left: 10px;
            width: calc(100% - 420px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 15px;
            .title {
                font-size: 15px;
                font-weight: bold;
                color: whitesmoke;
            }
            .sub-title {
                font-size: 14px;
                word-wrap: break-word;
                font-weight: bold;
                color: #46b7b9;
            }
            .content {
                font-size: 13px;
            }
            .bottom {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                padding-right: 20px;
                color: #eeeeee;

                .bottom-right {
                    display: flex;
                    width: 200px;
                    justify-content: space-evenly;
                    align-items: flex-end;
                }
            }
        }
    }
</style>
