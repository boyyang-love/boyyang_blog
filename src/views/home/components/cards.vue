<!--
 * @Author: boyyang
 * @Date: 2022-05-08 17:45:42
 * @LastEditTime: 2022-06-04 14:21:48
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\cards.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { imageDownload } from '@/utils/fileDownload'
    import moment from 'moment'
    import { ref } from 'vue'
    interface CardProps {
        id: number
        title?: string
        url?: string
        des?: string
        avater?: string
        userName?: string
        time?: string
        status?: number
    }
    interface CardEmits {
        (e: 'edit', val: CardProps): void
        (e: 'del', val: CardProps): void
    }
    interface Download {
        url: string
        name: string
    }
    const props = withDefaults(defineProps<CardProps>(), {
        title: 'boyyang',
        url: '',
        des: '如果痛恨所处的黑暗，请你成为你想要的光',
        avater: '',
        userName: 'boyyang',
        time: '0520-13-14',
        status: 0,
    })
    const emits = defineEmits<CardEmits>()
    const isloading = ref<boolean>(false)
    const download = (url: string, name: string) => {
        isloading.value = true
        imageDownload(url, name).then(() => {
            isloading.value = false
        })
    }
    const edit = () => {
        const editData = { ...props }
        emits('edit', editData)
    }
    const del = () => {
        const delData = { ...props }
        emits('del', delData)
    }
</script>

<template>
    <n-spin :show="isloading" size="medium">
        <template #description>
            <span class="text">图片正在处理中,请稍等</span>
        </template>
        <div class="nes-container is-rounded is-dark with-title card">
            <p class="title">
                <span class="text">
                    {{ props.title }}
                </span>
            </p>
            <div class="w-auto">
                <n-image :src="props.url" object-fit="cover"></n-image>
                <!-- <img :src="props.url" class="w-auto"> -->
            </div>
            <div class="img-des">
                <section class="nes-container">
                    <section class="message-list">
                        <n-space justify="space-between" align="center" :wrap="false">
                            <div class="nes-balloon from-right">
                                <div class="text-des">{{ props.des }}</div>
                            </div>
                            <i class="nes-charmander"></i>
                        </n-space>
                    </section>
                </section>
            </div>
            <div class="user-content">
                <n-space justify="space-around" align="center" :wrap="false">
                    <a href="#" class="nes-badge">
                        <span class="is-error">
                            <span class="text">{{ props.status == 0 ? '图片审核中' : '' }}</span>
                        </span>
                    </a>
                    <a href="#" class="nes-badge">
                        <span class="is-primary">
                            <span class="text">{{ props.userName }}</span>
                        </span>
                    </a>
                    <a href="#" class="nes-badge">
                        <span class="is-success">
                            <span class="text">{{ moment(props.time).format('YYYY-MM-DD') }}</span>
                        </span>
                    </a>
                    <a href="#" class="nes-badge is-icon">
                        <span class="is-dark down-text">exit</span>
                        <span class="is-warning">
                            <span class="text" @click="edit">修改</span>
                        </span>
                    </a>
                    <a href="#" class="nes-badge is-icon">
                        <span class="is-dark down-text">download</span>
                        <span class="is-warning">
                            <span class="text" @click="download(props.url, props.title)">下载</span>
                        </span>
                    </a>
                    <a href="#" class="nes-badge is-icon">
                        <span class="is-dark down-text">delete</span>
                        <span class="is-error">
                            <span class="text" @click="del">删除</span>
                        </span>
                    </a>
                </n-space>
            </div>
        </div>
    </n-spin>
</template>

<style scoped lang="less">
    .card {
        .user-content {
            margin-top: 20px;
        }
        .text-des {
            width: 100%;
            font-family: zpix;
            font-weight: bold;
            color: black;
        }
        .text {
            font-family: zpix;
            color: rgb(240, 240, 240);
            font-size: 13px;
            font-weight: bolder;
        }
    }
    @media screen and (max-width: 500px) {
        .nes-container {
            // width: 370px;
            padding: 5px;
        }
        .card {
            padding: 0;
            .text {
                font-size: 13px !important;
            }
            .text-des {
                font-size: 10px;
            }
            .nes-badge {
                box-sizing: border-box;
                width: 90px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .nes-charmander {
                display: none;
                width: 50px;
            }
        }
    }
</style>
