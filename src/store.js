// import Vue from 'vue'
import Vuex from 'vuex'
import p from '../../lib_bz/module'
import 'whatwg-fetch'

// Vue.use(Vuex)

// state
export const state = {
  transactions: []
}
// mutations
export const mutations = {
  SET_TRANSACTIONS (state, transactions) {
    state.transactions = transactions
  }
}
// actions
export const actions = {
  getTransactions ({ state, commit }, status) {
    window.fetch('/api_transactions', {
      credentials: 'same-origin',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      commit('SET_LOADING', false)
      return response
    }).then(function (response) {
      console.log(response)
      return response.json()
    }).then(function (data) {
      if (data.error !== '0') {
        commit('SET_ERROR', data.error)
      } else {
        commit('SET_TRANSACTIONS', data.datas)
      }
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
