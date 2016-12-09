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
          <right-info></right-info>
      </div>
    </div>
  </div>
</template>
<script>
  import GodItem from './GodItem'
  import _ from 'lodash'
  import RightInfo from './RightInfo'
  export default {
    components: {
      GodItem,
      RightInfo
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
