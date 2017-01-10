<template>
  <button v-on:click="toggleFollow"  :class="{'basic': !value, 'keppel': value, 'loading': loading}" class="ui bottom button follow-button">
    <i v-show="value==0" class="add icon"></i>{{desc}}
  </button>
</template>

<script>
  export default {
    props: {
      value: {
        required: true,
        // type: Number,
        default: 0
      },
      god_id: {
        required: true,
        type: Number
      }
    },
    computed: {
    },
    data: function () {
      return {
        loading: true,
        desc: ''
      }
    },
    watch: {
      'value': function () {
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
        if (this.value === 0 || this.value === null) {
          this.showUnfollow()
        } else {
          this.showFollow()
        }
      },
      showFollow: function () {
        this.$emit('input', 1)
        this.loading = false
        this.desc = this.$t('Follow.following')
      },
      showUnfollow: function () {
        this.$emit('input', 0)
        this.loading = false
        this.desc = this.$t('Follow.tofollow')
      },
      toggleFollow: function () {
        let self = this
        this.loading = true
        if (this.value === 1) {
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
    border: 0.1em solid rgba(0,0,0,.05);
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
