import Vue from 'vue'
import Vuex from 'vuex'
if (!global.window) { Vue.use(Vuex) }
import p from 'bz-lib/module'
import 'whatwg-fetch'
import _ from 'lodash'
import $ from 'jquery'
import toastr from 'toastr'
function initGodMessage (state, god_name) {
  if (state.gods_messages[god_name] === undefined) {
    Vue.set(state.gods_messages, god_name, [])
  }
}
function initCatGod (state, cat) {
  if (state.cat_gods[cat] === undefined) {
    Vue.set(state.cat_gods, cat, [])
  }
}
// state
export const state = {
  anki: {
    user_name: null,
    password: null
  },
  io: null, // IntersectionObserver
  show_how_to_use_collect: false, // 是否显示收藏引导
  local_unread_message_count: 0, // 取过来还未读的信息
  followed_god_count: -1, // 关注的god数
  last_scroll_top: 0, //
  nav_bar_height: 0,
  show_bar: true, // top bar是否显示
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
  // my_gods: [],
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
  REMOVE_THIS_GOD_CAT_MY_GODS (state, god_id) {
    for (var property in state.cat_my_gods) {
      if (state.cat_my_gods.hasOwnProperty(property)) {
        let index = _.findIndex(state.cat_my_gods[property], function (d) { return d.god_id === god_id })
        state.cat_my_gods[property].splice(index, 1)
      }
    }

    for (property in state.cat_gods) {
      if (state.cat_gods.hasOwnProperty(property)) {
        let index = _.findIndex(state.cat_gods[property], function (d) { return d.god_id === god_id })
        state.cat_gods[property].splice(index, 1)
      }
    }
  },
  REMOVE_THIS_GOD_MESSAGE (state, god_id) {
    state.messages = _.filter(state.messages, function (d) {
      return d.god_id !== god_id
    })
  },
  CHECK_BAR (state, show_bar) {
    var st = $(window).scrollTop()
    state.nav_bar_height = $('header').outerHeight()

    if (Math.abs(state.last_scroll_top - st) <= 5) return

    if (st > state.last_scroll_top && st > state.nav_bar_height) {
      state.show_bar = false
    } else {
      if (st + $(window).height() < $(document).height()) {
        state.show_bar = true
      }
    }

    state.last_scroll_top = st
  },
  SET_SHOW_BAR (state, show_bar) {
    state.show_bar = show_bar
  },
  SET_REGISTERED_COUNT (state, registered_count) {
    state.registered_count = registered_count
  },
  SET_CAT_MY_GODS (state, {cat, gods}) {
    Vue.set(state.cat_my_gods, cat, gods)
  },
  SET_CAT_GODS (state, {cat, gods}) {
    initCatGod(state, cat)
    let merge_gods = state.cat_gods[cat].concat(gods)
    let uniq_gods = _.uniqBy(merge_gods, function (d) {
      return d.id
    }
    )
    state.cat_gods[cat] = uniq_gods
  },
  UNSHIFT_MY_GOD (state, {cat, god}) {
    state.cat_my_gods[cat].unshift(god)
  },
  SET_MY_CATS (state, cats) {
    state.my_cats = cats
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
  DELETE_MY_GOD (state, god_id) { // 移除这个god
    state.my_gods = _.without(state.my_gods, _.findWhere(state.my_gods, {id: god_id}))
  },
  SET_GOD_INFOS (state, god_info) {
    Vue.set(state.god_infos, god_info.name.toLowerCase(), god_info)
  },
  SET_BIG_GODS (state, gods) {
    state.big_gods = gods
  },
  REFRESH_LOCAL_UNREAD_MESSAGE_COUNT (state) {
    let unread_messages = _.partition(state.messages, (d) => { return d.created_at > state.last_time })[0]
    state.local_unread_message_count = unread_messages.length
  },
  FILTER_GOD_MESSAGES (state, god_name) { // 从主线messages中把god message 过滤出来，避免页面空白
    initGodMessage(state, god_name)
    if (state.messages.length !== 0 && state.gods_messages[god_name].length === 0) {
      let god_messages = _.filter(state.messages, (d) => { return d.user_name.toLowerCase() === god_name })
      state.gods_messages[god_name] = god_messages
    }
  },
  FILTER_SEARCH_MESSAGES (state, search_key) { // 从主线messages中把查找的信息过滤出来，避免页面空白
    if (state.messages.length !== 0) {
      state.search_messages = state.messages.filter(function (d) {
        console.log(d)
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
      })
    }
  },
  SET_GODS_OLD_MESSAGES (state, {god_name, messages}) {
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
  SET_GODS_NEW_MESSAGES (state, {god_name, messages}) {
    initGodMessage(state, god_name)
    let merge_messages = state.gods_messages[god_name].concat(messages)
    let uniq_messages = _.uniqBy(merge_messages, function (d) {
      return d.id
    }
    )
    state.gods_messages[god_name] = uniq_messages
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
  SET_NEW_SEARCH_MESSAGES (state, messages) {
    let merge_messages = state.search_messages.concat(messages)
    let uniq_messages = _.uniqBy(merge_messages, function (d) {
      return d.id
    }
    )
    state.search_messages = uniq_messages
  },
  SET_NEW_MESSAGES (state, messages) {
    let merge_messages = state.messages.concat(messages)
    let uniq_messages = _.uniqBy(merge_messages, function (d) {
      return d.id
    }
    )
    state.messages = uniq_messages
  }
}
// actions
export const actions = {
  loginAnki ({ state, commit, dispatch }, anki) {
    return dispatch('post', {url: '/api_login_anki', body: anki, loading: true})
  },
  postAnki ({ state, commit, dispatch }, front) {
    var parm = {
      front: front
    }
    return dispatch('post', {url: '/api_anki', body: parm, loading: true})
  },
  getIntersectionObserver ({ dispatch, state, actions }) {
    if (state.io === null) {
      state.io = new window.IntersectionObserver(
        entries => {
          for (let entry of entries) {
            let message = entry.target.__vue__.message
            if (entry.target.__vue__.$route.path !== '/') {
              continue
            }
            console.log(entry.target.__vue__.$route.path)
            dispatch('recordLastMessage', message.created_at)
            state.io.unobserve(entry.target)
          }
        }
      )
    }
    return state.io
  },
  putGod ({ dispatch, state, actions }, god) {
    var parm = god
    return dispatch('put', {url: '/api_god', body: parm, loading: false}).then(function (data) {
      toastr.info('成功')
    })
  },
  addRemark ({ dispatch, state }, parm) {
    return dispatch('post', {url: '/api_remark', body: parm, loading: false})
  },
  checkSocial ({ state, commit, dispatch }, {name, type}) {
    var parm = {
      name: name,
      type: type
    }
    return dispatch('get', {url: '/api_social', body: parm, loading: false})
  },
  postGod ({ state, commit, dispatch }, {name, cat}) {
    var parm = {
      name: name,
      cat: cat
    }
    return dispatch('post', {url: '/api_god', body: parm, loading: false})
  },
  postBlock ({ state, commit, dispatch }, god_id) {
    let parm = {god_id: god_id}
    return dispatch('post', {url: '/api_block', body: parm, loading: false}).then(function (data) {
      toastr.info('已屏蔽此人')
      return data
    })
  },
  newMessage ({ state, commit, dispatch }, {god_name, search_key, limit, explore}) {
    let messages = null
    let after = null
    if (god_name) {
      messages = state.gods_messages[god_name]
    } else if (explore) {
      messages = state.explore_messages
    } else if (search_key) {
      messages = state.search_messages
    } else {
      messages = state.messages
    }
    if (messages.length > 0) {
      after = messages[messages.length - 1].created_at
    } else { // 第一次, 找最近3天的
      let dt = new Date()
      dt.setDate(dt.getDate() - 2)
      after = dt.getTime()
    }
    if (!limit) {
      limit = 10
    }
    return dispatch('getNew', {god_name: god_name, search_key: search_key, after: after, limit: limit, explore: explore})
  },
  unfollow ({ state, commit, dispatch }, god_id) {
    return dispatch('delete', '/api_follow/' + god_id).then(function (data) {
      toastr.info('取消关注')
      commit('REMOVE_THIS_GOD_MESSAGE', god_id)
      return data
    })
  },
  follow ({ state, commit, dispatch }, god_id) {
    let parm = {god_id: god_id}
    return dispatch('post', {url: '/api_follow', body: parm, loading: false}).then(function (data) {
      toastr.info('关注成功')
      return data
    })
  },
  getTheMessage ({ state, commit, dispatch }, id) {
    let message = _.find(state.messages, function (d) { return d.id === parseInt(id, 10) })
    // 在god message里再找找
    if (!message) {
      for (var god_name in state.gods_messages) {
        message = _.find(state.gods_messages[god_name], function (d) { return d.id === parseInt(id, 10) })
      }
    }
    if (message) {
      commit('SET_THE_MESSAGE', message)
      return
    }
    let parm = { id: id }
    return dispatch('get', {url: '/api_message', body: parm}).then(function (data) {
      commit('SET_THE_MESSAGE', data.message)
    })
  },
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
      explore: explore,
      loading: false
    }
    return dispatch('get', {url: '/api_new', body: parm, loading: true}).then(function (data) {
      state.unread_message_count = data.unread_message_count
      if (data.messages.length === 0) { // 没有取到数
        console.log('get new get none')
        console.log(data.followed_god_count)
        state.followed_god_count = data.followed_god_count
        if (search_key && state.search_messages.length === 0) {
          // oldMessage({ dispatch, state }, {search_key: search_key})
        } else if (god_name && state.gods_messages[god_name].length === 0) { // 没数就查出old
          // oldMessage({ dispatch, state }, {god_name: god_name})
        } else if (state.messages.length === 0 && limit === 5) { // 只在prenew的时候没有query old 一次就可以了
          // oldMessage({ dispatch, state }, {limit: 2})
        }
      } else {
        // state.followed_god_count = -1
        if (god_name) { // 查god的new
          commit('SET_GODS_NEW_MESSAGES', {god_name: god_name, messages: data.messages})
        } else if (explore) { // explore
          commit('SET_EXPLORE_NEW_MESSAGES', data.messages)
        } else if (search_key) { // search
          commit('SET_NEW_SEARCH_MESSAGES', data.messages)
        } else { // main
          commit('SET_NEW_MESSAGES', data.messages)
          // commit('REFRESH_UNREAD_MESSAGE_COUNT')
        }
      }
      commit('SET_NEW_LOADING', false)
      commit('REFLASH_TIME_LEN')
    })
  },
  getCat ({ state, commit, dispatch }, is_my = null) {
    let parm = {
      is_my: is_my,
      is_public: 1
    }
    return dispatch('get', {url: '/api_cat', body: parm}).then(function (data) {
      if (is_my) {
        state.my_cats = data.cats
      } else {
        state.cats = data.cats
      }
      return data
    })
  },
  getPublicGods ({ state, commit, dispatch }, cat) {
    let parm = {
      cat: cat,
      limit: 10
    }
    let gods = state.cat_gods[cat]
    if (gods) {
      parm.before = gods[gods.length - 1].created_date
    }
    return dispatch('get', {url: '/api_public_gods', body: parm}).then(function (data) {
      commit('SET_CAT_GODS', {cat: cat, gods: data.gods})
    })
  },
  getCollect ({ state, commit, dispatch }) {
    return dispatch('get', '/api_collect').then(function (data) {
      state.collect_messages = data.messages
      if (state.collect_messages.length === 0) {
        state.show_how_to_use_collect = true
      } else {
        state.show_how_to_use_collect = false
      }
      return data
    })
  },
  getMyGods ({ state, commit, dispatch }, cat) {
    let parm = {cat: cat}
    return dispatch('get', {url: '/api_my_gods', body: parm}).then(function (data) {
      commit('SET_CAT_MY_GODS', {cat: cat, gods: data.gods})
    })
  },
  getGod ({ state, commit, dispatch }, val) {
    let god_name
    let loading = true
    let parm = {}
    if (typeof val === 'string') {
      god_name = val.toLowerCase()
      parm = {god_name: god_name}
    } else {
      god_name = val.god_name.toLowerCase()
      loading = val.loading
    }
    if (state.god_infos[god_name]) {
      return
    }
    parm = {god_name: god_name}
    return dispatch('get', {url: '/api_god', body: parm, loading: loading}).then(function (data) {
      commit('SET_GOD_INFOS', data.god_info)
    })
  },
  recordLastMessage ({ state, commit, dispatch }, time) {
    if (state.last_time > parseInt(time, 10)) {
      return
    }
    var parm = { last_time: time }
    return dispatch('put', {url: '/api_last', body: parm, loading: false}).then(function (data) {
      state.unread_message_count = data.unread_message_count
      commit('SET_LAST_TIME', parseInt(time, 10))
      commit('REFRESH_LOCAL_UNREAD_MESSAGE_COUNT')
      // 如果<20了，就预加载一些
      if (state.local_unread_message_count <= 20) {
        let after = null
        if (state.messages.length > 0) {
          after = state.messages[state.messages.length - 1].created_at
        }
        dispatch('getNew', {after: after, limit: 50})
      }
    })
  },
  oldMessage ({ state, commit, dispatch }, {god_name, search_key, limit}) {
    let messages = null
    let before = null
    if (god_name) {
      messages = state.gods_messages[god_name]
    } else if (search_key) {
      messages = state.search_messages
    } else {
      messages = state.messages
    }
    if (messages.length > 0) {
      before = messages[0].created_at
    } else { // 第一次, 找当前以前的
      before = new Date().getTime()
    }
    if (!limit) {
      limit = 10
    }
    return dispatch('getOld', {god_name: god_name, search_key: search_key, before: before, limit: limit})
  },
  getOld ({ state, commit, dispatch }, {god_name, search_key, before, limit}) {
    commit('SET_OLD_LOADING', true)
    var parm = {
      god_name: god_name,
      search_key: search_key,
      limit: limit,
      before: before
    }
    return dispatch('get', {url: '/api_old', body: parm, loading: false}).then(function (data) {
      if (data.messages.length === 0) { // 没有取到数
        if (god_name) {
          toastr.info(god_name + '没有更多的历史消息可以看了')
        } else if (search_key) {
          toastr.info('没有更多的历史了')
        } else {
          if (state.messages.length === 0) { // 什么都没有，估计是第一次进来, 还没关注人
            toastr.info('请先关注你感兴趣的人')
            window.router.go({name: 'Recommand', params: {cat: 'recommand'}})
          } else {
            toastr.info('没有更多的历史了')
          }
        }
      } else {
        if (god_name) {
          commit('SET_GODS_OLD_MESSAGES', {god_name: god_name, messages: data.messages})
        } else if (search_key) { // search
          commit('SET_OLD_SEARCH_MESSAGES', data.messages)
        } else { // main
          commit('SET_OLD_MESSAGES', data.messages)
        }
      }
      commit('SET_OLD_LOADING', false)
      commit('REFLASH_TIME_LEN')
    })
  },
  collect ({ state, commit, dispatch }, message_id) {
    var parm = {
      message_id: message_id
    }
    return dispatch('post', {url: '/api_collect', body: parm}).then(function (data) {
      toastr.info('收藏成功')
      return data
    })
  },
  uncollect ({ state, commit, dispatch }, id) {
    return dispatch('delete', '/api_collect/' + id).then(function (data) {
      toastr.info('取消收藏')
      return data
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
