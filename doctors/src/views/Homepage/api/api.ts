import api from '@/utils/httpRequest'
import * as TS from './define'
//获取推荐、减脂、饮食的接口
export const getList = (params: TS.getListDate) =>
  api.get<TS.getListRes>('patient/home/knowledge', params)
//获取关注的医生
export const getDoctorFollowing = (params: TS.getFollowing) =>
  api.get<TS.getDoctorFollowingRes>('home/page/doc', params)
//关注医生
export const Follow = (data: TS.FollowDocDate) =>
  api.post<TS.FollowRes>('like', data)
