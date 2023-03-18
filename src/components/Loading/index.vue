<script lang="ts" setup>
import {ref} from 'vue'

const isLoading = ref<boolean>(false)
const t = ref<NodeJS.Timer | null>(null)

const loadingStart = () => {
    isLoading.value = true
    t.value && clearTimeout(t.value)

    t.value = setTimeout(() => {
        if (isLoading.value) {
            isLoading.value = false
        }
    }, 3000)
}

const loadingEnd = () => {
    isLoading.value = false
}

const useLoading = () => {
    return {
        loadingStart,
        loadingEnd,
    }
}

window.$loading = useLoading()
</script>

<template>
    <div class="loading-wrapper">
        <div class="loading-content" v-if="isLoading">
            <div class="circle" v-for="item in 30" :key="item"></div>
        </div>
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
@bgcolor: #312f2f;
@circleone: #e3fdfd;
@circletwo: #393e46;
@n: 30;
@t: (360 / @n) * 1deg;
@duration: 2s;
@w: 200px;
@h: 200px;

.loading-wrapper {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .slot {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #3d3b4f;
  }

  .loading-content {
    box-sizing: border-box;
    width: @w;
    height: @h;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    perspective: 20px;
    transform-style: preserve-3d;

    z-index: 99;

    .circle {
      box-sizing: border-box;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;

      &::before,
      &::after {
        box-sizing: border-box;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
      }

      &::before {
        top: -100%;
        border-radius: 50%;
        background-color: @circleone;
        animation: whiteBallMove @duration infinite;
      }

      &::after {
        top: 100%;
        border-radius: 50%;
        background-color: @circletwo;
        animation: blackBallMove @duration infinite;
      }
    }

      .loop(@num) when (@num > 0) {
        .circle:nth-child(@{num}) {
          transform: rotate((@t * @num)) translateY((@w / 2));

          &::before,
          &::after {
            animation-delay: -(@duration / @n * 6 * @num);
          }
        }
          .loop(@num - 1);
      }

      .loop(@n);
  }
}

@keyframes whiteBallMove {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0, 100%, 5px);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0, 200%, 0px);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, 100%, -5px);
    animation-timing-function: ease-out;
  }
}

@keyframes blackBallMove {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0, -100%, -5px);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0, -200%, 0px);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, -100%, 5px);
    animation-timing-function: ease-out;
  }
}
</style>
