<template>
  <td class="cui-grid-cell__time"
      @mouseenter="hoverItem(rowIndex, columnIndex)">
    <input type="checkbox"
           class="cui-checkbox"
           v-model="checked">
  </td>
</template>

<script>
export default {
  name: 'GridCellCheckbox',

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

  mounted () {
    const {checked} = this.item
    if (!checked) return
    this.checked = this.item.checked
  },

  computed: {
    cellData () {
      if (!this.item || !this.itemKey) return '~'
      return this.item[this.itemKey]
    }
  },

  data () {
    return {
      checked: false
    }
  },

  watch: {
    checked () {
      this.$emit('checked', {item: this.item, checked: this.checked})
    }
  },

  methods: {

    hoverItem (rowIndex, columnIndex) {this.$emit('hover', {rowIndex, columnIndex})}
  }
}
</script>
