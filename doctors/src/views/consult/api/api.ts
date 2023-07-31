import api from '@/utils/httpRequest'
import * as TS from './define'
//获取科室
export const QueryAllDepartments = () => api.get<TS.DepartmentRes>('dep/all')
//计算就诊信息和抵扣信息
export const CalculateVisitInformation = (
  data: TS.CalculateVisitInformationDate
) => api.get<TS.CalculateVisitInformationRes>('patient/consult/order/pre', data)
//支付接口
export const payInterface = (data: TS.payInterfaceDate) =>
  api.post('patient/consult/pay', data)
