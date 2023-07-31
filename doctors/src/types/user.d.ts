// 用户信息
export type User = {
  /** token令牌 */
  token: string
  /** 用户ID */
  id: string
  /** 用户名称 */
  account: string
  /** 手机号 */
  mobile: string
  /** 头像 */
  avatar: string
}
// 图文信息
export type ImgTxt = {
  /** 病情描述*/
  txt: string | undefined
  /** 患病时间*/
  DateOfIllness: string
  /** 是否去医院就诊过*/
  VisitStatus: string
}
// 患者信息
export interface patientInfo {
  name: string
  idCard: string
  defaultFlag: number
  gender: number
  genderValue: string
  age: number
  id: string
}
