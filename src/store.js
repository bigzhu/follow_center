// import Vue from 'vue'
import Vuex from 'vuex'
import p from '../../lib_bz/module'
import 'whatwg-fetch'

// Vue.use(Vuex)

// state
export const state = {
  registered_count: -1,
  cat_my_gods: {}, // 按 cat 分类的我关注的gods
  cat_gods: {}, // 按 cat 分类的gods
  my_cats: [], // god 我的类别
  cats: [], // god 的类别
  last_reflash_oper: 0,
  god_is_exists: true, // 标记god是否存在
  god_infos: {}, // 查询的每个god信息存放在这里
  the_message: {
    user_name: '',
    id: 0
  }, // 显示某个message
  big_gods: [],
  my_gods: [],
  unread_message_count: 0,
  gods_messages: {},
  last_time: 0,
  old_loading: false,
  new_loading: false,
  info: {
    header: '',
    info: ''
  },
  god_info: {},
  search_messages: [], // 查找的messages
  messages: [],
  explore_messages: [], // 探索的
  collect_messages: [] // 收藏的
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
      commit('SET_REGISTERED_COUNT', data.registered_count)
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
