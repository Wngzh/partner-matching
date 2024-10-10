<template>
  <UserCardList :userList="userList"/>
  <van-pagination v-if="userList" v-model="num" :items-per-page="size" :total-items="total" @change="fetchUserList" mode="simple" />
  <van-empty v-if="!userList || userList.length < 1" image="https://img.yzcdn.cn/vant/cat.jpeg" description="数据为空"/>
</template>

<script setup>

import {useRoute} from "vue-router";
import {ref} from "vue";
import {onMounted} from "vue";
import req from "../request/myAxios.ts";

import {showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
// 从路由参数中获取要搜索的标签列表（数组）
const userList = ref()

// 分页参数
const num = ref(1)
const size = ref(10)
const total = ref(0)
const fetchUserList = async () => {
  const userListData = await req.get("/user/recommend", {
    params: {
      pageNum: num.value,
      pageSize: size.value
    }
  }).then(res => {
    if (res.data.code === "20000") {
      showSuccessToast("请求成功")
      total.value = res.data?.data.total
      return res.data?.data.records;
    }
  })
  if (userListData) {
    userListData.forEach(item => {
      if (item.tags)
        item.tags = JSON.parse(item.tags)
    })
    userList.value = userListData
  }
}
//钩子
onMounted( () => {
  // 调用接口获取用户推荐列表
   fetchUserList()
})
</script>

<style scoped>

</style>