<script setup lang="ts">
import {CloseCircle, ExitSharp} from '@vicons/ionicons5'
import AvatarCropper from '@/components/AvatarCropper/index.vue'
import Input from '@/components/MimicryInput/index.vue'
import Btn from '@/components/MimicryBtn/index.vue'
import {inputOptions} from './hooks/input'
import {useUserInfo} from './hooks/useUserInfo'


const {userInfoData, avatarSubmit, submit, setGender} = useUserInfo()
const isShow = defineModel<boolean>()

</script>

<template>
  <transition name="user-info">
    <div class="user-info-mark" v-if="isShow">
      <n-spin :show="userInfoData.isLoading">
        <div class="user-info-wrapper">
          <div class="close" @click="isShow = false">
            <n-icon :size="20">
              <CloseCircle></CloseCircle>
            </n-icon>
          </div>
          <div class="user-avatar">
            <AvatarCropper
                @submit="avatarSubmit"
                @setGender="setGender"
                :user-gender="userInfoData.submit.gender"
                :default-img="userInfoData.submit.avatar_url"
            ></AvatarCropper>
          </div>
          <div class="user-message-wrapper">
            <div class="msg-input" v-for="item in inputOptions" :key="item.key">
              <Input
                  :more-props="{
                    placeholder: item.placeholder,
                    type: item.type,
                    themeOverrides: {
                      textColor: 'rgba(0,0,0,1)',
                      placeholderColor: 'rgba(0,0,0,1)',
                    }
                  }"
                  :icon="item.icon"
                  :icon-size="22"
                  :input-type="item.type"
                  v-model="userInfoData.submit[item.key]"
              ></Input>
            </div>
          </div>
          <div class="info-bottom-wrapper">
            <div class="bottom-btn-wrapper">
              <Btn
                  :error-btn="false"
                  :btn-icon="ExitSharp"
                  width="160px"
                  text="取消"
                  @btn-click="isShow = false"
              ></Btn>
            </div>
            <div class="bottom-btn-wrapper">
              <Btn
                  :error-btn="false"
                  width="160px"
                  text="确定"
                  @btn-click="submit"
              ></Btn>
            </div>
          </div>
        </div>
      </n-spin>
    </div>
  </transition>
</template>

<style scoped lang="less">
.user-info-mark {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: saturate(120%) blur(10px);
  transition-delay: 3s;
  z-index: 9;


  .user-info-wrapper {
    box-sizing: border-box;
    width: 620px;
    //height: 400px;
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
    border-radius: 5px;
    padding: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
    position: relative;

    .close {
      position: absolute;
      top: 5px;
      right: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px;
      box-shadow: 3px 3px 3px #c4cacf,
        -3px -3px 3px #ffffff;
      border-radius: 100%;
      cursor: pointer;
      z-index: 9;

      &:hover {
        color: #fc5185;
      }
    }

    .inner-content-wrapper {
      display: flex;
      justify-content: center;
    }

    .user-avatar {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      top: -70px;
      left: 0;
    }

    .user-message-wrapper {
      box-sizing: border-box;
      width: 100%;
      padding-top: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .msg-input {
        padding: 5px 0;
      }
    }

    .info-bottom-wrapper {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: center;

      .bottom-btn-wrapper {
        padding: 10px 20px;
      }
    }
  }
}


.user-info-enter-active,
.user-info-leave-active {
  transition: all 0.5s ease-in-out;
}

.user-info-enter-from,
.user-info-leave-to {
  transform: translateY(-1000px);
}
</style>