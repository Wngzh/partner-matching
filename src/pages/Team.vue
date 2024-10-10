<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../request/myAxios.ts";
import {onMounted} from "vue";
import {ref} from "vue";

const route = useRouter();
// 创建队伍
const goCreateTeam = () => {
  route.push("/team/create");
}

const teamList = ref([]);
const searchText = ref("")
// 总页数
const total = ref(0);
// 分页
const pageNum = ref(1);
const pageSize = ref(10);
onMounted(
    () => {
      getTeamList(0);
    }
)
const getTeamList = async (status) => {
  const res = await myAxios.get("/team/list/page", {
    params: {
      name: searchText.value,
      status: status,
      pageNum: pageNum.value,
      pageSize: pageSize.value,
    }
  });
  teamList.value = res.data.data.records;
  total.value = res.data.data.total;
}

// Tab标签
const active = ref(0)
const tabChanged = (name: string) => {
  if (name === "0") {
    getTeamList(0);
  }
  if (name === "1") {
    getTeamList(2);
  }
}
</script>

<template>
  <van-button type="primary"  round icon="plus" @click="goCreateTeam"
  style="position: fixed; bottom: 60px; width: 50px; right: 12px; height: 50px; border-radius: 50%; z-index: 1"
  ></van-button>
  <van-search v-model="searchText" placeholder="搜索队伍名称" show-action >
  <template #action>
    <van-icon name="search" size="18" @click="getTeamList"/>
  </template>
  </van-search>
  <van-tabs v-model:active="active" @change="tabChanged">
    <van-tab title="公开" name="0"></van-tab>
    <van-tab title="加密" name="1"></van-tab>
  </van-tabs>
  <TeamCardList :team-list="teamList"/>
  <van-empty v-if="!teamList || teamList.length < 1" image="https://img.yzcdn.cn/vant/cat.jpeg" description="数据为空"/>
</template>

<style scoped>

</style>