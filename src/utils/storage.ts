/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:47:03
 * @LastEditTime: 2023-02-23 15:36:02
 * @LastEditors: boyyang
 * @Description: 本地储存
 * @FilePath: \blog_web\src\utils\storage.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */


/**
 * @description 创建本地存储对象
 * @param {string} prefixKey 存储对象前缀
 * @param {Storage} storage 存储类型 默认为 localStorage
 * @param {number | undefined} expire 存储有效时间 默认为 undefined(永久保存)
 * */ 
const createStorage = (prefixKey?: string, storage: Storage = localStorage, expire: number | undefined = undefined) => {
    class Store {
        private prefixKey: string
        private storage: Storage
        private expire: number | undefined
        constructor(prefixKey?: string, storage?: Storage) {
            this.prefixKey = prefixKey || ''
            this.storage = storage || localStorage
            this.expire = expire || undefined
        }
        // 获取key
        private getKey(key: string) {
            return `${this.prefixKey ? this.prefixKey + '-' : ''}${key}`.toUpperCase()
        }
        // 获取本地储存的值
        public get(key: string) {
            let value = this.storage.getItem(this.getKey(key))
            if (value) {
                try {
                    let _value = JSON.parse(value)
                    if (_value.expire && _value.expire < new Date().getTime()) {
                        this.remove(key)
                        return null
                    } else {
                        return _value.value
                    }
                } catch (e) {
                    value = value
                }
            } else {
                return null
            }
        }
        // 设置本地储存的值
        public set(key: string, value: string) {
            let _value = {
                value,
                expire: this.expire ? new Date().getTime() + this.expire : undefined
            }
            this.storage.setItem(this.getKey(key), JSON.stringify(_value))
        }
        // 删除本地储存的值
        public remove(key: string) {
            this.storage.removeItem(this.getKey(key))
        }
        // 获取cookie
        public getCookie(key: string) {
            const cookieArray = document.cookie.split('; ')
            let length = cookieArray.length
            for (let i = 0; i < length; i++) {
                const kv = cookieArray[i].split('=')
                if (kv[0] === this.getKey(key)) {
                    // console.log(kv)
                    return kv[1]
                }
            }
            return ''
        }
        // 设置cookie
        public setCookie(key: string, value: any) {
            document.cookie = `${this.getKey(key)}=${value}; Max-Age=${expire}`
        }
        // 清除storage
        public clear(): void {
            this.storage.clear()
        }
    }
    return new Store(prefixKey, storage)
}

export {
    createStorage
}