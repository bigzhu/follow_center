<template>
  <div class="ui center aligned segment info-card-bz">
    <h4 class="ui header">{{god_info.name}}</h4>
    <img :src="avatar" id="profile-image" class="ui centered image" />
    <p class="god-description" v-html="desc">
    </p>
    <god-remark :remark.sync="remark" :god_id="god_info.id"></god-remark>
    <form class="ui form">
      <div class="inline field">
        <label>
          <a :class="{ disabled: !god_info.twitter }" :href="'https://twitter.com/' + god_info.twitter" target="_blank" class="ui circular twitter icon button" data-content="Twitter">
            <i class="twitter icon"></i>
          </a>
        </label>
        <input v-model="god_info.twitter" @focus="autoInsert('twitter', god_info.name)" :disabled="disable_edit" type="text" class="input-bz">
      </div>

      <div class="inline field">
        <label>
          <a :class="{ disabled: !god_info.github }" :href="'https://github.com/' + god_info.github" target="_blank" class="ui circular github icon button" data-content="Github">
            <i class="github icon"></i>
          </a>
        </label>
        <input v-model="god_info.github" @focus="autoInsert('github', god_info.name)" :disabled="disable_edit" type="text" class="input-bz">
      </div>

      <div class="inline field">
        <label>
          <a :class="{ disabled: !god_info.instagram }" :href="'https://instagram.com/'+god_info.instagram" target="_blank" class="ui circular instagram icon button" data-content="Instagram">
            <i class="instagram icon"></i>
          </a>
        </label>
        <input v-model="god_info.instagram" @focus="autoInsert('instagram', god_info.name)" :disabled="disable_edit" type="text" class="input-bz">
      </div>

      <div class="inline field">
        <label>
          <a :class="{ disabled: !god_info.tumblr }" :href="'http://'+god_info.tumblr+'.tumblr.com'" target="_blank" class="ui circular tumblr icon button" data-content="Tumblr">
            <i class="tumblr icon"></i>
          </a>
        </label>
        <input v-model="god_info.tumblr" @focus="autoInsert('tumblr', god_info.name)" :disabled="disable_edit" type="text" class="input-bz">
      </div>

      <div class="inline field">
        <label>
          <a :class="{ disabled: !god_info.facebook }" :href="'https://facebook.com/'+god_info.facebook" target="_blank" class="ui circular facebook icon button" data-content="Facebook">
            <i class="facebook icon"></i>
          </a>
        </label>
        <input v-model="god_info.facebook" @focus="autoInsert('facebook', god_info.name)" :disabled="disable_edit" type="text" class="input-bz">
      </div>
    </form>

    <div class="ui center aligned basic segment">
      <follow v-model="god_info.followed" :god_id="god_info.id"></follow>
      <button v-show="disable_edit" @click="save" class="ui basic button god-info-button-bz">
        <i class="icon file text"></i>
        编辑
      </button>
      <button v-show="!disable_edit" @click="save" class="ui basic button god-info-button-bz">
        <i class="icon save"></i>
        保存
      </button>
    </div>
  </div>
</template>

<script>
  import GodRemark from './GodRemark'
  import $ from 'jquery'
  import Follow from './Follow'
  export default {
    components: {
      GodRemark,
      Follow
    },
    directives: {
    },
    props: {
      god_info: {
        type: Object,
        default: function () {
          return {
            id: 1,
            name: 'loading',
            avatar: '',
            bio: '',
            github: '',
            twitter: '',
            instagram: '',
            tumblr: ''
          }
        },
        required: true
      }
    },
    computed: {
      remark: function () {
        if (this.god_info.remark) {
          return this.god_info.remark
        }
        return this.god_info.admin_remark
      },
      avatar: function () {
        // if (!this.av) {
        if (this.god_info.avatar === '') {
          return '/static/assets/avatar.svg'
        }
        return (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(this.av))
      }
    },
    mounted () {
      this.setGodInfo()
      $(this.$el).find('.button').popup(
        {
          inline: true
        }
      )
    },
    watch: {
      'god_info': {
        handler: function (val, oldVal) { this.setGodInfo() },
        deep: true
      }
    },
    data: function () {
      return {
        av: '',
        desc: '',
        loading: false,
        disable_edit: true,
        button_text: '修改资料'
      }
    },
    methods: {
      setGodInfo: function (type) {
        if (type) {
          this.av = this.god_info[type + '_user'].avatar
          this.desc = this.god_info[type + '_user'].description
        } else {
          if (this.god_info.twitter_user) {
            this.setGodInfo('twitter')
          } else if (this.god_info.github_user) {
            this.setGodInfo('github')
          } else if (this.god_info.tumblr_user) {
            this.setGodInfo('tumblr')
          } else if (this.god_info.instagram_user) {
            this.setGodInfo('instagram')
          } else if (this.god_info.facebook_user) {
            this.setGodInfo('facebook')
          } else {
            this.av = ''
            this.desc = ''
          }
        }
      },
      autoInsert: function (key, scheme) {
        if (key === 'blog') {
          scheme = 'http://'
        }
        if (!this.god_info[key]) {
          this.god_info[key] = scheme
        }
      },
      save: function () {
        if (this.disable_edit) {
          this.disable_edit = false
        } else {
          this.disable_edit = true
          var user = {
            name: this.god_info.name,
            twitter: this.god_info.twitter,
            github: this.god_info.github,
            instagram: this.god_info.instagram,
            tumblr: this.god_info.tumblr,
            facebook: this.god_info.facebook
            // bio: this.god_info.bio
            // avatar: this.god_info.avatar
          }
          this.$store.dispatch('updateGod', user)
        }
      }
    }
  }
</script>
<style >
  .ui.button.god-info-button-bz {
    box-shadow: none!important;
    border: 0.1em solid rgba(0,0,0,.15);
    border-radius: 0.06em;
    font-size: 0.9em;
    margin-left: 0.5rem;
  } 
  .hide{
    display: none
  }
  .god-description {
    margin-top: 1em;
  }
  .ui.segment.info-card-bz {
    border: none;
    border-radius: 0.06em;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
  }
  .ui.form .inline.field>input.input-bz {
    border-radius: 0.06em;
  }
</style>
