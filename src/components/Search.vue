<style >
 /* 查找的高亮*/
  .highlight { background-color: #FDFD95 }
</style>
<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="eleven wide column no-padding-bz">
          <messages :search_key="$route.params.key"></messages>
        </div>
        <div class="five wide column computer only ">
        </div>
      </div>
    </div>
    <top></top>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Messages from './SearchMessages'
  import Top from './Top'
  export default {
    components: {
      Top,
      Messages
    },
    data () {
      return {
      }
    },
    computed: {
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
