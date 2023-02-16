<script lang="ts" setup>
    import { GithubOutlined, QqOutlined, WechatOutlined } from '@vicons/antd'

    interface userProps {
        userInfo: dashboard_user_info
    }
    const props = withDefaults(defineProps<userProps>(), {})

</script>

<template>
    <div class="user-wrapper">
        <div class="header">
            <n-avatar
                class="header-img wow slideInDown"
                round
                bordered
                :size="95"
                :src="props.userInfo.avatar_url"
            />
            <div class="user-name wow slideInDown" data-wow-delay="0.5s">
                {{ props.userInfo.username }}
            </div>
            <div class="user-signature wow slideInDown" data-wow-delay="1s">
                hgghklsjslfhshajflajfhie
            </div>
            <div class="info">
                <div class="icon-item wow pulse" data-wow-delay="3s">
                    <!-- <n-badge :value="10" :dot="false">
                        <n-icon :component="LikeOutlined" :size="28" color="#3d3b4f"></n-icon>
                    </n-badge> -->
                    <span class="text">获赞</span>
                    <span class="num">{{ props.userInfo.thumbs_up || 0 }}</span>
                </div>
                <div class="icon-item wow pulse" data-wow-delay="4s">
                    <!-- <n-badge :value="12" :dot="false">
                        <n-icon :component="SendOutlined" :size="28" color="#3d3b4f"></n-icon>
                    </n-badge> -->
                    <span class="text">发布</span>
                    <span class="num">{{ props.userInfo.publish || 0 }}</span>
                </div>
                <div class="icon-item wow pulse" data-wow-delay="5s">
                    <!-- <n-badge :value="20" :dot="false">
                        <n-icon :component="HeartOutlined" :size="28" color="#3d3b4f"></n-icon>
                    </n-badge> -->
                    <span class="text">收藏</span>
                    <span class="num">{{ props.userInfo.like || 0 }}</span>
                </div>
                <div class="icon-item wow pulse" data-wow-delay="6s">
                    <!-- <n-badge :value="22" :dot="false">
                        <n-icon :component="StarOutlined" :size="28" color="#3d3b4f"></n-icon>
                    </n-badge> -->
                    <span class="text">粉丝</span>
                    <span class="num">{{ props.userInfo.following || 0 }}</span>
                </div>
            </div>
            <div class="btn-wrapper">
                <n-space justify="space-around">
                    <n-icon :component="GithubOutlined" color="whitesmoke" size="30"></n-icon>
                    <n-icon :component="QqOutlined" color="whitesmoke" size="30"></n-icon>
                    <n-icon :component="WechatOutlined" color="whitesmoke" size="30"></n-icon>
                </n-space>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .user-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .header-img {
                border: 5px solid whitesmoke;
            }

            .user-name {
                font-size: 16px;
                font-weight: bold;
                margin-top: 10px;
                color: whitesmoke;
                text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
            }

            .user-signature {
                font-size: 14px;
                color: whitesmoke;
                text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
            }

            .info {
                box-sizing: border-box;
                width: 100%;
                margin-top: 15px;
                padding: 0 5px;
                display: flex;
                justify-content: space-between;

                .icon-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .text {
                        font-size: 15px;
                        color: whitesmoke;
                        font-weight: bold;
                        text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
                    }

                    .num {
                        font-size: 14px;
                        color: whitesmoke;
                    }
                }
            }

            .btn-wrapper {
                box-sizing: border-box;
                width: 100%;
                margin-top: 20px;
            }
        }
    }
</style>
