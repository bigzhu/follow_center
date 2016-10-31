<style lang="less">
</style>

<template>
  <div class="ui container">
    <a v-link="{name:'BioEditorNew'}" class="ui button">New</a>
    <div v-for="rich in rich_list" class="ui items">
      <div @click="go(rich.id)" class="item">
        <div class="image">
          <img :src="rich.title_img">
        </div>
        <div class="content">
          <a class="header">{{rich.title}}</a>
          <div class="meta">
            <span>Description</span>
          </div>
          <div v-html="rich.summary" class="description">
          </div>
          <div class="extra">
            {{rich.key}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import {queryRichList} from '../../lib_bz/public_store'
  export default {
    vuex: {
      getters: {
      },
      actions: {
        queryRichList
      }
    },
    props: [],
    components: {
    },
    computed: {
      rich_list: function () {
        return store.state.rich_list
      }
    },
    data: function () {
      return {
      }
    },
    ready () {
      this.queryRichList()
    },
    methods: {
      go: function (id) {
        this.$router.go({name: 'BioEditor', params: {id: id}})
      }
    }
  }
</script>
