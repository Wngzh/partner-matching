<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"

    >
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px">
          {{
            statusRender[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '当前人数: ' + team.memberList.length + '/' + team.capacity }}
        </div>
        <div v-if="team.expiredTime">
          {{ '过期时间: ' + team.expiredTime }}
        </div>
        <div>
          {{ '创建人：' + team.createUser?.username }}
        </div>
      </template>
      <template #footer>
        <van-button
            v-if="team.leaderId == currentUser?.id"
            size="small"
            type="primary"
            plain
            @click="router.push({name: 'TeamUpdate', query: {teamId: team.id}})">更新队伍
        </van-button>
        <van-button size="small" type="primary" plain @click="goDetail(team)">查看成员</van-button>
        <van-button v-if="(team.leaderId !== currentUser?.id) && (!team.memberList.some(item => item.id === currentUser?.id))" size="small" type="primary" plain @click="checkIsNeedPwd(team)">加入队伍</van-button>
        <van-button v-if="team.leaderId !== currentUser?.id  && (team.memberList.some(item => item.id === currentUser?.id))" size="small" type="primary" plain @click="doExitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.leaderId === currentUser?.id" size="small" type="danger" plain @click="doDestroyTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" type="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>

</template>

<script setup lang="ts">
import myAxios from "../request/myAxios";
import {showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {onMounted} from "vue";
interface TeamCardListProps {
  teamList: any[];
}

function goDetail(team: any) {
  localStorage.setItem('team', JSON.stringify(team));
  router.push({name: 'TeamDetail'})
}
//currentUser
const currentUser = ref(null);
const props = defineProps<TeamCardListProps>();
const router = useRouter();
// 显示成员列表
//队伍状态渲染转换
const statusRender = {
  0: '公开',
  1: '私有',
  2: '加密',
}
//密码
const password = ref('');
// id
const id = ref(null);
const showPasswordDialog = ref(false)
// 加入队伍是否需要密码
const checkIsNeedPwd = (team) => {
  id.value = team.id;
  if (team.status === "0") {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}
// 取密码对话框
const doJoinCancel = () => {
  id.value = null;
  password.value = '';
}
const getCurrentUser = async () => {
  const res = await myAxios.get('/user/current');
  if (res?.data.code !== "20000") {
    showFailToast('获取当前用户信息失败');
    router.replace('/user/login');
  }
  currentUser.value = res.data.data;
}

onMounted(()=> {
  getCurrentUser();
})
/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  const res = await myAxios.post('/team/join', {
    teamId: id.value,
    password: password.value,
  });
  if (res?.data.code === "20000") {
    showSuccessToast('加入成功');
  } else {
    showFailToast('加入失败');
  }
}
const doExitTeam = async (id: number) => {
  const res = await myAxios.post('/team/leave', {
    teamId: id,
  });
  if (res?.data.code === "20000") {
    showSuccessToast('退出成功');
  } else {
    showFailToast('退出失败');
  }
}
const doDestroyTeam = async (id: number) => {
  const res = await myAxios.post('/team/destroyed', {
    teamId: id,
  });
  if (res?.data.code === "20000") {
    showSuccessToast('退出成功');
  } else {
    showFailToast('退出失败');
  }
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>