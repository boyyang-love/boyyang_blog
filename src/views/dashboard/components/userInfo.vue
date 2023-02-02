<script lang="ts" setup>
    import {
        ManOutlined,
        WomanOutlined,
        LikeOutlined,
        HeartOutlined,
        SendOutlined,
    } from '@vicons/antd'

    interface userInfoProps {
        userInfo: dashboard_user_info
    }

    const props = withDefaults(defineProps<userInfoProps>(), {})
</script>

<template>
    <div class="info-wrapper">
        <div class="info-top">
            <n-space>
                <n-badge :dot="false" color="none" :offset="[-15, 15]">
                    <template #value>
                        <n-icon
                            :component="props.userInfo.gender == 1 ? ManOutlined : WomanOutlined"
                            :size="25"
                        />
                    </template>
                    <n-avatar
                        round
                        :size="58"
                        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    />
                </n-badge>
                <div class="name-email">
                    <span class="name">{{ props.userInfo.username }}</span>
                    <span class="email">{{ props.userInfo.tel }}</span>
                </div>
            </n-space>
        </div>
        <div class="info-bottom">
            <n-space justify="space-between">
                <div class="icon-item">
                    <n-badge :value="props.userInfo.thumbs_up" :dot="false">
                        <n-icon :component="LikeOutlined" :size="28" color="whitesmoke"></n-icon>
                    </n-badge>
                    <span>获赞</span>
                </div>
                <div class="icon-item">
                    <n-badge :value="props.userInfo.publish" :dot="false">
                        <n-icon :component="SendOutlined" :size="28" color="whitesmoke"></n-icon>
                    </n-badge>
                    <span>发布</span>
                </div>
                <div class="icon-item">
                    <n-badge :value="props.userInfo.like" :dot="false">
                        <n-icon :component="HeartOutlined" :size="28" color="whitesmoke"></n-icon>
                    </n-badge>
                    <span>收藏</span>
                </div>
            </n-space>
        </div>
    </div>
</template>

<style scoped lang="less">
    .info-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: #3d3b4f;
        padding: 20px 20px 10px;

        .info-top {
            .name-email {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-left: 15px;
                color: whitesmoke;
                font-size: 15px;

                .name {
                    font-weight: bold;
                }

                .email {
                    font-size: 15px;
                }
            }
        }

        .info-bottom {
            margin-top: 35px;

            .icon-item {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                span {
                    color: whitesmoke;
                    font-size: 13px;
                }
            }
        }
    }
</style>
