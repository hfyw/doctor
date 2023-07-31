//引入vant
import 'vant/lib/index.css'

import pinia from './stores'
import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'
import router from '@/router/index'
//vant 按需引入
import {} from 'vant'
import 'virtual:svg-icons-register'
const app = createApp(App)

import svgIcon from '@/components/SvgIcon/index.vue'
app.component('SvgIcon', svgIcon)

app.use(pinia)
app.use(router)

app.mount('#app')
