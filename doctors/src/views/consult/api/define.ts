//获取科室的res校验
interface DepartmentRes {
  code: number
  message: string
  data: DepartmentResData[]
}

interface DepartmentResData {
  id: string
  name: string
  child: DepartmentResDataChild[]
}

interface DepartmentResDataChild {
  id: string
  name: string
  avatar: string
}
//科室的赋值数据校验
interface data {
  list: DepartmentResData[]
}
//file的校验

interface FileRes {
  file: File
  status: string
  message?: any
  objectUrl: string
  content: string
}
//计算就诊信息的请求校验
interface CalculateVisitInformationDate {
  type: string
  illnessType?: string
  useCoupon?: string
  couponId?: string
  docId?: string
}
//计算就诊信息的响应校验
interface CalculateVisitInformationRes {
  payment: number
  couponDeduction: number
  couponId?: any
  pointDeduction: number
  actualPayment: number
}
// 支付接口请求参数校验
interface payInterfaceDate {
  paymentMethod?: '0' | '1'
  orderId: string | undefined
  payCallback?: string
}

export type {
  DepartmentRes,
  data,
  FileRes,
  CalculateVisitInformationDate,
  CalculateVisitInformationRes,
  payInterfaceDate
}
