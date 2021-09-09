<template>
  <td class="cui-grid-cell__index"
      @mouseenter="hoverItem(rowIndex, columnIndex)">
    <span class="cui-grid-cell__label"
          v-text="cellData"></span>
  </td>
</template>

<script>
export default {
  name: 'GridCellIndex',

  props: {

    item: {
      type:    Object,
      default: null
    },

    itemKey: {
      type:    String,
      default: null
    },

    rowIndex: {
      type:    Number,
      default: null
    },

    columnIndex: {
      type:    Number,
      default: null
    }
  },

  computed: {
    cellData () {
      if (this.rowIndex < 0) return
      return this.rowIndex + 1
    }
  },

  methods: {

    hoverItem (rowIndex, columnIndex) {this.$emit('hover', {rowIndex, columnIndex})}
  }
}
</script>
