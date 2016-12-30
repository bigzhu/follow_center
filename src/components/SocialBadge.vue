<template>
  <a @click='click' href='javascript:void(0)'> <i :class="the_class"></i>
    <count-up v-show="count!=-4" :end="count" :duration="2.5" :options="{useEasing : true,
      useGrouping : true,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''}">
    </count-up>
  </a>
</template>

<script>
  import CountUp from 'bz-count-up'
  export default {
    props: {
      info: {
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    components: {
      CountUp
    },
    computed: {
      count: function () {
        if (this.info) {
          return this.info.count
        }
        return -4
      },
      type: function () {
        if (this.info) {
          return this.info.type
        }
        return ''
      },
      href: function () {
        if (this.type === 'twitter') {
          return 'https://twitter.com/' + this.info.name
        } else if (this.type === 'tumblr') {
          return 'http://' + this.info.name + '.tumblr.com/'
        } else if (this.type === 'instagram') {
          return 'https://instagram.com/' + this.info.name
        } else if (this.type === 'facebook') {
          return 'https://facebook.com/' + this.info.name
        }
      },
      the_class: function () {
        if (this.loading) {
          return `light-bz loading icon ${this.type} icon-hover-${this.type}`
        }
        return `icon ${this.type} icon-hover-${this.type}`
      }
    },
    data: function () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      click: function () {
        this.$emit('show_this', this.type)
      }
    }
  }
</script>

<style>
</style>
