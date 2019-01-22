import Vue from 'vue'
import App from '@/App'
import global from '@/global.js'

Vue.prototype.global = global
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
