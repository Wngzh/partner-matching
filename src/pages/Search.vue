<script setup lang="ts">
import {ref} from 'vue';
import router from "../router";
// 搜索框组件
const searchText = ref('');
/*
 * 当用户点击搜索框中的搜索按钮时会触发此函数。
 * 此函数通过过滤originTagList中的子项来更新tagList，
 * 只有包含searchText值的子项才会保留在新的tagList中。
 */
const onSearch = () => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(
        item => item.text.includes(searchText.value)
    )
    return tempParentTag;
  })
}
/*
 * 当用户点击搜索框中的取消按钮时会触发此函数。
 * 它会清空searchText并恢复tagList为原始标签列表originTagList
 */
const onCancel = () => {
  // 清空搜索
  searchText.value = '';
  tagList.value = originTagList
}
// 标签组件
// 移除标签
const close = (tag: string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
};
// 按下搜索按钮 跳转至用户列表（结果）页面
const goUserList = () => {
  // 跳转至用户列表（结果）页面
  // TODO: 跳转至用户列表（结果）页面
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}
// 树形选择组件 + 假数据
const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: '性别',
    children: [
      {
        text: '男',
        id: '男'
      },
      {
        text: '女',
        id: '女'
      },
      {
        text: '武装直升机😒',
        id: '武装直升机😒'
      },
      {
        text: '沃尔玛购物袋😘',
        id: '沃尔玛购物袋😘'
      }
    ]
  },
  {
    text: '年级',
    children: [
      {
        text: '大一',
        id: '大一'
      },
      {
        text: '大二',
        id: '大二'
      },
      {
        text: '大三',
        id: '大三'
      },
      {
        text: '大四',
        id: '大四'
      },
      {
        text: '延毕',
        id: '延毕'
      },
      {
        text: '重开',
        id: '重开'
      }
    ]
  }
];
// 存储经过搜索过滤后的标签列表。
const tagList = ref(originTagList);
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider>已选标签</van-divider>
  <div style="margin: 8px">
    <van-space wrap>
      <van-tag v-for="item in activeIds" closeable size="medium" type="primary" @close="close(item)">
        {{ item }}
      </van-tag>
    </van-space>
  </div>
  <van-divider>选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <van-button type="primary" block @click="goUserList">搜索</van-button>
</template>

<style scoped>

</style>