//密码登录的请求参数校验
interface passwordDate {
  password: string
  mobile: string
}

interface passwordLoginResData {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
  refreshToken: string
}

//请求验证码的请求参数校验
interface codeDate {
  mobile: string
  type: string
}
//验证码登录的请求参数校验
interface codeLoginDate {
  mobile: string
  code: string
}

interface LoginPasswordResData {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
  refreshToken: string
}
interface GetVerificationCodeRes {
  code: string
}

export type {
  LoginPasswordResData,
  GetVerificationCodeRes,
  codeDate,
  passwordDate,
  codeLoginDate
}

// 泛型：指定一个占位符，类型不一定，需要用的时候传递不同的类型校验   T
// 断言： 无论传递过来的任何类型的值都作为字符串 as string
