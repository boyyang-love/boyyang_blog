<script lang="ts" setup>
import {Fitness, Heart, Star, CloseCircle, Sparkles} from '@vicons/ionicons5'
import moment from 'moment'
import {env} from '@/utils/env'

interface imgCardProps {
  url?: string
  name?: string
  id?: number | string
  isLike?: boolean
  time?: number
  info?: Exhibition.UserInfo
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
    <div class="img-content">
      <n-image
          :src="props.url"
          :width="380"
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
      <div class="img-name">
        <n-ellipsis style="max-width: 300px">
          {{ props.name }}
        </n-ellipsis>
      </div>
    </div>

    <div class="img-bottom">
      <div class="tags">
        <div class="tag">#好看</div>
        <div class="tag">#风景</div>
      </div>
      <div class="infos">
        <div class="infos-left">
          <div class="user-avatar">
            <n-avatar
                :size="40"
                :src="`${env.VITE_APP_IMG_URL}/${props.info.avatar_url}`"
                bordered
                class="header-img wow slideInDown"
                round
            />
          </div>
          <div class="name-time">
            <span class="name">{{ props.info.username }}</span>
            <span class="time">{{ moment(props.time * 1000).format('YYYY-MM-DD') }}</span>
          </div>
        </div>
        <div class="infos-right">
          <!-- 点赞 收藏 删除  -->
          <n-space size="small">
            <n-icon
                :component="Sparkles as any"
                color="#373737"
                size="18"
                class="icon"
            ></n-icon>
            <n-icon
                :component="Heart as any"
                :color="props.isLike ? '#fc5185' : '#373737'"
                size="18"
                @click="like"
                class="icon"
            ></n-icon>
            <n-icon
                :component="CloseCircle as any"
                color="#373737"
                size="18"
                @click="del"
                class="icon"
            ></n-icon>
          </n-space>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.img-card-wrapper {
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  //height: 300px;
  border-radius: 8px;
  box-shadow: 5px 5px 7px #c4cacf,
    -5px -5px 5px #ffffff;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  .img-content {
    box-sizing: border-box;
    width: 100%;
    height: 220px;
    display: flex;
    position: relative;
    overflow: hidden;

    .img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      object-position: center;
      transition: all 0.4s ease-in-out;
      border-radius: 5px;

      &:hover {
        //object-position: right bottom;
        transform: scale(1.1);
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
      //transform: scale(1.02);
    }

    .img-name {
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      bottom: 0;
      background-color: rgba(0, 0, 0, .4);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
      font-size: 14px;
      color: whitesmoke;
      text-align: center;
      border-radius: 0 0 5px 5px;
      padding: 3px 0;
    }
  }

  .img-bottom {
    margin-top: 5px;

    .tags {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      overflow-x: auto;

      .tag {
        box-shadow: 3px 3px 4px #c4cacf,
          -2px -2px 2px #ffffff;
        color: #888888;
        border-radius: 6px 0 6px 0;
        padding: 0 5px;
        margin: 2px 5px;
        font-size: 12px;
        cursor: pointer;
        border: 1px solid #888888;
      }
    }

    .infos {
      box-sizing: border-box;
      padding: 5px 5px 0;
      display: flex;
      justify-content: space-between;

      .infos-left {
        display: flex;
        align-items: flex-end;

        .user-avatar {
          display: flex;
          align-items: flex-end;
        }

        .name-time {
          display: flex;
          flex-direction: column;
          margin-left: 15px;
          font-size: 13px;
          color: #888888;

          .name {
            font-weight: bolder;
          }
        }
      }

      .infos-right {
        display: flex;
        align-items: flex-end;

        .icon {
          cursor: pointer;
        }
      }
    }
  }

}
</style>
