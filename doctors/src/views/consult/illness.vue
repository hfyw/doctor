<template>
  <div class="illness">
    <myTapbar title="图文问诊" />

    <!-- 大盒子 -->
    <div class="PictureAndTextBox">
      <!-- 上边图文 -->
      <div class="second">
        <img
          src="https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg"
          alt=""
        />

        <div class="PictureAndText">
          <h3>在线医生</h3>
          <p>
            请描述你的疾病或症状、是否用药、就诊经<br />历，需要我听过什么样的帮助
          </p>
          <div>
            <svg class="svg">
              <use href="#icon-dunpai-copy"></use>
            </svg>
            <span style="margin-left: 2px">内容仅医生可见</span>
          </div>
        </div>
      </div>
      <!-- 下边文本域 -->
      <textarea
        placeholder="请详细描述您的病情，病情描述不能为空"
        class="txt"
        cols="30"
        rows="10"
        v-model="form.forms.txt"
      >
      </textarea>
      <!-- 患病时间 -->
      <div class="DateOfIllness">
        <p>本次患病多久了？</p>
        <span
          v-for="(v, i) in DateOfIllnessList"
          :key="v.id"
          :class="{ ys: activeDateOfIllnessList == v.id }"
          @click="changeDateOfIllness(v.id)"
        >
          {{ v.name }}
        </span>
      </div>
      <div class="VisitStatus">
        <p>此次病情是否去过医院就诊过？</p>
        <span
          :class="{ ys: activeVisitStatusList == v.id }"
          v-for="v in VisitStatusList"
          :key="v.id"
          @click="changeVisitStatus(v.id)"
        >
          {{ v.name }}
        </span>
      </div>
      <!-- 上传图片 -->
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="9"
        upload-text="上传图片"
        upload-icon="photo-o"
        max-size="5*1024*1024"
        :after-read="uploaderImg"
        @delete="deleteImg"
      />
      <span v-if="fileList.length == 0" style="color: #999; font-size: 20px"
        >上传内容仅医生可见，最多9张图,最大5MB</span
      >

      <van-button
        :color="ButtonStatus ? '#16c2a3' : '#fafafa'"
        :disabled="!ButtonStatus"
        round
        block
        @click="next"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
//导航栏组件
import myTapbar from '@/components/my-tapbar.vue'
import { useRouter } from 'vue-router'
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useUserStore } from '@/stores'
import * as TS from './api/define'
import { showConfirmDialog } from 'vant'
import { uploadApi } from './api/api'
const user = useUserStore()
const router = useRouter()
const flag = ref(false) //判断是否回填
interface Form {
  forms: {
    txt: string | undefined
    DateOfIllness: string
    VisitStatus: string
    pictures: TS.Picture[]
  }
}
const form = reactive<Form>({
  forms: {
    txt: '',
    DateOfIllness: '',
    VisitStatus: '',
    pictures: []
  }
})
let activeDateOfIllnessList = ref() //定义选中的样式用的变量
let activeVisitStatusList = ref() //定义选中的样式用的变量
// 患病时间数组
const DateOfIllnessList = ref([
  { name: '一周内', id: '0' },
  { name: '一月内', id: '1' },
  { name: '半年内', id: '2' },
  { name: '大于半年', id: '3' }
])
// 就诊状态数组
const VisitStatusList = ref([
  { name: '就诊过', id: '0' },
  { name: '没就诊过', id: '1' }
])
const fileList = ref<TS.Picture[]>([])
//选择患病时间
const changeDateOfIllness = (v: string) => {
  activeDateOfIllnessList.value = v
  form.forms.DateOfIllness = v
}
//选择就诊状态
const changeVisitStatus = (v: string) => {
  activeVisitStatusList.value = v
  form.forms.VisitStatus = v
}
//删除图片上传
const deleteImg = () => {}
//图片上传成功的函数
const uploaderImg = (file: TS.FileRes) => {
  file.status = 'uploading'
  file.message = '上传中...'

  uploadApi(file)
    .then((res) => {
      console.log(res)

      if (res.data.code == 10000) {
        file.status = 'done'
        file.message = '上传成功'
        form.forms.pictures.push(res.data.data)
      }
    })
    .catch(() => {
      file.status = 'failed'
      file.message = '上传失败'
    })
}
//下一步
const next = () => {
  console.log(form.forms)

  user.setImgTxt(form.forms)
  form.forms.DateOfIllness = activeDateOfIllnessList.value
  form.forms.VisitStatus = activeVisitStatusList.value
  router.push('/user/patient')
}
// 使用计算属性计算三个有值下一步按钮就可用
const ButtonStatus = computed(() => {
  let a = false
  if (flag.value) {
    return (a = true)
  }
  if (
    form.forms.VisitStatus == '' ||
    form.forms.DateOfIllness == '' ||
    form.forms.txt == ''
  ) {
    a = false
  } else {
    a = true
  }
  return a
})
// 加载时显示是否回填
onBeforeMount(() => {
  setTimeout(() => {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？'
    })
      .then(() => {
        flag.value = true
        form.forms.txt = user.imgTxt?.txt
        activeDateOfIllnessList.value = user.imgTxt?.DateOfIllness
        activeVisitStatusList.value = user.imgTxt?.VisitStatus
        user.imgTxt?.pictures?.forEach((i) => fileList.value.push(i))
        user.imgTxt?.pictures?.forEach((i) => form.forms.pictures.push(i))
      })
      .catch(() => {
        flag.value = false
      })
  }, 1)
})
</script>

<style lang="scss" scoped>
.PictureAndTextBox {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .second {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #f6f7f9;
    margin-bottom: 20px;
    img {
      width: 50px;
      height: 50px;
      margin-top: 15px;
    }
    .PictureAndText {
      margin-left: 10px;
      h3 {
        font-weight: 400;
      }
      p {
        font-size: 12px;
        background-color: #f6f7f9;
        padding: 14px;
        color: #71727d;
        border-radius: 3px;
        margin: 5px 0 8px;
      }
      > div {
        font-size: 10px;
        .svg {
          width: 13px;
          height: 13px;
          vertical-align: middle;
        }
      }
    }
  }
  .txt {
    width: 100%;
    height: 100px;
    border: 0;
  }
  .txt::placeholder {
    color: #d6e1e9;
  }
  .DateOfIllness {
    width: 100%;
    margin-bottom: 30px;
    > p {
      margin-bottom: 15px;
    }
    > span {
      padding: 10px;
      box-sizing: border-box;
      background: #f6f7f9;
      margin-right: 5px;
      border-radius: 5px;
    }
  }
  .VisitStatus {
    width: 100%;
    margin: 40px 0;
    > p {
      margin-bottom: 15px;
    }
    > span {
      padding: 10px;
      box-sizing: border-box;
      background: #f6f7f9;
      margin-right: 5px;
      border-radius: 5px;
    }
  }
  .van-button {
    margin-top: 50px;
  }
}
.ys {
  border: 1px solid #16c2a3;
}
</style>
