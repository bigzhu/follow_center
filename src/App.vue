<template>
  <div id="app">
    <router-view id="view"></router-view>
  </div>
</template>

<script>
  import store from './store'
  export default {
    store,
    components: {
    },
    watch: {
    },
    computed: {
    },
    mounted: function () {
    },
    methods: {
    }
  }
</script>

<style>
  @font-face {
    font-family: "GothamHTF-Book";
    src:url("./assets/fonts/GothamHTF-Book.eot");
    src:url("./assets/fonts/GothamHTF-Book.eot?#iefix") format("embedded-opentype"),
    url("./assets/fonts/GothamHTF-Book.ttf") format("truetype"),
    url("./assets/fonts/GothamHTF-Book.svg#GothamHTF-Book") format("svg"),
    url("./assets/fonts/GothamHTF-Book.woff") format("woff");
  }
  @font-face {
    font-family: "GothamHTF-Medium";
    src:url("./assets/fonts/GothamHTF-Medium.eot");
    src:url("./assets/fonts/GothamHTF-Medium.eot?#iefix") format("embedded-opentype"),
    url("./assets/fonts/GothamHTF-Medium.ttf") format("truetype"),
    url("./assets/fonts/GothamHTF-Medium.svg#GothamHTF-Medium") format("svg"),
    url("./assets/fonts/GothamHTF-Medium.woff") format("woff");
  }
  html {
    font-size: 12px!important;
  }
  @media (max-device-width: 320px) {
    html {
      font-size: 10px;
    }
  }
  html {
    width: 100%;
    height: 100%;
    min-height: 100%;
    letter-spacing: 0.025em;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  body.body-bz {
    height: 100%;
    min-height:100%;
    line-height: 1;
    font-family: "Microsoft YaHei";
    background-color: #F1F6FA;
  }
  body.body-bz.pushable>.pusher {
    background: #F1F6FA!important;
  }
</style>
