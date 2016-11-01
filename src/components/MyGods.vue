<style lang="less">
  // .ui.segment.info-background {
    //   margin-top: 0;
    //   border: none;
    //   border-radius: 0.06em;
    //   box-shadow: 0 0 0 1px rgba(0,0,0,0.10), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
  // }
  .followed-search {
    padding: 1em 0em;
  }
  .ui.items.no-margin {
    margin: 0;
  }
  @media (max-width : 800px) {
    .ui.dropdown.remark-god {
      position: static;
    }
    .newgod-name h3 {
      display: inline;
    }
  }
</style>

<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="four wide column top-margin">
          <cat :just_my="true" route_name="MyGods">
          </cat>
        </div>
        <div class="twelve wide column no-padding-bz">
          <div class="ui transparent icon input followed-search">
            <input v-model="key" type="text" placeholder="搜索目标">
            <i class="search icon"></i>
          </div>
          <god-item v-for="god in my_gods|filterBy key in 'name'|orderBy 'followed_at' -1" v-for="god in my_gods" :god="god" is_my="true">
          </god-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import {queryMyGods, removeFromMyGods} from '../store/actions'
  import GodItem from './GodItem'
  import Cat from './Cat'
  export default {
    vuex: {
      actions: {
        queryMyGods,
        removeFromMyGods
      }
    },
    events: {
      'unfollow': function (god_id) { // 监听unfollow事件，移除已经unfollow的god
        this.removeFromMyGods(god_id)
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          if (this.my_gods.length === 0) {
            this.loading = true
          }
          this.queryMyGods(this.$route.params.cat, this.disableLoading)
        },
        deep: true
      }
    },
    props: [],
    components: {
      Cat,
      GodItem
    },
    computed: {
      my_gods () {
        if (store.state.cat_my_gods[this.$route.params.cat]) {
          return store.state.cat_my_gods[this.$route.params.cat]
        } else {
          return []
        }
      },
      loading: {
        get: function () {
          return store.state.loading
        },
        set: function (loading) {
          store.dispatch('SET_LOADING', loading)
        }
      }
    },
    data: function () {
      return {
        key: ''
      }
    },
    mounted () {
      if (this.my_gods.length === 0) {
        this.loading = true
      }
      this.queryMyGods(this.$route.params.cat, this.disableLoading)
      $('body').visibility()
    },
    methods: {
      disableLoading: function () {
        this.loading = false
      }
    }
  }
</script>
