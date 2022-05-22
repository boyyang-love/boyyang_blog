<!--
 * @Author: boyyang
 * @Date: 2022-05-21 15:33:46
 * @LastEditTime: 2022-05-21 19:14:27
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\topMenu.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { HomeFilled } from '@vicons/antd'
    interface MenuEmits {
        (e: 'menuClick', val: number): void
    }
    const emits = defineEmits<MenuEmits>()
</script>

<template>
    <div class="p-2 mt-2">
        <n-space justify="center" align="center">
            <a href="#" class="nes-badge" @click="emits('menuClick', 0)">
                <span class="is-primary">上传</span>
            </a>

            <a href="#" class="nes-badge">
                <span class="is-success">审核</span>
            </a>

            <a href="#" class="nes-badge">
                <span class="is-warning">great</span>
            </a>

            <a href="#" class="nes-badge" @click="emits('menuClick', 2)">
                <span class="is-error">上一页</span>
            </a>

            <a href="#" class="nes-badge" @click="emits('menuClick', 1)">
                <span class="is-error">下一页</span>
            </a>
        </n-space>
    </div>
</template>

<style scoped></style>
