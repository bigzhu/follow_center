<template>
  <div class="ui main container">
    <img v-show="show_how_to_use_collect" class="ui fluid image" src="../../static/assets/how_to_use_collection.jpg">
    <div class="ui stackable grid">
      <div class="row">
        <div class="eleven wide column no-padding-bz">
          <messages></messages>
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
      }
    },
    computed: {
      show_how_to_use_collect () {
        return this.$store.state.show_how_to_use_collect
      }
    },
    mounted () {
      $('body').visibility()
    },
    methods: {
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
