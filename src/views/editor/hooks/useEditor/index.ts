import {computed, onBeforeUnmount, reactive, ref, shallowRef} from 'vue'
import {router} from '@/router'
import {UploadFileInfo} from 'naive-ui'
import {delUpload, upload} from '@/api/upload'
import {useUserStoreWithOut} from '@/store/modules/user'

const useEditor = () => {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const html = ref<string>('')
    const isShowDialog = ref<boolean>(false)
    const articleData = reactive({
        title: '',
        sub_title: '',
        tags: [],
        preview_url: [] as UploadFileInfo[],
    })

    const isEmpty = computed(() => {
        console.log(articleData.preview_url)
        return articleData.title.trim() === '' || articleData.sub_title.trim() === '' || articleData.preview_url.length === 0
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })


    const handleCreated = (editor: any) => {
        editorRef.value = editor // 记录 editor 实例，重要！
    }

    const beforeUpload = () => {
        const editor = editorRef.value
        if (editor.isEmpty()) {
            window.$message.error('内容不能为空')
        } else {
            isShowDialog.value = true
        }
    }

    const submit = async (insertedImages: string[]) => {
        const editor = editorRef.value
        const userStore = useUserStoreWithOut()
        await delNoUseImages(insertedImages, false)
        console.log(isEmpty.value)
        if (isEmpty.value) {
            window.$message.error('标题，描述，图片为必填项')
            return false
        } else {
            upload({
                file_name: articleData.preview_url[0].name,
                file: articleData.preview_url[0].file as File,
                path: `${userStore.info.uid}/article/${articleData.preview_url[0].name}`,
            }).then((res) => {
                const params = {
                    cover: res.key,
                    title: articleData.title,
                    sub_title: articleData.sub_title,
                    tags: articleData.tags.join(','),
                }
            })
        }
    }

    const delNoUseImages = async (insertedImages: string[], isAll: boolean) => {
        const editor = editorRef.value
        const articleImages = editor.getElemsByType('image').map((image: any) => image.src) || []
        const shouldDelImages = isAll ? articleImages : insertedImages.filter(image => !articleImages.includes(image))
        const userStore = useUserStoreWithOut()

        return new Promise((resolve, reject) => {
            if (shouldDelImages.length > 0) {
                resolve(true)
            } else {
                Promise.all(
                    shouldDelImages.map(async (img: string) => {
                        await delUpload({
                                key: `${userStore.info.uid}/article/${img.split('/').pop()}`,
                            },
                        )
                    }),
                ).then(() => {
                    resolve(true)
                }).catch(() => {
                    reject(false)
                })
            }
        })
    }

    const back = (insertedImages: string[]) => {
        delNoUseImages(insertedImages, true).then(() => {
            router.back()
        })
    }

    const handleUploadChange = (data: {
        event: Event
        fileList: UploadFileInfo[]
        file: UploadFileInfo
    }) => {
        const userStore = useUserStoreWithOut()
        if (data.event == null) {
            articleData.preview_url = []
            return
        }

        articleData.preview_url = data.fileList
    }

    return {
        editorRef,
        html,
        isShowDialog,
        articleData,
        handleUploadChange,
        handleCreated,
        submit,
        back,
        beforeUpload,
    }
}

export {
    useEditor,
}