<template>
  <button v-on:click="toggleFollow"  :class="{'basic': !followed, 'keppel': followed, 'loading': loading}" class="ui bottom button follow-button">
    <i v-show="followed==0" class="add icon"></i>{{desc}}
  </button>
</template>

<script>
  export default {
    props: {
      god_info: {
        required: true,
        type: Object
      },
      god_id: {
        required: true,
        type: Number
      }
    },
    computed: {
      followed: {
        get () {
          return this.god_info.followed
        },
        set (v) {
          this.god_info.followed = v
        }
      }
    },
    data: function () {
      return {
        loading: true,
        desc: ''
      }
    },
    watch: {
      'followed': function () {
        this.checkStatus()
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.checkStatus()
      })
    },
    methods: {
      checkStatus: function () {
        if (this.followed === 0 || this.followed === null) {
          this.showUnfollow()
        } else {
          this.showFollow()
        }
      },
      showFollow: function () {
        this.followed = 1
        this.loading = false
        this.desc = '关注中'
      },
      showUnfollow: function () {
        this.followed = 0
        this.loading = false
        this.desc = '关注'
      },
      toggleFollow: function () {
        let self = this
        this.loading = true
        if (this.followed === 1) {
          this.$store.dispatch('unfollow', this.god_id).then(function (data) {
            self.showUnfollow()
          })
        } else {
          this.$store.dispatch('follow', this.god_id).then(function (data) {
            self.showFollow()
          })
        }
      }
    }
  }
</script>

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
