import {onBeforeUnmount, reactive, ref, shallowRef} from 'vue'
import {router} from '@/router'

const useEditor = () => {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const html = ref<string>('')
    const isShowDialog = ref<boolean>(false)
    const articleData = reactive({
        title: '',
        sub_title: '',
        tags: [],
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
        console.log(editor.getHtml())
    }

    const back = () => {
        router.push({
            name: 'Home',
        }).then()
    }

    return {
        editorRef,
        html,
        isShowDialog,
        articleData,
        handleCreated,
        submit,
        back,
    }
}

export {
    useEditor,
}