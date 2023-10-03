import {reactive, ref} from 'vue'
import type {UploadFileInfo} from 'naive-ui'
import {useUserStoreWithOut} from '@/store/modules/user'
// api
import {upload} from '@/api/upload'
import {createBlog} from '@/api/blog'

// 博客表单
const BlogForm = reactive({
    title: '',
    des: '',
    content: '',
    cover: '',
})
// 博客表单 更多
const BlogFormMore = reactive({
    tags: [],
    tagsOptions: [],
    fileList: [] as UploadFileInfo[],
})
// btn 加载
const isLoading = ref<boolean>(false)
// 图片上传弹框
const isShowDialog = ref<boolean>(false)
// 判断必填项是否全部填写
const beforeBlogSubmit = () => {
    if (BlogForm.title.trim() == '' || BlogForm.des.trim() == '' || BlogForm.content.trim() == '') {
        window.$notification.warning({
            title: '提示',
            content: '博客标题，博客描述，以及博客内容为必填项。',
            duration: 3000,
        })
        return
    } else {
        isShowDialog.value = true
    }
}
// 博客提交
const blogSubmit = async () => {
    const userStore = useUserStoreWithOut()
    isLoading.value = true
    let uploadParams = {
        file_name: BlogFormMore.fileList[0].name,
        file: BlogFormMore.fileList[0].file as File,
        path: `${userStore.info.uid}/blog`,
    }
    let fileInfo = await upload(uploadParams)
    let blogParams = {
        title: BlogForm.title,
        sub_title: BlogForm.des,
        cover: fileInfo.key,
        content: BlogForm.content,
        tags: BlogFormMore.tags.join(','),
    }
    await createBlog(blogParams)
    isLoading.value = false
    window.$notification.success({
        title: '提示',
        content: `博客《${BlogForm.title}》上传成功`,
        duration: 3000,
    })
    //  清空数据
    BlogForm.title = ''
    BlogForm.des = ''
    BlogForm.content = ''
    BlogForm.cover = ''
    BlogFormMore.fileList = []
    BlogFormMore.tags = []
    BlogFormMore.tagsOptions = []
}
// 文件上传 change
const uploadChange = (
    options: {
        event: Event
        fileList: UploadFileInfo[]
        file: UploadFileInfo
    },
) => {
    BlogFormMore.fileList = options.fileList
}
// hooks
const usePublishData = () => {
    return {
        BlogForm,
        BlogFormMore,
        isLoading,
        isShowDialog,
    }
}
const usePublishMethods = () => {
    return {
        beforeBlogSubmit,
        blogSubmit,
        uploadChange,
    }
}

export {
    usePublishData,
    usePublishMethods,
}