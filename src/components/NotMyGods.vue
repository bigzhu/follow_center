<style lang="less">
</style>

<template>
  <div class="ui cards">
    <div v-show="loading && not_my_gods.length == 0" class="ui active inverted dimmer">
      <div class="ui text loader">Loading</div>
    </div>
    <god-card v-for="god in not_my_gods" :god="god">
    </god-card>
  </div>
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import {queryNotMyGods} from '../store/actions'
  import GodCard from './GodCard.vue'
  export default {
    vuex: {
      actions: {
        queryNotMyGods
      }
    },
    events: {
    },
    props: [],
    components: {
      GodCard
    },
    computed: {
      not_my_gods () {
        return store.state.not_my_gods
      },
      loading () {
        return store.state.loading
      }
    },
    data: function () {
      return {
      }
    },
    ready () {
      this.queryNotMyGods()
      $('body').visibility()
    },
    methods: {
    }
  }
</script>
