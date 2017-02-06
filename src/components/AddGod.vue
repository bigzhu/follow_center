<template>
  <div>
    <div class="ui basic segment add-newgod-bz new-god-bz"> 
      <a v-show="stat==='button'||stat==='adding'" @click="showAddGodInput" href="javascript:void(0)" class="ui add-newgod-style">
        <i class="add icon"></i>{{ $t("AddGod.addnewgod") }}
      </a>
      <div v-show="stat==='input'" class="ui action input row">
        <input @keyup.13="add" v-model="input_name" id="id_add_god" type="text" :placeholder="$t('AddGod.example')" class="eleven wide column">
        <div @click="add" class="ui button five wide column addcat-btn-bz">{{ $t("AddGod.add") }}&gt;</div>
      </div>
    </div>
    <div v-show="stat==='adding'" class="ui segment newgod-info">
      <div v-show="adding" class="ui active inverted dimmer">
        <div class="ui text loader">{{ $t("AddGod.adding") }}</div>
      </div>
      <div class="ui stackable grid">
        <div class="six wide column">
          <div class="god-avatar-bz">
            <a @click="$router.push({ name: 'God', params: { god_name: god_name }})" class="header god-name-bz user-name-a">
              <img :src="avatar" class="avatar-img-bz">
            </a>
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
            <a @click="$router.push({ name: 'God', params: { god_name: god_name }})" class="header newgod-name user-name-a">
              <h3>{{god_name}}</h3>
            </a>
            <a class="followers-number-bz">
              {{ $t("AddGod.follownumber") }}
            </a>
            <div class="god-discription-bz" v-html="description"></div>
            <follow :class="{'disabled': disabled}" v-model="god_info.followed" :god_id="0" class="button-to-follow-bz"></follow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import CountUp from 'bz-count-up'
  import Follow from './Follow'
  import SocialBadge from './SocialBadge'

  export default {
    components: {
      SocialBadge,
      CountUp,
      Follow
    },
    data: function () {
      return {
        god_name: '',
        input_name: '',
        stat: 'button',
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
    computed: {
      cat: function () {
        return this.$route.params.cat
      }
    },
    mounted () {
    },
    methods: {
      showAddGodInput: function () {
        this.input_name = '' // 清空上次的输入
        this.stat = 'input'
        this.$nextTick(
          function () {
            $('#id_add_god').focus()
          }
        )
        // 这时要重新取一下god，以处理连续添加的情况
        // 先不取了，连续添加很少见
        // this.queryNotMyGods(this.$route.params.cat)
      },
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
        this.init()
        this.god_name = this.input_name.trim()
        this.stat = 'adding'
        let self = this
        this.adding = true
        // this.addGod(this.god_name, this.$route.params.cat, this.startCheck)
        this.$store.dispatch('postGod', {name: this.god_name, cat: this.$route.params.cat}).then(function (data) {
          self.startCheck(data.god_info)
        })
      },
      startCheck: function (god_info) {
        this.setGodInfo(god_info)
        this.adding = false
        this.twitter_loading = true
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'twitter' }).then(function (data) {
          self.twitterDone(data.info)
        })
      },
      twitterDone: function (info) {
        this.twitter_loading = false
        if (info) {
          this.twitter_info = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'github' }).then(function (data) {
          self.githubDone(data.info)
        })
        this.github_loading = true
      },
      githubDone: function (info) {
        this.github_loading = false
        if (info) {
          this.github_info = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'instagram' }).then(function (data) {
          self.instagramDone(data.info)
        })
        this.instagram_loading = true
      },
      instagramDone: function (info) {
        this.instagram_loading = false
        if (info) {
          this.instagram_info = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'tumblr' }).then(function (data) {
          self.tumblrDone(data.info)
        })
        this.tumblr_loading = true
      },
      tumblrDone: function (info) {
        this.tumblr_loading = false
        if (info) {
          this.tumblr_info = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'facebook' }).then(function (data) {
          self.facebookDone(data.info)
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
        this.$store.commit('UNSHIFT_MY_GOD', {cat: this.cat, god: this.god_info})
        // this.$store.dispatch('queryCat')
        this.stat = 'button'
        this.$emit('add_done', this.god_info)
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
        this.god_info.followed_at = window.Date.now() // 当前时间做为follow时间,才会排前面
      },
      setGodInfo: function (god_info) {
        this.god_info = god_info
      },
      setInfo: function (info) {
        if (info.avatar) {
          this.avatar = '/api_sp/' + window.btoa(window.btoa(info.avatar))
        }
        if (info.description) {
          this.description = info.description
        }
      }
    }
  }
</script>
<style>
  .ui.segment.add-newgod-bz.new-god-bz {
    margin-top: 1.8rem;
  }
  .followed-search {
    margin-top: 1.9rem;
    float: right;
  }
</style>
