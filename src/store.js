import Vue from 'vue'
import Vuex from 'vuex'
import p from '../../lib_bz/module'
import 'whatwg-fetch'
import _ from 'underscore'
import $ from 'jquery'
function initGodMessage (state, god_name) {
  if (state.gods_messages[god_name] === undefined) {
    Vue.set(state.gods_messages, god_name, [])
  }
}
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
  },
  SET_CAT_MY_GODS (state, cat, gods) {
    Vue.set(state.cat_my_gods, cat, gods)
  },
  SET_CAT_GODS (state, {cat, gods}) {
    console.log(gods)
    Vue.set(state.cat_gods, cat, gods)
  },
  UNSHIFT_NOT_MY_GOD (state, cat, god) {
    state.cat_gods[cat].unshift(god)
  },
  SET_MY_CATS (state, cats) {
    state.my_cats = cats
  },
  SET_CATS (state, cats) {
    state.cats = cats
  },
  HIGHT_LIGHT (state, text) { // 高亮
    Vue.nextTick(function () {
      $('body').highlight(text)
    })
  },
  REFLASH_TIME_LEN (state) { // 更新时间隔
    if (state.last_reflash_oper) {
      _.map(state.messages,
        (d) => {
          d.created_at = d.created_at + 1
          return d
        }
      )
      state.last_reflash_oper = 0
    } else {
      _.map(state.messages,
        (d) => {
          d.created_at = d.created_at - 1
          return d
        }
      )
      state.last_reflash_oper = 1
    }
  },
  SET_THE_MESSAGE (state, message) {
    state.the_message = message
  },
  SET_GOD_IS_EXISTS (state, is_exists) {
    state.god_is_exists = is_exists
  },
  REMOVE_FROM_MY_MESSAGES (state, god_id) { // 移除这个god
    state.messages = _.without(state.messages, _.findWhere(state.messages, {god_id: god_id}))
  },
  REMOVE_FROM_MY_GODS (state, god_id) { // 移除这个god
    state.my_gods = _.without(state.my_gods, _.findWhere(state.my_gods, {id: god_id}))
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_GOD_INFOS (state, god_info) {
    Vue.set(state.god_infos, god_info.name.toLowerCase(), god_info)
  },
  SET_BIG_GODS (state, gods) {
    state.big_gods = gods
  },
  REFRESH_UNREAD_MESSAGE_COUNT (state) {
    let unread_messages = _.partition(state.messages, (d) => { return d.created_at > state.last_time })[0]
    state.unread_message_count = unread_messages.length
  },
  FILTER_GOD_MESSAGES (state, god_name) { // 从主线messages中把god message 过滤出来，避免页面空白
    initGodMessage(state, god_name)
    if (state.messages.length !== 0 && state.gods_messages[god_name].length === 0) {
      state.gods_messages[god_name] = _.filter(state.messages, (d) => { return d.name === god_name })
    }
  },
  FILTER_SEARCH_MESSAGES (state, search_key) { // 从主线messages中把查找的信息过滤出来，避免页面空白
    if (state.messages.length !== 0) {
      state.search_messages = _.filter(state.messages,
        (d) => {
          if (d.text && d.content) {
            return (d.text.indexOf(search_key) !== -1 || String(d.content).indexOf(search_key) !== -1)
          }
          if (d.text) {
            return d.text.indexOf(search_key) !== -1
          }
          if (d.content) {
            return String(d.content).indexOf(search_key) !== -1
          }
          return false
        }
      )
    }
  },
  SET_GODS_OLD_MESSAGES (state, god_name, messages) {
    initGodMessage(state, god_name)
    state.gods_messages[god_name] = _.uniq(
      messages.reverse().concat(state.gods_messages[god_name]), false, function (item, key, a) {
        return item.id
      }
    )
  },
  SET_EXPLORE_NEW_MESSAGES (state, god_name, messages) {
    state.explore_messages = _.uniq(
      state.explore_messages.concat(messages), false, function (item, key, a) {
        return item.id
      }
    )
  },
  SET_GODS_NEW_MESSAGES (state, god_name, messages) {
    initGodMessage(state, god_name)
    state.gods_messages[god_name] = _.uniq(
      state.gods_messages[god_name].concat(messages), false, function (item, key, a) {
        return item.id
      }
    )
  },
  SET_GOD_INFO (state, god_info) {
    state.god_info = god_info
  },
  SET_LAST_TIME (state, time) {
    state.last_time = time
  },
  SET_OLD_LOADING (state, loading) {
    state.old_loading = loading
  },
  SET_NEW_LOADING (state, loading) {
    state.new_loading = loading
  },
  SET_OLD_MESSAGES (state, messages) {
    state.messages = _.uniq(
      messages.reverse().concat(state.messages), false, function (item, key, a) {
        return item.id
      }
    )
  },
  SET_OLD_SEARCH_MESSAGES (state, messages) {
    state.search_messages = _.uniq(
      messages.reverse().concat(state.search_messages), false, function (item, key, a) {
        return item.id
      }
    )
  },
  SET_INFO (state, header, info) {
    state.info.header = header
    state.info.info = info
  },
  SET_COLLECT_MESSAGES (state, messages) {
    state.collect_messages = messages
  },
  SET_NEW_SEARCH_MESSAGES (state, messages) {
    state.search_messages = _.uniq(
      state.search_messages.concat(messages), false, function (item, key, a) {
        return item.id
      }
    )
  },
  SET_NEW_MESSAGES (state, messages) {
    state.messages = _.uniq(
      state.messages.concat(messages), false, function (item, key, a) {
        return item.id
      }
    )
  },
  SET_USER_INFO (state, user_info) {
    state.user_info = user_info
  }
}
// actions
export const actions = {
  getRegisteredCount ({ state, commit, dispatch }, status) {
    return dispatch('get', '/api_registered').then(function (data) {
      commit('SET_REGISTERED_COUNT', data.registered_count)
    })
  },
  getNew ({ state, commit, dispatch }, {god_name, search_key, after, limit, explore}) {
    commit('SET_NEW_LOADING', true)
    var parm = {
      limit: limit,
      after: after,
      god_name: god_name,
      search_key: search_key,
      explore: explore
    }
    return dispatch('get', {url: '/api_new', body: parm}).then(function (data) {
      if (data.messages.length === 0) { // 没有取到数
        if (search_key && state.search_messages.length === 0) {
          // oldMessage({ dispatch, state }, {search_key: search_key})
        } else if (god_name && state.gods_messages[god_name].length === 0) { // 没数就查出old
          // oldMessage({ dispatch, state }, {god_name: god_name})
        } else if (state.messages.length === 0 && limit === 5) { // 只在prenew的时候没有query old 一次就可以了
          // oldMessage({ dispatch, state }, {limit: 2})
        }
      } else {
        if (god_name) { // 查god的new
          commit('SET_GODS_NEW_MESSAGES', god_name, data.messages)
        } else if (explore) { // explore
          commit('SET_EXPLORE_NEW_MESSAGES', data.messages)
        } else if (search_key) { // search
          commit('SET_NEW_SEARCH_MESSAGES', data.messages)
          commit('HIGHT_LIGHT', search_key)
        } else { // main
          commit('SET_NEW_MESSAGES', data.messages)
          commit('REFRESH_UNREAD_MESSAGE_COUNT')
        }
      }

      commit('SET_NEW_LOADING', false)
      commit('REFLASH_TIME_LEN')
    })
  },
  getCat ({ state, commit, dispatch }, just_my = null) {
    let parm = {
      just_my: just_my
    }
    return dispatch('get', {url: '/api_cat', body: parm}).then(function (data) {
      if (just_my) {
        commit('SET_MY_CATS', data.cats)
      } else {
        commit('SET_CATS', data.cats)
      }
    })
  },
  getNotMyGods ({ state, commit, dispatch }, cat) {
    let parm = {
      cat: cat
    }
    return dispatch('get', {url: '/api_not_my_gods', body: parm}).then(function (data) {
      console.log(data)
      commit('SET_CAT_GODS', {cat: cat, gods: data.gods})
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
