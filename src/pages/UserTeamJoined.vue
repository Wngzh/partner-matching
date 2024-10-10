<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <team-card-list :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../request/myAxios";
import {showSuccessToast} from "vant";

const router = useRouter();
const searchText = ref('');

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async () => {
  const res = await myAxios.get("/team/joined", {
    params: {
      name: searchText.value,
    },
  });
  if (res?.data.code === "20000") {
    showSuccessToast('加入队伍成功')
    teamList.value = res.data.data;
  } else {
    showFailToast('失败');
  }
}


// 页面加载时只触发一次
onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>
#teamPage {

}
</style>