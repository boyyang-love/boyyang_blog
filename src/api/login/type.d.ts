declare namespace Login {
    interface loginRes {
        info: {
            uid: number
            username: string
            gender: number
            avatar_url: string
            tel: string
            background_image: string
            role: string
        }
        token: string
    }
}