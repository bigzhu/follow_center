<template>
  <div class="ui container">
    <router-link :to="{name:'BioEditorNew'}" class="ui button">New</router-link>
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
  export default {
    props: [],
    components: {
    },
    computed: {
      rich_list: function () {
        return this.$store.state.p.rich_list
      }
    },
    data: function () {
      return {
      }
    },
    mounted () {
      this.$store.dispatch('getRichList')
    },
    methods: {
      go: function (id) {
        this.$router.push({name: 'BioEditor', params: {id: id}})
      }
    }
  }
</script>
<style>
</style>
