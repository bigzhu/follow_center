<style lang="less">
</style>

<template>
  <div>
    <div class="large monitor only">
      <div class="ui secondary vertical pointing menu loading">
        <slot></slot>
        <router-link :to="{'name': route_name, params: {'cat': cat.cat}}" v-for="cat in cats" :class="{'active': $route.params.cat === cat.cat}" class="item">
          {{cat.cat}}
        </router-link>
      </div>
    </div>
    <div class="ui form mobile only">
      <div class="field">
        <select v-model="$route.params.cat" @change="selectCat" class="ui dropdown">
          <option v-if="$route.params.cat === 'all'" selected disabled hidden value="all">请选择分类</option>
          <option v-if="$route.params.cat === 'recommand'" selected disabled hidden value="recommand">请选择分类</option>
          <option v-for="cat in cats" >{{cat.cat}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryCat} from '../store/actions'
  import store from '../store'
  export default {
    vuex: {
      getters: {
      },
      actions: {
        queryCat
      }
    },
    props: ['just_my', 'route_name'],
    computed: {
      cats: function () {
        if (this.just_my) {
          return store.state.my_cats
        } else {
          return store.state.cats
        }
      },
      link: function () {
        if (this.just_my) {
          return 'MyGods'
        } else {
          return 'Recommand'
        }
      }
    },
    components: {
    },
    data: function () {
      return {
      }
    },
    mounted () {
      this.queryCat(this.disableCatLoading, this.just_my)
    },
    methods: {
      disableCatLoading: function () {
      },
      selectCat: function () {
        this.$router.go({name: this.route_name, params: {cat: this.$route.params.cat}})
      }
    }

  }
</script>
