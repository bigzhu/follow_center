<template>
  <div class="ui container">
    <div class="ui stackable grid container ">
      <div class="twelve wide column">
        <div class="ui segment bio-background">
          <img class="ui fluid image" :src='bio.title_img'>
          <div class="bio-article">
            <h3>{{bio.title}}</h3>
            <div v-html="bio.text">
            </div>
          </div>
          <god-item :god='god_info'></god-item>
        </div>
      </div>
      <div class="four wide column">
        <div class="ui segement bio-background">
          <div class="ui card border-radius">
            <div class="content">
              <div class="description align-center">
                ￥10微信扫一扫<i class="coffee icon"></i>买杯咖啡赞助我
              </div>
            </div>
            <div class="ui small centered image">
              <img src="/static/img/by_me.b628d93.jpg">
            </div>
            <div class="content">
              <div class="description align-center">
                <i class="qq icon"></i>答疑QQ群:&nbsp;&nbsp;484391016
              </div>
            </div>
          </div>
        </div>
        <div class="footer-content">
            <a href="/about">关于</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/about">博客</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            注册人数：{{registered_count}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </br>© 2016 Follow Center
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import GodItem from './GodItem'
  import _ from 'lodash'
  export default {
    components: {
      GodItem
    },
    data () {
      return {
        god_name: this.$route.params.god_name
      }
    },
    props: {
    },
    mounted () {
      this.$store.dispatch('getGod', this.god_name)
      this.getBio()
    },
    computed: {
      god_info () {
        let god_info = this.$store.state.god_infos[this.god_name.toLowerCase()]
        if (god_info) {
          return god_info
        }
        return {id: 0, name: ''}
      },
      bio () {
        let self = this
        let bio = _.find(this.$store.state.p.rich_list, function (d) { return d.key.toLowerCase() === self.god_name.toLowerCase() })
        if (bio) return bio
        else return {title_img: ''}
      }
    },
    methods: {
      getDetail: function () {
        let self = this
        this.$store.dispatch('getRichText', {key: this.god_name}).then(function (data) {
          self.bio.text = data.rich_text[0].text
        })
      },
      getBio: function () {
        let self = this
        if (this.bio.title_img !== '') {
          if (!this.bio.text) { // 没有详情，取之
            this.getDetail()
          }
        } else {
          this.$store.dispatch('getRichList').then(function (data) {
            self.getBio()
          })
        }
      }
    }

  }
</script>
<style>
  .ui.segment.bio-background {
    border-radius: 0.06em;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
    position: relative;
    border: none;
    background-color: #fff;
  }
  .bio-article {
    padding: 1.5rem;
  }
</style>
