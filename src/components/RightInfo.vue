<template>
  <div>
    <div class="ui card border-radius">
      <div class="content">
        <div class="description align-center">
          <i class="wechat icon"></i>官方微信群
        </div>
      </div>
      <div class="ui small centered image">
        <img src="../../static/assets/by_me.png">
      </div>
      <div class="content">
        <div class="description align-center">
          <i class="qq icon"></i>答疑QQ群:&nbsp&nbsp484391016
        </div>
      </div>
    </div>
    <div v-show="registered_count !== -1" class="footer-content">
      <a href="/about.html">关于</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="http://bigzhu.lorstone.com">博客</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      注册人数：{{registered_count}}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </br>© 2016 Follow Center
    </div>
  </div>
</template>

<script>
  export default {
    props: [],
    components: {
    },
    computed: {
      registered_count () {
        return this.$store.state.registered_count
      }
    },
    data: function () {
      return {
      }
    },
    mounted: function () {
      this.$store.dispatch('getRegisteredCount')
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
    }
  }
</script>

<style>
</style>
