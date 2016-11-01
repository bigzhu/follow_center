<template>
  <div class="ui segment newgod-info">
    <div v-show="adding" class="ui active inverted dimmer">
      <div class="ui text loader">添加中</div>
    </div>
    <div class="ui stackable grid">
      <div class="six wide column">
        <div class="god-avatar-bz">
          <router-link :to="{ name: 'God', params: { god_name: god_name }}" class="header god-name-bz user-name-a">
            <img :src="avatar" class="avatar-img-bz">
          </router-link>
        </div>
      </div>
      <div class="ten wide column">
        <div class="god-detail-bz">
          <div class="god-icon-bz">
            <social-badge :loading="twitter_loading" :info="twitter_info"></social-badge>
            <social-badge :loading="github_loading" :info="github_info"></social-badge>
            <social-badge :loading="instagram_loading" :info="instagram_info"></social-badge>
            <social-badge :loading="tumblr_loading" :info="tumblr_info"></social-badge>
            <social-badge :loading="facebook_loading" :info="facebook_info"></social-badge>
          </div>
          <router-link :to="{ name: 'God', params: { god_name: god_name }}" class="header newgod-name user-name-a">
            <h3>{{god_name}}</h3>
          </router-link>
          <a class="followers-number-bz">
            ? 人关注
          </a>
          <div class="god-discription-bz" v-html="description"></div>
          <follow :class="{'disabled': disabled}" :followed="0" :god_id="0" class="button-to-follow-bz"></follow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CountUp from 'bz-count-up'
  import Follow from './Follow'
  import SocialBadge from './SocialBadge'

  export default {
    props: {
      god_name: {
        type: String,
        required: true
      },
      call_back: {
      }
    },
    components: {
      SocialBadge,
      CountUp,
      Follow
    },
    data: function () {
      return {
        god_info: {
        },
        twitter_info: {
          type: 'twitter',
          count: -4
        },
        github_info: {
          type: 'github',
          count: -4
        },
        tumblr_info: {
          type: 'tumblr',
          count: -4
        },
        instagram_info: {
          type: 'instagram',
          count: -4
        },
        facebook_info: {
          type: 'facebook',
          count: -4
        },

        disabled: true,
        adding: false,
        description: '',
        avatar: '',
        twitter_loading: false,
        github_loading: false,
        instagram_loading: false,
        tumblr_loading: false,
        facebook_loading: false
      }
    },
    watch: {
      'god_name': function (val, oldVal) {
        this.init()
        this.add()
      }
    },
    mounted () {
    },
    methods: {
      init: function () {
        this.twitter_info = {
          type: 'twitter',
          count: -4
        }
        this.github_info = {
          type: 'github',
          count: -4
        }
        this.tumblr_info = {
          type: 'tumblr',
          count: -4
        }
        this.instagram_info = {
          type: 'instagram',
          count: -4
        }
        this.facebook_info = {
          type: 'facebook',
          count: -4
        }
        this.disabled = true
        this.adding = false
        this.description = ''
        this.avatar = ''
        this.twitter_loading = false
        this.github_loading = false
        this.instagram_loading = false
        this.tumblr_loading = false
        this.facebook_loading = false
      },
      add: function () {
        this.adding = true
        // this.addGod(this.god_name, this.$route.params.cat, this.startCheck)
        this.$store.dispatch('addGod', {god_name: this.god_name, cat: this.$route.params.cat, startCheck: this.startCheck})
      },
      startCheck: function (god_info) {
        this.setGodInfo(god_info)

        this.adding = false
        this.twitter_loading = true
        let _this = this
        this.$store.dispatch('checkSocial', { god_name: this.god_name, type: 'twitter' }).then(function (data) {
          _this.twitterDone()
        })
      },
      twitterDone: function (info) {
        this.twitter_loading = false
        if (info) {
          this.twitter_info = info
          this.setInfo(info)
        }
        let _this = this
        this.$store.dispatch('checkSocial', { god_name: this.god_name, type: 'github' }).then(function (data) {
          _this.githubDone()
        })
        this.github_loading = true
      },
      githubDone: function (info) {
        this.github_loading = false
        if (info) {
          this.github_info = info
          this.setInfo(info)
        }
        let _this = this
        this.$store.dispatch('checkSocial', { god_name: this.god_name, type: 'instagram' }).then(function (data) {
          _this.instagramDone()
        })
        this.instagram_loading = true
      },
      instagramDone: function (info) {
        this.instagram_loading = false
        if (info) {
          this.instagram_info = info
          this.setInfo(info)
        }
        let _this = this
        this.$store.dispatch('checkSocial', { god_name: this.god_name, type: 'tumblr' }).then(function (data) {
          _this.tumblrDone()
        })
        this.tumblr_loading = true
      },
      tumblrDone: function (info) {
        this.tumblr_loading = false
        if (info) {
          this.tumblr_info = info
          this.setInfo(info)
        }
        let _this = this
        this.$store.dispatch('checkSocial', { god_name: this.god_name, type: 'facebook' }).then(function (data) {
          _this.facebookDone()
        })
        this.facebook_loading = true
      },
      facebookDone: function (info) {
        this.facebook_loading = false
        if (info) {
          this.facebook_info = info
          this.setInfo(info)
        }
        this.allDone()
      },
      allDone: function (info) {
        this.disabled = false
        this.createGod()
        this.$store.commit('UNSHIFT_NOT_MY_GOD', this.$route.params.cat, this.god_info)
        this.$store.dispatch('queryCat')
        // this.queryNotMyGods(this.$route.params.cat)
        if (this.call_back) {
          this.call_back()
        }
      },
      setGodSocial: function (type) {
        if (this[type + '_info'].count !== -4) {
          this.god_info[type] = this.god_name
          this.god_info[type + '_user'] = this[type + '_info']
        }
      },
      createGod: function () {
        this.setGodSocial('twitter')
        this.setGodSocial('github')
        this.setGodSocial('tumblr')
        this.setGodSocial('instagram')
        this.setGodSocial('facebook')
      },
      setGodInfo: function (god_info) {
        this.god_info = god_info
      },
      setInfo: function (info) {
        if (info.avatar) {
          this.avatar = (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(info.avatar))
        }
        if (info.description) {
          this.description = info.description
        }
      }
    }
  }
</script>

<style>
</style>
