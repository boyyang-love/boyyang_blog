<script lang="ts" setup>
import {reactive, ref, markRaw} from 'vue'
import {Star, Rocket, Create} from '@vicons/ionicons5'

const showOrEdit = ref<boolean>(false)
const motto = ref<string>("第一行没有你，第")

const tabList = ref([
    {
        icon: markRaw(Rocket) as any,
        label: '发布',
        size: 20,
        num: 10,
    },
    {
        icon: markRaw(Create) as any,
        label: '审核中',
        size: 20,
        num: 10,
    },
    {
        icon: markRaw(Star) as any,
        label: '收藏',
        size: 20,
        num: 10,
    },
])

const rightList = ref([
    {
        label: '关注数',
        num: 2000,
    },
    {
        label: '粉丝数',
        num: 2000,
    },
    {
        label: '获赞数',
        num: 2000,
    },
])
</script>

<template>
    <div class="userinfo-card-wrapper">
        <div class="top">
            <div class="userinfo">
                <div class="user-avater">
                    <img alt="avater" src="@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg">
                </div>
                <div class="user-motto-name">
                    <div class="user-name">boyyang</div>
                    <div class="user-motto">
                        <n-input
                            v-if="showOrEdit"
                            v-model:value="motto"
                            autofocus
                            type="text"
                            @blur="showOrEdit = false"
                        ></n-input>
                        <div
                            v-else
                            @click="showOrEdit = true"
                        >
                            {{ motto }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <n-space align="center" justify="center">
                    <div v-for="item in tabList" :key="item.label" class="icon-wrapper">
                        <n-icon :component="item.icon" class="icon" size="20"></n-icon>
                        <span class="text">{{ item.label }}</span>
                        <span class="num">{{ item.num }}</span>
                    </div>
                </n-space>
            </div>
            <div class="bottom-right">
                <n-space>
                    <div class="right-list" v-for="item in rightList" :key="item.label">
                        <span class="label">{{item.label}}</span>
                        <span class="num">{{ item.num}}</span>
                    </div>
                </n-space>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.userinfo-card-wrapper {
    @bottomH: 45px;
    @borderRadius: 5px;
    width: 100%;
    height: 250px;
    background-color: rgba(67, 62, 70, 0.5);
    border-radius: @borderRadius;

    .top {
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - @bottomH);
        background-image: url('@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg');
        background-size: cover;
        background-position: center top;
        transition: all .5s cubic-bezier(.4, 0, .2, 1);
        display: flex;
        align-items: flex-end;
        padding: 10px;

        &:hover {
            background-position: center bottom;
        }

        .userinfo {
            display: flex;
            align-items: center;
            justify-content: center;

            .user-avater {
                @wh: 80px;
                box-sizing: border-box;
                width: @wh;
                height: @wh;
                border-radius: 100%;
                overflow: hidden;
                border: 3px solid whitesmoke;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .user-motto-name {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                padding-left: 15px;
                height: 100%;

                .user-name {
                    font-size: 19px;
                    font-weight: 800;
                    color: whitesmoke;
                    text-shadow: 2px 2px rgba(0, 0, 0, .5);
                    margin-bottom: 10px;
                }

                .user-motto {
                    color: whitesmoke;
                    font-size: 15px;
                }
            }
        }
    }

    .bottom {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: @bottomH;
        background-color: rgb(245, 245, 245);
        border-radius: 0 0 @borderRadius @borderRadius;
        padding: 0 20px;

        .bottom-left {
            box-sizing: border-box;
            height: 100%;
            display: flex;
            align-items: center;

            .icon-wrapper {
                display: flex;
                align-items: center;
                cursor: pointer;

                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .text {
                    font-size: 14px;
                    font-weight: bolder;
                    color: deeppink;
                    padding: 0 5px 0 10px;
                }

                .num {
                    font-size: 13px;
                    color: #7e7c7c;
                }
            }

        }

        .bottom-right {
            box-sizing: border-box;

            .right-list {
                display: flex;
                justify-content: center;
                flex-direction: column;

                .label,
                .num {
                    text-align: center;
                }

                .label {
                    color: deeppink;
                    font-weight: bolder;
                    font-size: 13px;
                }

                .num {
                    color: #7e7c7c;
                    font-size: 13px;
                }
            }
        }
    }
}
</style>