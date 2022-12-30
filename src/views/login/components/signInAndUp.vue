<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:39:54
 * @LastEditTime: 2022-12-30 11:02:37
 * @LastEditors: boyyang
 * @Description: 登录
 * @FilePath: \blog_web\src\views\login\components\signInAndUp.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { UserOutlined, KeyOutlined, PhoneOutlined } from '@vicons/antd'
    import { useLogin } from '../hooks/useLogin'

    const { loginData, submit } = useLogin()
</script>

<template>
    <div class="sign-in-wrapper" id="sign-in-wrapper">
        <div class="box-wrapper">
            <div class="title-wrapper">
                <div class="title-left" v-if="loginData.isSignIn">登录</div>
                <div class="title-right" v-else>注册</div>
            </div>
            <div class="box-input">
                <TransitionGroup name="list" tag="ul">
                    <n-input
                        type="text"
                        size="large"
                        placeholder="请输入用户名"
                        class="input-ani"
                        v-model:value="loginData.username"
                        key="list-0"
                    >
                        <template #prefix>
                            <n-icon :component="UserOutlined" />
                        </template>
                    </n-input>
                    <n-input
                        type="text"
                        size="large"
                        placeholder="请输入手机号"
                        class="input-ani"
                        v-if="!loginData.isSignIn"
                        v-model:value="loginData.tel"
                        key="list-1"
                    >
                        <template #prefix>
                            <n-icon :component="PhoneOutlined" />
                        </template>
                    </n-input>
                    <n-input
                        type="password"
                        size="large"
                        placeholder="请输入密码"
                        class="input-ani"
                        show-password-on="mousedown"
                        v-model:value="loginData.password"
                        key="list-2"
                    >
                        <template #prefix>
                            <n-icon :component="KeyOutlined" />
                        </template>
                    </n-input>
                    <n-input
                        type="password"
                        size="large"
                        placeholder="请输入密码"
                        class="input-ani"
                        show-password-on="mousedown"
                        v-if="!loginData.isSignIn"
                        v-model:value="loginData.repassword"
                        key="list-3"
                    >
                        <template #prefix>
                            <n-icon :component="KeyOutlined" />
                        </template>
                    </n-input>
                </TransitionGroup>
            </div>
            <div class="box-btn">
                <div class="btn-left-wrapper">
                    <div class="btn btn-left" @click="loginData.isSignIn = false">SignUp</div>
                    <div class="btn btn-left" @click="loginData.isSignIn = true">SignIn</div>
                </div>
                <div class="btn btn-right" @click="submit(loginData.isSignIn)">Submit</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .sign-in-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: relative;

        .box-wrapper {
            box-sizing: border-box;
            width: 350px;
            // height: 400px;
            position: absolute;
            bottom: 25px;
            right: 20px;
            background-color: rgba(17, 17, 17, 0.4);
            border-radius: 3px;
            box-shadow: 3px 3px 2px rgba(26, 25, 25, 0.5);
            padding: 10px;

            display: flex;
            justify-content: space-between;
            flex-direction: column;

            overflow: hidden;
        }

        .title-wrapper {
            box-sizing: border-box;
            height: 30px;
            background-color: #3d3b4f;
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 14px;
            font-weight: bold;
            color: whitesmoke;
            border-radius: 2px;

            display: flex;
            justify-content: center;
            align-items: center;

            .title-left {
                animation: antText 1s linear;
            }

            .title-right {
                animation: antText 1s linear;
            }

            @keyframes antText {
                0% {
                    transform: translateX(-300px) translateY(-50px) rotateY(180 * 1deg);
                }
            }
        }

        .box-input {
            height: 65%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        .box-btn {
            box-sizing: border-box;
            height: 70px;
            padding: 0 10px;
            background-color: #3d3b4f;
            display: flex;
            justify-content: space-between;
            align-items: center;

            border-radius: 3px;
        }

        .btn-left-wrapper {
            box-sizing: border-box;
            width: 45%;
            display: flex;
            justify-content: space-between;
        }

        .btn-left {
            font-size: 13px;
            font-weight: 200;
            transform: scale(0.9);
        }

        .btn {
            box-sizing: border-box;
            width: 45%;
            height: 33px;
            background-image: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
            background-size: 400%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            font-size: 14px;
            font-weight: bolder;
            color: whitesmoke;

            border-radius: 15px;
        }

        .btn-right::before {
            content: '';
            position: absolute;
            top: -6px;
            bottom: -6px;
            left: -6px;
            right: -6px;
            border-radius: 15px;
            /* 背景渐变色 */
            background-image: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
            /* 背景渐变色大小 */
            background-size: 400%;
            /* 元素的位置 底层或者顶层  -值表示底层 + 值表示顶层 */
            z-index: -6;
            /* 设置模糊度 显示发光效果 */
            filter: blur(20px);
        }

        .btn:hover {
            /* 动画 名称 时间 infinite 是无限次播放 */
            animation: sun 7s infinite;
        }

        .btn:hover::before {
            animation: sun 7s infinite;
        }

        .input-ani {
            margin: 5px 0;
            animation: inputAni 1s ease;
        }

        @keyframes sun {
            100% {
                /* 背景位置 */
                background-position: -400% 0;
            }
        }

        @keyframes inputAni {
            0% {
                transform: translateX(-300px);
            }
        }
    }
    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 2s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
    .list-leave-active {
        position: absolute;
    }
</style>

<style>
    #sign-in-wrapper input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
        -webkit-text-fill-color: whitesmoke !important;
        background-color: transparent !important;
        background-image: none !important;
        box-shadow: 0 0 0px 1000px transparent inset !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        transition: background-color 50000s ease-in-out 0s;
    }
</style>
