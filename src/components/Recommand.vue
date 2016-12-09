<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="four wide column top-margin">
          <cat route_name="Recommand">
          </cat>
        </div>
        <div class="twelve wide column no-padding-bz">
          <div class="ui center aligned basic segment add-newgod-bz"> 
            <a v-show="stat==='button'||stat==='adding'" @click="showAddGodInput" href="javascript:void(0)" class="ui add-newgod-style">
              <i class="add icon"></i>添加要跟踪的新目标
            </a>
            <div v-show="stat==='input'" class="ui action input">
              <input @keyup.13="add" v-model="input_name" id="id_add_god" type="text" placeholder="帐号名，比如 bigzhu">
              <div @click="add" class="ui button">添加</div>
            </div>
          </div>
          <div v-show="not_my_gods.length === 0 && no_more && !loading && stat!=='adding'" class="ui icon message">
            <i class="notched circle loading icon"></i>
            <div class="content">
              <div v-show="$route.params.cat!=='recommand'" class="header">
                {{$route.params.cat}}缺货了
              </div>
              <div v-show="$route.params.cat==='recommand'" class="header">
                你全关注完了？猛!
              </div>
              <p>要不你来加一个?</p>
            </div>
          </div>
          <add-god :god_name="god_name" :call_back="addDone" v-show="stat==='adding'"></add-god>
          <god-item v-for="god in not_my_gods" :god="god">
          </god-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import GodItem from './GodItem'
  import Cat from './Cat'
  import AddGod from './AddGod'

  export default {
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
      AddGod,
      GodItem
    },
    directives: {
    },
    data: function () {
      return {
        no_more: false,
        god_name: '',
        input_name: '',
        stat: 'button',
        loading: false
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          if (this.not_my_gods.length === 0) {
            this.loading = true
          }
          let _this = this
          this.$store.dispatch('getNotMyGods', this.$route.params.cat).then(function (data) {
            _this.disableGodLoading()
          })
          this.stat = 'button'
        },
        deep: true
      }
    },
    mounted () {
      if (this.not_my_gods.length === 0) {
        this.loading = true
      }
      let _this = this
      this.$store.dispatch('getNotMyGods', this.$route.params.cat).then(function (data) {
        _this.disableGodLoading()
      })
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
      not_my_gods () {
        if (this.$store.state.cat_gods[this.$route.params.cat]) {
          return this.$store.state.cat_gods[this.$route.params.cat]
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
        let god_info = this.$store.state.god_infos[this.message.user_name.toLowerCase()]
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
      addDone: function () {
        this.stat = 'button'
      },
      add: function () {
        this.god_name = this.input_name.trim()
        this.stat = 'adding'
      },
      showAddGodInput: function () {
        this.input_name = '' // 清空上次的输入
        this.stat = 'input'
        Vue.nextTick(
          function () {
            $('#id_add_god').focus()
          }
        )
        // 这时要重新取一下god，以处理连续添加的情况
        // 先不取了，连续添加很少见
        // this.queryNotMyGods(this.$route.params.cat)
      },
      disableGodLoading: function () {
        this.loading = false
        if (this.not_my_gods.length === 0) {
          this.no_more = true
        } else {
          this.no_more = false
        }
      },
      toggleCollect: function (message) {
        if (message.collect) {
          this.$store.dispatch('uncollect', message.id).then(function (data) {
            this.uncollectDone(data.message)
          })
        } else {
          this.$store.dispatch('collect', message.id).then(function (data) {
            this.collectDone(data.message)
          })
        }
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

<style>
  .clear-button-bz {
    color: inherit!important;
    background-color: inherit!important;
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
  }
  .ui.basic.negative.button.clear {
    color: inherit!important;
    background-color: inherit!important;
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
  }
  .ui.basic.positive.button.clear {
    color: inherit!important;
    background-color: inherit!important;
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
  }
  .ui.grid > .row > .column.top-margin {
    margin-top: 1em;
  }
  .ui.segment.add-newgod-bz {
    padding: 0;
  }
  .ui.segment.add-newgod:first-child {
    margin-top: 1em;
  }
  .newgod-style {
    width: 100%;
    color: #515151;
  }
  .ui.inverted.dimmer.transparent-bz {
    background-color: inherit;
  }
  .ui.add-newgod-style {
    width: 100%;
    color: #515151;
  }
  .ui.add-newgod-style:hover {
    width: 100%;
    color: #515151;
    color: #494949;
  }
  .ui.add-newgod-style:focus {
    width: 100%;
    color: #515151;
  }
</style>
