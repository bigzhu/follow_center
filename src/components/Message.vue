<template>
  <div :id="'id_'+ message.id" class="ui fluid card message-bz">
    <div class="content article-bz">
      <a target="_blank" :href="href">
        <i :class="'right floated ' + message.m_type + ' icon god-icon-bz icon-bz'"></i>
      </a>
      <time-len :the_time="message.created_at" class="right floated meta time-bz"></time-len>
      <img :src="avatar" class="ui avatar image show-god-info">
      <router-link :to="{ name: 'g', params: { god_name: message.user_name }}" class="user-name-a">
        {{message.name}}
      </router-link>
      <god-card :god="god_info" :god_id="god_info.god_id" :popup="true">
      </god-card>
      <component class="content-bz" :is="message.m_type" :message="message"></component>
    </div>
    <div class="like-bz">
      <a @click="toggleCollect(message)" :class="{'hidden-bz':!message.collect}" class="bookmark-bz"><i :class="{'remove':!message.collect, 'light-bz': message.collect}" class="bookmark icon"></i></a>
      <router-link :to="{ name:'TheMessage', params:{id:message.id}}" class="more-infor-bz hidden-bz"><i class="ellipsis horizontal icon"></i></router-link>
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
        collected: false
      }
    },
    mounted () {
      // this.visibility()
    },
    attached: function () {
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
          onShow: (
            function (_this) {
              return function () {
                _this.getGodInfo()
              }
            }
          )(this)
        }
      )
    },
    computed: {
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
      visibility: function () {
        let _this = this
        $(this.$el).visibility(
          {
            once: true,
            onTopVisible: function (event) {
              _this.$store.dispatch('recordLastMessage', _this.message.created_at)
              // let color = random.color()
              // $(_this.$el).addClass(color)
            }
          }
        )
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
        this.$store.dispatch('queryGod', this.message.user_name)
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
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
    position: relative;
  }
  .like-bz {
    padding: 0em 0.5em 0.2em 0em;
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
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
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
  @media (max-width: 767px) {
    .hidden-bz {
      visibility: visible;
      opacity: 1;
      position: static;
    }
    .message-bz {
      box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 0px 1px, rgba(0, 0, 0, 0.03) 0px 1px 3px 0px !important;
    }
  }
</style>

