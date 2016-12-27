<template>
  <button @click="top" data-content="回到顶部" class="ui circular basic icon button large monitor only top-bz"><i class="angle up icon"></i></button>
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
  .top-bz {
    position: fixed;
    right: 1.5em;
    border: 1px solid #DADADA;
    bottom: 1.5em;    
  }
  @media (min-width: 1100px) and (max-width: 1300px) {
    .top-bz {
      right: .5em;
    }
  } 
</style>

