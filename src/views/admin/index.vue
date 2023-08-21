<script lang="ts" setup>
import {BackGround} from '@/components/Background'
import {useAdmin} from './hooks/useAdmin'

const {adminData, changeUsername} = useAdmin()

const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.3)'

</script>

<template>
  <BackGround type="color" :color="BACKGROUND_COLOR">
    <div class="container m-auto">

    </div>
  </BackGround>
</template>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

}

</style>
