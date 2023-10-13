<script setup lang="ts">
interface Props {
  tags: string[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="tag-wrapper">
    <div class="tag" v-for="item in props.tags">
      #{{ item }}
    </div>
  </div>
</template>

<style scoped lang="less">
.tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .tag {
    font-size: 13px;
    color: #d6e6f2;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: saturate(20%) blur(10px);
    border: 2px solid rgb(183, 191, 215);
    padding: 1px 5px;
    margin: 5px 2px;
    border-radius: 5px;
  }
}
</style>