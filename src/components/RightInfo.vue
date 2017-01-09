<template>
  <div>
    <div class="ui card border-radius">
      <div class="content">
        <div class="description align-center">
          <i class="wechat icon"></i>{{ $t("RightInfo.wechat") }}
        </div>
      </div>
      <div class="ui small centered image">
        <img src="../../static/assets/by_me.png">
      </div>
      <div class="content">
        <div class="description align-center">
          <i class="qq icon"></i>{{ $t("RightInfo.qq") }}
        </div>
      </div>
    </div>
    <div v-show="registered_count !== -1" class="footer-content">
      <a href="/about.html">{{ $t("RightInfo.about") }}</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="http://bigzhu.lorstone.com">{{ $t("RightInfo.blog") }}</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="/changelog.html">{{ $t("RightInfo.changelog") }}</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {{ $t("RightInfo.register") }}：{{registered_count}}
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
