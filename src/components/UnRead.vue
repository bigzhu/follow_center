<template>
  <button class="ui circular icon fixed button large monitor only un-read-bz" data-content="未读消息数">
    <div data-content="Add users to your feed">
      {{unread_message_count}}
    </div>
  </button>
</template>
<script>
  import '../assets/mobile.css'

  import $ from 'jquery'
  export default {
    props: [],
    components: {
    },
    computed: {
      unread_message_count () {
        return this.$store.state.unread_message_count
      }
    },
    data: function () {
      return {
      }
    },
    mounted () {
      $(this.$el).popup()
    },
    methods: {
    }
  }
</script>
<style>
  .fix-circle-bz {
    position: fixed;
    right: 1.5em;
    background: none;
    border: 1px solid #DADADA;
  }
  .fix-circle-bz:hover {
    border: 1px solid #515151;
    background: #dedede;
  }
  .fixed.button.un-read-bz {
    position: fixed;
    right: 1.5em;
    background: none;
    border: 1px solid #DADADA;
    bottom: 5em;
  }
</style>
