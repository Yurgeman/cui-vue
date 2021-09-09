<template>
  <div class="cui-frame-single-menu"
       ref="menu">

    <a class="cui-frame-single-menu__item"
       v-for="item in menu"
       :key="item.id">

      <span class="cui-frame-single-menu__icon"
            v-html="item.icon"></span>
      <span class="cui-frame-single-menu__label"
            v-text="item.name"></span>

    </a>

  </div>
</template>

<script>
export default {
  name: 'SingleMenu',

  mounted () {
    this.$nextTick(() => {
      this.$emit('width', this.width)
    })
  },

  beforeDestroy () {
    this.$emit('width', 0)
  },

  props: {
    menu: {
      type: Array
    }
  },

  data () {
    return {
      width: 300
    }
  }
}
</script>

<style lang="sass">
</style>
