<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue'
    interface PrintTextProps {
        title?: string
        subtitle?: string
    }
    const props = withDefaults(defineProps<PrintTextProps>(), {
        title: 'BOYYANG',
        subtitle: '第一行没有你，第二行没有你，第三行没有也罢！',
    })

    const subTitleText = ref<string[]>([])

    onMounted(() => {
        beginAni()
    })

    const beginAni = () => {
        const titleArr = props.subtitle.split('')
        const len = titleArr.length
        let index = 0
        let t: NodeJS.Timer | null = null
        t && clearInterval(t)
        t = setInterval(() => {
            if (index <= len) {
                subTitleText.value.push(titleArr[index])
                index++
            } else if (subTitleText.value.length == 0) {
                index = 0
            } else {
                subTitleText.value.pop()
            }
        }, 500)
    }
</script>

<template>
    <div class="print-text-wrapper">
        <div class="print-text-title">⌈ {{ props.title }} ⌋</div>
        <div class="print-text-subtitle">
            <TransitionGroup name="list" tag="ul">
                <span class="inner-text" v-for="(item, i) in subTitleText" :key="i" :size="24">
                    {{ item }}
                </span>
                <span class="line" key="line">|</span>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped lang="less">
    .print-text-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: whitesmoke;

        .print-text-title {
            font-size: 35px;
            font-weight: bold;
            animation: scaleText 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
        }
        .print-text-subtitle {
            font-size: 18px;
            margin-top: 15px;
            font-weight: bold;

            .inner-text {
                font-weight: bold;
                padding: 5px;
                text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
            }

            .line {
                animation: show 0.9s ease-in-out infinite;
            }
        }

        @keyframes show {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;

                // color: blue;
            }
        }

        @keyframes scaleText {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(1.2);
            }
        }
    }

    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    .list-leave-active {
        position: absolute;
    }
</style>
