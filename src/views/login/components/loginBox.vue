<!--
 * @Author: boyyang
 * @Date: 2022-05-07 23:18:28
 * @LastEditTime: 2022-05-15 13:10:57
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\login\components\loginBox.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    interface LoginBoxProps {
        username?: string
        password?: string
        isRember?: boolean
        progress?: number
    }
    interface LoginBoxEmits {
        (e: 'update:username', value: string): void
        (e: 'update:password', value: string): void
        (e: 'update:isRember', value: boolean): void
        (e: 'signIn', value: LoginBoxProps): void
        (e: 'signUp', value: LoginBoxProps): void
    }
    const props = withDefaults(defineProps<LoginBoxProps>(), {
        username: '',
        password: '',
        isRember: true,
        progress: 0,
    })
    const emits = defineEmits<LoginBoxEmits>()

    //#region 输入数据响应式处理
    const usernameInputChange = (e: Event) => {
        emits('update:username', (e.target as any).value)
    }
    const passwordInputChange = (e: Event) => {
        emits('update:password', (e.target as any).value)
    }
    const isRemberClick = (e: boolean) => {
        emits('update:isRember', e)
    }
    //#endregion
</script>

<template>
    <div class="login-box">
        <div class="nes-container is-dark with-title">
            <p class="title">
                <span class="text">登录注册</span>
            </p>
            <n-form>
                <n-form-item>
                    <template #label>
                        <span class="nes-text is-error">Account</span>
                    </template>
                    <i class="nes-mario"></i>
                    <input
                        class="inp nes-input is-success"
                        placeholder="Enter Your Account"
                        :value="props.username"
                        @input="usernameInputChange"
                    />
                </n-form-item>
                <n-form-item>
                    <template #label>
                        <span class="nes-text is-success">Password</span>
                    </template>
                    <i class="nes-ash"></i>
                    <input
                        type="password"
                        class="inp nes-input is-error"
                        placeholder="Enter Password"
                        :value="props.password"
                        @input="passwordInputChange"
                    />
                </n-form-item>
                <n-form-item>
                    <template #label>
                        <span>Save password</span>
                    </template>
                    <n-space>
                        <label>
                            <input
                                type="radio"
                                class="nes-radio is-dark"
                                name="answer"
                                @click="isRemberClick(true)"
                                :checked="props.isRember"
                            />
                            <span>Yes</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                class="nes-radio is-dark"
                                name="answer"
                                @click="isRemberClick(false)"
                                :checked="!props.isRember"
                            />
                            <span>No</span>
                        </label>
                    </n-space>
                </n-form-item>
                <progress class="nes-progress is-pattern progress-content" :value="props.progress" max="100"></progress>
                <n-space justify="space-between">
                    <button type="button" class="btn nes-btn is-primary" @click="$emit('signIn', props)">
                        <span class="text nes-text is-error">注册</span>
                    </button>
                    <button type="button" class="btn nes-btn is-success" @click="$emit('signUp', props)">
                        <span class="text">登录</span>
                    </button>
                </n-space>
            </n-form>
        </div>
    </div>
</template>

<style scoped lang="less">
    .inp {
        width: 350px;
        height: 45px;
    }
    .btn {
        width: 155px;
    }
    .text {
        color: whitesmoke;
        font-family: 'zpix';
        font-size: 20px;
        font-weight: bolder;
    }
    .progress-content {
        height: 15px;
    }
</style>
