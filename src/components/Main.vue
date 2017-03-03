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
          <right-info></right-info>
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
  import RightInfo from './RightInfo'
  export default {
    components: {
      UnRead,
      Top,
      Messages,
      GodInfo,
      RightInfo
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
      god_name () {
        if (this.$route.params.god_name) return this.$route.params.god_name.toLowerCase()
      }
    },
    mounted () {
      if (this.god_name) { this.$store.dispatch('getGod', this.god_name) }
      $('body').visibility()
    },
    watch: {
      '$route': 'getGodInfo'
    },
    methods: {
      getGodInfo: function () {
        console.log('getGodInfo')
        if (this.god_name) { this.$store.dispatch('getGod', this.god_name) }
      },
      top: function () {
        $('html, body').animate(
          {
            scrollTop: '0'
          }, 300
        )
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('SET_SHOW_BAR', true) // 离开时，确保Bar显示出来
      next()
    }
  }
</script>

<style>
  .ui.input input.clipboard-input-bz {
    width: 103px;
  }
  .ui.stackable.grid>.row>.wide.column.no-padding-bz{
    padding: 0rem!important;
  }
  .blank-bz {
    padding-top: 49px;
  }
  .ui.card.border-radius {
    border-radius: 0.06em;
    box-shadow: .5px 1px 1px 1px rgba(0,0,0,0.1);
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
  .footer-content a {
    color: #9A9A9A;
    font-size: 1em;
  }
  .footer-content a:hover {
    color: #515151;
    transition: color 0.3s ease;
    transition: visibility 0s, opacity 0.3s linear;
  }
  .footer-content {
    color: #9A9A9A;
    margin-top: 30px;
    padding: 15px 0px;
    width: auto;
    font-size: 1rem;
    border-top: 1px solid #eee;
    line-height: 2rem;
  }
  .no-message {
    color: #9A9A9A;
    padding: 15px 15px;
    width: auto;
    font-size: 1rem;
    line-height: 2rem;
    text-align: center;
  }
  .no-message p {
    margin-top: 1rem;
  }
  @media only screen and (max-width: 767px){
    .ui.container {
      margin-left: 0em!important;
      margin-right: 0em!important;
    }
  }
</style>
