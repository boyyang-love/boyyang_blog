<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:28:46
 * @LastEditTime: 2022-05-16 12:47:55
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\login\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import BackGround from '@/components/Background/index.vue'
    import LoginBox from './components/loginBox.vue'
    import PixDialog from '@/components/pixDialog/index.vue'
    import { useLogin } from './hooks/useLogin'
    // hooks
    const { loginData, signIn, signUp } = useLogin()
</script>

<template>
    <back-ground width="100vw" height="100vh">
        <div class="login-container m-20">
            <login-box
                v-model:username="loginData.username"
                v-model:password="loginData.password"
                v-model:is-rember="loginData.isRember"
                :progress="loginData.progress"
                v-on:sign-in="signIn"
                v-on:sign-up="signUp"
            ></login-box>
        </div>
        <pix-dialog v-model:is-show="loginData.isShowDialog" :content="loginData.dialogContent"></pix-dialog>
    </back-ground>
</template>

<style scoped lang="less">
    .login-container {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
