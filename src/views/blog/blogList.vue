<!--
 * @Author: boyyang
 * @Date: 2022-07-05 18:22:06
 * @LastEditTime: 2022-09-03 17:09:52
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\blog\blogList.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import { LeftOutlined } from '@vicons/antd'
    import moment from 'moment'
    import Background from '@/components/Background/index.vue'
    import { useBlog } from './hooks/useBlog'

    // hooks
    const { getBlogList, blogData, toBlogDetail } = useBlog()
    nextTick(() => {
        window.VANTA.HALO({
            el: '#HALO',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
        })
    })

    getBlogList()
</script>

<template>
    <background width="100vw" height="100vh" id="HALO">
        <div class="md:container mx-auto w-full h-full px-10 py-20 overflow-y-auto">
            <div class="w-80">
                <n-timeline size="large">
                    <n-timeline-item
                        class="w-full"
                        v-for="item in blogData.blogList"
                        :key="item.id"
                        :type="
                            ['default', 'info', 'success', 'warning', 'error'][
                                Math.floor(Math.random() * 5)
                            ]
                        "
                    >
                        <template #header>
                            <n-space vertical>
                                <n-gradient-text type="error" :size="17">
                                    {{ item.title }}
                                </n-gradient-text>
                                <n-gradient-text type="success">
                                    {{ item.subtitle }}
                                </n-gradient-text>
                            </n-space>
                        </template>
                        <div class="content-image">
                            <img
                                class="cursor-pointer shadow-2xl rounded-md"
                                :src="item.image"
                                @click="toBlogDetail(item.id)"
                            />
                        </div>
                        <template #footer>
                            <div class="time">
                                <n-space justify="space-between">
                                    <span>
                                        {{ item.author.username }}
                                    </span>
                                    <span>
                                        {{ moment(item.created_at).format('YYYY-MM-DD') }}
                                    </span>
                                </n-space>
                            </div>
                        </template>
                    </n-timeline-item>
                </n-timeline>
            </div>
        </div>
        <div class="back fixed bottom-3 w-full flex justify-center">
            <n-button @click="$router.back()" type="info" width="200" dashed>
                <template #icon>
                    <n-icon>
                        <LeftOutlined />
                    </n-icon>
                </template>
                返回
            </n-button>
        </div>
    </background>
</template>

<style scoped lang="less"></style>
