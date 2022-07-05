/**
 * @Author: boyyang
 * @Date: 2022-07-04 18:46:27
 * @LastEditTime: 2022-07-05 18:44:54
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\blog\hooks\useBlog.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { FormInst } from 'naive-ui'
import { submit, blogList } from '@/api/blog'
const blogData = reactive({
    title: '',
    des: '',
    content: '',
    blogList: [],
    page: 1,
    limit: 10,
})

const blogRules = {
    title: {
        required: true,
        trigger: 'blur',
        message: '请输入文章标题',
    },
    des: {
        required: true,
        trigger: 'blur',
        message: '请输入文章标题',
    },
    content: {
        required: true,
        trigger: 'blur',
        message: '请输入文章内容',
    },
}

const useBlog = () => {
    // 获取博客列表
    const getBlogList = () => {
        let params = {
            page: blogData.page,
            limit: blogData.limit,
        }
        blogList(params).then(res => {
            console.log(res)
            blogData.blogList = res.data
        })
    }
    // 发表博客
    const blogSubmit = (domRef: FormInst | null) => {
        domRef?.validate(error => {
            let params = {
                title: blogData.title,
                subtitle: blogData.des,
                content: blogData.content,
            }
            if (!error) {
                submit(params).then(() => {
                    blogData.title = ''
                    blogData.des = ''
                    blogData.content = ''
                })
            }
        })
    }
    return {
        blogData,
        blogRules,
        getBlogList,
        blogSubmit,
    }
}

export { useBlog }
