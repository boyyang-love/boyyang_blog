<script lang="ts" setup>
import {defineModel} from "vue";

const props = defineProps(['name'])

const mod = defineModel()

</script>

<template>
    <div class="input">
        <input v-model="mod.age" type="text">
    </div>
</template>

<style lang="less" scoped>

</style>