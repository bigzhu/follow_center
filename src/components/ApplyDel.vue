<template>
  <table class="ui celled padded table">
    <thead>
      <tr><th class="single line">用户名</th>
        <th class="single line">类型</th>
        <th class="single line">次数</th>
        <th class="single line">原因</th>
        <th class="single line">操作</th>
    </tr></thead>
    <tbody>
      <tr v-for="apply_del in apply_dels">
        <td>
          <router-link :to="{ name: 'God', params: { god_name: apply_del.god_name }}">
            {{apply_del.god_name}}
          </router-link>
        </td>
        <td>
          <button class="ui {{apply_del.type}} button">
            <i class="{{apply_del.type}} icon"></i>
            {{apply_del.type}}
          </button>
        </td>
        <td>
          {{apply_del.count}}
        </td>
        <td>
          {{apply_del.reason}}
        </td>
        <td>
          <button @click="approve(apply_del)" class="ui compact icon button">
            <i class="delete icon"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import {queryApplyDel, approveApplyDel} from '../store/actions'
  export default {
    vuex: {
      actions: {
        queryApplyDel,
        approveApplyDel
      }
    },
    props: [],
    components: {
    },
    data: function () {
      return {
        apply_dels: []
      }
    },
    mounted () {
      this.getApplyDel()
    },
    methods: {
      getApplyDel: function () {
        window.NProgress.start()
        this.queryApplyDel(this.call_back)
      },
      call_back: function (apply_dels) {
        this.apply_dels = apply_dels
        window.NProgress.done()
      },
      approve: function (apply_del) {
        window.NProgress.start()
        this.approveApplyDel(apply_del, this.getApplyDel)
      }
    }
  }
</script>
