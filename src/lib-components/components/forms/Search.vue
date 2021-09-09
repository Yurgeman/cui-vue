<template>
  <label class="cui-input-search">

    <!--<IconSearch class="cui-input-search__icon"-->
    <!--            width="16"/>-->

    <input autofocus
           @input="search"
           class="cui-input-search__field"
           v-model="request"
           placeholder="поиск">

    <!--<IconClose role="button"-->
    <!--           @click="clear"-->
    <!--           class="cui-input-search__close"-->
    <!--           v-if="close"-->
    <!--           width="10"/>-->
  </label>
</template>

<script>
export default {
  name: 'Search',

  components: {
    // IconSearch: () => import(/* webpackChunkName: "IconSearch" */ '../../assets/svg/search.svg?inline'),
    // IconClose:  () => import(/* webpackChunkName: "IconClose" */ '../../assets/svg/close.svg?inline')
  },

  data () {
    return {
      request: ''
    }
  },

  computed: {
    close () {
      return !!this.request.length
    }
  },

  methods: {

    clear () {this.request = ''},

    search () {this.$emit('request', this.request)}
  }
}
</script>
