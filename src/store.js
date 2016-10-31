// import Vue from 'vue'
import Vuex from 'vuex'
import p from '../../lib_bz/module'
import 'whatwg-fetch'

// Vue.use(Vuex)

// state
export const state = {
  registered_count: -1
}
// mutations
export const mutations = {
  SET_REGISTERED_COUNT (state, registered_count) {
    state.registered_count = registered_count
  }
}
// actions
export const actions = {
  getRegisteredCount ({ state, commit, dispatch }, status) {
    return dispatch('get', '/api_registered').then(function (data) {
      commit('SET_REGISTERED_COUNT', data.datas)
    })
  }
}
// getters
export const getters = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    p
  }
})
