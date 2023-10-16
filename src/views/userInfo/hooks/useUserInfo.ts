import {reactive} from 'vue'
import {useUserStoreWithOut} from '@/store/modules/user'
import {updateUserInfo} from '@/api/user'
import {upload, delUpload} from '@/api/upload'
import {User} from '@/api/user/type'
import {env} from '@/utils/env'

const userStore = useUserStoreWithOut()
const userInfoData = reactive({
    isShow: false,
    isLoading: false,
    submit: {} as User.Info,
    file: null as unknown as File,
    delUrl: '', // 头像更新时删除上一张图片
})

const showInfo = (show: boolean) => {
    userInfoData.isShow = show
    userInfoData.submit = {
        ...userStore.info,
    }
}

// 保存
const submit = () => {
    userInfoData.isLoading = true
    let data = {
        uid: userInfoData.submit.uid,
        username: userInfoData.submit.username,
        avatar_url: userInfoData.submit.avatar_url,
        tel: userInfoData.submit.tel,
        motto: userInfoData.submit.motto,
        wechat: userInfoData.submit.wechat,
        qq: userInfoData.submit.qq,
        git_hub: userInfoData.submit.git_hub,
    } as User.UpdateUserInfo


    if (userInfoData.file?.name) {
        upload({
                file_name: userInfoData.file.name,
                file: userInfoData.file,
                path: `${userStore.info.uid}/avatar`,
            },
        ).then(() => {
            userInfoData.delUrl = data.avatar_url as string
            data.avatar_url = `${userStore.info.uid}/avatar/${userInfoData.file.name}`
            userInfoData.file = null as unknown as File
            updateUserInfoApi(data)
            delOldAvatar()
        })
    } else {
        updateUserInfoApi(data)
    }
}

// 更新用户基本信息
const updateUserInfoApi = (data: User.UpdateUserInfo) => {
    updateUserInfo(data).then(() => {
        userInfoData.submit = {
            ...userInfoData.submit,
            ...data,
        } as User.Info

        userStore.$patch(state => {
            state.info = {...userInfoData.submit} as User.Info
        })

        userInfoData.isShow = false
        userInfoData.isLoading = false
    }).catch(() => {
        userInfoData.isLoading = false
    })
}

const delOldAvatar = () => {
    const avatar = Array.from({length: 11}).map((_, i) => {
        return `avatar/${i < 9 ? '0' + (i + 1) : (i + 1)}m.svg`
    })

    if (avatar.includes(userInfoData.delUrl)) {
        return
    }
    delUpload({key: userInfoData.delUrl}).then(() => {
    })
}

const avatarSubmit = (data: { file: File, blob: Blob }) => {
    userInfoData.file = data.file
}

export const useUserInfo = () => {

    return {
        userInfoData,
        showInfo,
        avatarSubmit,
        submit,
    }
}