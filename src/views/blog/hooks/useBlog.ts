/**
 * @Author: boyyang
 * @Date: 2022-07-04 18:46:27
 * @LastEditTime: 2022-07-07 08:49:54
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\blog\hooks\useBlog.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { FormInst, UploadFileInfo } from 'naive-ui'
import { router } from '@/router'
import { useRoute } from 'vue-router'
import { submit, blogList, getBlogDetailById } from '@/api/blog'
import { useUserStoreWithOut } from '@/store/modules/user'
import { deleteUpload } from '@/api/banner'
import { env } from '@/utils/env'

const userStore = useUserStoreWithOut()
const blogData = reactive({
    // 博客 标题 描述 内容 图片
    title: '',
    des: '',
    content: '',
    upload: {
        id: 0,
        url: '',
        fileName: '',
    },
    // 博客列表
    blogList: [] as any,
    // 博客详情信息
    blogDetail: {} as any,
    // 分页
    page: 1,
    limit: 10,
    // 博客图片上传
    uploadModal: false,
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

const headers = {
    token: userStore.getToken,
}

const useBlog = () => {
    // 获取博客列表
    const getBlogList = () => {
        let params = {
            page: blogData.page,
            limit: blogData.limit,
        }
        blogList(params).then(res => {
            blogData.blogList = res.data.map((item: any) => {
                item.image = `${env.VITE_APP_IMG_URL}${item.image}`
                return item
            })
        })
    }
    // 获取博客详情
    const getBlogDetail = () => {
        const route = useRoute()
        let params = {
            id: route.params.id as string
        }
        getBlogDetailById(params).then(res => {
            blogData.blogDetail = res.data
        })
    }
    // 发表博客
    const blogSubmit = (domRef: FormInst | null) => {
        domRef?.validate(error => {
            if (!error) {
                blogData.uploadModal = true
            }
        })
    }
    // 图片上传成功 finsih
    const finish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
        let res = JSON.parse((event?.target as any).response as any)
        blogData.upload.id = res.data.id
        blogData.upload.url = res.data.url
        blogData.upload.fileName = res.data.fileName
    }
    // 图片上传成功后删除 remove
    const remove = () => {
        let params = {
            id: blogData.upload.id,
        }
        deleteUpload(params).then(res => {
            window.$message.success('删除成功')
            blogData.upload.url = ''
            blogData.upload.id = 0
            blogData.upload.fileName = ''
        })
    }
    // 图片上传 提交
    const submitPostive = async () => {
        let params = {
            title: blogData.title,
            subtitle: blogData.des,
            content: blogData.content,
            image: blogData.upload.url,
        }
        let p = new Promise((resolve, reject) => {
            if (params.image != '') {
                submit(params).then(() => {
                    blogData.title = ''
                    blogData.des = ''
                    blogData.content = ''
                    resolve(true)
                })
            } else {
                window.$message.error('请上传背景图片')
                reject(false)
            }
        })
        return await p
    }
    // 图片上传 取消
    const submitNegative = () => {}
    // 博客详情页
    const toBlogDetail = (id: number) => {
        router.push({
            name: 'BlogDetail',
            params: {
                id,
            },
        })
    }
    return {
        blogData,
        blogRules,
        getBlogList,
        blogSubmit,
        submitPostive,
        submitNegative,
        headers,
        finish,
        remove,
        toBlogDetail,
        getBlogDetail,
    }
}

export { useBlog }
