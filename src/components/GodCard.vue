<template>
  <div :class="{ 'popup': popup, 'transition': popup, 'centered': !pop }" class="ui card column card-radius">
    <div v-show="god.god_id === 0" class="ui active inverted dimmer">
      <div class="ui text loader">Loading</div>
    </div>
    <div v-show="god.name==''" class="ui active inverted dimmer">
      <div class="ui text loader">Loading</div>
    </div>

    <a v-link="{ name: 'God', params: { god_name: god.name }}" :class="{'ui': popup, 'small': popup, 'centered': popup}" class="image">
      <img :src="avatar" class="ui centered image avatar-bz">
    </a>
    <div class="content delete-border">
      <a v-link="{ name: 'God', params: { god_name: god.name }}" class="user-name-a">
        <h3>{{god.name}}</h3>
      </a>
      <div class="description" v-html="desc"></div>
    </div>
    <div class="extra content god-icon-bz delete-border">
      <social-badge v-show="god.twitter_user" :call_back="setGodInfo" :info="god.twitter_user"></social-badge>
      <social-badge v-show="god.github_user" :call_back="setGodInfo" :info="god.github_user"></social-badge>
      <social-badge v-show="god.tumblr_user" :call_back="setGodInfo" :info="god.tumblr_user"></social-badge>
      <social-badge v-show="god.instagram_user" :call_back="setGodInfo" :info="god.instagram_user" ></social-badge>
      <social-badge v-show="god.facebook_user" :call_back="setGodInfo" :info="god.facebook_user"></social-badge>
    </div>
    <follow class="attached" :followed="god.followed" :god_id="god.god_id"></follow>
  </div>
</template>

<script>
  import '../assets/mobile.css'
  import Follow from './Follow'
  import SocialBadge from './SocialBadge'
  export default {
    props: ['god', 'popup'],
    watch: {
      'god': {
        handler: function (val, oldVal) { this.setGodInfo() },
        deep: true
      }
    },
    ready () {
      this.setGodInfo()
    },
    computed: {
      avatar: function () {
        if (!this.av) {
          return ''
        }
        return (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(this.av))
      }
    },
    components: {
      SocialBadge,
      Follow
    },
    data: function () {
      return {
        av: '',
        desc: ''
      }
    },
    methods: {
      setGodInfo: function (type) {
        if (type) {
          this.av = this.god[type + '_user'].avatar
          this.desc = this.god[type + '_user'].description
        } else {
          if (this.god.twitter_user) {
            this.setGodInfo('twitter')
          } else if (this.god.github_user) {
            this.setGodInfo('github')
          } else if (this.god.tumblr_user) {
            this.setGodInfo('tumblr')
          } else if (this.god.instagram_user) {
            this.setGodInfo('instagram')
          } else if (this.god.facebook_user) {
            this.setGodInfo('facebook')
          }
        }
      }
    }
  }
</script>

<style>
  .ui.cards>.card>.image>.avatar-bz,
  .ui.card>.image>.avatar-bz {
    width:auto;
    max-width:100%;
  }
  .ui.card>.extra.god-icon-bz a:not(.ui):hover, .ui.cards>.card>.extra.god-icon-bz a:not(.ui):hover {
    color: #999999;
    i.icon.icon-hover-twitter {
      color: #41ABE1;
      transition: color 0.3s linear;
    }
    i.icon.icon-hover-github {
      color: rgba(0, 0, 0, 0.8);
      transition: color 0.3s linear;
    }
    i.icon.icon-hover-instagram {
      color: #7E4532;
      transition: color 0.3s linear;
    }
    i.icon.icon-hover-tumblr {
      color: #205081;
      transition: color 0.3s linear;
    }
    i.icon.icon-hover-facebook {
      color: #3B5998;
      transition: color 0.3s linear;
    }
  }
  .ui.card.card-radius {
    border-radius: 0.06em 0.06em 0.3em 0.3em;
  }
  .ui.card>.content.delete-border {
    border-top: none;
  }
  .ui.card>.extra.delete-border {
    border-top: none!important;
  }
</style>
