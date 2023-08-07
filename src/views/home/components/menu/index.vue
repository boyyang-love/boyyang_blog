<script lang="ts" setup>
import {nextTick, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import anime from 'animejs'
import {Menu} from './types'
import {menuList} from './menuList'

const route = useRoute()
const router = useRouter()

const props = withDefaults(defineProps<Menu.menuProps>(), {
  menuList: () => menuList,
})

const active = ref<number>(0)

onMounted(() => {
  nextTick(() => {
    anime({
      targets: '#Admin',
      keyframes: [
        {
          rotateZ: 0,
          scale: 1,
        },
        {
          rotateZ: 360 * 10,
          scale: 2,
        },
        {
          rotateZ: -360 * 10 ,
          scale: 1,
        },
      ],
      loop: true,
      easing: 'easeInOutElastic',
    })
  })
  props.menuList.forEach((item, i) => {
    if (item.name == route.name) {
      active.value = i
    }
  })
})

const menuClick = (item: Menu.menuList, index: number) => {
  active.value = index
  router.push({
    name: item.name,
  })
}
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu">
      <n-space size="large">
        <n-tooltip
            v-for="(item, i) in props.menuList"
            trigger="hover"
            placement="right"
        >
          <template #trigger>
            <n-icon
                :component="item.com as any"
                :data-wow-delay="i * 0.3 + 's'"
                :size="20"
                :style="{'--i': i}"
                :class="['menu-icon', i === active ? 'active' : '']"
                :id="item.name"
                @click="menuClick(item, i)"
            ></n-icon>
          </template>
          {{ item.text }}
        </n-tooltip>
      </n-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-wrapper {
  height: 100%;
  width: 60px;
  position: fixed;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;

  .menu {
    box-sizing: border-box;
    background-color: whitesmoke;
    padding: 10px;
    border-radius: 0 10px 10px 0;
    box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.4), 7px 3px 3px rgba(0, 0, 0, 0.1);

    .menu-icon {
      cursor: pointer;
      color: red;
      transition: all 0.4s ease-in-out;

      &:hover {
        color: #181717;
        transform: scale(1.5);
      }
    }

    .active {
      color: #00bffd;
    }
  }


}

</style>
