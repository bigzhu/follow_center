<template>
  <div>
    <div v-show="old_loading" class="ui active tiny inline loader"></div>
    <a @click='old' href='javascript:void(0)' class='history-search-bz loading'>
      <i v-show="!old_loading" class='icon history'></i>
      历史消息
    </a>
  </div>
</template>

<script>
  export default {
    computed: {
      old_loading () {
        return this.$store.state.old_loading
      }
    },
    props: ['god_name', 'search_key'],
    mounted () {
    },
    methods: {
      old: function () {
        this.$store.dispatch('oldMessage', {god_name: this.god_name, search_key: this.search_key, limit: 10})
      }
    }
  }
</script>

<style>
  .history-bz {
    width: 100%;
    color: #515151;
  }
  .history-search-bz {
    width: 100%;
    color: #515151;
  }
  .history-search-bz:hover {
    width: 100%;
    color: #494949;
  }
  .history-search-bz:focus {
    width: 100%;
    color: #515151;
  }
</style>
