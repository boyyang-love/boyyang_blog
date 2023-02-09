<script lang="ts" setup>
    import BlogCard from './blogCard.vue'
</script>

<template>
    <div class="home container m-auto">
        <div class="content">
            <div class="hot-blog"></div>
            <div class="blog">
                <n-space vertical>
                    <BlogCard v-for="item in 10" :key="item"></BlogCard>
                    <div class="pagination">
                        <n-pagination
                            :page-count="100"
                            show-size-picker
                            :page-sizes="[10, 20, 30, 40]"
                        />
                    </div>
                </n-space>
            </div>
        </div>
        <div class="right">
            <div class="user">user</div>
            <div class="tags">tags</div>
            <div class="calendar">calendar</div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .home {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        .right {
            box-sizing: border-box;
            width: 300px;
            margin: 0 15px;
            background-color: rgba(61, 59, 79, 0.5);
            padding: 10px;
            .user {
                box-sizing: border-box;
                height: 350px;
                background-color: #fff;
                margin-bottom: 10px;
            }
            .tags {
                box-sizing: border-box;
                height: 350px;
                background-color: #fff;
                margin-bottom: 10px;
            }
            .calendar {
                box-sizing: border-box;
                height: 250px;
                background-color: #fff;
            }
        }
        .content {
            box-sizing: border-box;
            width: calc(100% - 600px);
            background-color: rgba(61, 59, 79, 0.5);
            padding: 10px;
            .hot-blog {
                height: 450px;
                margin-bottom: 10px;
                background-color: #fff;
            }
            .blog {
                .pagination {
                    box-sizing: border-box;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin: 25px 0;
                }
            }
        }
    }
</style>
