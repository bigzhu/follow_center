<style lang='less'>
</style>
<template>
  <div>
    <message v-for="message in messages" :message='message'>
    </message>
  </div>
</template>

<script>
  import store from '../store'

  import {queryCollect} from '../store/actions'
  import Message from './Message.vue'

  module.exports = {
    vuex: {
      actions: {
        queryCollect
      }
    },
    components: {
      Message
    },
    props: {
      call_back: {
      }
    },
    data: function () {
      return {
      }
    },
    computed: {
      loading: {
        get: function () {
          return store.state.loading
        },
        set: function (loading) {
          store.dispatch('SET_LOADING', loading)
        }
      },
      messages () {
        return store.state.collect_messages
      }
    },
    mounted () {
      if (this.messages.length === 0) {
        this.loading = true
      }
      this.queryCollect(this.diableLoading)
    },
    methods: {
      diableLoading: function (messages) {
        this.loading = false
        if (this.call_back) {
          this.call_back(messages)
        }
      }
    }
  }
</script>
