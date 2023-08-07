<script setup lang="ts">
import {NIcon, NInput} from 'naive-ui'
import {CloseCircle, CheckmarkCircle, Rocket, ArrowUpCircleSharp, ArrowDownCircleSharp} from '@vicons/ionicons5'
import {useRegister} from './hooks'
import {useLogin} from '../../hooks/useLogin'
import {computed, ref} from 'vue'

const {INPUT} = useRegister()
const {loginData, loginSubmit} = useLogin()

const isUp = ref<boolean>(true)

const position = computed(() => {
  return isUp.value ? '30px' : '-290px'
})

</script>

<template>
  <div class="register-wrapper">
    <div class="top-right-icon">
      <NIcon
          :component="isUp ? ArrowDownCircleSharp : ArrowUpCircleSharp"
          size="25"
          color="red"
          @click="isUp = !isUp"
      ></NIcon>
    </div>
    <div class="inner-wrapper">
      <div class="input-wrapper" v-for="(item, i) in INPUT" :key="i">
        <div class="icon">
          <NIcon :component="item.icon" :size="item.iconSize"></NIcon>
        </div>
        <div class="inner-input user-name">
          <NInput
              class="input"
              size="large"
              :bordered="false"
              :placeholder="item.placeholder"
              :type="item.inputType"
              v-model:value="loginData[item.key]"
          ></NInput>
        </div>
      </div>

      <div class="btn-wrapper">
        <div class="btn btn-left" @click="loginSubmit">
          <NIcon :component="Rocket" size="28"></NIcon>
        </div>
        <div class="tip-btn">
          <NIcon
              :component="loginData.isError ? CloseCircle :  CheckmarkCircle"
              size="25"
              :color="loginData.isError ? '#c2516b' : '#23D69B'"
          ></NIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.register-wrapper {
  box-sizing: border-box;
  width: 500px;
  height: 320px;
  background: linear-gradient(145deg, #cfd6dc, #f6ffff);
  position: absolute;
  bottom: v-bind(position);
  border-radius: 10px;
  box-shadow: 5px 5px 9px rgba(0, 0, 0, 0.5),
    -5px -5px 9px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: all 0.4s ease-in-out;

  &::before {
    content: '';
    width: calc(100% - 55px);
    height: calc(100% - 55px);
    position: absolute;
    background-color: #e0e6ec;
    box-shadow: 7px 7px 10px #c4cacf,
      -7px -7px 10px #ffffff;
    border-radius: 10px;
  }

  .top-right-icon {
    position: absolute;
    top: 2px;
    right: 2px;
    box-shadow: 20px 20px 60px #c4cacf,
      -20px -20px 60px #ffffff;
    transition: all 0.4s linear;
    cursor: pointer;
  }

  .top-right-icon:hover {
    transform: scale(1.2);
    font-weight: bolder;
  }

  .inner-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;

    .input-wrapper {
      display: flex;

      .icon {
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 6px 6px 10px #c4cacf,-6px -6px 10px #ffffff;
        margin-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .inner-input {
        box-sizing: border-box;
        width: 250px;
        height: 50px;
        border-radius: 5px;
        box-shadow: 6px 6px 10px #c4cacf,
          -6px -6px 10px #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;

        .input {
          border: none;
          background: none;
          margin: 0 auto;
          font-size: 15px;
        }
      }
    }

    .btn-wrapper {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .btn {
        box-sizing: border-box;
        width: 250px;
        height: 45px;
        border-radius: 5px;
        box-shadow: 6px 6px 10px #c4cacf,-6px -6px 10px #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #393e46;
        font-weight: bolder;
      }

      .tip-btn {
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 6px 6px 10px #c4cacf,-6px -6px 10px #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;
      }
    }
  }
}
</style>