<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive} from "vue";
import myAxios from "../request/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
const router =  useRouter();
// 用户信息
const userLogin = reactive({
  account: '',
  password: ''
})
// 提交表单触发
const onSubmit = () => {
  myAxios.post('/user/login',userLogin).then(res => {
    if (res.data.code === "20000") {
      showSuccessToast("登录成功")
      router.replace("/")
    } else {
      showFailToast(res.data.message)
    }
  })
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userLogin.account"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userLogin.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>