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
//支付接口响应Res
interface payInterfaceRes {
  payUrl: string
}

//获取订单请求参数校验
interface getOrideDate {
  /**
   * 开药门诊-过敏史0无1有2不清楚
   */
  allergicHistory?: number
  /**
   * 找医生/极速问诊-是否就诊过0未就诊1就诊过
   */
  consultFlag?: number
  /**
   * 使用优惠券，必传可使用优惠券id
   */
  couponId?: string
  /**
   * 选择的科室id-极速问诊必填(选择的科室)
   */
  depId?: string
  /**
   * 咨询的医生-类型为找医生问诊，字段是必须的
   */
  docId?: string
  /**
   * 开药门诊-生育状态及计划0无1备孕中2已怀孕3哺乳期
   */
  fertilityStatus?: number
  /**
   * 病情--症状描述
   */
  illnessDesc: string
  /**
   * 找医生/极速问诊-患病时间1一周内2一月内3半年内4半年以上
   */
  illnessTime?: number
  /**
   * 极速问诊类型：0普通1三甲
   */
  illnessType?: number
  /**
   * 开药门诊-肝功能0正常1异常2不清楚
   */
  liverFunction?: number
  /**
   * 开药问诊-开药问诊的药品id集合
   */
  medicines?: Medicine[]
  /**
   * 患者id,用于关联患者信息
   */
  patientId: string
  /**
   * 补充病例信息-图片集合
   */
  pictures?: Picture[]
  /**
   * 开药门诊-肾功能0正常1异常2不清楚
   */
  renalFunction?: number
  /**
   * 就诊类型1找医生 2极速问诊 3开药问诊默认是1
   */
  type: number
}

export interface Medicine {
  /**
   * 选择的药品id
   */
  id: string
  /**
   * 选择的药品数量
   */
  quantity: number
}

export interface Picture {
  /**
   * 图片id
   */
  id: string
  /**
   * 图片url
   */
  url: string
}

//获取订单响应校验
interface getOriderRes {
  id: string
}

export type {
  DepartmentRes,
  data,
  FileRes,
  CalculateVisitInformationDate,
  CalculateVisitInformationRes,
  payInterfaceDate,
  getOrideDate,
  getOriderRes,
  payInterfaceRes
}
