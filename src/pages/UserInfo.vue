<script setup>
import {reactive} from 'vue'
import {onMounted} from 'vue'
import {showSuccessToast} from "vant";
import {showFailToast} from "vant";
import myAxios from "../request/myAxios.ts";
import {useRouter} from "vue-router";
const router = useRouter();
// 定义用户数据
const user = reactive({
  account: '',
  username: '',
  avatarUrl: '',
  identifyCode: '',
  email: '',
  phone: '',
  sex: ''
})
// 表单提交方法
const onSubmit = () => {
  myAxios.post("/user/update", user).then(
      res => {
        if (res.data.code === "20000") {
          showSuccessToast("修改成功")
          router.replace("/user")
        } else {
          showFailToast(res.data.message)
        }
      }
  )
};

//钩子函数
onMounted(async () => {
 // 获取用户信息
const currentUserData = await myAxios.get("/user/current")
    .then(res => {
      if (res.data.code === "20000") {
        showSuccessToast("请求成功")
        return res.data.data;
      } else {
        showFailToast(res.data.message)
        router.replace("/user/login")
      }
    })
  user.account = currentUserData.account
  user.username = currentUserData.username
  user.avatarUrl = currentUserData.avatarUrl
  user.identifyCode = currentUserData.identifyCode
  user.email = currentUserData.email
  user.phone = currentUserData.phone
  user.sex = currentUserData.sex
})
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="user.account"
            name="账号"
            label="账号"
            placeholder="账号"
            disabled
        />
        <van-field
            v-model="user.identifyCode"
            name="身份识别码"
            label="身份识别码"
            placeholder="身份识别码"
            disabled
        />
        <van-field
            v-model="user.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
        />
        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="user.sex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-model="user.email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
        />
        <van-field
            v-model="user.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
        />

        <van-field
            label="头像"
            :value="user.avatarUrl"
            readonly
        >
          <template #input>
            <van-image :src="user.avatarUrl" fit="cover" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>