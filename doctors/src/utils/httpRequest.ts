import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { useUserStore } from '@/stores'
import * as TS from './PublicMethods'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import router from '@/router'
const URL: string = 'https://consult-api.itheima.net'

const config = {
  baseURL: URL as string,
  timeout: 10000
}

class RequestHttp {
  //定义成员变量并指定类型
  service: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    /**
     * 请求拦截器
     * 客户端发送请求->[请求拦截器]->服务器
     *
     * */
    this.service.interceptors.request.use(
      (config) => {
        NProgress.start() // 开启Progress
        const store = useUserStore()
        if (store.user?.token && config.headers) {
          config.headers['Authorization'] = `Bearer ${store.user?.token}`
        }
        return config
      },
      (error: AxiosError) => {
        const store = useUserStore()
        if (error.code == '401') {
          store.delUser()
          router.push('/login')
        }
      }
    )
    /**
     * 响应拦截器
     * 服务器换返回信息->[拦截统一处理]->客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (res: AxiosResponse) => {
        NProgress.done() // 结束Progress
        return res
      },
      (error: AxiosError) => {
        console.error(error)
      }
    )
  }

  //常用方法封装
  get<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.get(url, { params }).then((res) => res.data)
  }
  post<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.post(url, params).then((res) => res.data)
  }
  put<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.put(url, params).then((res) => res.data)
  }
  delete<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.delete(url, { params }).then((res) => res.data)
  }
}
const http = new RequestHttp(config)
export default http
