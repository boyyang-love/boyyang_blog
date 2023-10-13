<script setup lang="ts">
interface Props {
  avatar?: string
  username?: string
  follow?: number
  fans?: number
  thumb?: number
  article?: number
  comment?: number
}

const props = defineProps<Props>()
</script>

<template>
  <div class="user-card">
    <div class="user-avatar">
      <n-avatar
          circle
          :size="70"
          :src="props.avatar"
      ></n-avatar>
      <span class="user-name">{{ props.username}}</span>
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
  }
}
</style>