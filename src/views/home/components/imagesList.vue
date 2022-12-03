<!--
 * @Author: boyyang
 * @Date: 2022-09-02 16:17:48
 * @LastEditTime: 2022-12-03 14:47:28
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\components\imagesList.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import { EditFilled, DeleteFilled } from '@vicons/antd'
// hooks
import { useBanner } from '../hooks/useBanner'
import { useImages } from '../hooks/useImages'
import { useUser } from '../hooks/useUser'
// hooks
const { bannerData, openEdit } = useBanner()
const { del } = useImages()
const { userData } = useUser()
</script>

<template>
    <n-drawer v-model:show="bannerData.isShowAll" :width="502" placement="right">
        <n-drawer-content title="图片列表">
            <div class="w-full">
                <n-space justify="cneter" vertical>
                    <n-card v-for="item in bannerData.list" :key="item.id" :title="item.name">
                        <template #cover>
                            <n-image :src="item.url" lazy></n-image>
                        </template>
                        <div class="content">
                            <div class="mb-2">{{ item.des }}</div>
                            <n-space>
                                <n-tag strong v-for="tag in item.tags" :key="tag.id" :type="
                                    [
                                        'default',
                                        'primary',
                                        'info',
                                        'success',
                                        'warning',
                                        'error',
                                    ][Math.floor(Math.random() * 6)]
                                ">
                                    {{ tag }}
                                </n-tag>
                            </n-space>
                        </div>
                        <template #footer>
                            <n-space></n-space>
                            <n-space justify="end">
                                <n-icon v-if="userData.user.id == item.author.id"
                                    class="cursor-pointer hover:bg-purple-700" :component="EditFilled" size="18"
                                    @click="openEdit(item)"></n-icon>
                                <n-icon v-if="userData.user.id == item.author.id"
                                    class="cursor-pointer hover:bg-purple-700" :component="DeleteFilled" size="18"
                                    @click="del(item)"></n-icon>
                            </n-space>
                        </template>
                    </n-card>
                </n-space>
            </div>
        </n-drawer-content>
    </n-drawer>
</template>

<style scoped>

</style>

