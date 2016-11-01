<style lang=less>
</style>
<template>
  <div class="ui main container">
    <img v-show="show_how_to_use" class="ui fluid image" src="../../static/assets/how_to_use_collection.jpg">
    <div class="ui stackable grid">
      <div class="row">
        <div class="eleven wide column no-padding-bz">
          <messages @on:get_done="show"></messages>
        </div>
        <div class="five wide column computer only ">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/mobile.css'
  import $ from 'jquery'
  import Messages from './CollectMessages.vue'
  export default {
    components: {
      Messages
    },
    data () {
      return {
        show_how_to_use: false
      }
    },
    computed: {
    },
    mounted () {
      $('body').visibility()
    },
    methods: {
      show: function (messages) {
        if (messages.length === 0) {
          this.show_how_to_use = true
        } else {
          this.show_how_to_use = false
        }
      }
    },
    route: {
      deactivate: function (transition) { // 为了解除 scroll 的事件监听
        $(window).off('scroll')
        this.$broadcast('unbind-scroll')
        transition.next()
      }
    }
  }
</script>
