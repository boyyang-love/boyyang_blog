<!-- @format -->

<!--
 * @Author: boyyang
 * @Date: 2022-04-10 19:17:06
 * @LastEditTime: 2022-04-18 16:10:04
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\editUserinfo.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { env } from '@/utils/env'
    import { ref } from 'vue'
    import { useUserStore } from '@/store/modules/user'

    // hooks
    import { editUserData, submit, finish, logout } from '../hooks/useUserInfo'

    const userStore = useUserStore()
    const userInfo = userStore.getUserInfo as any

    // domRef
    const submitRef = ref<any>(null)
    const uploadRef = ref<any>(null)
</script>

<template>
    <n-modal
        v-model:show="editUserData.showModel"
        preset="dialog"
        title="修改信息"
        content="你确认?"
        positive-text="确认"
        negative-text="退出登录"
        :show-icon="false"
        @positive-click="submit(submitRef)"
        @negative-click="logout"
        style="width: 465px"
    >
        <n-form label-placement="left" label-width="50px" ref="submitRef">
            <n-form-item label="头像">
                <n-upload
                    ref="uploadRef"
                    :action="env.VITE_APP_API_URL + '/api/upload'"
                    :headers="editUserData.headers"
                    :max="1"
                    :default-upload="true"
                    accept="image/*"
                    @finish="finish"
                >
                    <img :src="env.VITE_APP_IMG_URL + userInfo.avaterUrl" class="avater-img" />
                </n-upload>
            </n-form-item>
            <n-form-item label="用户名">
                <n-input v-model:value="userInfo.username"></n-input>
            </n-form-item>
            <n-form-item label="电话">
                <n-input v-model:value="userInfo.tel"></n-input>
            </n-form-item>
            <n-form-item label="邮箱">
                <n-input v-model:value="userInfo.email"></n-input>
            </n-form-item>
            <n-form-item label="年龄">
                <n-input-number v-model:value="userInfo.age" :show-button="false"></n-input-number>
            </n-form-item>
            <n-form-item label="性别">
                <n-switch :checked-value="1" :unchecked-value="0" v-model:value="userInfo.sex">
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
