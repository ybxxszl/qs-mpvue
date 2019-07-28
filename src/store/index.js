import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    num: 0
  },
  mutations: {
    add: (state, v) => {
      state.num = state.num + v
    },
    sub: (state, v) => {
      state.num = state.num - v
    }
  }
})

export default store
