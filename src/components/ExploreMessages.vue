<style lang='less'>
  /*隐藏占位*/
.invisible_bz {
  visibility:hidden;
};
</style>
<template>
  <div>
    <div class='ui center aligned basic segment'>
      <old :god_name="god_name" :search_key="search_key"></old>
    </div>
    <message v-for="message in messages" :message='message'>
    </message>

    <div class='ui active centered inline loader' v-bind:class="{ 'invisible_bz': !new_loading}"></div>
    <bottom-loader :el="$el" element_class=".ui.fluid.card" :call_back="call_back"></bottom-loader>
  </div>
</template>

<script>
  import store from '../store'

  import {newMessage} from '../store/actions'
  import Old from './Old.vue'
  import Message from './Message.vue'
  import BottomLoader from 'bz-bottom-loader'

  module.exports = {
    vuex: {
      actions: {
        newMessage
      }
    },
    components: {
      Old,
      Message,
      BottomLoader
    },
    watch: {
    },
    props: {
    },
    data: function () {
      return {
      }
    },
    computed: {
      new_loading () {
        return store.state.new_loading
      },
      messages () {
        return store.state.explore_messages
      }
    },
    mounted () {
      this.newMessage(5) // 让用户尽快看到东西
      this.newMessage(99)
    },
    methods: {
      call_back: function () {
        this.newMessage({search_key: this.search_key})
      },
      newMessage: function (limit = null) {
        this.newMessage({limit: limit, explore: true})
      }
    }
  }
</script>
