/**
 * @Author: boyyang
 * @Date: 2022-04-09 17:21:30
 * @LastEditTime: 2022-06-04 20:46:23
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\home\hooks\useImages.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */
import { h, reactive, watchEffect } from 'vue'
import { NImage } from 'naive-ui'
import { getImgs, publishImage, editImage, deleteImage } from '@/api/banner'
import { env } from '@/utils/env'

const imagesData = reactive({
    list: [] as any,
    page: 1,
    limit: 3,
    count: 0,
    showModal: false,
    showEditModal: false,
    isloading: false,
    edit: {} as any,
    bg: ''
})

const useImages = () => {
    // 获取图片列表
    const getImgList = async () => {
        let params = {
            page: imagesData.page,
            limit: imagesData.limit,
            // status: 1
        }
        const res = (await getImgs(params)) as any
        let list =
            res.data &&
            res.data.map((item: any) => {
                item.url = `${env.VITE_APP_IMG_URL}${item.url}`
                item.author.avaterUrl = `${env.VITE_APP_IMG_URL}${item.author.avaterUrl}`
                return item
            })
        imagesData.list = list
        imagesData.count = res.count
        imagesData.bg = list[0].url
    }
    // 获取下一页数据
    const nextPage = () => {
        imagesData.page++
        if (imagesData.page > Math.ceil(imagesData.count / imagesData.limit)) {
            imagesData.page--
            window.$message.warning('没有更多了')
            return
        }
        // getImgList()
    }
    // 获取上一页数据
    const prevPage = () => {
        imagesData.page--
        if (imagesData.page < 1) {
            imagesData.page++
            window.$message.warning('已经是第一页了')
            return
        }
    }
    // 发布图片
    const submit = (e: any) => {
        let params = {
            url: e.url,
            file_name: e.file_name,
            name: e.name,
            des: e.des,
        }
        publishImage(params).then(res => {
            imagesData.showModal = false
            getImgList()
        })
    }
    // 编辑图片
    const edit = (e: any) => {
        imagesData.edit = e
        imagesData.showEditModal = true
    }
    // 编辑图片 submit
    const editSubmit = () => {
        let params = {
            ID: imagesData.edit.id,
            name: imagesData.edit.title,
            des: imagesData.edit.des,
        }
        editImage(params).then(res => {
            imagesData.showEditModal = false
            getImgList()
        })
    }
    // 删除图片
    const del = (e: any) => {
        window.$dialog.error({
            title: '是否删除当前图片？',
            content: () => {
                return h(NImage, {
                    src: `${e.url}`,
                    style: {
                        // width:'450px',
                        // height:'200px',
                        objfit:'cover',
                    },
                })
            },
            positiveText: '删除',
            negativeText: '取消',
            onPositiveClick: () => {
                let params = {
                    id: e.id,
                }
                deleteImage(params).then(res => {
                    window.$message.success('删除成功')
                    getImgList()
                })
            },
        })
    }
    watchEffect(() => {
        getImgList()
    })

    return {
        imagesData,
        submit,
        nextPage,
        prevPage,
        edit,
        editSubmit,
        del,
    }
}

export { useImages }
