<!-- @format -->

<!--
 * @Author: boyyang
 * @Date: 2022-04-10 19:17:06
 * @LastEditTime: 2022-06-05 11:51:25
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\editUserinfo.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import { useUserInfo } from '../hooks/useUserInfo'
    // hooks
    const { userInfoData, logout, submit } = useUserInfo()

    // domRef
    const submitRef = ref<FormInst | null>(null)
    const uploadRef = ref<FormInst | null>(null)
</script>

<template>
    <n-modal
        v-model:show="userInfoData.showModel"
        preset="dialog"
        title="修改信息"
        content="你确认?"
        positive-text="确认"
        negative-text="退出登录"
        :show-icon="false"
        @positive-click="submit(submitRef)"
        @negative-click="logout"
        style="width: 465px; background-color: rgba(0, 0, 0, 0.5)"
    >
        <n-form
            label-width="50px"
            ref="submitRef"
            :model="userInfoData.form"
            :rules="userInfoData.rules"
        >
            <!-- <n-form-item label="头像">
                <n-upload
                    ref="uploadRef"
                    :action="env.VITE_APP_API_URL + '/api/upload'"
                    :headers="userInfoData.headers"
                    :max="1"
                    :default-upload="true"
                    accept="image/*"
                    @finish="finish"
                >
                    <img :src="env.VITE_APP_IMG_URL + userInfo.avaterUrl" class="avater-img" />
                </n-upload>
            </n-form-item> -->
            <n-form-item label="用户名：" path="username">
                <n-input v-model:value="userInfoData.form.username"></n-input>
            </n-form-item>
            <n-form-item label="电话：">
                <n-input v-model:value="userInfoData.form.tel_phone"></n-input>
            </n-form-item>
            <n-form-item label="邮箱：">
                <n-input v-model:value="userInfoData.form.email"></n-input>
            </n-form-item>
            <n-form-item label="年龄：">
                <n-input-number
                    v-model:value="userInfoData.form.age"
                    :show-button="false"
                    class="w-full"
                ></n-input-number>
            </n-form-item>
            <n-form-item label="性别：">
                <n-switch
                    :checked-value="1"
                    :unchecked-value="0"
                    v-model:value="userInfoData.form.sex"
                >
                    <template #checked>男</template>
                    <template #unchecked>女</template>
                </n-switch>
            </n-form-item>
        </n-form>
    </n-modal>
</template>

<style scoped lang="less">
    .avater-img {
        box-sizing: border-box;
        width: 85px;
        height: 85px;
        // border-radius: 100%;
        border-radius: 5px;
    }
</style>
