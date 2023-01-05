<!--
 * @Author: boyyang
 * @Date: 2022-12-30 15:41:58
 * @LastEditTime: 2023-01-03 14:38:23
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\home\components\exhibitionList.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { useExhibition } from '../hooks/useExhibition'

    const { exhibitionData, getExhibitionList } = useExhibition()
    let ism = ref<boolean>(false)
    onMounted(() => {
        getExhibitionList()
    })

    const leave = () => {
        const t = setTimeout(() => {
            ism.value = false
            clearTimeout(t)
        }, 3000)
    }
</script>

<template>
    <div class="ex-wrapper">
        <div class="images-box">
            <TransitionGroup name="list" tag="ul">
                <div @mouseover="ism = true" @mouseleave="leave" key="t-0">
                    <n-carousel
                        :current-index="exhibitionData.currentIndex"
                        keyboard
                        autoplay
                        dot-placement="right"
                    >
                        <div class="carousel-img" v-for="item in exhibitionData.exhibitionList">
                            <img :key="item.id" class="img" :src="item.cover" :alt="item.title" />
                        </div>
                    </n-carousel>
                </div>

                <div class="images-preview" v-if="ism" key="t-1">
                    <div class="preview-img" v-for="(item, i) in exhibitionData.exhibitionList">
                        <img
                            :key="item.id"
                            :src="item.cover"
                            :alt="item.title"
                            class="img"
                            @click="exhibitionData.currentIndex = i"
                        />
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped lang="less">
    .ex-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .images-box {
            box-sizing: border-box;
            width: 70%;
            height: 65%;
            position: relative;
            overflow: hidden;
            border: 15px solid #3d3b4f;
            border-radius: 5px;
            -webkit-box-reflect: below 10px linear-gradient(transparent 60%, rgba(0, 0, 0, 0.5));

            .carousel-img {
                .img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .images-preview {
                box-sizing: border-box;
                width: 100%;
                height: 150px;
                padding: 10px 0;
                position: absolute;
                bottom: -10px;
                background-color: rgba(19, 18, 18, 0.3);
                display: flex;
                justify-content: flex-start;
                overflow-x: auto;

                transition: all 1s linear;

                .preview-img {
                    box-sizing: border-box;
                    height: 100%;
                    min-width: 250px;
                    overflow: hidden;
                    border: 5px solid whitesmoke;
                    margin: 0 3px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        cursor: pointer;
                        overflow: hidden;
                    }

                    img:hover {
                        transition: all 0.5s ease;
                        transform: scale(1.1);
                    }
                }
            }
        }
    }

    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 1.5s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateY(100px);
    }
    /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
    .list-leave-active {
        position: absolute;
    }
</style>
