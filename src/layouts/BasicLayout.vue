<script setup lang="ts">
import { ref } from 'vue';
import { useRouter} from 'vue-router';

const router = useRouter();
import { RouterView } from 'vue-router';
import routes from "../router/index.ts";
// NavBar导航栏  --
const onClickLeft = () => history.back();
const onClickRight = () => {
  // 跳转到搜索页
  router.push("/search");
}

// TabBar标签栏  --
const active = ref("index");
// 默认标题
const DEFAULT_TITLE = "码伴";
// 路由标题
const title = ref(DEFAULT_TITLE);

router.beforeEach((to) => {
  const path = to.path;
  const route = routes.options.routes.find(item => {
    return path == item.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})
</script>

<template>
  <div style="padding-bottom: 50px;">
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"></van-icon>
    </template>
  </van-nav-bar>
    <div id="content">
      <RouterView></RouterView>
    </div>
  </div>
  <div>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" name="index" replace to="/index">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="rank" replace to="/recommend">推荐</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" replace to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" replace to="/user">个人</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<style scoped>

</style>