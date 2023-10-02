import {reactive} from 'vue'
import {LocationQuery} from 'vue-router'
import {blogDetail, blogEdit} from '@/api/blog'
import {env} from '@/utils/env'

const useBlog = () => {
    const blogData = reactive({
        uid: 0,
        title: '',
        sub_title: '',
        isShowEdit: false,
        blogInfo: {} as Blog.BlogInfo,
        blogInfoEdit: {} as Blog.BlogInfo,
    })

    const getBlogDetail = (query: LocationQuery): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            let id = query.id
            let params = {
                uids: String(id),
            }
            blogDetail(params)
                .then(res => {
                    blogData.blogInfo =
                        res.data.blog_info &&
                        res.data.blog_info.map(item => {
                            item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                            return item
                        })[0]

                    blogData.blogInfoEdit = {...blogData.blogInfo}
                    blogData.title = res.data.blog_info[0].title
                    blogData.sub_title = res.data.blog_info[0].sub_title
                    blogData.uid = res.data.blog_info[0].uid

                    resolve(true)
                })
                .catch(() => {
                    reject(false)
                })
        })
    }

    const editSubmit = async () => {
        let data = {
            uid: blogData.uid,
            title: blogData.title,
            sub_title: blogData.sub_title,
            content: blogData.blogInfoEdit.content,
        }

        await blogEdit(data)
        blogData.blogInfo = {...blogData.blogInfoEdit}
        return true
    }

    return {
        blogData,
        getBlogDetail,
        editSubmit,
    }
}

export {useBlog}
