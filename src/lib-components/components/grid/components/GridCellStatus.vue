<template>
  <td class="cui-grid-cell__status"
      @mouseenter="hoverItem(rowIndex, columnIndex)">
    <span class="cui-grid-cell__status-indicator"
          :style="statusVar"></span>
    <span class="cui-grid-cell__status-label"
          v-text="cellData.label"></span>
  </td>
</template>

<script>
export default {
  name: 'GridCellStatus',

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

    statusVar () {
      if (!this.cellData) return
      return {
        backgroundColor: `var(--cui-color-${this.cellData.color})`
      }
    },

    cellData () {
      if (!this.item || !this.itemKey) return '~'
      return this.item[this.itemKey]
    }
  },

  methods: {

    hoverItem (rowIndex, columnIndex) {this.$emit('hover', {rowIndex, columnIndex})}
  }
}
</script>
