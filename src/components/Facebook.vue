<template>
  <div>
    <div class="description word-wrap-bz" v-html="the_text"></div>
    <div class="description word-wrap-bz" v-html="description"></div>
    <a v-show="img_url" @click="openImg(img_url)">
      <img :src="img_url" class="ui image padding-top-bz">
    </a>
  </div>
</template>

<script>
  import '../assets/public.css'
  import Autolinker from 'autolinker'
  import replaceSocial from '../functions/replaceSocial.js'

  export default {
    props: ['message'],
    computed: {
      img_url: function () {
        if (this.message.extended_entities.pictrue) {
          var img_url = this.message.extended_entities.pictrue
          img_url = window.btoa(window.btoa(img_url))
          return (window.bz_url || '') + '/api_sp/' + img_url
        } else {
          return null
        }
      },
      description: function () {
        let text = Autolinker.link(this.message.content.description, {twitter: false})
        text = replaceSocial('facebook', text)
        return text
      },
      the_text: function () {
        return Autolinker.link(this.text)
      }
    },
    methods: {
      openImg: function (img_url) {
        if (this.$route.name === 'TheMessage') { // 在 TheMessage 还点了图，就在新页中打开图
          window.open(img_url, '_blank')
        } else {
          this.$router.push({name: 'TheMessage', params: {id: this.message.id}})
        }
      }
    }
  }
</script>

<style>
</style>
