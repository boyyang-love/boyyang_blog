<script setup lang="ts">
import {ref, watch} from 'vue'
import {NInput} from 'naive-ui'
import {CloseCircle, Bookmark} from '@vicons/ionicons5'

interface TagItem {
  text: string
  id: number
}

interface Props {
  width?: string
  status?: boolean
}

interface Emits {
  (e: 'tagsChage', val: TagItem[]): void
}

const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits<Emits>()

const inputVal = ref<string>('')
const tags = ref<TagItem[]>([])

watch(() => props.status, (n_val) => {
  if (!n_val) {
    tags.value = []
  }
})

const inputEnter = () => {
  if (inputVal.value.trim() !== '') {
    tags.value.push({id: new Date().getTime(), text: inputVal.value})
    inputVal.value = ''
    emits('tagsChage', tags.value)
  }
}

const del = (item: TagItem) => {
  tags.value = tags.value.filter(it => it.id !== item.id)
  emits('tagsChage', tags.value)
}


</script>

<template>
  <div class="tag-wrapper">
    <div class="tags-box">
      <div class="tags-list">
        <div class="tag-icon">
          <n-icon size="22">
            <Bookmark></Bookmark>
          </n-icon>
        </div>
        <transition-group name="tags">
          <div class="tag" v-for="item in tags" :key="item.id">
            <span class="text">{{ item.text }}</span>
            <div class="close">
              <n-icon
                  :component="CloseCircle as any"
                  @click="del(item)"
                  class="icon"
                  size="18"
              ></n-icon>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="input-wrapper" v-if="tags.length < 5">
        <NInput
            :bordered="false"
            :clearable="true"
            type="text"
            v-model:value="inputVal"
            placeholder="请输入"
            @keyup.enter="inputEnter"
        ></NInput>
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.tag-wrapper {
  box-sizing: border-box;
  width: v-bind('props.width');
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 7px 7px 10px #c4cacf,
    -7px -7px 10px #ffffff;
  overflow: hidden;

  .tags-box {
    box-sizing: border-box;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .tags-list {
      display: flex;
      flex-wrap: wrap;

      .tag-icon {
        display: flex;
        align-items: center;
      }

      .tag {
        padding: 5px;
        border: 1px solid #888888;
        border-radius: 5px;
        margin: 5px;
        font-size: 13px;
        position: relative;

        .close {
          position: absolute;
          top: -10px;
          right: -10px;

          .icon {
            cursor: pointer;

            &:hover {
              color: #fc5185;
            }
          }
        }
      }
    }

    .input-wrapper {
      box-sizing: border-box;
      max-width: 150px;
      margin: 5px;
    }
  }
}

.tags-enter-active,
.tags-leave-active {
  transition: all .6s ease-in-out;
}

.tags-enter-from,
.tags-leave-to {
  transform: translateX(550px);
}

</style>