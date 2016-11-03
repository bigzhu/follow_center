<template>
  <div class="ui container">
    <!-- ================分割=================== -->
    <div class="ui center aligned header">
      <h3>人物·传记</h3>
      <p class="sub header">他们是大人物，他们是小人物，他们在世界各地，演绎着比电影还精彩的人生。</p>
    </div>
    <!-- ================分割=================== -->
    <div class="card-bz-group">
      <div v-for="bio in new_two" class="card-bz">
        <router-link :to="{ name: 'BioDetail', params: { god_name: bio.key }}">
          <div class="border-shadow">
            <div class="bio" :style="'background-image:url(' + bio.title_img + ');'">  
            </div>
            <div class="mask">
              <div class="bio-content">
                <div class="content-title">{{bio.title}}</div>
                <div v-html="bio.summary" class="content-text"></div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <!-- ================分割=================== -->
      <div class="ui center aligned header">
        <h3>我们的故事</h3>
        <p class="sub header">从follow.center上关注我们</p>
      </div>
      <!-- ================分割=================== -->
      <div v-for="bio in others" class="card-bz">
        <router-link :to="{ name: 'BioDetail', params: { god_name: bio.key }}">
          <div class="border-shadow">
            <div class="bio" :style="'background-image:url(' + bio.title_img + ');'">
            </div>
            <div class="mask">
              <div class="bio-content">
                <div class="content-title">{{bio.title}}</div>
                <div v-html="bio.summary" class="content-text"></div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: [],
    computed: {
      new_two: function () {
        return _.chunk(this.$store.state.p.rich_list, 2)[0]
      },
      others: function () {
        return _.chunk(this.$store.state.p.rich_list, 2)[1]
      }
    },
    data: function () {
      return {
      }
    },
    mounted: function () {
      this.$store.dispatch('getRichList')
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
    }
  }
</script>

<style>
  .card-bz {
    font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    color: rgba(0, 0, 0, 0.8);
    padding: 1rem;
    height: 24rem;
    width: 100%;
    cursor: pointer;
    position: relative;
  }
  .bio {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% auto;
    position: relative;
  }
  .border-shadow {
    border-radius: 0.06rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
    height: 100%;
    width: 100%;
  }
  .mask {
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 1;
    border-radius: 0.06em;
    position: absolute;
    width: 100%;
    height: 6rem;
    bottom: 0;
  }
  .bio-content {
    height: 100%;
    line-height: 1.7rem;
    overflow: hidden;
  }
  .content-title {
    font-size: 1.28rem;
    line-height: 1.2857em;
    margin-bottom: 0.5rem;
    font-weight: 700;
    padding: 0;
    overflow: hidden;
  }
  .content-text {
    position: relative;
    line-height: 1.7rem;
    overflow: hidden;
  }
  a .mask {
    color: rgba(0, 0, 0, 0.7);
  }
  .mask p {
    line-height: 1.7rem;
  }
  p .bio-content {
    margin: 0rem;
  }
  /* ===================================================*/

  /*=====================第一个card-bz=======================*/
  .card-bz:first-child .mask {
    background-color: #fff; 
    width: 40%;
    height: 100%;
    z-index: 1;
    position: static;
    float: left;
  }
  .card-bz:first-child .bio-content {
    padding: 5rem;
    height: 100%;
    position: relative;
  }
  .card-bz:first-child .content-text {
    height: 8rem;
  }
  .card-bz:first-child .bio {
    float: right;
    width: 60%;
    background-repeat: no-repeat;
    background-position: cover;
  }
  @media (max-width: 767px) {
    .card-bz:first-child .mask {
      background-color: rgba(0, 0, 0, 0.2);
      width: 100%;
      position: absolute;
    }
    .card-bz:first-child{
      height: 19rem;
    }
    .card-bz:first-child .border-shadow {
      position: relative;
    }
    .card-bz:first-child .bio-content {
      padding: 1.30rem;
    }
    .card-bz:first-child .content-text {
      color: rgba(255, 255, 255, 0.9);
      height: 2rem;
      position: absolute;
      bottom: 0.5rem;
    }
    .card-bz:first-child .bio {
      float: none;
      width: 100%;
      background-size: cover;
    }
    .card-bz:first-child .content-title {
      position: absolute;
      bottom: 2rem;
      color: rgba(255, 255, 255, 0.9);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  /*=====================第一个card-bz完=======================*/

  /*=====================第二个card-bz=========================*/
  .card-bz:nth-child(2) .mask {
    /* background-color: #fff; */
    width: 40%;
    height: 100%;
    z-index: 1;
    position: relative;
    float: right;
  }
  .card-bz:nth-child(2) .bio-content {
    padding: 5rem;
    height: 100%;
    position: relative;
  }
  .card-bz:nth-child(2) .content-text {
    height: 8rem;
  }
  .card-bz:nth-child(2) .bio {
    width: 60%;
    background-repeat: no-repeat;
    background-size: cover;
    float: left;
  }
  @media (max-width: 767px) {
    .card-bz:nth-child(2) .mask {
      background-color: rgba(0, 0, 0, 0.2);
      width: 100%;
      position: absolute;
    }
    .card-bz:nth-child(2){
      height: 19rem;
    }
    .card-bz:nth-child(2) .border-shadow {
      position: relative;
    }
    .card-bz:nth-child(2) .bio-content {
      padding: 1.30rem;
    }
    .card-bz:nth-child(2) .content-text {
      color: rgba(255, 255, 255, 0.9);
      height: 2rem;
      position: absolute;
      bottom: 0.5rem;
    }
    .card-bz:nth-child(2) .bio {
      float: none;
      width: 100%;
      background-size: cover;
    }
    .card-bz:nth-child(2) .content-title {
      position: absolute;
      bottom: 2rem;
      color: rgba(255, 255, 255, 0.9);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  /*=====================第二个card-bz完=========================*/

  /*=====================后面的小的card-bz========================*/
  .card-bz:nth-child(n+3) {
    width: 50%;
    height: 30rem;
    float: left;
  }
  .card-bz:nth-child(n+3) .mask {
    background-color: #fff; 
    z-index: 1;
    height: 25%;
    position: static;
  }
  .card-bz:nth-child(n+3) .bio {
    height: 75%;
    width: 100%;
  }
  .card-bz:nth-child(n+3) .bio-content {
    height: 100%;
    position: relative;
    padding: 1rem;
  }
  .card-bz:nth-child(n+3) .content-text {
    height: 3rem;
  }
  .card-bz:nth-child(n+3) .content-title {
    font-size: 1.1rem;
  }
  @media (max-width: 767px) {
    .card-bz:nth-child(n+3) {
      width: 100%;
      height: 25rem;   
    }
    .card-bz:nth-child(n+3) .content-title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .card-bz:nth-child(n+3).content-text {
      height: 1rem;
    }
    .card-bz:nth-child(n+3) .mask {
      height: 30%;
    }
    .card-bz:nth-child(n+3) .bio {
      height: 70%;
    }
  }
  /*=====================后面的card-bz完=======================*/
</style>
