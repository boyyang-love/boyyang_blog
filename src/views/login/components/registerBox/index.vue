<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {NIcon} from 'naive-ui'
import {CloseCircle} from '@vicons/ionicons5'
import {userAvater} from '../../hooks/useAvater'
import Input from '@/components/MimicryInput/index.vue'
import Btn from '@/components/MimicryBtn/index.vue'
import {useInput} from '../../hooks/useInput'
import {useLogin} from '../../hooks/useLogin'

const registerInput = useInput('register')
const {loginData, registerSubmit} = useLogin()

const {avatar} = userAvater()
const isShow = defineModel<boolean>()
const isShowMore = ref<boolean>(false)
const currentAvater = ref<string>(avatar[0].url)

onMounted(() => {
  loginData.r_avatarUrl = currentAvater.value
})
</script>

<template>
  <Transition name="register">
    <div class="register-wrapper" v-if="isShow">
      <div class="close-icon">
        <NIcon
            class="icon"
            :component="CloseCircle"
            :size="25"
            color="#FF5963"
            @click="isShow = false"
        ></NIcon>
      </div>
      <div class="register-box">
        <div
            class="register-box-header"
            @click="isShowMore = !isShowMore"
        >
          <img :src="currentAvater" alt=""/>
        </div>
        <Transition name="header">
          <div class="register-box-header-other" v-if="isShowMore">
            <div class="img-box">
              <div
                  class="header-img-wrapper"
                  v-for="item in avatar"
                  @click="currentAvater = item.url; loginData.r_avatarUrl = item.url">
                <img
                    :src="item.url"
                    alt=""
                    :key="item.id"
                    class="header-img"
                />
              </div>
            </div>
          </div>
        </Transition>

        <div class="input-wrapper">
          <div class="input-box" v-for="(item, i) in registerInput">
            <Input
                :key="i"
                :icon="item.icon"
                :icon-size="item.iconSize"
                :input-type="item.inputType"
                :placeholder="item.placeholder"
                v-model="loginData[item.key]"
                input-width="370px"
            ></Input>
          </div>
        </div>

        <div class="bottom-btn">
          <Btn
              width="300px"
              @btn-click="registerSubmit"
              :is-error="loginData.r_isError"
          ></Btn>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="less">
.register-wrapper {
  box-sizing: border-box;
  width: 600px;
  height: 500px;
  background: linear-gradient(145deg, #cfd6dc, #f6ffff);
  border-radius: 10px;
  box-shadow: 5px 5px 9px rgba(0, 0, 0, 0.5),
    -5px -5px 9px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 10px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;

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

  .close-icon {
    position: absolute;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: 5px;
    right: 5px;
    box-shadow: 5px 5px 6px #c4cacf,
      -5px -5px 5px #ffffff;
    cursor: pointer;
  }

  .register-box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
    display: flex;
    //justify-content: center;
    align-items: center;
    flex-direction: column;


    .register-box-header {
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      background-color: whitesmoke;
      box-shadow: 5px 5px 6px #c4cacf;
      position: absolute;
      top: -60px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      .header-img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .register-box-header-other {
      position: absolute;
      top: -155px;
      width: 100%;
      height: 90px;
      overflow-x: auto;
      padding: 10px;
      background: linear-gradient(145deg, #cfd6dc, #f6ffff);
      border-radius: 10px;
      display: flex;
      z-index: 0;

      .img-box {
        display: flex;

        .header-img-wrapper {
          box-sizing: border-box;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          box-shadow: 7px 7px 10px #c4cacf,
            -7px -7px 10px #ffffff;
          margin: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          .header-img {
            box-sizing: border-box;
            width: calc(100% - 5px);
            height: calc(100% - 5px);
            object-fit: cover;
          }
        }

      }


    }

    .input-wrapper {
      margin-top: 25px;
    }

    .bottom-btn {
      box-sizing: border-box;
      width: 100%;
      margin-top: 35px;
      display: flex;
      justify-content: center;
    }
  }
}


.register-enter-active,
.register-leave-active {
  transition: all .4s ease-in-out;
}

.register-enter-from,
.register-leave-to {
  transform: translateY(500px);
}

.header-enter-active,
.header-leave-active {
  transition: all .4s ease-in-out;
}

.header-enter-from,
.header-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>