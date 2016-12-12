<style >
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
  // import {filterSearchMessages, newMessage} from '../store/actions'
  import Old from './Old.vue'
  import Message from './Message.vue'
  import BottomLoader from 'bz-bottom-loader'

  module.exports = {
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
      messages () {
        return this.$store.state.search_messages
      }
    },
    mounted () {
      this.search()
    },
    methods: {
      call_back: function () {
        this.newMessage({search_key: this.search_key})
      },
      search: function () {
        let self = this
        this.$store.commit('FILTER_SEARCH_MESSAGES', this.search_key)
        if (this.messages.length !== 0) {
          this.show_old = true
          return
        }
        this.$store.dispatch('newMessage', {god_name: this.god_name}).then(function (data) {
          self.show_old = true
          if (self.messages.length === 0) {
            self.$store.dispatch('oldMessage', {god_name: self.god_name, limit: 10})
          }
        })
      }
    }
  }
</script>
