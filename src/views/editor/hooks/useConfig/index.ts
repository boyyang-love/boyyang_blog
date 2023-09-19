type InsertFnType = (url: string, alt: string, href: string) => void
import {upload} from '@/api/upload'
import {useUserStoreWithOut} from '@/store/modules/user'
import {env} from '@/utils/env'

const useConfig = () => {
    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容',
        MENU_CONF: {
            uploadImage: {
                async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
                    const userStore = useUserStoreWithOut()
                    window.$loading.loadingStart()
                    const fileInfo = await upload({
                        file_name: file.name,
                        file: file,
                        path: `${userStore.info.uid}/article`,
                    })

                    window.$loading.loadingEnd()

                    insertFn(`${env.VITE_APP_IMG_URL}/${fileInfo.key}`, file.name, `${env.VITE_APP_IMG_URL}/${fileInfo.key}`)
                },
            },
        },
    }

    return {
        toolbarConfig,
        editorConfig,
    }
}

export {
    useConfig,
}