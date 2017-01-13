<template>
  <div class="ui container">
    <div class="ui segment userset-bz">
      <h4 class="title">{{ $t("UserSet.id") }}</h4>
      <div class="userimfor-bz">
        <div class="username-bz">
          <i :class="user_info.user_type + ' icon'"></i> 
          <span>{{user_info.user_name}}</span>
        </div>
          <a href="/login.html" class="ui button user-set-button-bz change-id-bz">{{ $t("UserSet.change_id") }}</a>
          <a href="/api_logout" class="ui button user-set-button-bz ">{{ $t("UserSet.logout") }}</a>
      </div>
      <h4 class="title">{{ $t("UserSet.anki_id") }}<div class="ui icon button help-btn-bz" data-tooltip="https://ankiweb.net" data-position="top center">
            ?
        </div>
      </h4>
      <div class="username-bz">
        <!-- <img src="../assets/anki.svg">
        <span>Sinow</span> -->
        <div class="ui form user-bz">
            <div class="inline fields user-anki-meassge-bz">
              <label>{{ $t("UserSet.username") }}</label>
              <div class="field">
                <input v-model="anki.user_name" type="text" placeholder="">
              </div>
            </div>
            <div class="inline fields user-anki-meassge-bz">
              <label>{{ $t("UserSet.password") }}</label>
              <div class="field">
                <input v-model="anki.password" type="password" placeholder="">
              </div>
            </div>
            <button @click="ankiLogin" class="ui button user-set-button-bz ankiset-button-bz">{{ $t("UserSet.set") }}</button>
            <!-- <a href="">{{ $t("UserSet.reset") }}&nbsp;&gt;</a> -->
        </div>
      </div>
      <h4 class="title">{{ $t("UserSet.block_sns") }}
        <div class="ui icon button help-btn-bz" :data-tooltip="$t('UserSet.blockreminder')" data-position="top center">
            ?
        </div>
      </h4>
      <div>
        <button class="ui button user-set-button-bz twitter"><i class="twitter icon"></i>Twitter</button>
        <button class="ui button user-set-button-bz tumblr"><i class="tumblr icon"></i>Tumblr</button>
        <button class="ui button user-set-button-bz facebook"><i class="facebook icon"></i>Facebook</button>
        <button class="ui button user-set-button-bz instagram"><i class="instagram icon"></i>Instagram</button>
        <button class="ui button user-set-button-bz github"><i class="github icon"></i>Github</button>
        
      </div>
      <h4 class="title">{{ $t("UserSet.block_id") }}</h4>
      <div class="username-bz">
        <span>{{ $t("UserSet.number") }}</span>&nbsp;&nbsp;&nbsp;<span>{{block_count}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a @click="$router.push({name:'GodBlocked'})" href="javascript:;"><i class="low vision icon"></i>{{ $t("UserSet.block_manage") }}</a></span>
      </div>
    </div>
    <footer>
      <div class="footer-content">
        <a href="/about.html">{{ $t("RightInfo.about") }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="http://bigzhu.lorstone.com">{{ $t("RightInfo.blog") }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/changelog.html">{{ $t("RightInfo.changelog") }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/changelog.html">{{ $t("RightInfo.app") }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{ $t("RightInfo.register") }}：{{registered_count}}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        © 2016 Follow Center
      </div>
    </footer>
  </div>
</template>
<script>
  export default {
    props: [],
    components: {
    },
    computed: {
      user_info: function () {
        return this.$store.state.p.user_info
      },
      anki: function () {
        return this.$store.state.anki
      },
      registered_count () {
        return this.$store.state.registered_count
      }
    },
    data: function () {
      return {
        block_count: 0
      }
    },
    mounted: function () {
      let self = this

      this.$store.dispatch('getRegisteredCount')
      if (this.anki.user_name == null) {
        this.$store.dispatch('getAnki')
      }
      this.$store.dispatch('getBlock', {count: true}).then(function (data) {
        console.log(data)
        self.block_count = data.count
      })
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      ankiLogin: function () {
        if (this.anki.user_name === null || this.anki.user_name === '') {
          throw new Error('请填入anki用户名')
        }
        if (this.anki.password === null || this.anki.password === '') {
          throw new Error('请填入anki密码')
        }
        this.$store.dispatch('loginAnki', this.anki)
      }
    }
  }
</script>
<style>
  .ui.segment.userset-bz {
    border-radius: 0.06em;
    box-shadow: .5px 1px 1px 1px rgba(0,0,0,0.1);
    position: relative;
    border: none;
    padding: 1.5rem;
  }
  .ui.segment.userset-bz h4.title {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #ededed;
    margin-top: 5rem;
    font-weight: bolder;
  }
  .ui.segment.userset-bz h4.title:first-child {
    margin-top: 0;
  }
  .userimfor-bz {
    color: #858585;
    display: inline;
  }
  .username-bz {
    display: inline;
    font-size: 1.1rem;
  }
  .ui.button.change-id-bz {
    margin-left: 2rem;
    margin-right: 1rem; 
  }
  .ui.form.user-bz .inline.fields>label {
    color: #858585;
    width: 5%;
    font-size: normal;
    font-weight: normal;
  }
  .ui.form.user-bz .inline.fields .field>input {
    border-radius: 0.06rem;
  }
  .ui.icon.button.help-btn-bz {
    padding: 0.2rem;
    background: #B3B8C1;
    border-radius: 50%;
    width: 1.2rem;
    height: 1.2rem;
    font-size: 1rem;
    margin-left: 1rem;
    color: #fff;
    font-family: "Times New Roman"
  }
  .ui.button.user-set-button-bz.ankiset-button-bz {
    width: 17.5rem;
  }
  .ui.button.user-set-button-bz {
    border-radius: 0.06rem;
    border: 1px solid #858585;
    padding: .7rem 1.5rem;
    color: #858585;
    background-color: transparent;
  }
  .ui.button.user-set-button-bz.twitter{
    background-color: #55ACEE;
    color: #FFFFFF;
    border-color: #55ACEE;
  }
  .ui.button.user-set-button-bz.tumblr {
    background-color: #3d698e;
    border-color: #3d698e;
    color: #FFFFFF;
  }
  .ui.button.user-set-button-bz.instagram {
    background-color: #DE326C;
    color: #FFFFFF;
    border-color: #DE326C;
  }
  .ui.button.user-set-button-bz.github {
    background-color: #333333;
    color: #FFFFFF;
    border-color: #333333;
  }
  .ui.button.user-set-button-bz.facebook {
    background-color: #324E88;
    color: #FFFFFF;
    border-color: #324E88;
  }
  .ui.button.user-set-button-bz.twitter:hover {
    background-color: #4392CD;
  }
  .ui.button.user-set-button-bz.tumblr:hover {
    background-color: #2C5272;
  }
  .ui.button.user-set-button-bz.instagram:hover {
    background-color: #C4275C;
  }
  .ui.button.user-set-button-bz.github:hover {
    background-color: #222222;
  }
  .ui.button.user-set-button-bz.facebook:hover {
    background-color: #233C72;
  }
  @media (max-width : 767px) {
    .ui.form.user-bz input {
      width: 100%;
    }
    .username-bz {
      width: 100%;
    }
    .ui.button.user-set-button-bz.ankiset-button-bz {
      width: 100%;
    }
    .ui.button.user-set-button-bz {
      width: 100%;
      display: inline-block;
      margin-bottom: 0.5rem;
    }
    .ui.form.user-bz .inline.fields>label {
      width: 22%;
      margin-right: 0;
    }
    .ui.form.user-bz .inline.fields .field {
      width: 78%;
      padding: 0;
    }
    .ui.form.user-bz .inline.fields .field input {
      width: 100%;
    }
    .ui.button.change-id-bz {
      margin: 1rem 0;
    }
    .user-anki-meassge-bz {
      margin-bottom: 1rem
    }
  }

</style>
