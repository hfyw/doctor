import api from '@/utils/httpRequest'
import * as TS from './defind'
//登录获取验证码
export const GetVerificationCode = (data: TS.codeDate) =>
  api.get<TS.GetVerificationCodeRes>('code', data)
//密码登录
export const LoginPassword = (data: TS.passwordDate) =>
  api.post<TS.LoginPasswordResData>('login/password', data)

//验证码登录
export const AuthenticationCodeLogin = (data: TS.codeLoginDate) =>
  api.post<TS.LoginPasswordResData>('login', data)
