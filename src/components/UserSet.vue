<template>
  <div class="ui container">
    <div class="ui segment userset-bz">
      <h4 class="title">{{ $t("UserSet.id") }}</h4>
      <div class="username-bz">
        <i :class="user_info.user_type + ' icon'"></i> 
        <span>{{user_info.user_name}}</span>
        <a href="/login.html" class="ui button user-set-button-bz change-id-bz">{{ $t("UserSet.change_id") }}</a>
        <a href="/api_logout" class="ui button user-set-button-bz">{{ $t("UserSet.logout") }}</a>
      </div>
      <h4 class="title">{{ $t("UserSet.anki_id") }}</h4>
      <div class="username-bz">
        <!-- <img src="../assets/anki.svg">
        <span>Sinow</span> -->
        <div class="ui form user-bz">
          <div class="inline fields">
            <label>{{ $t("UserSet.username") }}</label>
            <div class="field">
              <input v-model="anki.user_name" type="text" placeholder="">
            </div>
            <label>{{ $t("UserSet.password") }}</label>
            <div class="field">
              <input v-model="anki.password" type="password" placeholder="">
            </div>
            <button @click="ankiLogin" class="ui button user-set-button-bz">{{ $t("UserSet.login") }}</button>
          </div>
        </div>

      </div>
      <h4 class="title">{{ $t("UserSet.block_sns") }}<div class="ui icon button help-btn-bz" data-tooltip="屏蔽之后就看不到此类社交网络的信息" data-position="top center">
          ?
      </div></h4>
        <div class="ui form block-sns-bz">
          <div class="inline fields">
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden">
                <label><i class="twitter icon"></i>Twitter</label>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden">
                <label><i class="tumblr icon"></i>Tumblr</label>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden">
                <label><i class="github icon"></i>Github</label>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden">
                <label><i class="instagram icon"></i>Instagram</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="title">{{ $t("UserSet.block_id") }}</h4>
      <div class="username-bz">
        <span>{{ $t("UserSet.number") }}</span>&nbsp;&nbsp;&nbsp;<span>{{block_count}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href=""><i class="low vision icon"></i>{{ $t("UserSet.block_manage") }}</a></span>
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
  .username-bz {
    color: #858585;
  }
  .ui.button.user-set-button-bz {
    border-radius: 0.06rem;
    border: 1px solid #858585;
    padding: .7rem 1.5rem;
    background-color: transparent;
  }
  .ui.button.change-id-bz {
    margin-left: 2rem;
    margin-right: 1rem; 
  }
  .ui.form.user-bz .inline.fields>label {
    color: #858585;
    font-size: normal;
    font-weight: normal;
  }
  .ui.form.user-bz .inline.fields .field>input {
    border-radius: 0.06rem;
  }
  .ui.form.block-sns-bz .ui.checkbox label {
    color: #858585;
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
</style>
