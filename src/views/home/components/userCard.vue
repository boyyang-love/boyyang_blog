<!--
 * @Author: boyyang
 * @Date: 2022-04-09 16:17:20
 * @LastEditTime: 2022-04-18 16:34:32
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\userCard.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { NGradientText, UploadFileInfo, useMessage } from 'naive-ui'
    import { ManOutlined, WomanOutlined, CloudUploadOutlined } from '@vicons/antd'
    import { env } from '@/utils/env'
    import { useUserStore } from '@/store/modules/user'

    const userStore = useUserStore()

    const userInfo = userStore.getUserInfo as any

    interface CardInfoEmits {
        (e: 'close'): void
        (e: 'upload'): void
        (e: 'editUser'): void
    }

    const emits = defineEmits<CardInfoEmits>()
</script>

<template>
    <div class="card-box">
        <n-card>
            <n-space :wrap="false" align="center" justify="space-between">
                <n-avatar
                    round
                    bordered
                    object-fit="cover"
                    :size="60"
                    :src="env.VITE_APP_IMG_URL + userInfo.avaterUrl"
                    @click="$emit('editUser')"
                />
                <div>
                    <n-space vertical>
                        <span>
                            <n-space>
                                <span class="name">
                                    <n-gradient-text type="info" :size="15">
                                        <span>{{ userInfo.username }}</span>
                                    </n-gradient-text>
                                </span>
                                <span>
                                    <n-icon
                                        color="white"
                                        :size="22"
                                        :component="userInfo.sex == 1 ? ManOutlined : WomanOutlined"
                                    ></n-icon>
                                </span>
                            </n-space>
                        </span>
                        <span class="email">
                            <n-gradient-text type="danger" :size="13">
                                <span>{{ userInfo.email }}</span>
                            </n-gradient-text>
                        </span>
                    </n-space>
                </div>
                <div>
                    <n-icon
                        :component="CloudUploadOutlined"
                        :size="30"
                        class="upload-icon"
                        @click="$emit('upload')"
                    ></n-icon>
                </div>
            </n-space>
        </n-card>
    </div>
</template>

<style scoped lang="less">
    .card-box {
        box-sizing: border-box;
        min-width: 300px;
        height: 100%;
        background-color: aliceblue;
        border-radius: 5px;
    }

    .upload-icon {
        cursor: pointer;

        &:hover {
            color: #1890ff;
        }
    }
</style>
