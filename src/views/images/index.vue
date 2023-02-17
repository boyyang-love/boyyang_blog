<!--
 * @Author: boyyang
 * @Date: 2023-01-30 15:02:10
 * @LastEditTime: 2023-02-17 16:54:41
 * @LastEditors: boyyang
 * @Description: 所有图片展示
 * @FilePath: \blog_web\src\views\images\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { onMounted, nextTick, ref } from 'vue'
    import Wow from 'wow.js'

    // import { init } from './hooks/three'
    import { PrintText } from '@/components/PrintText'
    import ImgCard from './components/imgCard.vue'

    // hooks
    import { useImages } from './hooks/useImages'

    const { imagesData, getList, paginationOpt, pageChange, pageSizeChange } = useImages()

    const wrapper = ref<Element | null>(null)

    onMounted(() => {
        const wow = new Wow({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 100, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            callback: function () {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: '#images-container', // optional scroll container selector, otherwise use window
        })

        wow.init()

        getList()
    })
</script>

<template>
    <div class="images-wrapper container m-auto" ref="wrapper" id="images-container">
        <div class="top-banner">
            <PrintText title="壁纸"></PrintText>
        </div>

        <div class="images-content">
            <ImgCard
                v-for="(item, i) in imagesData.list"
                :key="i"
                class="wow fadeInDownBig"
                :class="[
                    'wow',
                    i % 2 == 0 ? 'fadeInDownBig' : i % 3 == 0 ? 'fadeInRightBig' : 'fadeInLeftBig',
                ]"
                :url="item.cover"
                :name="item.title"
            ></ImgCard>
        </div>
        <div class="pagination wow bounceInUp">
            <n-pagination
                v-model:item-count="imagesData.count"
                v-model:page="imagesData.page"
                v-model:page-size="imagesData.limit"
                v-model:page-sizes="imagesData.pageSizes"
                @update:page-size="pageSizeChange"
                @update:page="pageChange"
                show-size-picker
            />
        </div>
    </div>
</template>

<style scoped lang="less">
    .images-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        .top-banner {
            width: 100%;
            height: 650px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .images-content {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;
            padding: 50px 150px;
        }

        .pagination {
            width: 100%;
            display: flex;
            justify-content: center;

            padding: 50px 0;
        }
    }
</style>
