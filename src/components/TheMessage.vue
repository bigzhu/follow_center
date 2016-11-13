<style >
</style>
<template>
  <div class="ui main container">
    <message :message='the_message'>
    </message>
  </div>
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import Message from './Message.vue'
  import {queryTheMessage} from '../store/actions'

  module.exports = {
    vuex: {
      actions: {
        queryTheMessage
      }
    },
    components: {
      Message
    },
    data: function () {
      return {
      }
    },
    computed: {
      the_message () {
        return store.state.the_message
      }
    },
    mounted () {
      this.queryTheMessage(this.$route.params.id)
      $('body').visibility()
    },
    methods: {
    },
    route: {
      canDeactivate: function (transition) {
        console.log('hook-example deactivated!')
        // window.NProgress.start()
        // setTimeout(transition.next, 1000)
        transition.next()
      }
    }

  }
</script>
