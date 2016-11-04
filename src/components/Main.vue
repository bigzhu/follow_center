<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="eleven wide column no-padding-bz">
          <messages></messages>
        </div>
        <div class="five wide column computer only ">
          <div class="blank-bz"></div>
          <god-info v-show="god_name" :god_info="god_info"></god-info>
          <div class="ui card border-radius">
            <div class="content">
              <div class="description align-center">
                ￥10 微信扫一扫，<i class="coffee icon"></i>买杯咖啡赞助我
              </div>
            </div>
            <div class="ui small centered image">
              <img src="../../static/assets/by_me.jpg">
            </div>
            <div class="content">
              <div class="description align-center">
                <i class="qq icon"></i>答疑QQ群:&nbsp&nbsp484391016
              </div>
            </div>
          </div>
          <div v-show="registered_count !== -1"class="description sign-imfor align-center">
            <i class="user icon"></i>注册人数：{{registered_count}}
          </div>
        </div>
      </div>
    </div>
    <un-read></un-read>
    <top></top>
  </div>
</template>

<script>
  import '../assets/mobile.css'
  import $ from 'jquery'
  import Messages from './Messages'
  import Top from './Top'
  import UnRead from './UnRead'
  import GodInfo from './GodInfo'
  export default {
    components: {
      UnRead,
      Top,
      Messages,
      GodInfo
    },
    data () {
      return {
      }
    },
    computed: {
      god_info () {
        if (!this.god_name) return
        let god_info = this.$store.state.god_infos[this.god_name]
        if (god_info) {
          return god_info
        }
      },
      registered_count () {
        return this.$store.state.registered_count
      },
      god_name () {
        if (this.$route.params.god_name) return this.$route.params.god_name.toLowerCase()
      }
    },
    mounted () {
      this.$store.dispatch('getRegisteredCount')
      if (this.god_name) this.$store.dispatch('getGod', this.god_name)
      $('body').visibility()
    },
    methods: {
      top: function () {
        $('html, body').animate(
          {
            scrollTop: '0'
          }, 300
        )
      }
    },
    beforeRouteLeave (to, from, next) {
      $(window).off('scroll')
      $(window).unbind('scroll')
      // this.$dispatch('showBar') // 离开时，确保Bar显示出来
      this.$store.commit('SET_SHOW_BAR', true)
      next()
    }
  }
</script>

<style>
  /* clipboard 长度 */
.ui.input input.clipboard-input-bz {
  width: 103px;
}
.ui.stackable.grid>.row>.wide.column.no-padding-bz{
  padding: 0rem!important;
}
.blank-bz {
  padding-top: 35px;
}
.ui.card.border-radius {
  border-radius: 0.06em;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
  border-top: none;
  width: 100%;
}
.ui.card>.content {
  border-top: none;
}
.align-center {
  text-align: center;
}
.sign-imfor {
  color: #9A9A9A;
  font-size: 1em;
}
@media only screen and (max-width: 767px){
  .ui.container {
    margin-left: 0em!important;
    margin-right: 0em!important;
  }
}
</style>
