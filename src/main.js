import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import Axios from 'axios'
import App from '@/App.vue'
import Router from '@/router'

import UpFiles from '@/components/UpFiles.vue'

Axios.defaults.baseURL = 'http://localhost:8881'
const app = createApp(App)
app.use(Router)
app.mount('#app')
app.component('UpFiles', UpFiles)