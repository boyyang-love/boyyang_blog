<script setup lang="ts">
import {useArticleDetail} from '../../hooks'
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import moment from 'moment'

const route = useRoute()

const uid = route.query.uid as unknown as number
const user_id = route.query.user_id as unknown as number

const {createComment, commentData, getComments} = useArticleDetail()

onMounted(() => {
  getComments(uid)
})
</script>

<template>
  <div class="comment-wrapper">
    <div class="input-wrapper">
      <n-input
          class="input"
          type="text"
          placeholder="Enter 发布评论"
          :autosize="{
              minRows: 1,
              maxRows: 3,
            }"
          :maxlength="100"
          :show-count="true"
          v-model:value="commentData.content"
          @keyup.enter="createComment(uid, user_id)"
      >
      </n-input>
      <n-button type="error" @click="createComment(uid, user_id)">发布</n-button>
    </div>
    <div class="comments">
      <div
          class="empty"
          v-if="commentData.list.length === 0"
      >
        <n-empty
            description="暂无评论"
        >
        </n-empty>
      </div>

      <div
          v-else
          class="comment-content"
          v-for="item in commentData.list"
      >
        <div class="user-info">
          <n-avatar
              bordered
              round
              :size="45"
              :src="item.user_info.avatar_url"
          >
          </n-avatar>
          <div class="user-name">
            {{ item.user_info.username }}
          </div>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="time">{{ moment(item.created * 1000).format('YYYY-MM-DD hh:mm:ss') }}</div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.comment-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  margin-top: 15px;

  .input-wrapper {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    gap: 10px;
    margin-bottom: 20px;

    .input {
      width: 100%;
    }
  }

  .comments {

    .empty {
      margin-top: 25px;
    }

    .comment-content {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding: 10px 10px;
      position: relative;
      border-bottom: 1px solid rgba(245, 245, 245, 0.5);

      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        color: whitesmoke;
        padding: 4px 0;

        .user-name {
          position: absolute;
          top: 0;
          left: 60px;
          font-size: 13px;
        }
      }

      .content {
        color: whitesmoke;
      }

      .time {
        position: absolute;
        bottom: 0;
        right: 0;
        color: whitesmoke;
        font-size: 12px;
      }
    }
  }
}
</style>