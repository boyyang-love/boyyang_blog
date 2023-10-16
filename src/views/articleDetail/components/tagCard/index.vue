<script setup lang="ts">
interface Props {
  tags: string[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="tag-container">
    <div class="title-wrapper">
      <span class="title">标签</span>
    </div>
    <n-empty
        v-if="props.tags.length <= 0"
        description="暂无数据"
    >
    </n-empty>
    <div class="tag-wrapper" v-else>
      <span class="tag" v-for="item in props.tags">
        #{{ item }}
      </span>
    </div>
  </div>

</template>

<style scoped lang="less">
.tag-container {
  border-radius: 5px;
  background-color: rgba(245, 245, 245, 0.4);
  backdrop-filter: saturate(120%) blur(50px);
  padding: 10px;

  .title-wrapper {
    margin-bottom: 10px;
    .title {
      color: whitesmoke;
      font-size: 15px;
      font-weight: bolder;
    }
  }

  .tag-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 10px;

    .tag {
      box-sizing: border-box;
      padding: 0 10px;
      border: 1px solid #23d69b;
      border-radius: 5px;
      color: whitesmoke;
    }

  }
}
</style>