import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    userData: {},
    isLogin: false
  },
  mutations: {
    getUserData (state, payload) {
      state.userData = payload
    },
    getUserId (state, payload) {
      state.userId = payload
    },
    checkLogin (state, payload) {
      state.isLogin = payload
    }
  }
})
