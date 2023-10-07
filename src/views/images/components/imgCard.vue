<script lang="ts" setup>
import {
  Fitness,
  Heart,
  CloseCircle,
  Sparkles,
  ImageSharp,
  CloudDownload,
  SyncCircle,
  Cube,
} from '@vicons/ionicons5'
import moment from 'moment'
import {env} from '@/utils/env'
import {computed, ref} from 'vue'
import {useUserStore} from '@/store/modules/user'
import {imageDownload} from '@/utils/fileDownload'
import {Exhibition} from '@/api/exhibition/type'
import CubeLoading from '@/components/CubeLoading/index.vue'

interface imgCardProps {
  url?: string
  path?: string
  name?: string
  id?: number | string
  isLike?: boolean
  isStar?: boolean
  time?: number
  tags?: string
  info?: Exhibition.UserInfo
  star?: number
  size?: string
  colors?: string[]
  options?: { name: string, uid: number }[]
}

interface emit {
  (e: 'del', id: number | string, path: string): void

  (e: 'like', id: number | string, likeStatus: boolean): void

  (e: 'setBackground', id: number | string): void

  (e: 'star', id: number | string, starStatus: boolean): void

  (e: 'downloadSucess', id: number | string): void

  (e: 'toDetail', id: number | string): void
}

const userStore = useUserStore()
const props = withDefaults(defineProps<imgCardProps>(), {
  url: '',
  name: '',
  id: 0,
  isLike: false,
  tags: '',
})
const isLoading = ref<boolean>(false)

const emits = defineEmits<emit>()


const like = () => {
  emits('like', props.id, !props.isLike)
}

const star = () => {
  emits('star', props.id, !props.isStar)
}

const imagesDownload = () => {
  isLoading.value = true
  let name = props.url.split('/').pop() as string
  imageDownload(props.url, name).then(() => {
    isLoading.value = false
    emits('downloadSucess', props.id)
  })
}

const tags = computed(() => {
  if (props.options && props.options.length > 0 && props.tags !== '') {
    const uids = props.tags.split(',')
    return props.options.filter(op => uids.includes(String(op.uid))) || []
  }
})

const rightClick = (e: Event) => {
  e?.preventDefault()
}

</script>

<template>
  <div class="img-card-wrapper" id="img-card-wrapper" @click.right="rightClick">
    <NSpin
        :show="isLoading"
        :rotate="true"
        size="large"
    >
      <template #description>
        <span class="loading-text">
          图片正在加载中,请稍后...
        </span>
      </template>
      <template #icon>
        <CubeLoading></CubeLoading>
<!--        <n-icon color="#b83b5e" :size="40">-->
<!--          <SyncCircle></SyncCircle>-->
<!--        </n-icon>-->
      </template>
      <div class="img-content">
        <n-image
            :src="props.url"
            class="img"
            lazy
            object-fit="cover"
            :preview-disabled="true"
            @click="$emit('toDetail', props.id)"
        >
          <template #placeholder>
            <div class="loading">
              <CubeLoading></CubeLoading>
            </div>
          </template>
        </n-image>
        <div class="img-name">
          <n-ellipsis style="max-width: 300px">
            {{ props.name }}
          </n-ellipsis>
        </div>
        <div class="img-size">
          {{ (props?.size as string) }}
        </div>
      </div>
      <div class="img-bottom">
        <div class="colors-wrapper">
          <div
              class="color-item"
              v-for="item in props.colors"
              :style="{'--color': item}"
          ></div>
        </div>
        <div class="tags">
          <div
              class="tag"
              v-for="(item, i) in tags"
              :key="i">
            <span>#{{ item.name }}</span>
          </div>
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
              <span class="time">{{ moment(props.time * 1000).format('YYYY-MM-DD hh:mm:ss') }}</span>
            </div>
          </div>
          <div class="infos-right">
            <!-- 点赞 收藏 删除  -->
            <n-space size="small">
              <n-badge
                  :value="props.star"
                  :max="1000"
                  :offset="[0, -20]"
              >
                <span></span>
              </n-badge>
              <n-icon
                  :component="Sparkles as any"
                  :color="props.isStar ? '#fc5185' : '#373737'"
                  size="18"
                  class="icon"
                  @click="star"
              ></n-icon>
              <n-icon
                  :component="Heart as any"
                  :color="props.isLike ? '#fc5185' : '#373737'"
                  size="18"
                  @click="like"
                  class="icon"
              ></n-icon>
              <n-icon
                  :component="ImageSharp as any"
                  color="#373737"
                  size="18"
                  class="icon"
                  @click="$emit('setBackground', props.id)"
              ></n-icon>
              <n-icon
                  :component="CloudDownload as any"
                  color="#373737"
                  size="18"
                  class="icon"
                  @click="imagesDownload"
              ></n-icon>
              <n-icon
                  :component="Cube as any"
                  color="#373737"
                  size="18"
                  class="icon"
                  @click="$emit('toDetail', props.id)"
              ></n-icon>
              <n-popconfirm
                  v-if="props.info.uid === userStore.info.uid"
                  content=""
                  positive-text="删除"
                  negative-text="算了"
                  type="warning"
                  trigger="hover"
                  @positive-click="$emit('del', props.id, props.path)"
              >
                <template #trigger>
                  <div>
                    <n-icon
                        :component="CloseCircle as any"
                        color="#b83b5e"
                        size="18"
                        class="icon"
                    ></n-icon>
                  </div>
                </template>
                是否删除当前图片?
              </n-popconfirm>
            </n-space>
          </div>
        </div>
      </div>
    </NSpin>
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

  .loading-text {
    color: #b83b5e;
    font-size: 16px;
    font-weight: bolder;
  }

  .img-content {
    box-sizing: border-box;
    width: 100%;
    height: 220px;
    display: flex;
    position: relative;
    overflow: hidden;

    .img {
      width: 100%;
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

    .img-size {
      position: absolute;
      top: 0;
      left: 0;
      color: white;
      background-color: rgba(0, 0, 0, .4);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
      padding: 0 5px;
    }
  }

  .img-bottom {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    margin-top: 5px;

    .colors-wrapper {
      display: flex;
      justify-content: center;
      padding: 5px 0;

      .color-item {
        width: 10px;
        height: 10px;
        background-color: var(--color);
        margin: 0 3px;
        border-radius: 50%;
      }
    }

    .tags {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      overflow-x: auto;
      padding: 0 15px;

      .tag {
        box-shadow: 3px 3px 4px #c4cacf,
          -2px -2px 2px #ffffff;
        color: #888888;
        border-radius: 8px 0 8px 0;
        padding: 2px 10px;
        margin: 1px 3px;
        font-size: 12px;
        cursor: pointer;
        border: 2px solid rgba(17, 17, 17, 1);
        transform: skew(-10deg);
        text-align: center;
        white-space: nowrap;

        span {
          transform: skew(10deg);
          color: #1fab89;
          font-weight: bolder;
          font-size: 12px;
        }
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
        justify-content: center;

        .icon {
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .img-card-wrapper {
    .img-content {
      height: 100%;
    }

    .img-bottom {
      .tags {
        display: none
      }

      .infos {
        justify-content: flex-end;
        padding: 15px 0 0;

        .infos-left {
          display: none;
        }
      }
    }
  }
}
</style>

<style>
#img-card-wrapper .n-image img {
  width: 100%;
  height: 100%;
}
</style>
