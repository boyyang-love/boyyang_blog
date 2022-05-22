<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:29:18
 * @LastEditTime: 2022-05-21 19:15:52
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import Background from '@/components/Background/index.vue'
    import Upload from './components/upload.vue'
    import Edit from './components/edit.vue'
    import Cards from './components/cards.vue'
    import TopMenu from './components/topMenu.vue'
    import { useImages } from './hooks/useImages'
    import { useHome } from './hooks/useHome'

    // hooks
    const { imagesData, submit, prevPage, nextPage, edit } = useImages()

    const menuClick = (e: number) => {
        switch (e) {
            case 0:
                imagesData.showModal = true
                break
            case 1:
                nextPage()
                break
            case 2:
                prevPage()
                break
            default:
                return
        }
    }
</script>

<template>
    <background width="100vw" height="100vh">
        <top-menu @menu-click="menuClick"></top-menu>
        <div class="card-wrapper">
            <div class="container mx-auto px-4">
                <n-space>
                    <template v-for="item in imagesData.list" :key="item.ID">
                        <cards
                            :id="item.ID"
                            :title="item.name"
                            :url="item.url"
                            :des="item.des"
                            :user-name="item.author.username"
                            :avater="item.author.avaterUrl"
                            :time="item.CreatedAt"
                            :isloading="imagesData.isloading"
                            :status="item.status"
                            @edit="edit"
                        ></cards>
                    </template>
                </n-space>
            </div>
            <n-back-top :right="40" />
        </div>
    </background>

    <n-modal v-model:show="imagesData.showModal">
        <div class="upload-container">
            <Upload @submit="submit"></Upload>
        </div>
    </n-modal>
    <n-modal v-model:show="imagesData.showEditModal">
        <div class="upload-container">
            <Edit></Edit>
        </div>
    </n-modal>
</template>

<style scoped lang="less">
    .card-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 10px 100px 200px;
        overflow-y: auto;
    }
</style>
