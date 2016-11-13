<style >
  .ui.button.follow-button {
    box-shadow: none!important;
    border: 0.1em solid rgba(0,0,0,.15);
    border-radius: 0.06em;
    font-size: 0.9em;
    margin-right: 0px;
  } 
  .ui.keppel.button {
    background-color: #54B98F;
    color: #FFF;
    text-shadow: none;
    background-image: none;
  } 
  .ui.keppel.button:hover {
    background-color: #54B98F;
    color: #FFF;
    text-shadow: none;
  }
</style>

<template>
  <button v-on:click="toggleFollow"  :class="{'basic': !followed_stat, 'keppel': followed, 'loading': loading}" class="ui bottom button follow-button">
    <i v-show="followed_stat==0" class="add icon"></i>{{desc}}
  </button>
</template>

<script>
  export default {
    props: {
      followed: { // 0 or 1
        required: true,
        // type: Number,
        default: 0
      },
      god_id: {
        required: true,
        type: Number,
        default: 0
      }
    },
    watch: {
      'followed_stat': function (val, oldVal) {
        if (val === 1) {
          this.showFollow()
        } else {
          this.showUnfollow()
        }
      }
    },
    data: function () {
      return {
        followed_stat: this.followed,
        loading: true,
        desc: ''
      }
    },
    mounted () {
      this.checkStatus()
    },
    methods: {
      checkStatus: function () {
        if (this.followed_stat === 0 || this.followed === null) {
          this.showUnfollow()
        } else {
          this.showFollow()
        }
      },
      showFollow: function () {
        this.followed_stat = 1
        this.loading = false
        this.desc = '关注中'
      },
      showUnfollow: function () {
        this.followed_stat = 0
        this.loading = false
        this.desc = '关注'
      },
      toggleFollow: function () {
        this.loading = true
        if (this.followed_stat === 1) {
          // this.unfollow(this.god_id, this.showUnfollow)
          this.$store.dispatch('unfollow', this.god_id)
        } else {
          // this.follow(this.god_id, this.showFollow)
          this.$store.dispatch('follow', this.god_id)
        }
      }
    }
  }
</script>
