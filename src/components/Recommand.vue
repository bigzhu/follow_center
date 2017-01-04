<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="four wide column top-margin">
          <cat route_name="Recommand">
          </cat>
        </div>
        <div class="twelve wide column no-padding-bz">
          <god-item v-for="god in not_my_gods" :god="god" class="god-item">
          </god-item>
          <div class='ui active centered inline loader' v-bind:class="{ 'invisible_bz': !loading}"></div>
          <bottom-loader :el="$el" element_class=".god-item" v-on:bottom="bottomCall"></bottom-loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import GodItem from './GodItem'
  import Cat from './Cat'
  import BottomLoader from 'bz-bottom-loader'

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
      GodItem,
      BottomLoader
    },
    directives: {
    },
    data: function () {
      return {
        no_more: false
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          let _this = this
          this.$store.dispatch('getPublicGods', this.$route.params.cat).then(function (data) {
            _this.disableGodLoading()
          })
          this.stat = 'button'
        },
        deep: true
      }
    },
    mounted () {
      let self = this
      this.$store.dispatch('getPublicGods', this.$route.params.cat).then(function (data) {
        self.disableGodLoading()
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
      loading () {
        return this.$store.state.p.loading
      },
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
      bottomCall: function () {
        this.$store.dispatch('getPublicGods', this.$route.params.cat)
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
