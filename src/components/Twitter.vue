<style lang="less">
  .padding-top-bz {
    padding-top: 1em
  }
  //现在基本没有小图，所以这个先注释，以后要是出现小图
  //宽屏幕，加上padding-right，以便于图片上浮时不要紧贴在一起
  // @media screen and (min-width : 992px){
    //   .padding-top-bz {
      //     padding-right:1em
    //   }
  // }
  video {
    max-width: 100%;
    height: auto;
  }
</style>

<template>
  <div>
    <div class="description" v-html="text">
    </div>
    <div v-for="media in medias">
      <a @click="openImg(media.img_url)" href='javascript:void(0)'>
        <img v-show="media.videos.length===0" :src="media.img_url" class="ui image padding-top-bz" >
      </a>
      <video v-for="video in media.videos" :loop="media.type==='gif'" :autoplay="media.type==='gif'" :controls="media.type!='gif'" type='video/mp4' class="padding-top-bz">
        <source :src="video.url">
      </video>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Autolinker from 'autolinker'
  export default {
    props: ['message'],
    data: function () {
      return {
      }
    },
    computed: {
      medias: function () {
        if (this.message.extended_entities) {
          return _.map(this.message.extended_entities.media,
            function (d) {
              // var height, img_height, img_url, img_width, t
              var img_url = (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(d.media_url_https + ':orig'))
              var videos = []
              var type = ''
              if (d.video_info) {
                // 找出类型是mp4,并且像素最好的
                // videos = [d.video_info.variants[0]]
                videos = _.where(d.video_info.variants, {content_type: 'video/mp4'})
                if (videos.length > 1) {
                  let video = _.max(videos, function (v) { return v.bitrate })
                  videos = [video] // 还是封成 list ，为遵循多视频考虑
                }

                if (d.type === 'animated_gif') {
                  type = 'gif'
                }
              }

              // img_height = d.sizes.medium.h
              // img_width = d.sizes.medium.w
              // height = getFitHeightForSemantic(img_height, img_width)
              // if (height > img_height) {
              //   height = img_height
              // }
              var t = {
                img_url: img_url,
                videos: videos,
                type: type
                // height: height
              }
              return t
            }
          )
        }
      },
      text: function () {
        return Autolinker.link(this.message.text, {twitter: true})
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
