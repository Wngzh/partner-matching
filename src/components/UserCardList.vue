<script setup lang="ts">interface UserCardListProps {
  userList: any[]; // 更具体的数据类型取决于实际的 userList 数据结构
}
const showMessage = (item) => {
  showDialog({
    title: "联系我",
    message: `'电话： ${item.phone}'\n邮箱： ${item.email}'`,
  })
}
const prop = defineProps<UserCardListProps>();
</script>
<template>
  <div>
    <van-card
        v-for="item in prop.userList"
        :desc="item.profile"
        :title="`${item.username}（${item.identifyCode}）`"
        :thumb="item.avatarUrl"
    >
      <template #tags>
        <van-space>
          <van-tag plain type="primary" v-for="tag in item.tags">{{ tag }}</van-tag>
        </van-space>
      </template>
      <template #footer>
        <van-button size="mini" round icon="phone" @click="showMessage(item)">联系我</van-button>
      </template>
    </van-card>
  </div>
</template>
<style scoped>

</style>