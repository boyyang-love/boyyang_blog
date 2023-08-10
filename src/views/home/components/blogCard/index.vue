<script lang="ts" setup>
import {useRouter} from 'vue-router'
import {
  HeartOutlined,
  StarOutlined,
  CommentOutlined,
  SendOutlined,
  CloseCircleOutlined,
} from '@vicons/antd'
import moment from 'moment'

interface blogCardProps {
  isReverse: boolean
  title: string
  subtitle: string
  cover: string
  author: string
  time: number | string
  id: number
}

const router = useRouter()

const props = withDefaults(defineProps<blogCardProps>(), {
  isReverse: false,
})

const emits = defineEmits<{
  (e: 'cardClick'): void
  (e: 'delClick', id: number): void
}>()

const toBlogDetail = () => {
  emits('cardClick')
}
</script>

<template>
  <div :class="['card-wrapper', { 'is-reverse': props.isReverse }]">
    <div class="left">
      <div class="mask" @click="toBlogDetail">
        <n-icon
            :component="SendOutlined as any"
            class="send-icon"
            color="whitesmoke"
            size="25"
        ></n-icon>
      </div>

      <img :alt="props.cover" :src="props.cover"/>
    </div>
    <div class="right">
      <div class="title">
        <n-ellipsis :line-clamp="1" style="max-width: 520px" width="trigger">
          {{ props.title }}
        </n-ellipsis>
      </div>
      <div class="sub-title">
        <n-ellipsis :line-clamp="3" :tooltip="false" style="max-width: 520px">
          {{ props.subtitle }}
        </n-ellipsis>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <n-space vertical size="small">
            <div class="user">作者: {{ props.author }}</div>
            <div class="time">时间: {{ moment(props.time * 1000).format('YYYY-MM-DD') }}</div>
          </n-space>
        </div>
        <div class="bottom-right">
          <n-badge
              :dot="false"
              :max="999"
              :value="10"
              type="error"
          >
            <n-icon :component="HeartOutlined as any" size="27"></n-icon>
          </n-badge>
          <n-badge
              :dot="false"
              :max="999"
              :value="10"
              type="error"
          >
            <n-icon :component="StarOutlined as any" size="27"></n-icon>
          </n-badge>
          <n-badge
              :dot="false"
              :max="999"
              :value="10"
              type="error"
          >
            <n-icon :component="CommentOutlined as any" size="27"></n-icon>
          </n-badge>
          <n-popconfirm
              @positive-click="emits('delClick', props.id)"
              positive-text="删了吧"
              negative-text="算了吧"
          >
            <template #trigger>
              <n-icon :component="CloseCircleOutlined as any" size="27"></n-icon>
            </template>
            删?还是不删呢?这是一个值得思考的问题
          </n-popconfirm>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.is-reverse {
  flex-direction: row-reverse;
}

.card-wrapper {
  box-sizing: border-box;
  height: 235px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  background: #cfd6dc;
  border-radius: 10px;
  align-items: center;

  .left {
    box-sizing: border-box;
    width: 400px;
    height: calc(100% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #c4cacf,
      -5px -5px 5px #ffffff;

    img {
      width: calc(100% - 5px);
      height: calc(100% - 5px);
      object-fit: cover;
      transition: all 0.5s linear;
      border-radius: 10px;
    }

    .mask {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .right {
    box-sizing: border-box;
    width: calc(100% - 420px);
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 10px;

    .title {
      font-size: 15px;
      font-weight: bolder;
      white-space: nowrap;
    }

    .sub-title {
      font-size: 13px;
      word-wrap: break-word;
      font-weight: bold;
    }

    .content {
      font-size: 13px;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      //padding-right: 20px;

      .bottom-left {

        .user {
          font-size: 12px;
          font-weight: bolder;
        }

        .time {
          font-family: "Fira Code";
          font-size: 12px;
        }
      }

      .bottom-right {
        display: flex;
        width: 200px;
        justify-content: space-evenly;
        align-items: flex-end;
      }
    }
  }
}
</style>
