<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="eleven wide column no-padding-bz">
          <messages :god_name="$route.params.god_name"></messages>
        </div>
        <div class="five wide column computer only">
          <div class="godblank-bz"></div>
          <god-info :god_info="god_info"></god-info>
        </div>
      </div>
    </div>
    <top></top>
  </div>
</template>

<script>
  import $ from 'jquery'
  import GodInfo from './GodInfo'
  import Messages from './GodMessages.vue'
  import Top from './Top'
  export default {
    components: {
      Top,
      Messages,
      GodInfo
    },
    watch: {
    },
    data () {
      return {
      }
    },
    computed: {
      god_info () {
        let god_info = this.$store.state.god_infos[this.$route.params.god_name.toLowerCase()]
        if (god_info) {
          return god_info
        }
        return {id: 0}
      }
    },
    mounted () {
      this.$store.dispatch('getGod', this.$route.params.god_name)
      $('body').visibility()
    },
    methods: {
    },
    route: {
      deactivate: function (transition) { // 为了解除 scroll 的事件监听
        this.$broadcast('unbind-scroll')
        transition.next()
      }
    }
  }
</script>

<style >
  .ui.stackable.grid>.row>.wide.column.no-padding-bz{
    padding: 0rem!important;
  }
  .godblank-bz {
    margin-top: 47px;
  }
</style>
