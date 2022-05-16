<!--
 * @Author: boyyang
 * @Date: 2022-04-05 18:04:57
 * @LastEditTime: 2022-04-09 12:30:46
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\components\Menu\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<template>
    <div class="menu">
        <n-space>
            <div v-for="(item, i) in props.menu">
                <n-popover trigger="hover">
                    <template #trigger>
                        <n-icon
                            :component="item.icon"
                            :size="item.size"
                            :color="item.color"
                            @click="item.iconClick"
                        ></n-icon>
                    </template>
                    <span>{{ item.name }}</span>
                </n-popover>
            </div>
        </n-space>
    </div>
</template>

<script lang="ts" setup>

export interface MenuProps {
    menu?: MenuPropsItem[]
}

export interface MenuPropsItem {
    name: string
    icon: any
    size: number
    color: string
    iconClick: () => void
}

const props = withDefaults(defineProps<MenuProps>(), {
    menu: () => [],
})

</script>

<style scoped lang="less">
.menu {
    box-sizing: border-box;
    width: 100vw;
    height: 65px;
    background-color: black;
    display: flex;
    align-items: center;
    padding: 0 50px;
}
.breadcrumb-content {
    display: flex;
    align-items: center;
}
</style>