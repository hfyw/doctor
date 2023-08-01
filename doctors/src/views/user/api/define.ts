//获取用户信息的res校验
interface UserInfoRes {
  couponNumber: number
  score: number
  likeNumber: number
  collectionNumber: number
  account: string
  avatar: string
  id: string
  mobile: string
  consultationInfo: ConsultationInfo[]
  orderInfo: OrderInfo
}

interface OrderInfo {
  paidNumber: number
  receivedNumber: number
  shippedNumber: number
  finishedNumber: number
}

interface ConsultationInfo {
  orderId: string
  id: string
  likeFlag: number
  name: string
  avatar: string
  major: string
  score: string
  consultationNum: string
  serviceFee: string
  positionalTitles: string
  hospitalName: string
  gradeName: string
  depName: string
}

interface obj {
  user: UserInfoRes
}

//获取订单列表的请求参数
interface getOrderListData {
  current: string
  pageSize: string
  type: string
}

//获取订单列表的res校验
interface getOrderListDataRes {
  total: number
  pageTotal: number
  rows: Row[]
}

interface Row {
  id: string
  orderNo: string
  type: string
  typeValue: string
  createTime: string
  patientInfo: PatientInfo
  illnessDesc: string
  docInfo: DocInfo
  prescriptionId?: string
  status: number
  statusValue: string
  cancelProcess?: string
  payment: number
  evaluateId?: any
  illnessTime: number
  consultFlag: number
  cancelReason?: string
  cancelReasonValue?: string
}

interface DocInfo {
  id?: string
  name: string
  avatar?: string
  depName?: string
  positionalTitles?: string
  hospitalName?: string
  gradeName?: string
}

interface PatientInfo {
  name: string
  idCard: string
  gender: number
  genderValue: string
  age: number
  id: string
}
//页面res的赋值校验
interface listsList {
  list: Row[]
}

// 查看处方的返回值校验
interface lookPrescriptionsRes {
  url: string
}
//查看处方的请求值校验
interface lookPrescriptionsRequest {
  id: string
}
// 查询患者列表信息的res校验
type PatientRes = PatientResObj[]
interface PatientResObj {
  name: string
  idCard: string
  defaultFlag: number
  gender: number
  genderValue: string
  age: number
  id: string
}
//添加患者信息的请求参数校验
//编辑患者信息的请求参数校验
interface PatientDate {
  name: string
  idCard: string
  defaultFlag: number
  id?: string
  gender?: number
  genderValue?: string
  age?: number
}
//删除患者信息的请求参数校验
interface delDate {
  id: string | undefined
}

// 订单详情的请求校验
interface OrderDetailDate {
  orderId: string
}
//订单详情的响应Res校验

interface OrderDetailRes {
  id: string
  orderNo: string
  type: string
  createTime: string
  patientInfo: OrderDetailResPatientInfo
  illnessDesc: string
  recordId: string
  status: number
  statusValue: string
  cancelProcess?: any
  countdown: number
  payment: number
  pointDeduction: number
  couponDeduction: number
  actualPayment: number
  creator: string
  evaluateFlag: number
  pictures: any[]
  illnessTime: number
  consultFlag: number
}
interface OrderDetailResPatientInfo {
  name: string
  idCard: string
  gender: number
  genderValue: string
  age: number
  id: string
}

//订单详情的响应Res赋值校验
interface OrderOrders {
  orders: OrderDetailRes
}

export type {
  UserInfoRes,
  obj,
  getOrderListData,
  getOrderListDataRes,
  listsList,
  lookPrescriptionsRequest,
  lookPrescriptionsRes,
  PatientRes,
  PatientResObj,
  PatientDate,
  delDate,
  OrderDetailDate,
  OrderDetailRes,
  OrderOrders
}
