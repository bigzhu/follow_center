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
    },
    computed: {
      bio: function () {
        let bio = this.getBio()
        if (bio) {
          if (!bio.text) {
            console.log('no text')
            this.getDetail()
          }
          return bio
        } else {
          this.$store.dispatch('getRichList')
          return {}
        }
      },
      god_info () {
        let god_info = this.$store.state.god_infos[this.god_name.toLowerCase()]
        if (god_info) {
          return god_info
        }
        return {id: 0, name: ''}
      }
    },
    methods: {
      getDetail: function () {
        let self = this
        this.$store.dispatch('getRichText', {key: this.god_name}).then(function (data) {
          console.log(data.rich_text[0].text)
          self.getBio().text = data.rich_text[0].text
          // self.bio.text = data.rich_text[0].text
        })
      },
      getBio: function () {
        let self = this
        return _.find(this.$store.state.p.rich_list, function (d) { return d.key.toLowerCase() === self.god_name.toLowerCase() })
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
