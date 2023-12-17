import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import Axios from 'axios'
import App from '@/App.vue'
import Router from '@/router'
import UIME from '@/library/index.js'

Axios.defaults.baseURL = 'http://localhost:8881'
const app = createApp(App)
app.use(UIME)
app.use(Router)
app.mount('#app')