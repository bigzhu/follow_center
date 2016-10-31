<template>
  <div>
    <login :loading="loading" v-on:check_done="login"></login>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import Login from 'bz-login'
  export default {
    props: [],
    components: {
      Login
    },
    data: function () {
      return {
        loading: false
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      login: function (user_name, password) {
        this.loading = true
        let _this = this
        this.$store.dispatch('login', {user_name: user_name, password: password}).then(function (data) {
          _this.loading = false
          toastr.info('登录成功')
        })
      }
    }
  }
</script>

<style>
</style>
