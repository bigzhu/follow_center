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
      <a class="footer-element" href="/about.html">{{ $t("RightInfo.about") }}</a>
      <a class="footer-element" href="http://bigzhu.lorstone.com">{{ $t("RightInfo.blog") }}</a>
      <a class="footer-element" @click="$router.push({ name: 'ChangeLog'})" href="javascript:;">{{ $t("RightInfo.changelog") }}</a>
      </br><span class="footer-element">语言选择:</span><a class="footer-element" @click="lang='cn'" href="javascript:;">中文</a>
      <a @click="lang='en'" class="footer-element" href="javascript:;">English</a>
      </br>
      <span class="footer-element">{{ $t("RightInfo.register") }}：{{registered_count}}</span>
      <span>© 2017 Follow Center</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: [],
    components: {
    },
    computed: {
      lang: {
        get: function () {
          return Vue.config.lang
        },
        set: function (v) {
          Vue.config.lang = v
          window.localStorage.setItem('lang', v)
        }
      },
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
      setLang: function (lang) {
        window.localStorage.setItem('lang', lang)
      }
    }
  }
</script>

<style>
.footer-element {
  padding-right: 2rem;
}
</style>
