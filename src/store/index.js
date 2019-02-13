import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {
      id: 123
    }
  },
  mutations: {
    getUserData (state, payload) {
      state.userData = payload
    }
  }
})

// export default store
