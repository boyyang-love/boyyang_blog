<script setup lang="ts">
import {
  Add,
  Checkmark,
} from '@vicons/ionicons5'

interface Props {
  uid: number
  avatar?: string
  username?: string
  follow?: number
  fans?: number
  thumb?: number
  article?: number
  comment?: number
  isFollowed: boolean
}

interface Emits {
  (e: 'followClick', id: number): void

  (e: 'avatarClick', id: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()


</script>

<template>
  <div class="user-card">
    <div class="user-avatar">
      <n-avatar
          circle
          bordered
          :size="70"
          :src="props.avatar"
          @click="emits('avatarClick', props.uid)"
      ></n-avatar>
      <span class="user-name">{{ props.username }}</span>
    </div>
    <div class="user-card-info">
      <div class="follow">
        <span class="label">关注</span>
        <span class="num">{{ props.follow }}</span>
        <span class="line">|</span>
        <span class="label">粉丝</span>
        <span class="num">{{ props.fans }}</span>
      </div>
      <div class="btns">
        <div class="icon-wrapper">
          <span class="label">获赞</span>
          <span class="num">{{ props.thumb }}</span>
        </div>
        <div class="icon-wrapper">
          <span class="label">文章</span>
          <span class="num">{{ props.article }}</span>
        </div>
        <div class="icon-wrapper">
          <span class="label">评论</span>
          <span class="num">{{ props.comment }}</span>
        </div>
      </div>

      <div class="add-follow">
        <div
            :class="['add-btn', isFollowed? 'active' : '']"
            @click="emits('followClick', props.uid)"
        >
          <n-icon
              size="20"
              :component="props.isFollowed ? Checkmark as any : Add as any"
          >
          </n-icon>
          {{ props.isFollowed ? '已关注' : '关注' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-card {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 70px 0 30px;
  background-color: rgba(245, 245, 245, 0.4);
  backdrop-filter: saturate(120%) blur(50px);
  border-radius: 10px;

  .user-avatar {
    position: absolute;
    top: -35px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .user-name {
      font-size: 13px;
      font-weight: bold;
      color: whitesmoke;
    }
  }

  .user-card-info {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .follow {
      .label {
        color: whitesmoke;
        font-size: 14px;
        font-weight: bold;
      }

      .num {
        color: whitesmoke;
        font-size: 13px;
        margin-left: 5px;
      }

      .line {
        color: whitesmoke;
        margin: 0 5px;
      }
    }

    .btns {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      margin-top: 20px;

      .icon-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .label {
          font-size: 14px;
          font-weight: bold;
          color: whitesmoke;
        }

        .num {
          color: whitesmoke;
          font-size: 13px;
        }
      }
    }

    .add-follow {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 25px;

      .add-btn {
        display: flex;
        align-items: center;
        border: 2px solid white;
        color: whitesmoke;
        padding: 2px 20px;
        border-radius: 5px;
        background-color: #b7bfd7;
        cursor: pointer;
        font-weight: bolder;
      }

      .active {
        background-color: #23d69b;
      }
    }
  }
}
</style>