<template>
  <div class="cui-frame-group-menu"
       ref="menu">

    <div class="cui-frame-group-menu-item"
         v-for="group in menu"
         :key="group.id">

      <div class="cui-frame-group-menu-item__name"
           v-text="group.name"></div>

      <div class="cui-frame-group-menu-item__nav"
           v-for="nav in group.items"
           :key="nav.id"
           v-text="nav.name">
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'CUiGroupMenu',

  mounted () {
    this.$nextTick(() => {
      this.getWidth()
    })
  },

  props: {
    menu: {
      type: Array
    }
  },

  watch: {
    menu: {
      deep: true,
      handler () { this.getWidth()}
    }
  },

  beforeDestroy () {
    this.$emit('width', 0)
  },

  data () {
    return {
      width: 0
    }
  },

  methods: {
    getWidth () {
      const menu = this.$refs.menu
      if (!menu) return
      this.width = 0
      this.$emit('width', this.width)
      this.width = menu.scrollWidth
      console.log('getWidth', this.width)
      this.$emit('width', this.width)
    }
  }
}
</script>
