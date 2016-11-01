<style lang="less">
  body {
    background-color: #F7F7F7;
  }
  .ui.middle.aligned.center.aligned.grid.login {
    height: 90%;
  }
  .ui.header+p.discription {
    font-size: 1em;
    color: rgba(0, 0, 0, 0.4);
    margin-top: 1.5em;
  }
  .ui.header.logo>img:only-child {
    margin: 0;
  }
  .image {
    margin-top: -100px;
  }
  .column {
    max-width: 450px;
  }
  .ui.header.logo>img {
    width: 15em;
    margin-bottom: -0.3em;
  }
  .ui.login {
    border-radius: 0.1em;
    margin-top: 1.5em;
    padding: 3em 0;
    border-color: #fff;
  }
  .ui.login p {
    font-size: 0.8em;
    margin-top: 0.8em;
    color: rgba(0, 0, 0, 0.4)
  }
  .ui.login p a {
    color: #2EA974;
  }
  .ui.login.twitter.button {
    border-radius: 4em;
  }
  .ui.button.oauth {
    border-radius: 4em;
    opacity: 0.8;
  }
  .ui.twitter.button {
    background-color: #2B7BB9
  }
  .ui.form.oauth-width-bz {
    width: 130%;
    max-width: none;
    margin-left: -4em;
  }
  .login-footer {
    font-size: 0.9em;
    padding: 0 auto;
  }
  .login-footer a {
    color: rgba(0, 0, 0, 0.4);
  }
  .ui.popup.phone-bz {
    border: none;
    border-radius: 0.06em;
    background: rgba(255, 255, 255, 0.74);
    box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.07),0 2px 10px 0 rgba(34, 36, 38, 0.09);
  }
  .ui.popup.phone-bz:before {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    box-shadow: none;
  }
  .ui.popup.phone-bz a{
    color: #54B98F;
  }
  @media (max-width : 800px) {
    .ui.form.oauth-width-bz {
      width: 100%;
      margin-left: 0;
      max-width: 100%;
    }
  }
</style>
<template>
  <div class="ui middle aligned center aligned grid login">
    <div class="column">
      <div class="ui header logo">
        <img src="../../static/assets/logo.png">
      </div>
      <p class="discription">发现更大更美好的世界</p>
      <!-- <p>猥琐的跟踪牛人/美女的一举一动</p> -->
      <form class="ui large form oauth-width-bz">
        <div class="ui login">
          <oauth2 :oauths="oauths" :url="url" :function_name="function_name"></oauth2>
          <!-- </br> -->
          <p>没有社交帐号? <a href="/#guest">随意逛逛</a></p>
        </div>
      </form>      
    </div>
  </div>
  <div class="ui middle aligned center aligned grid login-footer">
    <div class="column">
      <a href="/about.html">关于Follow Center</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="##" class="download-app">手机客户端下载</a>
    </div>
  </div>
  <div class="ui flowing popup top left transition visible animating scale out phone-bz">
    <div class="ui column divided center aligned grid">
      <div class="column">
        <a href="/static/follow_center.apk" target="blank"><img src="../../static/assets/andriod.svg">&nbsp;&nbsp;&nbsp;安卓手机端下载</a>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Oauth2 from 'bz-oauth2-button'
  export default {
    props: ['url', 'function_name'],
    components: {
      Oauth2
    },
    data () {
      return {
        oauths: [ 'github', 'twitter', 'facebook', 'qq' ]
      }
    },
    mounted () {
    },
    attached: function () {
      // var tool_tips_target = $(this.$el).find('.download-app')
      var tool_tips_target = $('.download-app')
      // var popup_content = $(this.$el).find('.popup')
      var popup_content = $('.popup')
      $(tool_tips_target).popup(
        {
          popup: $(popup_content),
          lastResort: true,
          // position: 'bottom left',
          hoverable: true,
          delay: {
            show: 100,
            hide: 500
          }
        }
      )
    }
  }
</script>
