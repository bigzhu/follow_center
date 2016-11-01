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
      loading: {
        get: function () {
          return this.$store.state.p.loading
        },
        set: function (loading) {
          this.$store.commit('SET_LOADING', loading)
        }
      },
      messages () {
        return this.$store.state.collect_messages
      }
    },
    mounted () {
      if (this.messages.length === 0) {
        this.loading = true
      }
      let _this = this
      this.$store.dispatch('getCollect').then(function (data) {
        _this.$emit('get_done', data.messages)
      })
    },
    methods: {
    }
  }
</script>

<style>
</style>
