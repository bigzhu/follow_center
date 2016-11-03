<template>
  <div>
    <message v-for="message in messages" :message='message'>
    </message>
  </div>
</template>

<script>
  import Message from './Message.vue'

  module.exports = {
    components: {
      Message
    },
    props: {
    },
    data: function () {
      return {
      }
    },
    computed: {
      messages () {
        return this.$store.state.collect_messages
      }
    },
    mounted () {
      let self = this
      this.$store.dispatch('getCollect').then(function (data) {
        self.$emit('get_done', data.messages)
      })
    },
    methods: {
    }
  }
</script>

<style>
</style>
