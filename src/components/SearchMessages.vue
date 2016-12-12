<style >
  /*隐藏占位*/
.invisible_bz {
  visibility:hidden;
};
mark{
  background: #FDFD95;
  color: black;
}
</style>
<template>
  <div>
    <div class='ui center aligned basic segment'>
      <old :god_name="god_name" :search_key="search_key"></old>
    </div>
    <message v-for="message in messages" :message='message'>
    </message>

    <div class='ui active centered inline loader' v-bind:class="{ 'invisible_bz': !new_loading}"></div>
    <bottom-loader :el="$el" element_class=".ui.fluid.card" @bottom="call_back"></bottom-loader>
  </div>
</template>

<script>
  // import {filterSearchMessages, newMessage} from '../store/actions'
  import Old from './Old.vue'
  import Message from './Message.vue'
  import BottomLoader from 'bz-bottom-loader'
  import Mark from 'mark.js'

  module.exports = {
    components: {
      Old,
      Message,
      BottomLoader
    },
    watch: {
      'search_key': function (val, oldVal) {
        this.search()
      }
    },
    props: {
      search_key: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
      }
    },
    computed: {
      messages () {
        return this.$store.state.search_messages
      }
    },
    mounted () {
      this.search()
    },
    methods: {
      call_back: function () {
        this.searchNew()
      },
      search: function () {
        let self = this
        this.$store.commit('FILTER_SEARCH_MESSAGES', this.search_key)
        if (this.messages.length !== 0) {
          this.show_old = true
          this.mark()
        }
        this.searchNew().then(function (data) {
          if (self.messages.length === 0) {
            self.searcOld()
          }
        })
      },
      searcOld: function () {
        let self = this
        this.$store.dispatch('oldMessage', {search_key: self.search_key, limit: 10}).then(function (data) {
          self.mark()
        })
      },
      searchNew: function () {
        let self = this
        return this.$store.dispatch('newMessage', {search_key: this.search_key}).then(function (data) {
          if (self.messages.length !== 0) {
            self.mark()
          }
        })
      },
      mark: function () {
        this.show_old = true
        // 高亮查找的key
        this.$nextTick(function () {
          var instance = new Mark(this.$el)
          instance.mark(this.search_key)
        })
      }
    }
  }
</script>
