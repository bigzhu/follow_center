<style lang="less">
</style>
<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="four wide column top-margin">
          <cat route_name="PublicGod">
            <a v-link="{'name': 'PublicGod', params: {'cat': 'all'}}" :class="{'active': $route.params.cat === 'all'}" class="item">
              all
            </a>

          </cat>
        </div>
        <div class="twelve wide column no-padding-bz">
          <god-item v-for="god in gods | orderBy 'created_date' -1" :god="god">
            <div class="ui toggle checkbox">
              <input v-model="god.is_public" @click="togglePublic(god)" type="checkbox" name="public" >
              <label></label>
            </div>
            <select v-model="god.cat" @change="changeCat(god)">
              <option>18+</option>
              <option v-for="cat in cats">{{cat.cat}}</option>
            </select>
          </god-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryGods, collect, uncollect, updateGod} from '../store/actions'
  import store from '../store'
  import $ from 'jquery'
  import GodItem from './GodItem'
  import Cat from './Cat'

  export default {
    vuex: {
      actions: {
        queryGods,
        collect,
        uncollect,
        updateGod
      }
    },
    props: {
      message: {
        type: Object,
        default: function () {
          return {
            user_name: '',
            id: 0
          }
        }
      }
    },
    components: {
      Cat,
      GodItem
    },
    directives: {
    },
    data: function () {
      return {
        current_cat: this.$route.params.cat,
        loading: false
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          this.loading = true
          this.queryGods(this.$route.params.cat, this.disableGodLoading)
        },
        deep: true
      }
    },
    ready: function () {
      this.queryGods(this.$route.params.cat, this.disableGodLoading)
      $('body').visibility()
    },
    attached: function () {
      var tool_tips_target = $(this.$el).find('.show-god-info')
      var popup_content = $(this.$el).find('.ui.card')
      $(tool_tips_target).popup(
        {
          popup: $(popup_content),
          lastResort: true,
          position: 'bottom left',
          hoverable: true,
          delay: {
            show: 100,
            hide: 500
          },
          onShow: (
            function (_this) {
              return function () {
                _this.getGodInfo()
              }
            }
          )(this)
        }
      )
    },
    computed: {
      cats: function () {
        return store.state.cats
      },
      loading: {
        get: function () {
          return store.state.loading
        },
        set: function (loading) {
          store.dispatch('SET_LOADING', loading)
        }
      },
      gods () {
        if (store.state.cat_gods[this.$route.params.cat]) {
          return store.state.cat_gods[this.$route.params.cat]
        } else {
          return []
        }
      },
      href: function () {
        if (this.message.m_type === 'github') {
          return `https://github.com/${this.message.name}`
        }
        return this.message.href
      },
      god_info: function () {
        let god_info = store.state.god_infos[this.message.user_name.toLowerCase()]
        if (god_info) {
          return god_info
        }
        return {god_id: 0}
      },
      avatar: function () {
        var avatar, url
        if (this.message.m_type === 'tumblr') {
          url = 'https://api.tumblr.com/v2/blog/' + this.message.name + '.tumblr.com/avatar/512'
          return url
        }
        avatar = window.btoa(window.btoa(this.message.avatar))
        return (window.bz_url || '') + '/api_sp/' + avatar
      }
    },
    methods: {
      changeCat: function (god) {
        let new_god = {}
        new_god.name = god.name
        new_god.cat = god.cat
        this.updateGod(new_god)
      },
      togglePublic: function (god) {
        let new_god = {}
        new_god.name = god.name
        if (god.is_public === 1) {
          new_god.is_public = 0
        } else {
          new_god.is_public = 1
        }
        this.updateGod(new_god)
      },
      disableGodLoading: function () {
        this.loading = false
      },
      getGodInfo: function () {
        this.queryGod(this.message.user_name)
      },
      collectDone: function (message) {
        message.collect = 1
      },
      uncollectDone: function (message) {
        message.collect = null
      }
    }
  }
</script>
