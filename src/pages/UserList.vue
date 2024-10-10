<template>
  <UserTagList :userList="userList"></UserTagList>
</template>

<script setup>

import {useRoute} from "vue-router";
import {ref} from "vue";
import {onMounted} from "vue";
import req from "../request/myAxios.ts";
// 处理请求参数的格式
import qs from "qs";
import {showSuccessToast} from "vant";
import UserTagList from "../components/UserCardList.vue";

const route = useRoute();
// 从路由参数中获取要搜索的标签列表（数组）
const tags = route.query.tags
const userList = ref()
// 调用接口获取用户列表


//钩子
onMounted(async () => {
  // 调用接口获取用户列表
  const userListData = await req.get("/user/search/tags", {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  }).then(res => {
    if (res.data.code === "20000") {
      showSuccessToast("请求成功")
      return res.data?.data;
    }
  })
  if (userListData) {
    userListData.forEach(item => {
      item.tags = JSON.parse(item.tags)
    })
    userList.value = userListData
  }
  console.log("打印userList：", userList.value)
})
</script>

<style scoped>

</style>