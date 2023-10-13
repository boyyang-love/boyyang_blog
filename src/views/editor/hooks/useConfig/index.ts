type InsertFnType = (url: string, alt: string, href: string) => void
import {upload} from '@/api/upload'
import {useUserStoreWithOut} from '@/store/modules/user'
import {env} from '@/utils/env'
import {ref} from 'vue'

const insertedImages = ref<string[]>([])
const useConfig = () => {
    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容',
        MENU_CONF: {
            uploadImage: {
                async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
                    const userStore = useUserStoreWithOut()
                    window.$loadingBar.start()
                    const fileInfo = await upload({
                        file_name: file.name,
                        file: file,
                        path: `${userStore.info.uid}/article`,
                    })

                    window.$loadingBar.finish()

                    insertFn(`${env.VITE_APP_IMG_URL}/${fileInfo.key}`, file.name, `${env.VITE_APP_IMG_URL}/${fileInfo.key}`)
                },
            },
            insertImage: {
                onInsertedImage(imageNode: any | null) {  // TS 语法
                    // onInsertedImage(imageNode) {                    // JS 语法
                    if (imageNode == null) return
                    const { src, alt, url, href } = imageNode
                    insertedImages.value.push(src)
                },
            }
        },
    }

    return {
        insertedImages,
        toolbarConfig,
        editorConfig,
    }
}

export {
    useConfig,
}