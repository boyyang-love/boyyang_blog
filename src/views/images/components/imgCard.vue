<script lang="ts" setup>
import {StarOutlined} from '@vicons/antd'
import {Fitness, Close} from '@vicons/ionicons5'

interface imgCardProps {
    url?: string
    name?: string
    id?: number | string
    isLike?: boolean
}

interface emit {
    (e: 'del', id: number | string): void
    (e: 'like', id: number | string, likeStatus: boolean): void
}

const props = withDefaults(defineProps<imgCardProps>(), {
    url: '',
    name: '',
    id: 0,
    isLike: false,
})

const emit = defineEmits<emit>()
const del = () => {
    emit('del', props.id)
}

const like = () => {
    emit('like', props.id, !props.isLike)
}
</script>

<template>
    <div class="img-card-wrapper">

        <n-image
            :src="props.url"
            class="img"
            lazy
            object-fit="cover"
        >
            <template #placeholder>
                <div class="loading">
                    <n-icon
                        :component="Fitness as any"
                        class="icon"
                        color="#f00056"
                        size="55"
                    ></n-icon>
                </div>
            </template>
        </n-image>
        <div class="img-card-bottom">
            <div class="left-text">
                <n-ellipsis style="max-width: 240px">
                    {{ props.name }}
                </n-ellipsis>
            </div>
            <div class="right-icon">
                <n-icon
                    :component="StarOutlined as any"
                    :color="props.isLike ? 'red' : 'white'"
                    class="star-icon"
                    size="18"
                    @click="like"
                ></n-icon>
                <n-icon
                    :component="Close as any"
                    class="del-icon"
                    size="18"
                    @click="del"
                ></n-icon>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.img-card-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 250px;
    background-color: #3d3b4f;
    border: 4px solid whitesmoke;
    border-radius: 2px;
    box-shadow: 5px 2px 3px #393e46;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;

    .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: left top;
        transition: all 1s linear;

        &:hover {
            object-position: right bottom;

        }

        .loading {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &:hover {
        z-index: 9;
        transform: scale(1.1);
        //border: 1px solid black;
    }

    .img-card-bottom {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        background-color: rgba(57, 62, 70, 0.9);
        padding: 3px 5px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .left-text {
            font-size: 13px;
            color: #66dda3;
            font-weight: bold;
        }

        .right-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            .star-icon {
                cursor: pointer;
                margin: 0 10px;
            }

            .del-icon {
                cursor: pointer;
                color: #ffffff;

                &:hover {
                    color: #ff8a14;
                }
            }
        }
    }
}
</style>
