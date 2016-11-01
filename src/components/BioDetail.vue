<style lang="less">
</style>

<script>
  import GodItem from './GodItem'
  import store from '../store'
  import {queryGod} from '../store/actions'
  export default {
    store,
    vuex: {
      actions: {
        queryGod
      }
    },
    el: function () {
      return '#biography_id'
    },
    components: {
      GodItem
    },
    props: {
      god_name: {
        required: true,
        type: String
      }
    },
    mounted () {
      this.queryGod(this.god_name)
    },
    computed: {
      god_info () {
        let god_info = store.state.god_infos[this.god_name.toLowerCase()]
        if (god_info) {
          return god_info
        }
        return {id: 0, name: ''}
      }
    }
  }
</script>
