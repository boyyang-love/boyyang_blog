<script setup lang="ts">
import {Airplane} from '@vicons/ionicons5'
</script>

<template>
<div class="card-wrapper">
  <div class="left-icon">
    <n-icon :size="34">
      <Airplane></Airplane>
    </n-icon>
  </div>
  <div class="right-content">
    <div class="title">文章数</div>
    <div class="num">1000</div>
  </div>

</div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  backdrop-filter: saturate(120%) blur(20px);
  background-color: rgba(249, 247, 247, 0.2);

  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  padding: 10px;

  .left-icon {
    margin-right: 10px;
    text-shadow: 5px 5px 5px rgba(0, 0, 0.5);
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #fc5185;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  }

  .num {
    font-family: "Fira Code", sans-serif;
    color: #393e46;
    font-size: 15px;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2)
  }
}
</style>