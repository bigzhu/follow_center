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
    <message v-for="message in messages" :message='message' v-ref:c_messages>
    </message>

    <div class='ui active centered inline loader' v-bind:class="{ 'invisible_bz': !new_loading}"></div>
    <bottom-loader :el="$el" element_class=".ui.fluid.card" :call_back="call_back"></bottom-loader>
  </div>
</template>

<script>
  import store from '../store'

  import {filterSearchMessages, newMessage} from '../store/actions'
  import Old from './Old.vue'
  import Message from './Message.vue'
  import BottomLoader from 'bz-bottom-loader'

  module.exports = {
    vuex: {
      actions: {
        filterSearchMessages,
        newMessage
      }
    },
    components: {
      Old,
      Message,
      BottomLoader
    },
    watch: {
      'search_key': function (val, oldVal) {
        this.filterSearchMessages(this.search_key)
        this.newMessage({search_key: this.search_key})
      }
    },
    props: {
      search_key: {
        type: String,
        required: true
      }
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
        return store.state.search_messages
      }
    },
    ready: function () {
      this.filterSearchMessages(this.search_key)
      this.newMessage({search_key: this.search_key})
    },
    methods: {
      call_back: function () {
        this.newMessage({search_key: this.search_key})
      }
    }
  }
</script>
