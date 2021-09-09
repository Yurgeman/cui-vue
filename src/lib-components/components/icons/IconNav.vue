<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       fill-rule="evenodd"
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-miterlimit="1.5"
       clip-rule="evenodd"
       :width="size"
       :style="rotate"
       viewBox="0 0 50 32">
    <defs/>
    <path fill="none"
          stroke="currentColor"
          stroke-width="2"
          d="M7.5 24l-6-8 6-8"/>
    <path fill="none"
          stroke="currentColor"
          stroke-width="3"
          d="M19 16h29M19 4h29M19 28h29"/>
  </svg>
</template>

<script>
export default {
  name: 'IconNav',

  props: {

    left: {
      type:    Boolean,
      default: true
    },

    size: {
      type:    Number,
      default: 30
    }
  },

  computed: {
    rotate () {
      return (this.left) ? `` : `transform: rotate(180deg)`
    }
  }
}
</script>

<style lang="sass">
</style>
