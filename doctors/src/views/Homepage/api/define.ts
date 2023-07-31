//获取推荐、减脂、饮食的请求校验
interface getListDate {
  type: string
  current: string
  pageSize: string
}
//获取关注的医生的请求校验
interface getFollowing {
  current: string
  pageSize: string
}
//关注医生的请求参数校验
interface FollowDocDate {
  type: Follow
  id: string
}

type Follow = 'topic' | 'knowledge' | 'doc' | 'disease'
//获取推荐、减脂、饮食的res校验
interface getListRes {
  rows: getListResRow[]
  total: number
  pageTotal: number
}

interface getListResRow {
  commentNumber: number
  likeFlag: number
  creatorName: string
  creatorAvatar: string
  creatorTitles: string
  creatorHospatalName: string
  creatorDep: string
  hospatalGrade: string
  id: string
  content: string
  coverUrl: string[]
  creatorId: string
  title: string
  topic: string
  collectionNumber: string
}
//获取关注的医生的res校验
interface getDoctorFollowingRes {
  rows: getDoctorFollowingResRow[]
  total: number
  pageTotal: number
}

interface getDoctorFollowingResRow {
  likeFlag: number
  id: string
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

//关注医生的res校验
interface FollowRes {
  id: string
}
//医生列表的赋值校验
interface DoctorList {
  list: getListResRow[]
}

//关注的医生的赋值校验
interface DoctorFollowingList {
  lists: getDoctorFollowingResRow[]
}
//医生的传参详细信息
interface DoctorDetail {
  likeFlag: boolean
  id: string
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

//时间对象的正则
interface event {
  isTrusted: boolean
  _vts: number
}
export type {
  getListDate,
  getFollowing,
  FollowDocDate,
  getListRes,
  getDoctorFollowingRes,
  FollowRes,
  DoctorList,
  DoctorFollowingList,
  DoctorDetail,
  event
}
