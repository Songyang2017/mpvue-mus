import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    userData: {},
    isLogin: getToken() || false,
    token: getToken()
  },
  mutations: {
    getUserData (state, payload) {
      state.userData = payload
    },
    getUserId (state, payload) {
      state.userId = payload
    },
    setToken (state, token) {
      state.token = token
      state.isLogin = token !== ''
      setToken(token)
    }
  }
})
