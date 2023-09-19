<script lang="ts" setup>
import {ChevronBack} from '@vicons/ionicons5'
import {router} from '@/router'
</script>

<template>
  <div class="container">
    <div class="back" @click="router.back()">
        <n-icon
            :size="25"
            color="#fff"
        >
          <ChevronBack></ChevronBack>
        </n-icon>
        <span class="text">
        返回
      </span>

    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/404.png");
  background-repeat: no-repeat;
  background-size: 50% 80%;
  background-position: center center;
  display: flex;
  justify-content: center;

  .back {
    position: absolute;
    bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid whitesmoke;
    padding: 5px 25px 5px 20px ;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    &:hover {
      border: 1px solid palevioletred;
    }

    .text {
      color: whitesmoke;
      font-size: 20px;
    }
  }

}
</style>