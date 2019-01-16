import Vue from 'vue'
import App from './App'
import globalData from './data/globalData.js'

Vue.prototype.globalData = globalData
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
