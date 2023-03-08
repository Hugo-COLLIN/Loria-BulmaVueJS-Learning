import { createStore } from 'vuex'

export default createStore({
  state: {
    // tokenLogin: null,
  },
  getters: {
    // getTokenLogin(state) {
    //   return state.tokenLogin;
    // }
  },
  mutations: {
    setTokenLogin(state, token) {
      state.tokenLogin = token;
    }
  },
  actions: {
  },
  modules: {
  }
})
