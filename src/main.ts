import { createApp } from 'vue'
import 'vant/lib/index.css';
import 'vant/es/toast/style'
import App from './App.vue'
import {NavBar} from "vant";
import router from "./router";
const app = createApp(App)
app.use(router)
app.use(NavBar)
app.mount('#app')
