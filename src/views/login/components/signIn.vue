<!--
 * @Author: boyyang
 * @Date: 2022-06-04 23:54:25
 * @LastEditTime: 2022-07-04 16:52:45
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\login\components\signIn.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import { useLogin } from '../hooks/useLogin'

    // hooks
    const { loginData, signIn, emailOptions, rules } = useLogin()

    const loginDomRef = ref<FormInst | null>(null)
</script>

<template>
    <n-modal
        v-model:show="loginData.isShowRegister"
        :show-icon="false"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }"
        id="register-container"
        preset="dialog"
        title="注册"
        content="你确认?"
        positive-text="确认"
        negative-text="取消"
        class="bg-opacity-30"
        @positive-click="signIn(loginDomRef)"
    >
        <n-form :model="loginData" :rules="rules" ref="loginDomRef">
            <n-form-item label="用户名：" path="username">
                <n-input
                    v-model:value="loginData.username"
                    placeholder="请输入账号"
                    type="text"
                ></n-input>
            </n-form-item>
            <n-form-item label="邮箱：" path="email">
                <n-auto-complete
                    v-model:value="loginData.email"
                    :input-props="{ autocomplete: 'disabled' }"
                    :options="emailOptions"
                    placeholder="邮箱"
                />
            </n-form-item>
            <n-form-item label="密码：" path="password">
                <n-input
                    v-model:value="loginData.password"
                    placeholder="请输入密码"
                    type="password"
                ></n-input>
            </n-form-item>
            <n-form-item label="重复密码：" path="repassword">
                <n-input
                    v-model:value="loginData.repassword"
                    placeholder="请输入密码"
                    type="password"
                ></n-input>
            </n-form-item>
        </n-form>
    </n-modal>
</template>

<style scoped></style>

<style lang="less">
    // 在使用浏览器保存的数据时 输入框的样式
    #register-container input:-webkit-autofill,
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
