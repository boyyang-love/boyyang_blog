import {computed, onBeforeUnmount, reactive, ref, shallowRef} from 'vue'
import {router} from '@/router'
import {UploadFileInfo, DynamicTagsOption} from 'naive-ui'
import {delUpload, upload} from '@/api/upload'
import {createArticle} from '@/api/article'
import {useUserStoreWithOut} from '@/store/modules/user'
import {useConfig} from '../useConfig'
import {tagsInfo} from '@/api/tag'


const useEditor = () => {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const html = ref<string>('')
    const isShowDialog = ref<boolean>(false)
    const articleData = reactive({
        title: '',
        sub_title: '',
        tagsOptions: [] as DynamicTagsOption[],
        tags: [],
        preview_url: [] as UploadFileInfo[],
    })
    const isLoading = ref<boolean>(false)

    const isEmpty = computed(() => {
        return articleData.title.trim() === '' || articleData.sub_title.trim() === '' || articleData.preview_url.length === 0
    })

    const {insertedImages} = useConfig()

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

    const submit = async () => {
        const editor = editorRef.value
        const userStore = useUserStoreWithOut()
        await delNoUseImages(insertedImages.value, false)
        isLoading.value = true
        if (isEmpty.value) {
            window.$message.error('标题，描述，图片为必填项')
            isLoading.value = false
            return false
        } else {
            let res = await upload({
                file_name: articleData.preview_url[0].name,
                file: articleData.preview_url[0].file as File,
                path: `${userStore.info.uid}/article`,
            })
            const data = {
                cover: res.key,
                title: articleData.title,
                sub_title: articleData.sub_title,
                content: editor.getHtml(),
                tag: articleData.tags.join(','),
                images: articleImages().join(','),
            }

            await createArticle(data)
            editor.clear()
            insertedImages.value = []
            isLoading.value = false
            return true
        }
    }

    const delNoUseImages = async (insertedImages: string[], isAll: boolean) => {
        const editor = editorRef.value
        const articleImages = editor.getElemsByType('image').map((image: any) => image.src) || []
        const shouldDelImages = isAll ? insertedImages : insertedImages.filter(image => !articleImages.includes(image))
        const userStore = useUserStoreWithOut()
        return new Promise((resolve, reject) => {
            if (shouldDelImages.length == 0) {
                resolve(true)
            } else {
                Promise.all(shouldDelImages.map(async (img: string) => {
                    await delUpload({
                            key: `${userStore.info.uid}/article/${img.split('/').pop()}`,
                        },
                    )
                })).then(() => {
                    resolve(true)
                }).catch(() => reject(false))
            }
        })
    }

    const articleImages = () => {
        const editor = editorRef.value
        const userStore = useUserStoreWithOut()
        const images = editor.getElemsByType('image').map((image: any) => image.src) || []
        return images.map((image: any) => `${userStore.info.uid}/article/${image.split('/').pop()}`)
    }

    const back = async () => {
        const isdel = await delNoUseImages(insertedImages.value, true)
        insertedImages.value = []
        router.back()
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

    const getTagInfo = () => {
        tagsInfo({type: 'article'}).then((res) => {
            articleData.tagsOptions = res.data.tags_info.map((t) => {
                return {
                    value: String(t.uid),
                    label: t.name,
                }
            })
        })
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
        isLoading,
        getTagInfo,
    }
}

export {
    useEditor,
}