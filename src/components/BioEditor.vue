<style >
</style>

<template>
  <div class="ui container">
    <form v-on:submit.prevent="save" class="ui form">
      <div class="required field">
        <label>God Name</label>
        <input v-model="rich_text.key" type="text" name="key" placeholder="god name">
      </div>
    </form>

    <bz-rich-text
      :title_img.sync="rich_text.title_img" 
      :title.sync="rich_text.title" 
      :summary.sync="rich_text.summary" 
      :text.sync="rich_text.text" 
      :key="rich_text.key" 
      :id="id" 
      :save_call_back="save">
    </bz-rich-text>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import store from '../store'
  import BzRichText from 'bz-rich-text'
  // import BzRichText from '../../../vue_components/bz-rich-text/src/Bz'
  import {queryRichText} from '../../lib_bz/public_store'
  export default {
    vuex: {
      getters: {
      },
      actions: {
        queryRichText
      }
    },
    props: [],
    components: {
      BzRichText
    },
    computed: {
      rich_text: function () {
        return store.state.rich_text
      },
      id: function () {
        if (this.$route.params.id) {
          return Number(this.$route.params.id)
        } else {
          return -1
        }
      }
    },
    data: function () {
      return {
        key: ''
      }
    },
    mounted () {
      if (this.$route.params.id) {
        this.queryRichText(this.$route.params.id)
      } else {
        store.dispatch('CLEAN_RICH_TEXT')
      }
    },
    methods: {
      save: function () {
        toastr.info('保存完毕!')
      }
    }
  }
</script>
