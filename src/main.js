import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import Axios from 'axios'
import App from '@/App.vue'
import Router from '@/router'
import UI from '@/library/index'

Axios.defaults.baseURL = 'http://localhost:8881'
const app = createApp(App)
app.use(Router)
app.use(UI)
app.mount('#app')