<!--
 * @Author: boyyang
 * @Date: 2022-05-08 10:45:44
 * @LastEditTime: 2022-05-08 11:15:46
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\components\pixDialog\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { watch, nextTick } from 'vue'

    interface PixDialogProps {
        isShow?: boolean
        title?: string
        content?: string
        confirmText?: string
        cancelText?: string
    }

    interface PixDialogEmits {
        (e: 'update:isShow', value: boolean): void
    }

    const props = withDefaults(defineProps<PixDialogProps>(), {
        isShow: false,
        title: '提示',
        content: '如果痛恨所处的黑暗，请你成为你想要的光',
        confirmText: '确定',
        cancelText: '关闭',
    })

    const emits = defineEmits<PixDialogEmits>()

    watch(
        () => props.isShow,
        n_value => {
            if (n_value) {
                nextTick(() => {
                    ;(document.getElementById('dialog-default') as any).showModal()
                })
            }
        }
    )

    const close = () => {
        emits('update:isShow', false)
    }
</script>

<template>
    <div>
        <!-- Dialog -->
        <dialog class="nes-dialog" id="dialog-default" ref="dialog">
            <form method="dialog">
                <p class="title">
                    <span class="text">{{ props.title }}</span>
                </p>
                <p>
                    <span class="text">{{ props.content }}</span>
                </p>
                <menu class="dialog-menu">
                    <n-space>
                        <button class="btn nes-btn" @click="close">
                            <span class="text">{{ props.cancelText }}</span>
                        </button>
                        <button class="btn nes-btn is-primary" @click="close">
                            <span class="text">
                                {{ props.confirmText }}
                            </span>
                        </button>
                    </n-space>
                </menu>
            </form>
        </dialog>
    </div>
</template>

<style scoped lang="less">
    .btn {
        min-width: 130px;
    }

    .text {
        font-family: zpix;
    }
</style>
