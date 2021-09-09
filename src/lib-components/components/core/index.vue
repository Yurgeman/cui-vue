<script>

import { SetCssVar } from '../../utils/color-theme'

export default {
  name: 'Core',

  mounted () {
    // Init Dark mode
    if ( window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ) ) {
      window.matchMedia( '(prefers-color-scheme: dark)' )
            .addEventListener( 'change', e => {
              const newColorScheme = e.matches
              this.changeDarkMode( newColorScheme )
            } )
      this.changeDarkMode( window.matchMedia( '(prefers-color-scheme: dark)' ).matches )
    }
    if ( this.color ) {
      this.setTheme( this.color )
    }
  },

  props: {
    color: { type: Object, default () {} }
  },

  data () {
    return {
      colors:   null,
      mainSize: { width: 0, height: 0, aspectRatio: 0 },
      darkMode: false
    }
  },

  methods: {

    /**
     * set Viewport Size
     * @param data
     */
    serSize ( data ) {
      if ( !data ) return
      const { w, h } = data
      if ( !w || !h ) return
      this.mainSize = {
        width:       w,
        height:      h,
        aspectRatio: +( h / w ).toFixed( 1 )
      }
      this.$emit( 'size', this.mainSize )
    },

    setTheme ( colors ) {
      this.colors = ( colors ) ? SetCssVar( colors ) : SetCssVar()
      this.$emit( 'colors', this.colors )
    },

    /**
     * set Dark / Light Mode
     * @param state
     */
    changeDarkMode ( state ) {
      this.darkMode = state
      this.$emit( 'darkMode', state )
    }
  },

  render () {return false}
}
</script>

<style lang="sass">
  @import "../../sass"
</style>
