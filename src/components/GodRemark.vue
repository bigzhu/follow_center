<template>
  <div>
    <div v-html="remark" v-show="!is_edit && remark" class="remark-bz"></div>
    <p v-show="is_edit" v-html="remark" @blur="save" contenteditable="true" class="remark-edit-content"></p>
    <button v-show="is_edit" @click="save" class="ui mini basic button save-remark-bz">保存</button>
    <a v-show="!is_edit" @click="edit" href="javascript:void(0)" class="remark-edit-bz">
      <i class="edit icon"></i>
    </a>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Vue from 'vue'
  export default {
    props: {
      remark: {
        required: true,
        twoWay: true
      },
      god_id: {
        required: true,
        type: Number
      }
    },
    components: {
    },
    data: function () {
      return {
        is_edit: false
      }
    },
    mounted () {
    },
    methods: {
      edit: function () {
        this.is_edit = true
        let _this = this
        Vue.nextTick(
          function () {
            $(_this.$el).find('.remark-edit-content').focus()
          }
        )
      },
      save: function () {
        this.remark = $(this.$el).find('.remark-edit-content').html()
        this.$store.dispatch('addRemark', {god_id: this.god_id, remark: this.remark})
        this.is_edit = false
      }
    }
  }
</script>

<style>
  .remark-bz {
    color: rgba(0, 0, 0, 0.5)
  }
  .remark-edit-bz {
    color: #757575;
    transition: visibility 0s, opacity 0.3s linear;
    opacity: 0;
  }
  .ui.segment:hover {
    .remark-edit-bz {
      visibility: visible;
      opacity: 1;
    }
  }
  .ui.button.save-remark-bz {
    border-radius: 0.06em;
  }
  @media (max-width : 767px) {
    .remark-edit-bz {
      visibility: visible;
      opacity: 1;
    }
  }
</style>
