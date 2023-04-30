declare namespace Login {
    interface loginRes {
        info: {
            id: number
            username: string
            gender: number
            avatarUrl: string
            tel: string
        }
        token: string
    }
}