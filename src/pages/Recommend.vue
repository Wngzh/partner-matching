<script setup lang="ts">
import UserCardList from "../components/UserCardList.vue";
import {ref, onMounted} from "vue";
import myAxios from "../request/myAxios.ts";

const notice: string = '我们将根据您的个性化推荐与您兴趣匹配的用户'
const userList = ref()
const matchUser = async () => {
  const res = await myAxios.get("/user/match", {
    params: {
      num: 20
    }
  })
  if (res.data.code == "20000") {
    res.data.data.forEach(item => {
      if (item.tags)
        item.tags = JSON.parse(item.tags)
    })
    userList.value = res.data.data
  } else {
    showFailToast("暂时无法推荐用户")
  }
}
onMounted(()=> {
  matchUser()
})
</script>

<template>
  <van-notice-bar mode="closeable">{{ notice }}</van-notice-bar>
  <UserCardList :userList="userList"/>
  <van-empty v-if="!userList || userList.length < 1" image="https://img.yzcdn.cn/vant/cat.jpeg"
             description="暂无推荐用户"/>
</template>

<style scoped>

</style>