<template>
  <div>
    <div v-show="followed_god_count!==0" class='ui center aligned basic segment history-bz'>
      <old></old>
    </div>
    <div v-show="followed_god_count===0" class="no-message">
      <img src="../../static/assets/no-message.svg">
      <p>您还没有关注任何人，从<router-link :to="{'name': 'Recommand'}">寻他</router-link>里面寻找您感兴趣的人吧!</p>
    </div>

    <transition name="slide-fade">
      <div v-show="!is_login && show_no_login" class="no-message">
        <img src="../../static/assets/no-message.svg">
        <p>
          <a href="/login.html">登录</a>以后才能看到更广阔的世界哟!
        </p>
      </div>
    </transition>

    <message v-for='message in messages' :message='message'>
    </message>
    <div v-show="followed_god_count>0" class="no-message">
      <p>好厉害，你已经把所有消息看完啦。再关注点人吧？
        <router-link :to="{'name': 'Recommand', params: {'cat': 'recommand'}}" :class="{'active': this.$route.name==='Recommand'}">寻他&gt;</router-link>
      </p> 
    </div>
    <div class='ui active centered inline loader' v-bind:class="{ 'invisible_bz': !new_loading}"></div>
    <bottom-loader :el="$el" element_class=".ui.fluid.card" v-on:bottom="call_back"></bottom-loader>
  </div>
</template>

<script>
  import {checkLogin} from '../../../lib_bz/functions/user'
  var get_count = 50
  import $ from 'jquery'
  import _ from 'lodash'
  import Old from './Old.vue'
  import BottomLoader from 'bz-bottom-loader'
  import Message from './Message.vue'

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
      is_login () {
        return checkLogin()
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
      this.bindScroll()
    },
    methods: {
      fetchData: function () {
        if (!this.god_name) {
          if (this.messages.length === 0) {
            this.newMessage(5)
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
      bindScroll: function () {
        var v = this
        let self = this
        var messages_element = $(v.$el)
        $(window).scroll(
          _.throttle(
            function () {
              self.$store.commit('CHECK_BAR')
              messages_element.children('div > .ui.fluid.card').each(
                function () {
                  var message, message_position, scroll_bottom
                  message_position = $(this).offset().top
                  scroll_bottom = $(window).scrollTop() + $(window).height()
                  message_position = parseInt(message_position / 50, 10)
                  scroll_bottom = parseInt(scroll_bottom / 50, 10)
                  if (message_position === scroll_bottom) {
                    message = $(this)[0].__vue__.message
                    v.$store.dispatch('recordLastMessage', message.created_at)
                    // let color = random.color()
                    // $('#id_' + message.id).addClass(color)
                  }
                }
              )
              if ($(this).scrollTop() === 0) {
                null
              }
            }, 100
          )
        )
      },
      call_back: function () {
        // 解救强迫症，记录最后一条的time
        let created_at = this.messages[this.messages.length - 1].created_at
        this.$store.dispatch('recordLastMessage', created_at)
        this.newMessage(get_count)
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
  /* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
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
