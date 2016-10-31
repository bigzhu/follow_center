<style lang='less'>
  /*隐藏占位*/
.invisible_bz {
  visibility:hidden;
};
</style>
<template>
  <div>
    <div class='ui center aligned basic segment history-bz'>
      <old :god_name="god_name"></old>
    </div>
    <message v-for="message in messages" :message='message' v-ref:c_messages>
    </message>

    <div class='ui active centered inline loader' v-bind:class="{ 'invisible_bz': !new_loading}"></div>
    <bottom-loader :el="$el" element_class=".ui.fluid.card" :call_back="call_back"></bottom-loader>
  </div>
</template>

<script>
  import store from '../store'

  import {filterGodMessages, newMessage} from '../store/actions'
  import Old from './Old.vue'
  import Message from './Message.vue'
  import BottomLoader from 'bz-bottom-loader'

  module.exports = {
    vuex: {
      actions: {
        filterGodMessages,
        newMessage
      }
    },
    components: {
      Old,
      Message,
      BottomLoader
    },
    props: {
      god_name: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        filter_pic: false,
        error_info: '',
        last_message: null
      }
    },
    computed: {
      new_loading () {
        return store.state.new_loading
      },
      messages () {
        return store.state.gods_messages[this.god_name]
      }
    },
    ready: function () {
      this.filterGodMessages(this.god_name)
      this.newMessage({god_name: this.god_name})
    },
    methods: {
      call_back: function () {
        this.newMessage({god_name: this.god_name})
      }
    }
  }
</script>
