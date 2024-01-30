<script lang="ts" setup>
import {computed, onMounted, ref, h} from 'vue'
import {NInput, NSpace, NSlider, NIcon} from 'naive-ui'
import {useRouter, useRoute} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import {Menu} from './types'
import {menuList, options} from './menuList'
import {env} from '@/utils/env'
import {useUserInfo} from '@/views/userInfo/hooks/useUserInfo'
import {useMenuStore} from '@/store/modules/menu'
import {Search, Moon, Sunny, PartlySunny} from '@vicons/ionicons5'
import {updatePassword} from '@/api/user'


const router = useRouter()
const userStore = useUserStore()
const {showInfo} = useUserInfo()
const menuStore = useMenuStore()

const props = withDefaults(defineProps<Menu.menuProps>(), {
  menuList: () => menuList,
})

const userAvatar = computed(() => {
  return `${env.VITE_APP_IMG_URL}/${userStore.info.avatar_url}`
})
const menuClick = (item: Menu.menuList, index: number) => {
  if (item.name === '退出') {
    window.$dialog.warning({
      title: '提示',
      content: '是否退出登录？',
      negativeText: '算了',
      positiveText: '确定',
      onPositiveClick: () => {
        window.sessionStorage.clear()
        window.localStorage.clear()
        router.replace(
            {
              name: 'Login',
            },
        ).then(() => {
          menuStore.setActive('Home')
        })
      },
    })
    return
  }
  menuStore.setActive(item.name)
  router.push({
    name: item.name,
  })
}

const selectClick = (key: string) => {
  if (key === 'logout') {
    window.$dialog.warning({
      title: '提示',
      content: '是否退出登录？',
      negativeText: '算了',
      positiveText: '确定',
      onPositiveClick: () => {
        window.sessionStorage.clear()
        window.localStorage.clear()
        router.replace(
            {
              name: 'Login',
            },
        ).then(() => {
          menuStore.setActive('Home')
        })
      },
    })
    return
  }

  if (key === 'editPassword') {
    const password = ref<string>('')
    const rePassword = ref<string>('')
    window.$dialog.info({
      title: '修改密码',
      positiveText: '确认',
      maskClosable: false,
      content: () => {
        return h('div', null,
            [
              h(NSpace, {vertical: true},
                  [
                    h(NInput, {
                          type: 'password',
                          placeholder: '请输入密码',
                          showPasswordOn: 'click',
                          onChange: (e) => {
                            password.value = e
                          },
                        },
                    ),
                    h(NInput, {
                          type: 'password',
                          placeholder: '请输入重复密码',
                          showPasswordOn: 'click',
                          onChange: (e) => {
                            rePassword.value = e
                          },
                        },
                    ),
                  ],
              ),
            ],
        )
      },
      onPositiveClick: async () => {
        if (password.value.trim() != '' && rePassword.value.trim() != '') {
          if (password.value !== rePassword.value) {
            window.$message.error('密码不一致')
            return false
          } else {
            await updatePassword({password: password.value})
            return true
          }
        } else {
          window.$message.error('密码不能为空!')
          return false
        }
      },
    })
  }

  if (key === 'editInfo') {
    showInfo(true)
  }
}

const toDetail = () => {
  router.push({
    path: '/userDetail',
    query: {
      uid: userStore.info.uid,
    },
  })
}
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu">
      <n-space align="center">
        <n-avatar
            :size="45"
            :bordered="true"
            :src="userAvatar"
            round
            @click="toDetail"
            style="cursor: pointer"
        ></n-avatar>
        <div
            class="icon-wrapper"
            v-for="(item, i) in props.menuList"
            :style="{'--color': item.color}"
        >
          <n-tooltip
              trigger="hover"
              placement="bottom"
          >
            <template #trigger>
              <n-icon
                  :component="item.com as any"
                  :data-wow-delay="i * 0.3 + 's'"
                  :size="22"
                  :style="{'--i': i}"
                  :class="['menu-icon', item.name === menuStore.active ? 'active' : '']"
                  :id="item.name"
                  @click="menuClick(item, i)"
              ></n-icon>
            </template>
            {{ item.text }}
          </n-tooltip>
        </div>
      </n-space>
      <div class="right">
        <div class="name">
          <div class="user-name">
            <n-dropdown
                :show-arrow="true"
                :options="options"
                @select="selectClick"
            >
              {{ userStore.info.username }}
            </n-dropdown>
          </div>
        </div>
        <div class="bg-opacity">
          <n-popover trigger="click">
            <template #trigger>
              <n-icon
                  :size="18"
                  :component="userStore.opacity <= 0.3 ?
                            Sunny :
                            (userStore.opacity > 0.3 && userStore.opacity <= 0.6) ?
                            PartlySunny :
                            Moon"
              >
              </n-icon>
            </template>
            <div style="width: 100px">
              <NSlider
                  :max="1"
                  :step="0.1"
                  v-model:value="userStore.opacity"
              ></NSlider>
            </div>
          </n-popover>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(245, 245, 245, 0.5);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: saturate(120%) blur(10px);

  .menu {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 20px 2px 10px;
    position: relative;


    .right {
      display: flex;
      align-items: center;

      .bg-opacity {
        box-sizing: border-box;
        width: 45px;
        height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: rgba(245, 245, 245, 1);
        border-radius: 15px;
        backdrop-filter: saturate(120%) blur(10px);
      }

      .search {
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
      }

      .name {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        .user-name {
          color: whitesmoke;
          padding: 0 10px;
          background-color: rgab(0, 0, 0, 0.5);
          backdrop-filter: saturate(200%) blur(10px);
          border: 1px solid white;
          border-radius: 5px;
          margin-right: 10px;
        }
      }
    }

    .icon-wrapper {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border: 1px solid var(--color);
      cursor: pointer;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, .4);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);

      .menu-icon {
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        color: whitesmoke;

        &:hover {
          transform: scale(1.1);
        }
      }

      .active {
        color: #23d69b;
      }
    }
  }
}

</style>
