import api from '@/utils/httpRequest'
import * as TS from './define'
//获取我的信息
export const getUserInfo = () => api.get<TS.UserInfoRes>('patient/myUser')
// 问诊记录-订单列表-找医生、极速问诊、开药问诊
export const getOrderList = (params: TS.getOrderListData) =>
  api.get<TS.getOrderListDataRes>('patient/consult/order/list', params)
// 查看处方
export const lookPrescription = (params: TS.lookPrescriptionsRequest) =>
  api.get<TS.lookPrescriptionsRes>(`patient/consult/prescription/${params.id}`)
//删除订单
export const DelOrider = (params: TS.lookPrescriptionsRequest) =>
  api.delete(`patient/order/${params.id}`)
// 问诊-查询患者列表信息
export const QueryPatientList = () => api.get<TS.PatientRes>('patient/mylist')
//添加患者信息
export const AddPatient = (data: TS.PatientDate) =>
  api.post<TS.lookPrescriptionsRes>('patient/add', data)
//编辑患者信息
export const EditPatient = (data: TS.PatientDate) =>
  api.put<TS.lookPrescriptionsRes>('patient/update', data)
// 删除患者信息
export const DeletePatient = (data: TS.delDate) =>
  api.delete<TS.delDate>(`patient/del/${data.id}`)
//取消订单
export const CancelOrder = (data: TS.delDate) =>
  api.put(`patient/order/cancel/${data.id}`)
//获取详情订单信息
export const getOrder = (data: TS.OrderDetailDate) =>
  api.get<TS.OrderDetailRes>('patient/consult/order/detail', data)
