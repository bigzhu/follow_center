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
    <!--
    <div class="ui form mobile only">
      <div class="field">
        <select v-model="$route.params.cat||''" @change="selectCat" class="ui dropdown">
          <option v-if="$route.params.cat === 'all'" selected disabled hidden value="all">请选择分类</option>
          <option v-if="$route.params.cat === 'recommand'" selected disabled hidden value="recommand">请选择分类</option>
          <option v-for="cat in cats" >{{cat.cat}}</option>
        </select>
      </div>
    </div>
    -->
  </div>
</template>

<script>
  export default {
    props: ['just_my', 'route_name'],
    computed: {
      cats: function () {
        if (this.just_my) {
          return this.$store.state.my_cats
        } else {
          return this.$store.state.cats
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
      this.$store.dispatch('getCat', this.just_my)
    },
    methods: {
      selectCat: function () {
        this.$router.push({name: this.route_name, params: {cat: this.$route.params.cat}})
      }
    }

  }
</script>

<style>
</style>
