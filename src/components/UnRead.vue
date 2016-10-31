<template>
  <button class="ui circular icon fixed button large monitor only un-read-bz" data-content="未读消息数">
    <div data-content="Add users to your feed">
      <count-up :end="unread_message_count" :duration="2.5" :options="{useEasing : true,
        useGrouping : true,
        separator : ',',
        decimal : '.',
        prefix : '',
        suffix : ''}">
      </count-up>
    </div>
  </button>
</template>

<script>
  import '../assets/mobile.css'
  import CountUp from 'bz-count-up'

  import $ from 'jquery'
  export default {
    props: [],
    components: {
      CountUp
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
    ready () {
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
