<style >
</style>

<template>
  <div>
    <div class="description word-wrap-bz" v-html="description"></div>
    <a @click="openImg(img_url)">
      <img :src="img_url" class="ui image padding-top-bz">
    </a>
  </div>
</template>

<script>
  import '../assets/public.css'
  import Autolinker from 'autolinker'

  export default {
    props: ['message'],
    computed: {
      img_url: function () {
        var img_url = this.message.extended_entities.url
        img_url = img_url.replace('s640x640', 's1080x1080')
        img_url = img_url.replace('s750x750', 's1080x1080')
        img_url = window.btoa(window.btoa(img_url))
        return (window.bz_url || '') + '/api_sp/' + img_url
      },
      // height: function () {
      //   var img_height, img_width, real_height
      //   img_height = this.message.extended_entities.height
      //   img_width = this.message.extended_entities.width
      //   real_height = getFitHeightForSemantic(img_height, img_width)
      //   return real_height
      // },
      description: function () {
        let text = Autolinker.link(this.message.text, {mention: 'instagram'})
        // text = replaceSocial('instagram', text)
        return text
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
