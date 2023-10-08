import {h, onMounted, reactive, watch} from 'vue'
import {adminExhibitions, adminStat} from '@/api/admin'
import {Admin} from '@/api/admin/types'
import {env} from '@/utils/env'
import {changeExhibitionStatus} from '@/api/exhibition'
import {router} from '@/router'

const useAdmin = () => {
    const adminData = reactive({
        page: 1,
        limit: 9,
        type: 1,
        sort: 'created desc',
        count: 0,
        list: [] as (Admin.ExhibitionsInfo & { isShow: boolean, isShowDel: boolean })[],
    })

    const getList = () => {
        let params = {
            page: adminData.page,
            limit: adminData.limit,
            type: adminData.type,
            sort: adminData.sort,
        }
        window.$loadingBar.start()
        adminExhibitions(params).then((res) => {
            adminData.count = res.data.count
            adminData.list = res.data.exhibitions.map(e => {
                return {
                    ...e,
                    cover: `${env.VITE_APP_IMG_URL}${e.cover}`,
                    isShow: false,
                    isShowDel: false,
                }
            })
            window.$loadingBar.finish()
        })
    }

    const changeStatus = async (
        type: number,
        id: number,
        reason: string,
        item?: Admin.ExhibitionsInfo & {
            isShow: boolean,
            isShowDel: boolean
        },
    ) => {
        let data = {
            uid: id,
            status: type,
            reason: reason,
        }

        if (data.status === 3) {
            if (data.reason.trim() === '') {
                window.$message.warning('请输入驳回理由')
                return
            }
            window.$dialog.warning({
                title: '是否驳回当前图片的发布申请？',
                content: () => {
                    return h('img', {src: item?.cover})
                },
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: async () => {
                    await changeExhibitionStatus(data)
                    getList()
                },
            })
        } else {
            await changeExhibitionStatus(data)
            getList()
        }
    }

    const menuIconClick = (id: number) => {
        if (id === 4) {
            window.$dialog.warning({
                title: '提示',
                content: '是否退出当前页面',
                positiveText: '退出',
                negativeText: '取消',
                onPositiveClick: () => {
                    router.back()
                },
            })
        } else {
            adminData.type = id
            adminData.page = 1
        }
    }

    watch(
        [
            () => adminData.page,
            () => adminData.limit,
            () => adminData.type,
        ],
        () => {
            getList()
        },
    )


    return {
        adminData,
        getList,
        changeStatus,
        menuIconClick,
    }
}

export {
    useAdmin,
}