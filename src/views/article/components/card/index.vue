<script setup lang="ts">
import {CloseCircle} from '@vicons/ionicons5'
import {useArticle} from '../../hooks'
import moment from 'moment'
import {useUserStore} from '@/store/modules/user'
import CubeLoading from '@/components/CubeLoading/index.vue'

interface Props {
  uid: number
  cover: string
  title: string
  subTitle: string
  avatar: string
  username: string
  time: number | string
  userId: number
  badges: number[]
}

interface Emits {
  (e: 'cardClick', uid: number, userId: number): void

  (e: 'delClick'): void

  (e: 'userDetail', uid: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const userStore = useUserStore()


const {actionBtns} = useArticle()
</script>

<template>
  <div class="card-wrapper" id="article-card-wrapper">
    <div class="image">
      <n-image
          :preview-disabled="true"
          object-fit="cover"
          class="img"
          :src="props.cover"
          @click="$emit('cardClick', props.uid, props.userId)"
      >
        <template #placeholder>
          <div class="loading">
            <CubeLoading></CubeLoading>
          </div>
        </template>
      </n-image>
    </div>
    <div class="content">
      <div class="title">
        <n-ellipsis line-clamp="1" :tooltip="false">
          {{ props.title }}
        </n-ellipsis>
      </div>
      <div class="sub-title">
        <n-ellipsis line-clamp="2" :tooltip="false">
          {{ props.subTitle }}
        </n-ellipsis>
      </div>

      <div class="avatar">
        <n-avatar
            circle
            bordered
            :size="54"
            :src="props.avatar"
            @click="emits('userDetail', props.userId)"
        ></n-avatar>
        <span class="user-name">{{ props.username }}</span>
      </div>
      <div class="content-bottom">
        <div class="left">
          <div class="time">
            {{ moment(props.time * 1000).format('YYYY-MM-DD hh:mm:ss') }}
          </div>
        </div>
        <div class="right">
          <n-space size="large">
            <n-badge
                :value="props.badges[i]"
                :offset="[5, -3]"
                v-for="(item, i) in actionBtns"
            >
              <div>
                <n-icon
                    :size="22"
                    :component="item.icon as any"
                    color="#fff"
                >
                </n-icon>
              </div>
            </n-badge>
          </n-space>
        </div>
      </div>
    </div>
    <div class="del-icon">
      <n-popconfirm
          trigger="hover"
          positive-text="删除"
          negative-text="取消"
          @positiveClick="$emit('delClick')"
          v-if="props.userId === userStore.info.uid"
      >
        <template #trigger>
          <div>
            <n-icon
                :size="22"
                class="icon"
            >
              <CloseCircle></CloseCircle>
            </n-icon>
          </div>
        </template>
        删除当前文章
      </n-popconfirm>

    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(45deg, rgba(33, 147, 176, 1) 40%, rgba(109, 213, 237, 1));
  backdrop-filter: contrast(75%) saturate(125%) blur(55px);
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  position: relative;

  .image {
    box-sizing: border-box;
    width: 350px;
    height: 100%;
    padding: 5px;
    position: relative;
    cursor: pointer;

    .img {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
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

  .content {
    box-sizing: border-box;
    width: calc(100% - 350px);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .title {
      font-size: 14px;
      color: whitesmoke;
      font-weight: bold;
      width: 90%;
    }

    .sub-title {
      width: 90%;
      font-size: 12px;
      color: whitesmoke;
    }

    .avatar {
      position: absolute;
      top: -20px;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .user-name {
        color: whitesmoke;
      }
    }

    .content-bottom {
      box-sizing: border-box;
      width: 100%;
      padding: 0 5px;
      position: absolute;
      bottom: 0;
      border-radius: 0 0 5px 5px;
      display: flex;
      justify-content: space-between;

      .left {
        .time {
          font-size: 13px;
          color: whitesmoke;
        }
      }

      .right {
        display: flex;
        align-items: flex-end;
        padding-right: 20px;
      }
    }
  }

  .del-icon {
    position: absolute;
    top: 5px;
    right: 5px;

    .icon {
      color: whitesmoke;
      cursor: pointer;

      &:hover {
        color: deeppink;
      }
    }
  }
}
</style>

<style>
#article-card-wrapper .n-image img {
  width: 100%;
  height: 100%;
}
</style>