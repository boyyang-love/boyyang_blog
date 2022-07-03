/**
 * @Author: boyyang
 * @Date: 2022-06-12 15:52:50
 * @LastEditTime: 2022-07-03 16:51:48
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\home\hooks\useUser.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { updateUser } from '@/api/user'
import { useUserStoreWithOut } from '@/store/modules/user'

const userStore = useUserStoreWithOut()
const userData = reactive({
    isShowEdit: false,
    isEditLoading: false,
    user: {
        ...userStore.getUserInfo,
    },
    sexOptions: [
        { label: '男', value: 1 },
        { label: '女', value: 0 },
    ],
})

const useUser = () => {
    // 编辑用户信息
    const editUser = async () => {
        let params = {
            ...userData.user,
        }
        let p = new Promise((resolve, reject) => {
            updateUser(params)
                .then(res => {
                    const userStore = useUserStoreWithOut()
                    userStore.setUserinfo(params)
                    resolve(true)
                })
                .catch(() => {
                    reject(false)
                })
        })
        return await p
    }
    return {
        userData,
        editUser,
    }
}

export { useUser }
