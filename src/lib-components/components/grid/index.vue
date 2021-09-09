<template>
  <div class="cui-grid-outer">

    <table v-if="bodyItems"
           class="cui-grid"
           :style="gridStyles"
           :class="gridClasses">

      <!--caption-->
      <caption class="cui-grid__caption"
               :style="gridCaptionsStyle"
               v-if="showCaption"
               v-text="caption">
      </caption>

      <!--Header-->
      <thead v-if="headerItems">
      <tr>
        <td v-for="(item, index) in headerItems"
            class="cui-grid-header"
            :key="item.key"
            :ref="`header-cell-${index}`"
            :class="{
               'cui-grid-header--resizable': item.resizable
            }">

          <span class="cui-grid-header__side"></span>
          <span class="cui-grid-header__label"
                :class="{
                  'cui-grid-header__label--hover': hover.column === index,
                }"
                v-text="headerItemLabel(item)"></span>

          <span class="cui-grid-header__resize"
                :ref="`header-resize-${index}`"
                @mousedown="resizeClick(item, index)"

                v-if="item.resizable"></span>

          <!--@mousedown="resizeMousedown"-->
          <!--@mousemove="resizeMousemove"-->
          <!--@mouseup="resizeMouseup"-->
        </td>
      </tr>
      </thead>

      <!--Footer-->
      <tfoot v-if="footerItems">
      <tr>
        <td class="cui-grid-footer">tfoot</td>
      </tr>
      </tfoot>

      <!--Body-->
      <tbody v-if="bodyItems && headerItems">

      <tr v-for="(row, rowIndex) in bodyItems"
          :key="row.id">

        <component v-for="(column, columnIndex) in headerItems"
                   class="cui-grid-cell"
                   :class="{
                      'cui-grid-cell--hover': hover.row === rowIndex,
                      'cui-grid-cell--checked': row.checked
                    }"
                   :key="column.key"
                   :item="row"
                   :row-index="rowIndex"
                   :column-index="columnIndex"
                   @hover="hoverItem($event)"
                   @checked="checkItem($event)"
                   :item-key="column.key"
                   :is="getCellComponent(column.type, row)" />
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import { GridComponents } from '../grid/utils'
import { clone }          from '../../utils/helpers'

export default {
  name: 'CUiGrid',

  props: {

    caption: {
      type:    String,
      default: null
    },

    showCaption: {
      type:    Boolean,
      default: true
    },

    header: {
      type: Object,
      default () {}
    },

    horizontalGap: {
      type:    Boolean,
      default: true
    },

    footer: {
      type: Array,
      default () {}
    },

    body: {
      type: Array,
      default () {}
    },

    actions: {
      type: Array,
      default () {}
    },

    filters: {
      type: Array,
      default () {}
    }
  },

  data () {
    return {
      checked:    [],
      cellsWidth: '',
      gridStyles: '',

      headerItems: null,
      bodyItems:   null,

      hover: {
        row:    null,
        column: null
      },

      resize: {
        handler:     null,
        cell:        null,
        index:       null,
        start:       0,
        position:    0,
        widthBefore: 0,
        width:       0
      }
    }
  },

  watch: {
    listId () {
      this.setHeader()
      this.setBody()
    }
  },

  computed: {

    listId () {return this.header?.id},

    checkedRows () {
      if ( !this.bodyItems ) return
      return this.bodyItems.filter( i => i.checked )
    },

    checkedRowsCount () {
      if ( !this.checkedRows ) return 0
      return this.checkedRows.length
    },

    footerItems () {
      if ( !this.footer || !this.footer.length ) return
      return this.footer
    },

    gridClasses () {
      let gridClasses = []
      if ( this.horizontalGap ) gridClasses = [ ...gridClasses, 'cui-grid--h-gap' ]
      return gridClasses
    },

    gridCaptionsStyle () {
      if ( !this.cellsWidth ) return
      return { gridColumn: `1 / ${this.cellsWidth.length + 1}` }
    }

  },

  methods: {

    resetResize () {
      this.resize = {
        handler:     null,
        cell:        null,
        index:       null,
        start:       0,
        position:    0,
        widthBefore: 0,
        width:       0
      }
    },

    resizeClick ( item, index ) {
      this.resetResize()
      if ( !index ) return

      this.resize.handler = ( this.$refs[ `header-resize-${index}` ] ) ? this.$refs[ `header-resize-${index}` ][ 0 ] : null
      this.resize.cell = ( this.$refs[ `header-cell-${index}` ] ) ? this.$refs[ `header-cell-${index}` ][ 0 ] : null

      if ( !this.resize.handler ) return
      if ( !this.resize.cell ) return

      this.resize.index = index
      this.resize.widthBefore = this.resize.cell.offsetWidth

      this.resize.handler.addEventListener( 'mousedown', ( e ) => {
        if ( e.offsetX < 10 ) {
          this.resize.start = e.x
          document.addEventListener( 'mousemove', this.resizeCell, false )
        }
      }, false )

      document.addEventListener( 'mouseup', () => {
        document.removeEventListener( 'mousemove', this.resizeCell, false )
        this.resetResize()
      }, false )
    },

    resizeCell ( e ) {
      const minWidth = this.header.resizeMinWidth
      const maxWidth = this.header.resizeMaxWidth
      this.resize.position = e.x
      const dx = this.resize.position - this.resize.start
      const width = dx + this.resize.widthBefore
      if ( width > minWidth && width < maxWidth ) {
        this.resize.width = width
        this.cellsWidth[ this.resize.index ] = `${width}px`
        this.setGridStyles()
      }
      console.log( width, minWidth, maxWidth )
      //this.resize.panel.style.width = (parseInt(getComputedStyle(this.resize.panel, '').width) + dx) + 'px'
    },

    setBody () {
      if ( !this.body || !this.body.length ) return
      const body = clone( this.body )
      body.forEach( i => i.checked = false )
      if ( process.env.NODE_ENV === 'development' ) {body.length = 100}
      this.bodyItems = body
    },

    setHeader () {
      if ( !this.header || !this.header.items || !this.header.items.length ) return
      let base = clone( this.header.items )

      if ( this.header.index ) {
        const index = {
          label:     '№',
          key:       'rowIndex',
          width:     'min-content',
          showLabel: true,
          items:     null,
          type:      'index'
        }
        base = [ index, ...base ]
      }
      if ( this.header.massEdit ) {
        const massEdit = {
          label:     'Выделить',
          key:       'selectItem',
          width:     'min-content',
          showLabel: false,
          items:     null,
          type:      'checkbox'
        }
        base = [ massEdit, ...base ]
      }
      this.headerItems = base
      if ( !base ) return
      this.cellsWidth = this.headerItems.map( i => ( i.width ) ? i.width : '1fr' )
      this.setGridStyles()

    },

    setGridStyles () {
      if ( !this.cellsWidth ) return
      const str = this.cellsWidth.join( ' ' )
      this.gridStyles = { gridTemplateColumns: str }
    },

    checkItem ( ev ) {
      const item = this.bodyItems.find( i => i.docId === ev.item.docId )
      item.checked = ev.checked
    },

    headerItemLabel ( item ) {return ( item.showLabel ) ? item.label : ''},

    hoverItem ( data ) {
      this.hover.row = data.rowIndex
      this.hover.column = data.columnIndex
    },

    getCellComponent ( type ) {
      return ( !type || !GridComponents[ type ] )
             ? GridComponents[ 'text' ]
             : GridComponents[ type ]
    }
  }
}
</script>

<style lang="sass">
@import "sass"
</style>
