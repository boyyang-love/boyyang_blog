import {reactive} from 'vue'

export interface AdminData {
    username: string
    role: string
}

const useAdmin = () => {
    const adminData = reactive<AdminData>({
        username: '',
        role: '',
    })

    const changeUsername = (name: string) => {
        adminData.username = name
    }

    return {
        adminData,
        changeUsername,
    }
}

export {
    useAdmin
}