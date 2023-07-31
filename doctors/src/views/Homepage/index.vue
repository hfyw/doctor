<template>
  <div class="home">
    <header>
      <h2>优医</h2>
      <!-- <svgIcon name="tool-01" width="100px" height="100px"></svgIcon> -->
      <input type="text" placeholder=" 搜一搜：疾病/症状/医生/健康知识" />
      <van-icon name="search" class="inputIcon" />
    </header>
    <nav class="bx">
      <div class="bigNav">
        <div>
          <svg>
            <use href="#icon-yisheng"></use>
          </svg>
          <p>问医生</p>
          <span>按科室查问医生</span>
        </div>
        <div @click="GoForAnUrgentConsultation">
          <svg>
            <use href="#icon-jisuwenzhen"></use>
          </svg>
          <p>急速问诊</p>
          <span>20s医生极速恢复</span>
        </div>
        <div>
          <svg>
            <use href="#icon-kaiyaomenzhen1"></use>
          </svg>
          <p>开药门诊</p>
          <span>线上买药更方便</span>
        </div>
      </div>
      <div class="smallNav">
        <div>
          <svg>
            <use href="#icon-yaopindingdan"></use>
          </svg>
          <p>药品订单</p>
        </div>
        <div>
          <svg>
            <use href="#icon-weixinxiaotubiaodansetubiaowodechufangdanV1"></use>
          </svg>
          <p>健康档案</p>
        </div>
        <div>
          <svg>
            <use href="#icon-jiankangdangan1"></use>
          </svg>
          <p>我的厨房</p>
        </div>
        <div>
          <svg>
            <use href="#icon-chaxuncaipin"></use>
          </svg>
          <p>疾病查询</p>
        </div>
      </div>
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="bannerImg">
          <img src="	https://cp.itheima.net/assets/ad.c4ee3bf4.png" alt="" />
        </van-swipe-item>
        <van-swipe-item class="bannerImg"
          ><img src="	https://cp.itheima.net/assets/ad.c4ee3bf4.png" alt=""
        /></van-swipe-item>
      </van-swipe>
    </nav>
    <van-tabs v-model:active="active" shrink sticky @change="changeTab">
      <van-tab v-for="v in tabList.list" :title="v.name" :key="v.id">
        <div class="list">
          <!-- 关注的医生列表 -->
          <div
            v-if="tabList.list[active].type == 'like'"
            class="DoctorFollowing"
          >
            <div class="title">
              <div>推荐关注</div>
              <div style="color: #ccc">查看更多&gt;</div>
            </div>
            <div class="cardBox">
              <div v-for="v in datas.lists" :key="v.id">
                <div class="imgs">
                  <img :src="v.avatar" alt="" />
                </div>
                <p style="font-size: 20px">{{ v.name }}</p>
                <p style="font-size: 18px; color: #ccc" class="Introduce">
                  {{ v.hospitalName }}
                </p>
                <p style="font-size: 18px; color: #ccc; margin-bottom: 10px">
                  {{ v.positionalTitles }}
                </p>

                <van-button
                  :icon="!v.likeFlag ? 'plus' : ''"
                  type="primary"
                  round
                  size="small"
                  @click="PayAttentionToDoctors(v)"
                  >{{ !v.likeFlag ? '关注' : '已关注' }}</van-button
                >
              </div>
            </div>
          </div>
          <!-- 医生的动态 -->
          <div class="docBox bx" @click="changeDoc">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              offset="10"
            >
              <div v-for="v in data.list" :key="v">
                <!-- 标题 -->
                <div class="title">
                  <div class="img">
                    <img :src="v.creatorAvatar" alt="" />
                  </div>
                  <div class="name">
                    <p>{{ v.creatorName }}</p>
                    <p>
                      {{ v.creatorHospatalName }} {{ v.creatorDep }}
                      {{ v.creatorTitles }}
                    </p>
                  </div>
                  <van-tag
                    :data-id="v.id"
                    class="btn"
                    plain
                    round
                    type="primary"
                    >{{ v.likeFlag ? '已关注' : '关注' }}</van-tag
                  >
                </div>
                <h3 style="font-size: 30px; margin: 5px 0">
                  {{ v.title }}
                </h3>
                <p class="text" v-html="v.content"></p>
                <div class="imgBox">
                  <div v-for="(item, index) in v.coverUrl" :key="index">
                    <img :src="item" alt="" />
                  </div>
                </div>
                <p>
                  <span style="color: #ccc">{{ v.collectionNumber }}收藏</span>
                  <span style="color: #ccc">{{ v.commentNumber }}评论</span>
                </p>
              </div>
            </van-list>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
// 引入接口
import { getList, getDoctorFollowing, Follow } from './api/api'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { showToast } from 'vant'
//统一的code校验
import { ECode } from '@/utils/PublicMethods'
import * as TS from './api/define'
const timer = ref(false)
// tab切换的数据
const tabList = reactive({
  list: [
    {
      name: '关注',
      id: 1,
      type: 'like'
    },
    {
      name: '推荐',
      id: 2,
      type: 'recommend'
    },
    {
      name: '减脂',
      id: 3,
      type: 'fatReduction'
    },
    {
      name: '饮食',
      id: 4,
      type: 'food'
    }
  ]
})
// 列表数据
const data = reactive<TS.DoctorList>({
  list: []
})
//医生列表

const datas = reactive<TS.DoctorFollowingList>({
  lists: []
})
//声明的请求参数
const page = reactive({
  type: 'recommend',
  current: '1',
  pageSize: '10'
})
const pages = reactive({
  current: '1',
  pageSize: '5'
})
// 总页数
const total = ref()
//切换的状态 默认推荐
const active = ref(1)
//切换tab
const changeTab = () => {
  page.type = tabList.list[active.value].type
  page.current = '1'
  data.list = []
  if (datas.lists.length != 0) {
    return
  } else {
    queryFollowing()
  }

  queryList()
}
//获取数据
const queryList = () => {
  getList(page).then((res) => {
    if (res.code == ECode.Success) {
      total.value = res.data.total
      data.list = [...data.list, ...res.data.rows]
      loading.value = false
      timer.value = false
    }
  })
}
queryList()
//获取关注的医生
const queryFollowing = () => {
  getDoctorFollowing(pages).then((res) => {
    if (res.code == ECode.Success) {
      datas.lists = res.data.rows
    }
  })
}
// 关注医生
const PayAttentionToDoctors = (v: TS.DoctorDetail) => {
  Follow({ id: v.id, type: 'doc' }).then((res) => {
    let { code } = res
    if (code == ECode.Success) {
      v.likeFlag = !v.likeFlag
    }
  })
}
/** 给父元素添加事件委托
 *  因为点哪个子元素都会触发
 * 所有给关注按钮添加一个自定义属性
 * 判断如果有的话就实现逻辑
 * */
const changeDoc = (e: any) => {
  let a = e.target.getAttribute('data-id')
  let result = data.list.find((i) => i.id == a)
  if (a) {
    Follow({ id: a, type: 'knowledge' }).then((res) => {
      let { code } = res
      if (code == ECode.Success) {
        result.likeFlag = !result.likeFlag
      }
    })
  }
}
// 跳转至急速问诊
const GoForAnUrgentConsultation = () => {
  router.push('/consult/fast')
}

const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  if (!timer.value) {
    clearTimeout(timer.value)
  }
  timer.value = setTimeout(() => {
    ++page.current
    queryList()

    if (data.list.length >= total.value) {
      finished.value = true
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  header {
    width: 100%;
    padding: 10px 20px 0;
    box-sizing: border-box;
    background: #43caca;
    border-radius: 0 0 20px 20px;
    > h2 {
      color: #fff;
      font-weight: normal;
    }
    > input {
      width: 100%;
      border-radius: 20px;
      position: relative;
      top: 20px;
      border: 0;
      height: 40px;
      background: #fff;
      box-shadow: 2px 2px 1px #f0f6fd;
      padding-left: 40px;
      box-sizing: border-box;
    }
    > .inputIcon {
      font-size: 20px;
      color: #ccc;
      position: absolute;
      top: 67px;
      left: 40px;
    }
  }
  nav {
    width: 100%;
    box-sizing: border-box;
    margin: 50px 0 0 0;
    .bigNav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > div {
        width: 33%;
        text-align: center;
        svg {
          width: 60px;
        }
        p {
          font-size: 16px;
        }
        span {
          font-size: 11px;
          color: #848484;
        }
      }
    }
    .smallNav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > div {
        width: 25%;
        text-align: center;
        svg {
          width: 40px;
          height: 60px;
        }
        p {
          font-size: 16px;
        }
        span {
          font-size: 11px;
          color: #848484;
        }
      }
    }
  }
  .van-tabs {
    width: 100%;
    box-sizing: border-box;
    .list {
      width: 100%;
      box-sizing: border-box;
      > .docBox {
        width: 100%;
        box-sizing: border-box;
        > div {
          margin: 20px 0;
        }
        .title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            width: 70%;
            p {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 15px;
            }
            :nth-child(2) {
              color: #ccc;
              font-size: 11px;
            }
          }
        }
        .text {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .imgBox {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 5px 0;
          > div {
            width: 30%;
            border-radius: 10px;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      > .DoctorFollowing {
        width: 100%;
        padding: 10px 0;
        background: #f6f7f9;
        > .title {
          width: 100%;
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        > .cardBox {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          overflow-x: scroll;
          > div {
            width: 28%;
            flex-shrink: 0;
            padding: 20px 20px 0;
            box-sizing: border-box;
            margin-left: 30px;
            background: #fff;
            border-radius: 20px;
            height: 190px;
            overflow: hidden;
            text-align: center;
            > .imgs {
              margin: 0 auto;
              width: 58px;
              height: 58px;
              border-radius: 50%;
              overflow: hidden;
              > img {
                width: 100%;
                height: 100%;
              }
            }
            > .Introduce {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
.bx {
  width: 100%;
  padding: 0 20px;
}
// 轮播图
.my-swipe .van-swipe-item {
  margin: 20px 0;
  img {
    width: 100%;
    height: 100%;
  }
}

::v-deep .text img {
  display: none;
}
</style>
