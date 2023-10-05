<script setup lang="ts">
import {computed, ref} from 'vue'
import {NIcon} from 'naive-ui'
import {
  CloseCircle,
  CheckmarkCircle,
  Rocket,
  PeopleCircle,
  ArrowUpCircleSharp,
  ArrowDownCircleSharp,
} from '@vicons/ionicons5'
import Input from '@/components/MimicryInput/index.vue'
import {useInput} from '../../hooks/useInput'
import {useLogin} from '../../hooks/useLogin'

const loginInput = useInput('login')
const {loginData, loginSubmit} = useLogin()

const isUp = ref<boolean>(true)

const position = computed(() => {
  return isUp.value ? '30px' : '-290px'
})

</script>

<template>
  <div class="register-wrapper">
    <div class="top-left-icon">
      <NIcon
          class="icon"
          :component="PeopleCircle"
          size="22"
          @click="loginData.isRegister = true"
      ></NIcon>
    </div>
    <div class="top-right-icon">
      <NIcon
          class="icon"
          :component="isUp ? ArrowDownCircleSharp : ArrowUpCircleSharp"
          size="22"
          color="red"
          @click="isUp = !isUp"
      ></NIcon>
    </div>
    <div class="inner-wrapper">
      <div
          class="input-wrapper"
          v-for="(item, i) in loginInput"
      >
        <Input
            :key="i"
            :icon="item.icon"
            :icon-size="item.iconSize"
            :input-type="item.inputType"
            :placeholder="item.placeholder"
            :more-props="{
              showPasswordOn: 'click',
            }"
            v-model="loginData[item.key]"
        ></Input>
      </div>

      <div class="btn-wrapper">
        <div class="btn btn-left" @click="loginSubmit">
          <NIcon :component="Rocket" size="28"></NIcon>
        </div>
        <div class="tip-btn">
          <NIcon
              :component="loginData.isError ? CloseCircle :  CheckmarkCircle"
              :color="loginData.isError ? '#c2516b' : '#23D69B'"
              size="25"
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

  .top-left-icon {
    position: absolute;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    box-shadow: 5px 5px 6px #c4cacf,
      -5px -5px 5px #ffffff;
    cursor: pointer;
  }

  .top-right-icon {
    position: absolute;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: 5px;
    right: 5px;
    box-shadow: 5px 5px 4px #c4cacf,
      -5px -5px 5px #ffffff;
    cursor: pointer;

    .icon {
      animation: up-down 1s ease-in-out infinite;
    }

    @keyframes up-down {
      0% {
        transform: scale(1)
      }

      50% {
        transform: scale(1.2);
      }

      100% {
        transform: scale(1);
      }
    }
  }

  //.top-right-icon:hover {
  //  transform: scale(1.1);
  //  font-weight: bolder;
  //}

  .inner-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;

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