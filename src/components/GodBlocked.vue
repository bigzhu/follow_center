<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="sixteen wide column ui card message-bz nobody-bz">
          <div class="nobody-image-bz">
            <img src="../assets/nobody.svg">
            <p>{{ $t("GodBlocked.tips") }}</p>
          </div> 
        </div>
        <!-- <div class="four wide column top-margin">
        </div>
        <div class="twelve wide column no-padding-bz">
          <god-item v-for="god in gods" :god="god">
          </god-item>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import GodItem from './GodItem'
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
          this.getGods()
        },
        deep: true
      }
    },
    props: [],
    components: {
      GodItem
    },
    computed: {
    },
    data: function () {
      return {
        gods: []
      }
    },
    mounted () {
      this.getGods()
      $('body').visibility()
    },
    methods: {
      getGods: function () {
        let self = this
        this.$store.dispatch('getGods', {cat: this.$route.params.cat, blocked: true}).then(function (data) {
          self.gods = data.gods
        })
      }
    }
  }
</script>

<style>
  .nobody-bz {
    width: 100%;
    height: 35rem;
  }
  .nobody-image-bz {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -177.5px;
    margin-left: -144px;
  }
  .nobody-bz p {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.14rem;
    color: #9096A2;
  }
</style>
