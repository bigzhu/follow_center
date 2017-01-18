<template>
  <div :id="'id_'+ message.id" class="ui fluid card message-bz">
    <div class="content article-bz">
      <a target="_blank" :href="href">
        <i :class="'right floated ' + message.m_type + ' icon god-icon-bz icon-bz'"></i>
      </a>
      <time-len :the_time="message.created_at" :lang="lang" class="right floated meta time-bz"></time-len>
      <img :src="avatar" class="ui avatar image show-god-info">
      <a @click="$router.push({ name: 'God', params: { god_name: message.user_name }})" class="user-name-a">
        {{message.name}}
      </a>
      <god-card :god="god_info" :god_id="god_info.god_id" :popup="true">
      </god-card>
      <component class="content-bz" :is="message.m_type" :message="message"></component>
    </div>
    <div class="like-bz">
      <router-link :to="{ name:'TheMessage', params:{id:message.id}}" class="more-infor-bz hidden-bz"><i class="ellipsis horizontal icon"></i></router-link>
      <a @click="toggleCollect(message)" :class="{'hidden-bz':!message.collect}" class="bookmark-bz">
        <i :class="{'remove':!message.collect, 'light-bz': message.collect}" class="bookmark icon"></i>
      </a>
      <a @mouseleave="anki_color='#B3B3B3'" @mousemove="anki_color='#57ADE3'" @click="anki" :class="{'hidden-bz':!message.anki}" class="anki-bz">
        <svg width="19px" height="20px" viewBox="51 -272 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 41.2 (35397) - http://www.bohemiancoding.com/sketch -->
          <desc>Created with Sketch.</desc>
          <defs>
            <rect id="path-1" x="0" y="1.2" width="13.9658778" height="14.8427295" rx="3"></rect>
            <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13.9658778" height="14.8427295" fill="white">
              <use xlink:href="#path-1"></use>
            </mask>
            <linearGradient x1="72.5086929%" y1="34.3563028%" x2="26.5472291%" y2="92.8578943%" id="linearGradient-3">
              <stop stop-color="#228AD7" offset="0%"></stop>
              <stop stop-color="#C8E3F5" offset="100%"></stop>
            </linearGradient>
            <rect id="path-4" x="0" y="1.2" width="13.9658778" height="14.8427295" rx="3"></rect>
            <mask id="mask-5" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13.9658778" height="14.8427295" fill="white">
              <use xlink:href="#path-4"></use>
            </mask>
          </defs>
          <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(51.000000, -271.000000)">
            <use id="Rectangle" stroke="#979797" mask="url(#mask-2)" stroke-width="2" xlink:href="#path-1"></use>
            <path d="" id="Path-2" stroke="#979797"></path>
            <polygon id="Star" stroke="#FFFFFF" stroke-linejoin="round" fill="url(#linearGradient-3)" transform="translate(9.443919, 8.686132) rotate(-19.000000) translate(-9.443919, -8.686132) " points="10.1944045 13.250996 5.68678266 15.6198299 6.54766183 10.6025592 2.90091916 7.04930835 7.94059358 6.31729842 10.1944045 1.75243473 12.4482154 6.31729842 15.9869193 6.8312932 15.2923397 8.8476788 13.8411472 10.6025592 14.1132779 12.1885583 13.1788476 14.8193729"></polygon>
          </g>
          <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(51.000000, -271.000000)">
            <use id="Rectangle" stroke="#B3B3B3" mask="url(#mask-5)" stroke-width="2" xlink:href="#path-4"></use>
            <path d="" id="Path-2" stroke="#979797"></path>
            <polygon id="Star" stroke="#FFFFFF" stroke-linejoin="round" :fill="[message.anki ? '#57ADE3' : anki_color]" transform="translate(9.443919, 8.686132) rotate(-19.000000) translate(-9.443919, -8.686132) " points="10.1944045 13.250996 5.68678266 15.6198299 6.54766183 10.6025592 2.90091916 7.04930835 7.94059358 6.31729842 10.1944045 1.75243473 12.4482154 6.31729842 15.9869193 6.8312932 15.2923397 8.8476788 13.8411472 10.6025592 14.1132779 12.1885583 13.1788476 14.8193729">
            </polygon>
          </g>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import $ from 'jquery'
  import GodCard from './GodCard'
  import Twitter from './Twitter'
  import Github from './Github'
  import Instagram from './Instagram'
  import Tumblr from './Tumblr'
  import Facebook from './Facebook'
  import TimeLen from 'bz-time-len'
  import Vue from 'vue'

  export default {
    props: {
      message: {
        type: Object,
        default: function () {
          return {
            user_name: '',
            id: 0
          }
        }
      }
    },
    components: {
      TimeLen,
      Facebook,
      GodCard,
      Twitter,
      Github,
      Instagram,
      Tumblr
    },
    directives: {
    },
    data: function () {
      return {
        collected: false,
        anki_color: '#B3B3B3' // #57ADE3
      }
    },
    mounted () {
      this.$nextTick(function () {
        let self = this
        if (this.is_login) {
          this.$store.dispatch('getIntersectionObserver').then(function (io) {
            io.observe(self.$el)
          })
        }
        // this.$store.dispatch('getIntersectionObserver').observe(this.$el)
        var tool_tips_target = $(this.$el).find('.show-god-info')
        var popup_content = $(this.$el).find('.ui.card')
        $(tool_tips_target).popup(
          {
            popup: $(popup_content),
            lastResort: true,
            position: 'bottom left',
            hoverable: true,
            delay: {
              show: 100,
              hide: 500
            },
            onShow: self.getGodInfo
          }
        )
      })
    },
    computed: {
      lang () {
        return Vue.config.lang
      },
      is_login () {
        return this.$store.state.p.is_login
      },
      href: function () {
        if (this.message.m_type === 'github') {
          return `https://github.com/${this.message.name}`
        }
        return this.message.href
      },
      god_info: function () {
        let god_info = store.state.god_infos[this.message.user_name.toLowerCase()]
        if (god_info) {
          return god_info
        }
        return {god_id: 0}
      },
      avatar: function () {
        var avatar = window.btoa(window.btoa(this.message.avatar))
        return (window.bz_url || '') + '/api_sp/' + avatar
      }
    },
    methods: {
      anki: function () {
        if (this.message.anki) return
        let self = this
        let front = $(this.$el).find('.content-bz').html()
        this.$store.dispatch('postAnki', {front: front, message_id: this.message.id}).then(function () {
          self.message.anki = 1
        })
      },
      toggleCollect: function (message) {
        if (message.collect) {
          this.$store.dispatch('uncollect', message.id).then(function (data) {
            message.collect = null
          })
        } else {
          this.$store.dispatch('collect', message.id).then(function (data) {
            message.collect = 1
          })
        }
      },
      getGodInfo: function () {
        this.$store.dispatch('getGod', {god_name: this.message.user_name, loading: false})
      },
      collectDone: function (message) {
        message.collect = 1
      },
      uncollectDone: function (message) {
        message.collect = null
      }
    }
  }
</script>

<style>
  .ui.card.message-bz {
    border-radius: 0.06em;
    box-shadow: .5px 1px 1px 1px rgba(0,0,0,0.1);
    position: relative;
  }
  .like-bz {
    padding: 0.5em 0.5em 0em 0em;
  }
  .like-bz a {
    float: right;
    cursor: pointer;
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.3);
  }
  .hidden-bz {
    transition: color 0.3s ease;
    transition: visibility 0s, opacity 0.3s linear;
    opacity: 0;
  }
  .ui.card.message-bz:hover {
    box-shadow: .5px 1px 1px 1px rgba(0,0,0,0.15);
  }
  .ui.card.message-bz:hover .hidden-bz {
    visibility: visible;
    opacity: 1;
  }
  .ui.card .meta.time-bz {
    font-size: 12px;
    padding-right: 4px;
    padding-top: 1.2px;
  }
  .ui.card > .content.article-bz {
    padding: 1em 1em 0em 1em;
    font-size: 14px;
  }
  i.icon.icon-bz {
    margin-right: 0;
  }
  .more-infor-bz:hover {
    color: #54B98F;
  }
  .bookmark-bz:hover {
    color: #FBBD08;
  }
  .bookmark.light-bz {
    color: #FBBD08;
  }
  .content-bz {
    margin-top: 0.5em;
  }
  .anki-bz svg{
    margin-right: 0.2rem;
    margin-top: 0.22rem;
  }
  .anki-bz:hover {
    color: #57ADE3;
  }
  @media (max-width: 767px) {
    .hidden-bz {
      visibility: visible;
      opacity: 1;
      position: static;
    }
    .message-bz {
      box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 0px 1px, rgba(0, 0, 0, 0.03) 0px 1px 3px 0px !important;
    }
    .anki-bz svg{
      margin-top: 0.11rem;
    }
  }
</style>
