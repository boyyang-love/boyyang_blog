import {reactive} from 'vue'
import {LocationQuery} from 'vue-router'
import {blogDetail} from '@/api/blog'
import {env} from '@/utils/env'

const blogData = reactive({
    blogInfo: {} as blog_blogInfo,
})

const getBlogDetail = (query: LocationQuery): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        let id = query.id
        let params = {
            ids: String(id),
        }
        blogDetail(params)
            .then(res => {
                blogData.blogInfo =
                    res.data.blog_info &&
                    res.data.blog_info.map(item => {
                        item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                        return item
                    })[0]

                resolve(true)
            })
            .catch(() => {
                reject(false)
            })
    })
}

const useBlog = () => {
    return {
        blogData,
        getBlogDetail,
    }
}

export {useBlog}
