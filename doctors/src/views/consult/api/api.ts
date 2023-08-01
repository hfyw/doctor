import api from '@/utils/httpRequest'
import axios from 'axios'
import * as TS from './define'
import { useUserStore } from '@/stores'
//获取科室
export const QueryAllDepartments = () => api.get<TS.DepartmentRes>('dep/all')

//上传图片
export const uploadApi = (params: any) => {
  const pinia = useUserStore()
  const token = `Bearer ${pinia.user.token}`
  return axios({
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    url: 'https://consult-api.itheima.net/upload',
    data: params
  })
}

//计算就诊信息和抵扣信息
export const CalculateVisitInformation = (
  data: TS.CalculateVisitInformationDate
) => api.get<TS.CalculateVisitInformationRes>('patient/consult/order/pre', data)
//支付接口
export const payInterface = (data: TS.payInterfaceDate) =>
  api.post<TS.payInterfaceRes>('patient/consult/pay', data)
//获取订单接口
export const getOrider = (data: TS.getOrideDate) =>
  api.post<TS.getOriderRes>('patient/consult/order', data)
