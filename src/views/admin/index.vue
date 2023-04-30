<script lang="ts" setup>

import {computed} from 'vue'

interface adminProps {
    name: string
    age: number
}

const props = withDefaults(defineProps<adminProps>(), {
    name: 'yang',
    age: 18,
})

const nn = computed(() => props.name)

</script>

<template>
    <div class="ttt">11111111111111111111</div>
    <div class="test">
        <div></div>
    </div>
</template>

<style lang="less" scoped>

</style>
