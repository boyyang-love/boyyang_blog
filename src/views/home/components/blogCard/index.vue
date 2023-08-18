<script lang="ts" setup>
import {useRouter} from 'vue-router'
import {
  SendOutlined,
} from '@vicons/antd'
import {
  CloseCircle,
} from '@vicons/ionicons5'
import moment from 'moment'

interface BlogCardOptions {
  isReverse?: boolean
  title?: string
  subtitle?: string
  cover?: string
  author?: string
  time?: number | string
  id?: number
  avatar_url?: string
}

interface Props {
  options?: BlogCardOptions
}

const router = useRouter()

const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return {
      isReverse: false,
    } as BlogCardOptions
  },
})

const emits = defineEmits<{
  (e: 'cardClick'): void
  (e: 'delClick', id?: number): void
}>()

const toBlogDetail = () => {
  emits('cardClick')
}
</script>

<template>
  <div :class="['card-wrapper', { 'is-reverse': props.options.isReverse }]">
    <div class="left">
      <div
          class="mask"
          @click="toBlogDetail"
      >
        <n-icon
            :component="SendOutlined as any"
            class="send-icon"
            color="whitesmoke"
            size="25"
        ></n-icon>
      </div>

      <img
          :alt="props.options.cover"
          :src="props.options.cover"
      />
    </div>
    <div class="right">
      <div class="title">
        <n-ellipsis
            :line-clamp="1"
            style="max-width: 520px"
            width="trigger"
        >
          {{ props.options.title }}
        </n-ellipsis>
      </div>
      <div class="sub-title">
        <n-ellipsis
            :line-clamp="3"
            :tooltip="false"
            style="max-width: 520px"
        >
          {{ props.options.subtitle }}
        </n-ellipsis>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="avatar">
            <n-avatar
                :size="65"
                :src="props.options.avatar_url"
                bordered
                class="header-img wow slideInDown"
                round
            />
          </div>
          <n-space vertical size="small">
            <div class="user">作者: {{ props.options.author }}</div>
            <div class="time">时间: {{ moment(props.options.time * 1000).format('YYYY-MM-DD') }}</div>
          </n-space>
        </div>
      </div>
    </div>

    <div class="del" :style="props.options.isReverse ? 'left: 5px' : 'right: 5px' ">
      <n-popconfirm
          @positive-click="emits('delClick', props.options.id)"
          positive-text="删了吧"
          negative-text="算了吧"
      >
        <template #trigger>
          <n-icon
              :component="CloseCircle as any"
              color="#c03f53"
          ></n-icon>
        </template>
        删?还是不删呢?这是一个值得思考的问题
      </n-popconfirm>
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
  justify-content: space-between;
  padding: 0 10px;
  background: #cfd6dc;
  border-radius: 10px;
  align-items: center;
  position: relative;
  display: flex;

  .left {
    flex: 1;
    box-sizing: border-box;
    //width: 400px;
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
    flex: 1;
    box-sizing: border-box;
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

      .bottom-left {
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar {
          margin-right: 15px;
        }

        .user {
          font-size: 12px;
          font-weight: bolder;
        }

        .time {
          font-family: "Fira Code", sans-serif;
          font-size: 12px;
        }
      }
    }
  }

  .del {
    position: absolute;
    top: 5px;
    border-radius: 50%;
    box-shadow: 4px 4px 4px #c4cacf,
      -4px -4px 4px #ffffff;
    display: flex;
    justify-content: center;
    padding: 1px;
    align-items: center;
    font-size: 24px;
  }
}

@media screen and (max-width: 1200px) {
  .card-wrapper {
    flex-direction: column;
    height: auto;
    padding: 15px 10px;

    .left {

    }

    .right {
      width: 100%;
      justify-content: flex-start;
    }

    .del {
      font-size: 15px;
    }
  }
}
</style>
