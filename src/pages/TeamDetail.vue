<script setup lang="ts">
import UserCardList from "../components/UserCardList.vue";
const item = localStorage.getItem('team');
const parse = JSON.parse(item);
parse.memberList.forEach(item => {
  item.tags = JSON.parse(item.tags)
})
</script>

<template>
<UserCardList :user-list="parse.memberList"></UserCardList>
</template>

<style scoped>

</style>