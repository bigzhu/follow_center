<template>
  <div class="ui segment recommand-god-bz">
    <div class="ui stackable grid">
      <div :class="{'four wide column':is_my, 'six wide column':!is_my}" >
        <div :class="{'my-god-avatar-bz':is_my, 'god-avatar-bz':!is_my}">
          <router-link :to="{ name: 'God', params: { god_name: god.name }}" class="header god-name-bz user-name-a">
            <img :src="avatar" class="avatar-img-bz">
          </router-link>
        </div>
      </div>
      <div :class="{'twelve wide column':is_my, 'ten wide column':!is_my}">
        <div class="god-detail-bz">
          <slot>
          </slot>
          <div class="god-icon-bz">
            <social-badge v-show="god.twitter_user" :call_back="setGodInfo" :info="god.twitter_user"></social-badge>
            <social-badge v-show="god.github_user" :call_back="setGodInfo" :info="god.github_user"></social-badge>
            <social-badge v-show="god.tumblr_user" :call_back="setGodInfo" :info="god.tumblr_user"></social-badge>
            <social-badge v-show="god.instagram_user" :call_back="setGodInfo" :info="god.instagram_user" ></social-badge>
            <social-badge v-show="god.facebook_user" :call_back="setGodInfo" :info="god.facebook_user"></social-badge>
          </div>
          <router-link :to="{ name: 'God', params: { god_name: god.name }}" class="header god-name-bz user-name-a">
            <h3>{{god.name}}</h3>
          </router-link>
          <a class="followers-number-bz">
            {{god.followed_count}} 人关注
          </a>
          <div class="god-discription-bz" v-html="description"  ></div>

          <god-remark :remark.sync="remark" :god_id="god.id"></god-remark>
          <a v-show="false" class="hide-god-bz">
            <i class="hide icon"></i>
          </a>
          <div>
            <a href="javascript:void(0)" class="hide-god-bz">
              <i class="hide icon"></i>
            </a>
          </div>
          <follow :followed="god.followed" :god_id="god.god_id" class="button-to-follow-bz"></follow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Follow from './Follow'
  import GodRemark from './GodRemark'
  import SocialBadge from './SocialBadge'
  import '../assets/mobile.css'
  // import store from '../store'
  export default {
    props: {
      god: {
      },
      is_my: {
      }
    },
    watch: {
    },
    mounted () {
      this.setGodInfo()
    },
    directives: {
    },
    data: function () {
      return {
        av: '',
        desc: ''
      }
    },
    computed: {
      god_id: function () {
        return this.god.god_id
      },
      remark: function () {
        if (this.god.remark) {
          return this.god.remark
        }
        return this.god.admin_remark
      },
      description: function () {
        let description = this.desc
        return description
      },
      avatar: function () {
        if (!this.av) {
          return ''
        }
        return (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(this.av))
      }
    },
    components: {
      SocialBadge,
      Follow,
      GodRemark
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
  .ui.segment.recommand-god-bz {
    padding: 0;
    border: none;
    overflow: hidden;
    border-radius: 0.06em;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
  }
  .god-detail-bz {
    margin: 1em;
  }
  .god-icon-bz {
    float: right;
    font-size: 0.9rem;
  }
  .god-icon-bz a {
    color: #999999;
  }
  .god-icon-bz a:hover i.icon.icon-hover-twitter {
    color: #41ABE1;
    transition: color 0.3s linear;
  }
  .god-icon-bz a:hover i.icon.icon-hover-github {
    color: rgba(0, 0, 0, 0.8);
    transition: color 0.3s linear;
  }
  .god-icon-bz a:hover i.icon.icon-hover-instagram {
    color: #7E4532;
    transition: color 0.3s linear;
  }
  .god-icon-bz a:hover i.icon.icon-hover-tumblr {
    color: #205081;
    transition: color 0.3s linear;
  }
  .god-icon-bz a:hover i.icon.icon-hover-facebook {
    color: #3B5998;
    transition: color 0.3s linear;
  }
  .god-name-bz {
    display: inline-block;
    padding-right: 0.8em;
  }
  .followers-number-bz {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.9rem;
  }
  .followers-number-bz:hover {
    color: rgba(0, 0, 0, 0.7);
  }
  .god-discription-bz {
    margin: 1em 0em;
  }
  .ui.bottom.button.button-to-follow-bz {
    border-radius: 0.06em;
    position: absolute!important;
    bottom: 2em;
    right: 2em;
    width: 9em;
  }
  .god-avatar-bz {
    height: 300px;
    width: 300px;
    position: relative;
    float: left;
    background-image: linear-gradient(90deg, #f5f3f8, #e6e4e9);
    margin-right: 1em;
  }
  .my-god-avatar-bz {
    height: 300px;
    width: 300px;
    position: relative;
    float: left;
    background-image: linear-gradient(90deg, #f5f3f8, #e6e4e9);
    margin-right: 1em;
    height: 180px;
    width: 180px;
  }
  .avatar-img-bz {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .hide-god-bz {
    position: absolute;
    bottom: 2.3em;
    right: 11em;
    color: rgba(0, 0, 0, 0.5);
    transition: visibility 0s, opacity 0.3s linear;
    opacity: 0;
  }
  .ui.segment:hover .hide-god-bz {
    visibility: visible;
    opacity: 1;
  }
  .hide-god-bz:hover {
    color: #168454;
  }
  @media (max-width: 767px) {
    .god-detail-bz {
      margin: 0 1em 1em 1em;
    }
    .ui.bottom.button.button-to-follow-bz {
      width: 100%;
      position: static!important;
    }
    .god-avatar-bz {
      position: static;
      float: none;
      background-image: none;
      margin-right: 0em;
    }
    .my-god-avatar-bz {
      height: 300px;
      width: 300px;
      position: static;
      float: none;
      background-image: none;
      margin-right: 0em;
    }
    .god-name-bz {
      padding-right: 100%;
      display: block;
    }
    .hide-god-bz {
      position: static;
      visibility: visible;
      opacity: 1;
    }
  }
</style>
