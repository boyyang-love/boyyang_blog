<!--
 * @Author: boyyang
 * @Date: 2022-06-04 23:38:03
 * @LastEditTime: 2022-07-01 13:24:29
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\login\components\signUp.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import { HeartFilled } from '@vicons/antd'
    import { useLogin } from '../hooks/useLogin'
    // hooks
    const { signUp, loginData } = useLogin()
    const loginDomRef = ref<FormInst | null>(null)
</script>

<template>
    <div class="w-full h-full" id="login-container">
        <n-form
            :model="loginData"
            :rules="loginData.rules"
            :show-require-mark="false"
            ref="loginDomRef"
            class="absolute bottom-0 w-full"
        >
            <div class="bg-black-300">
                <n-space justify="center" align="center">
                    <n-form-item label="账号：" path="username">
                        <n-input
                            v-model:value="loginData.username"
                            type="text"
                            placeholder="请输入账号"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="密码：" path="password">
                        <n-input
                            v-model:value="loginData.password"
                            type="password"
                            placeholder="请输入密码"
                        ></n-input>
                    </n-form-item>
                    <n-form-item>
                        <n-space align="center">
                            <n-button @click="signUp(loginDomRef)" :loading="loginData.loading">
                                登录
                            </n-button>
                            <n-button @click="loginData.isShowRegister = true">注册</n-button>
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <n-icon
                                        :component="HeartFilled"
                                        :size="25"
                                        color="#EC4899"
                                        class="circle mt-1 ml-2"
                                    ></n-icon>
                                </template>
                                没有账号?点击注册
                            </n-tooltip>
                        </n-space>
                    </n-form-item>
                </n-space>
            </div>
        </n-form>
    </div>
</template>

<style scoped lang="less">
    .circle {
        animation: circle 2.5s cubic-bezier(0.23, 1, 0.32, 1) infinite;
        @keyframes circle {
            0% {
                transform: scale(0.5);
                opacity: 0.1;
            }
            50% {
                transform: scale(1.4);
                opacity: 1;
            }
            100% {
                transform: scale(0.5);
                opacity: 0;
            }
        }
    }
</style>

<style lang="less">
    // 在使用浏览器保存的数据时 输入框的样式
    #login-container input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
        // 字体颜色
        -webkit-text-fill-color: whitesmoke !important;
        // 背景颜色
        background-color: transparent !important;
        // 背景图片
        background-image: none !important;
        //设置input输入框的背景颜色为透明色
        box-shadow: 0 0 0px 1000px transparent inset !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        transition: background-color 50000s ease-in-out 0s;
    }
</style>
