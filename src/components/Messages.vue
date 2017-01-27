<template>
  <div>
    <div :class="{ 'invisible_bz': followed_god_count===0 || new_loading}" class='ui center aligned basic segment history-bz'>
      <old></old>
    </div>
    <div v-show="followed_god_count===0" class="no-message">
      <img src="../../static/assets/no-message.svg">
      <p>{{ $t("Messages.nofollow") }} <router-link :to="{'name': 'Recommand'}">{{ $t("Messages.whattofollow") }}</router-link>{{ $t("Messages.interesting") }}</p>
    </div>

    <transition name="slide-fade">
      <div v-show="!checkLogin() && show_no_login" class="no-message">
        <img src="../../static/assets/no-message.svg">
        <p>
          <a href="/login.html">{{ $t("Messages.login") }}</a>{{ $t("Messages.description") }}
        </p>
      </div>
    </transition>

    <message v-for='message in messages' :message='message'>
    </message>
    <div v-show="followed_god_count>0 && unread_message_count===0" class="no-message">
      <p>{{ $t("Messages.nomessage") }}
        <router-link :to="{'name': 'Recommand'}">{{ $t("Messages.wanttofollow") }}&gt;</router-link>
      </p> 
    </div>
    <div v-show="followed_god_count!==0" class='ui center aligned basic segment history-bz'>
      <div v-show="new_loading" class="ui active tiny inline loader"></div>
      <a :class="{ 'invisible_bz': !new_loading}" href='javascript:void(0)' class='history-search-bz loading'>
        <i v-show="!new_loading" class='icon new'></i>
        {{ $t("Messages.newmessage") }}
      </a>
    </div>
    <bottom-loader v-on:bottom="call_back"></bottom-loader>
  </div>
</template>

<script>
  import $ from 'jquery'
  import _ from 'lodash'
  var get_count = 50
  import Old from './Old.vue'
  import BottomLoader from 'bz-bottom-loader'
  import Message from './Message.vue'
  import checkLogin from 'bz-lib/functions/checkLogin'

  module.exports = {
    components: {
      Old,
      Message,
      BottomLoader
    },
    watch: {
      '$route': 'fetchData'
    },
    events: {
      'unfollow': function (god_id) { // 监听unfollow事件，移除已经unfollow的god的message
        this.$store.dispatch('removeFromMessages', god_id)
      }
    },
    data: function () {
      return {
        show_no_login: true
      }
    },
    computed: {
      unread_message_count () {
        return this.$store.state.unread_message_count
      },
      followed_god_count () {
        return this.$store.state.followed_god_count
      },
      god_name () {
        if (this.$route.params.god_name) return this.$route.params.god_name.toLowerCase()
      },
      new_loading () {
        return this.$store.state.new_loading
      },
      messages () {
        if (!this.god_name) return this.$store.state.messages
        return this.$store.state.gods_messages[this.god_name]
      }
    },
    mounted () {
      if (!this.is_login) {
        let self = this
        setTimeout(function () { self.show_no_login = false }, 6000)
      }
      this.fetchData()
      this.$nextTick(function () {
        // this.bindScroll()
      })
    },
    methods: {
      checkLogin: checkLogin,
      bindScroll: function () {
        let self = this
        $(window).scroll(
          _.throttle(
            function () {
              self.$store.commit('CHECK_BAR')
            }, 100
          )
        )
      },
      fetchData: function () {
        if (!this.god_name) {
          if (this.messages.length === 0) {
            // this.newMessage(5)
            this.newMessage(get_count)
          }
        } else {
          this.$store.commit('FILTER_GOD_MESSAGES', this.god_name)
          if (this.messages.length === 0) { // 现成没有，要自已取了
            this.$store.dispatch('getNew', {god_name: this.god_name, limit: 5})
            this.$store.dispatch('getNew', {god_name: this.god_name, limit: get_count})
          }
        }
      },
      call_back: function () {
        // 解救强迫症，记录最后一条的time
        // let created_at = this.messages[this.messages.length - 1].created_at
        // this.$store.dispatch('recordLastMessage', created_at)
        if (!this.new_loading) {
          this.newMessage(get_count)
        }
      },
      newMessage: function (limit = null) {
        let after = null
        if (this.messages.length > 0) {
          after = this.messages[this.messages.length - 1].created_at
        }
        this.$store.dispatch('getNew', {after: after, limit: limit})
      }
    }
  }
</script>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    padding-left: 10px;
    opacity: 0;
  }

  .invisible_bz {/*隐藏占位*/
    visibility:hidden;
  };
  .ui.segment.history-bz {
    padding: 0;
  }
  .ui.segment.history-bz:first-child {
    margin-top: 1em;
  }
</style>
