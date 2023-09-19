import {onBeforeUnmount, reactive, ref, shallowRef} from 'vue'
import {router} from '@/router'
import {UploadFileInfo} from 'naive-ui'
import {upload, delUpload} from '@/api/upload'
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

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })


    const handleCreated = (editor: any) => {
        editorRef.value = editor // 记录 editor 实例，重要！
    }

    const submit = () => {
        const editor = editorRef.value
        console.log(articleData.preview_url)
    }

    const back = () => {
        router.push({
            name: 'Home',
        }).then()
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
    }
}

export {
    useEditor,
}