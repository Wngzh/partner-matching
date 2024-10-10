<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="查看用户信息" is-link to="/user/info" />
    <van-cell title="我创建的队伍" is-link to="/user/team/created" />
    <van-cell title="我加入的队伍" is-link to="/user/team/joined" />
    <van-cell title="退出登录" @click="goLogout"></van-cell>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../request/myAxios.js";
import {showSuccessToast} from "vant";

const user = ref();

onMounted(async ()=>{
  user.value = await myAxios.get("/user/current")
    .then(res => {
      if (res.data.code === "20000") {
        showSuccessToast("请求成功")
        return res.data.data;
      } else {
        showFailToast(res.data.message)
        router.push("/user/login")
      }
    })
})

const router = useRouter();
const goLogout = () => {
  myAxios.post("/user/logout").then(res => {
    if (res.data.code === "20000") {
      showSuccessToast("退出成功")
      router.push("/user/login")
    } else {
      showFailToast(res.data.message)
    }
  })
}

</script>

<style scoped>

</style>