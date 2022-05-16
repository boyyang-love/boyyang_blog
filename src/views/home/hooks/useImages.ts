/**
 * @Author: boyyang
 * @Date: 2022-04-09 17:21:30
 * @LastEditTime: 2022-05-14 16:54:40
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\home\hooks\useImages.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */
import { reactive, watchEffect } from 'vue'
import { getImgs, publishImage } from '@/api/banner'
import { env } from '@/utils/env'

const imagesData = reactive({
    list: [] as any,
    page: 1,
    limit: 12,
    count: 0,
    showModal: false,
    isloading: false,
})

const useImages = () => {
    // 获取图片列表
    const getImgList = async () => {
        let params = {
            page: imagesData.page,
            limit: imagesData.limit,
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
    }
    // 获取下一页数据
    const nextPage = () => {
        imagesData.page++
        if (imagesData.page > Math.ceil(imagesData.count / imagesData.limit)) {
            imagesData.page--
            window.$message.warning('没有更多了')
            return
        }
        getImgList()
    }
    // 获取上一页数据
    const prevPage = () => {
        imagesData.page--
        if (imagesData.page < 1) {
            imagesData.page++
            window.$message.warning('已经是第一页了')
            return
        }
        getImgList()
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
    watchEffect(() => {
        getImgList()
    })

    setTimeout(() => {
        imagesData.page + 1
    }, 5000);
    return {
        imagesData,
        submit,
    }
}

export { useImages }
