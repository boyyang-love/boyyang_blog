declare namespace Login {
    interface loginRes {
        info: {
            id: number
            username: string
            gender: number
            avatar_url: string
            tel: string
        }
        token: string
    }
}