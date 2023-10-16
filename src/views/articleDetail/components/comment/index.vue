<script setup lang="ts">
import {useArticleDetail} from '../../hooks'
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'

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
            @keyup.enter="createComment(uid)"
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
              :size="55"
              :src="item.user_info.avatar_url"
          >
          </n-avatar>
          {{ item.user_info.username }}
        </div>
        <div class="content">
          {{ item.content }}
        </div>
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
    .input {
      width: 100%;
    }
  }

  .comments {
    .empty {
      margin-top: 25px;
    }

    .comment-content {
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid whitesmoke;

      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 10px;
        color: whitesmoke;
        padding: 10px;
      }

      .content {
        color: whitesmoke;
      }
    }
  }
}
</style>