<script lang="ts" setup>
import {computed} from 'vue'

interface Props {
    label?: string
    status: number // 1待审核 2审核通过 3未通过审核
}

const props = withDefaults(defineProps<Props>(), {
    status: 1,
})

const status = computed(() => {
    let _status = {
        label: '',
        color: 'deeppink'
    }
    switch (props.status) {
        case 1:
            _status = {
                label: props.label ? props.label : '待审核',
                color: 'deeppink',
            }
            break
        case 2:
            _status = {
                label: props.label ? props.label : '审核通过',
                color: '#00e09e',
            }
            break
        case 3:
            _status = {
                label: props.label ? props.label : '未通过审核',
                color: '#f00056',
            }
            break
        default:
            break
    }

    return _status
})
</script>

<template>
    <div class="like-list-wrapper">
        <div class="img-wrapper">
            <img alt="" src="@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg">
        </div>

        <div :style="{'--color': status.color}" class="status-wrapper">
            <div class="status-point"></div>
            <div class="status-text">{{ status.label }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.like-list-wrapper {
    @statusH: 45px;
    @radius: 5px;
    box-sizing: border-box;
    width: 450px;
    height: 250px;
    background-color: #fff;
    border-radius: 0 @radius;
    overflow: hidden;

    .img-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - @statusH);
        padding: 5px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0 @radius;
        }
    }

    .status-wrapper {
        @wh: 10px;
        box-sizing: border-box;
        width: 100%;
        height: @statusH;
        display: flex;
        align-items: center;
        padding: 0 10px;

        .status-point {
            box-sizing: border-box;
            width: @wh;
            height: @wh;
            border-radius: 100%;
            background-color: var(--color);
        }

        .status-text {
            font-size: 15px;
            color: var(--color);
            padding: 0 10px;
        }
    }
}
</style>