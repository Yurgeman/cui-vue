<template>
  <td class="cui-grid-cell__date-time"
      @mouseenter="hoverItem(rowIndex, columnIndex)">
    <span class="cui-grid-cell__label"
          v-text="cellData"></span>
  </td>
</template>

<script>
import { DateTime } from '../../../utils/date'

export default {
  name: 'GridCellDateTime',

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
      if ( !this.item || !this.itemKey ) return '~'
      return DateTime( this.item[ this.itemKey ] )
    }
  },

  methods: {

    hoverItem ( rowIndex, columnIndex ) {this.$emit( 'hover', { rowIndex, columnIndex } )}
  }
}
</script>
