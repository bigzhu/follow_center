<template>
  <div class="ui container">
    <div class="ui segment userset-bz">
    <a class="ui teal keppel right ribbon label">New</a>
      <div class="ui accordion">
        <p class="log-time"><i class="wait icon"></i>2016/10/01 12:28:32<!-- by<span>GTS System</span> --></p>
        <p class="changelog-title-bz">项目分类</p>
        <p class="changelog-description-bz">帮助你更快找到需要的项目</p>
        <div class="title active changelog-more">查看详细&gt;&gt;</div>
        <div class="content">
          <p class="transition invisible" style="display: block !important;">我们经常能收到「项目太多了，每次找项目都得看花眼」、「能不能隐藏和我无关的项目」等这类反馈。为了降低首页项目列表的检索难度，不久前我们强化了星标功能，让最常用的项目能够迅速被找到。现在，Tower 又多了一种组织项目的方式：项目分类。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: [],
    components: {
    },
    computed: {
    },
    data: function () {
      return {
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        $('.ui.accordion')
          .accordion()
        // code that assumes this.$el is in-document
      })
    },
    methods: {
    }
  }
</script>

<style>
  .log-time {
    color: #959595;
  }
  .changelog-title-bz {
    font-size: 1.25rem;
    font-weight: bolder;
    margin-bottom: 0.8rem;
  }
  .changelog-description-bz {

  }
  .ui.accordion .title.changelog-more {
    color: #54B98F;
  }
  .ui.keppel.ribbon.label {
    border-color: #1E8355!important;
    background-color: #54B98F!important;
    position: absolute;
    left: calc(100% + 0.1rem + 1.2em);
  }
  .ui.right.keppel.ribbon.label:after {
    
  }
</style>
