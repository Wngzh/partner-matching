// vue3 路由
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import UserInfo from "../pages/UserInfo.vue";
import Search from "../pages/Search.vue"
import UserList from "../pages/UserList.vue";
import UserLogin from "../pages/UserLogin.vue";
import TeamCreatePage from "../pages/TeamCreatePage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import User from "../pages/User.vue";
import UserTeamJoined from "../pages/UserTeamJoined.vue";
import UserTeamCreated from "../pages/UserTeamCreated.vue";
import Recommend from "../pages/Recommend.vue";
import {createRouter, createWebHistory} from "vue-router";
import TeamDetail from "../pages/TeamDetail.vue";


 const routes = [
    {path: '/index', title: '码伴', name: 'Index', component: Index},
    {path: '/team', title: '寻找队伍', name: 'Team', component: Team},
    {path: '/team/create', title: '创建队伍', name: 'TeamCreate', component: TeamCreatePage},
    {path: '/team/update', title: '编辑队伍', name: 'TeamUpdate', component: TeamUpdatePage},
    {path: '/team/detail', title: '队伍成员', name: 'TeamDetail', component: TeamDetail},
    {path: '/recommend', title: '队伍推荐', name: 'Recommend', component: Recommend},
    {path: '/user', title: '我的', name: 'User', component: User},
    {path: '/user/login', title: '登录', name: 'UserLogin', component: UserLogin},
    {path: '/user/list', title: '用户列表', name: 'UserList', component: UserList},
    {path: '/user/info', title: '编辑个人信息', name: 'UserInfo', component: UserInfo},
    {path: '/user/team/joined', title: '加入队伍', name: 'UserJoinedTeam', component: UserTeamJoined},
    {path: '/user/team/created', title: '创建队伍', name: 'UserCreatedTeam', component: UserTeamCreated},
    {path: '/search', title: '寻找用户',name: 'Search', component: Search},
    {path: '/', redirect: '/index'},
]
const router = createRouter({
   history: createWebHistory(),
   routes,
})
export default router;