<template>
  <button @click="top" data-content="回到顶部" class="ui circular icon fixed button large monitor only top-bz"><i class="angle up icon"></i></button>
</template>

<script>
  import $ from 'jquery'
  export default {
    vuex: {
      getters: {
      },
      actions: {
      }
    },
    props: [],
    components: {
    },
    computed: {
    },
    data: function () {
      return {
      }
    },
    mounted () {
      $(this.$el).popup()
    },
    methods: {
      top: function () {
        $('html, body').animate(
          {
            scrollTop: '0'
          }, 300
        )
      }
    }
  }
</script>
<style>
</style>

