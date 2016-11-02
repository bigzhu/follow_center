<style lang="less">
</style>

<template>
  <div>
    <h3 v-show="message.title" class="ui center aligned header">
      {{message.title}}
    </h3>
    <div class="description" v-html="text"></div>
    <template v-for="media in medias" :media="media">
      <p class="description" v-html="media.caption"></p>
      <a @click="openImg(media.img_url)">
        <img :src="media.img_url" class="ui image" >
      </a>
      <br>
    </template>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Autolinker from 'autolinker'
  import replaceSocial from '../functions/replaceSocial.js'

  export default {
    props: ['message'],
    computed: {
      medias: function () {
        if (this.message.extended_entities) {
          return _.map(
            this.message.extended_entities, function (d) {
              // var caption, height, img_height, img_url, img_width, t
              var img_url = (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(d.original_size.url))
              // img_url = d.original_size.url
              // img_height = d.original_size.height
              // img_width = d.original_size.width
              // height = getFitHeightForSemantic(img_height, img_width)
              var t = {
                img_url: img_url,
                // height: height,
                caption: d.caption
              }
              return t
            }
          )
        }
      },
      text: function () {
        if (this.message.text !== null) {
          let text = Autolinker.link(this.message.text, {twitter: false})
          text = replaceSocial('tumblr', text)
          return text
        }
      }
    },
    methods: {
      openImg: function (img_url) {
        if (this.$route.name === 'TheMessage') { // 在 TheMessage 还点了图，就在新页中打开图
          window.open(img_url, '_blank')
        } else {
          this.$router.go({name: 'TheMessage', params: {id: this.message.id}})
        }
      }
    }
  }
</script>
