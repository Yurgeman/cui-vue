<template>
  <td class="cui-grid-cell__phone"
      @mouseenter="hoverItem(rowIndex, columnIndex)">
    <a :href="`tel:+${item[this.itemKey]}`"
       class="cui-grid-cell__label"
       v-text="cellData"></a>
  </td>
</template>

<script>
import {phoneFormat} from '../../../utils/helpers'

export default {
  name: 'GridCellPhone',

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
      if (!this.item || !this.itemKey) return '~'
      return phoneFormat(this.item[this.itemKey])
    }
  },

  methods: {
    phoneFormat (num) {phoneFormat(num)},

    hoverItem (rowIndex, columnIndex) {this.$emit('hover', {rowIndex, columnIndex})}
  }
}
</script>
