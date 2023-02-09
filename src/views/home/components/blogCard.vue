<script lang="ts" setup>
    import { EyeOutlined, HeartOutlined, StarOutlined, CommentOutlined } from '@vicons/antd'
</script>

<template>
    <div class="card-wrapper">
        <div class="left">
            <img src="@/assets/森林冒险的少女画画5k壁纸_彼岸图网.jpg" alt="" />
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
                    <n-space>
                        <div>作者：yang</div>
                        <div>时间：2022-01-01</div>
                    </n-space>
                </div>
                <div class="bottom-right">
                    <n-badge :value="9000" :max="999" :dot="false" color="#1bd1a5" type="error">
                        <n-icon :component="EyeOutlined" size="25"></n-icon>
                    </n-badge>
                    <n-badge :value="10" :max="999" :dot="false" color="#1bd1a5" type="error">
                        <n-icon :component="HeartOutlined" size="25"></n-icon>
                    </n-badge>
                    <n-badge :value="10" :max="999" :dot="false" color="#1bd1a5" type="error">
                        <n-icon :component="StarOutlined" size="25"></n-icon>
                    </n-badge>
                    <n-badge :value="10" :max="999" :dot="false" color="#1bd1a5" type="error">
                        <n-icon :component="CommentOutlined" size="25"></n-icon>
                    </n-badge>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .card-wrapper {
        box-sizing: border-box;
        height: 175px;
        background-color: whitesmoke;
        border-radius: 2px;
        box-shadow: 2px 2px 2px rgba(22, 24, 35, 0.6);
        padding: 10px;
        display: flex;
        justify-content: space-between;
        .left {
            box-sizing: border-box;
            width: 340px;
            height: 100%;
            border-radius: 5px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .right {
            box-sizing: border-box;
            padding-left: 10px;
            width: calc(100% - 350px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
                font-size: 16px;
                font-weight: bold;
            }
            .sub-title {
                font-size: 14px;
                word-wrap: break-word;
                font-weight: bold;
            }
            .content {
                font-size: 13px;
            }
            .bottom {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                padding-right: 20px;

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
