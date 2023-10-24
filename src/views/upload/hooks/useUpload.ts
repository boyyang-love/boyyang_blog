import {computed, PropType, reactive, onMounted} from 'vue'
import {UploadFileInfo, UploadInst} from 'naive-ui'

// api
import {createExhibition} from '@/api/exhibition'
import {upload} from '@/api/upload'
import {useUserStoreWithOut} from '@/store/modules/user'
import {tagsInfo, type Tag} from '@/api/tag'



const useUpload = () => {
    const uploadData = reactive({
        isShowSpin: false,
        fileList: [] as UploadFileInfo[],
        uploadUrl: '',
        defaultTags: [] as string[],
        submit: {
            title: '',
            des: '',
            cover: '',
            tags: '',
        },
        previewUrl: '',
        tags: [],
        tagsOptions: [] as {label: string, value: number}[]
    })
    onMounted(() => {
        tagsInfo({type: 'image'}).then((res) => {
            uploadData.tagsOptions = res.data.tags_info.map(tag => {
                return {
                    label: tag.name,
                    value: tag.uid
                }
            })
        })
    })
    const handleUploadChange = (data: {
        event: Event
        fileList: UploadFileInfo[]
        file: UploadFileInfo
    }) => {
        if (data.event == null) {
            uploadData.previewUrl = ''
            return
        }

        let name = data.file.name.split('.').shift()
        uploadData.submit.title = name || ''
        uploadData.submit.des = name || ''
        uploadData.defaultTags = name?.split(' ') || []
        const read = new FileReader()
        read.readAsDataURL(data.file.file as Blob)
        read.onload = e => {
            uploadData.previewUrl = e.target?.result as string
        }
    }

    const submit = (uploadRef: UploadInst | null) => {
        const userStore = useUserStoreWithOut()
        if (
            uploadData.submit.title == '' ||
            uploadData.submit.des == '' ||
            uploadData.fileList.length == 0 ||
            uploadData.tags.length == 0
        ) {
            window.$notification.create({
                title: '提示',
                type: 'error',
                content: '标题，描述，图片，分类为必传项!',
                duration: 3000,
            })

            return
        }

        let params = {
            file_name: uploadData.fileList[0].name,
            file: uploadData.fileList[0].file as File,
            path: `${userStore.info.uid}/images`
        }
        uploadData.isShowSpin = true
        upload(params).then((res) => {
            uploadData.submit.cover = res.key
            uploadData.submit.tags = uploadData.tags.join(",")

            let params = {
                ...uploadData.submit,
                size: res.size,
                px: res.px,
                rgb: res.rgb,
                palette: res.palette.join('-'),
                type: res.type,
            }
            createExhibition(params).then(() => {
                uploadData.isShowSpin = false
                window.$notification.create({
                    title: '提示',
                    type: 'success',
                    content: '图片上传成功',
                    duration: 3000,
                })
                uploadData.submit = {
                    title: '',
                    des: '',
                    cover: '',
                    tags: '',
                }

                uploadData.tags = []
                uploadData.fileList = []
                uploadData.previewUrl = ''
            })
        })
    }
    return {
        uploadData,
        handleUploadChange,
        submit,
    }
}

export {useUpload}