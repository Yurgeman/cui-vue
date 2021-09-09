<template>
  <div class="cui-auth">

    <div class="cui-auth__header"
         :style="defaultBgr"
         v-if="header">
      <slot name="header"></slot>
    </div>

    <div class="cui-auth__body"
         :style="defaultBgr">
      <transition name="slide-right"
                  mode="out-in">
        <component v-if="activeView"
                   :fields="activeView.fields"
                   @update="update($event)"
                   @save="save($event)"
                   :legend="activeView.label"
                   :is="activeView.component" />
      </transition>
    </div>

    <div class="cui-auth__footer"
         :style="mutedBgr"
         v-if="activeView && viewsToggles">

      <a v-for="item in viewsToggles"
         :class="{'cui-auth__footer-link--active': item.action === activeView.action}"
         class="cui-auth__footer-link"
         @click="activeView = item"
         @save="save($event)"
         v-text="item.action"
         :key="item.action"></a>
    </div>

  </div>
</template>

<script>

import { hexToRgb }     from '../../utils/color-theme'
import AuthFormLogin    from './components/AuthFormLogin'
import AuthFormRegister from './components/AuthFormRegister'
import AuthFormRecover  from './components/AuthFormRecover'

export default {
  name: 'AuthForm',

  components: {
    AuthFormLogin, AuthFormRegister, AuthFormRecover
  },

  props: {

    color: { type: Object, default () {} },

    darkMode: { type: Boolean, default: false },

    header: {
      type:    Boolean,
      default: false
    },

    mode: {
      type: Array,
      default () {
        return [ 'auth', 'register', 'recover' ]
      }
    },

    data: {
      type: Object,
      default () {}
    },

    active: {
      type:    String,
      default: 'auth'
    }
  },

  mounted () {
    this.setActive()
  },

  data () {
    return {
      activeView: null,
      views:      {
        auth:     {
          label:     'Вход',
          action:    'вход',
          component: AuthFormLogin,
          fields:    []
        },
        register: {
          label:     'Регистрация',
          action:    'регистрация',
          component: AuthFormRegister,
          fields:    []
        },
        recover:  {
          label:     'Восстановление доступа',
          action:    'напомнить пароль',
          component: AuthFormRecover,
          fields:    []
        }
      }
    }
  },

  computed: {

    mutedBgr () {
      if ( !this.colors ) return
      const bgr = ( this.darkMode )
                  ? hexToRgb( this.colors[ 'color-primary-700' ] )
                  : hexToRgb( this.colors[ 'color-primary-200' ] )
      return ( bgr && bgr.length ) ? `background-color: rgba(${bgr[ 0 ]}, ${bgr[ 2 ]}, ${bgr[ 2 ]}, .9)` : null
    },
    //
    defaultBgr () {
      if ( !this.colors ) return
      const bgr = ( this.darkMode )
                  ? hexToRgb( this.colors[ 'color-primary-800' ] )
                  : hexToRgb( this.colors[ 'color-primary-100' ] )
      return ( bgr && bgr.length ) ? `background-color: rgba(${bgr[ 0 ]}, ${bgr[ 2 ]}, ${bgr[ 2 ]}, .9)` : null
    },

    viewsToggles () {
      let viewsToggles = []
      for ( let key in this.views ) {
        viewsToggles = ( this.mode.includes( key ) )
                       ? [ ...viewsToggles, this.views[ key ] ]
                       : viewsToggles
      }
      return viewsToggles
    }
  },

  methods: {

    update ( event ) {
      this.activeView.fields = event
    },

    save ( event ) {
      console.log( event )
      this.$router.push( { name: 'Grid' } ).catch( e => console.log( e ) )
    },

    setActive () {
      this.activeView = this.views[ this.active ]
      if ( this.data && this.data[ this.active ] ) {
        this.activeView.label = this.data[ this.active ]?.label
        this.activeView.fields = this.data[ this.active ]?.fields
      }
    }
  }
}
</script>
<style lang="sass">
@import "sass"
</style>
