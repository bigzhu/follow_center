<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="four wide column top-margin">
          <cat :just_my="true" route_name="MyGods">
          </cat>
        </div>
        <div class="twelve wide column no-padding-bz">
          <div class="mygod-head">
            <add-god class="add-god"></add-god>
            <div class="ui transparent icon input followed-search">
              <input v-model="key" type="text" :placeholder="$t('MyGods.search')">
              <i class="search icon"></i>
            </div>
          </div>
          <god-item v-for="god in ordered_my_gods" :god="god" is_my="true">
          </god-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import _ from 'lodash'
  import GodItem from './GodItem'
  import AddGod from './AddGod'
  import Cat from './Cat'
  export default {
    events: {
      'unfollow': function (god_id) { // 监听unfollow事件，移除已经unfollow的god
        this.$store.commit('DELETE_MY_GOD', god_id)
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          if (this.my_gods.length === 0) {
            this.loading = true
          }
          this.$store.dispatch('getMyGods', {cat: this.$route.params.cat})
        },
        deep: true
      }
    },
    props: [],
    components: {
      AddGod,
      Cat,
      GodItem
    },
    computed: {
      filtered_my_gods: function () {
        var self = this
        return self.my_gods.filter(function (my_god) {
          return my_god.name.indexOf(self.key) !== -1
        })
      },
      ordered_my_gods: function () {
        return _.orderBy(this.filtered_my_gods, 'followed_at', 'desc')
      },
      my_gods () {
        if (this.$store.state.cat_my_gods[this.$route.params.cat]) {
          return this.$store.state.cat_my_gods[this.$route.params.cat]
        } else {
          return []
        }
      }
    },
    data: function () {
      return {
        key: ''
      }
    },
    mounted () {
      this.$store.dispatch('getMyGods', {cat: this.$route.params.cat})
      $('body').visibility()
    },
    methods: {
      disableLoading: function () {
        this.loading = false
      }
    }
  }
</script>
<style>
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
  .mygod-head {
    position: relative;
  }
  .ui.input.followed-search {
    position: absolute;
    right: 0;
    top: 0.1rem;
  }
</style>
