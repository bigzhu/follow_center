<template>
  <button class="ui circular icon basic button large monitor only un-read-bz" :data-content="$t('UnRead.unread')">
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
  .un-read-bz {
    position: fixed;
    right: 1.5em;
    border: 1px solid #DADADA;
    bottom: 5em;
  }
  @media (min-width: 1100px) and (max-width: 1300px) {
    .un-read-bz {
      right: .5em;
    }
  }
</style>
