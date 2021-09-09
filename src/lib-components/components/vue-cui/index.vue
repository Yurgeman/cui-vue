<template>
  <div class="cui-frame"
       ref="main">


    <!--BODY-->
    <div class="cui-frame-body">
      <slot name="body"></slot>

      <transition name="menu"
                  appear>

        <div class="cui-frame-body-sidebar"
             :style="{width: sideMenuWidth}"
             v-if="sidebarBodyShow">

          <div class="cui-frame-body-sidebar__header">
            <a class="cui-frame-body-sidebar__close"
               @click="sidebarBodyShow = false">
              <CUiIconNav :size="20" />
            </a>

            <CUiSearch />
          </div>

          <div class="cui-frame-body-sidebar__content">
            <slot name="bodySidebar"></slot>
          </div>

        </div>
      </transition>

    </div>

    <!--SIDEBAR-->
    <div class="cui-frame-sidebar"
         :class="{closed: sidebarClosed}">

      <!--SidebarTop-->
      <div class="cui-frame-sidebar__top">

        <a class="cui-frame-sidebar__logo"
           :style="{backgroundImage: `url(${logoImage})`}">
        </a>

        <a class="cui-frame-sidebar__close"
           v-if="!sidebarClosed"
           @click.prevent="toggleSidebar">
          <CUiIconNav :size="24" />
        </a>
      </div>

      <!--SidebarNav-->
      <div class="cui-frame-sidebar__middle">
        <div class="cui-frame-sidebar__nav"
             v-if="sidebarNav">

          <div class="cui-frame-sidebar__nav-item"
               v-for="item in sidebarNav"
               :class="{active: sidebarNavActive === item}"
               @click="sideMenuClick(item)"
               :key="item.id">

            <span class="cui-frame-sidebar__nav-icon"
                  v-html="item.svg"></span>

            <transition name="fade">
              <span class="cui-frame-sidebar__nav-name"
                    v-if="!sidebarClosed"
                    v-text="item.name"></span>
            </transition>
          </div>

        </div>
      </div>

      <!--SidebarBottom-->
      <div class="cui-frame-sidebar__bottom"
           v-if="sidebarBottom">
        <slot name="bottom"></slot>
      </div>

    </div>

    <!--HEADER-->
    <div class="cui-frame-header">

      <div class="cui-frame-header__toggle"
           v-if="sidebarClosed"
           @click="toggleSidebar">
        <CUiIconNav :size="24"
                    :left="false" />
      </div>

      <div class="cui-frame-header__left">
        <slot name="headerLeft"></slot>
      </div>

      <div class="cui-frame-header__middle">
        <slot name="headerMiddle"></slot>
      </div>

      <div class="cui-frame-header__right">
        <slot name="headerRight"></slot>
      </div>

    </div>

  </div>
</template>

<script>
import CUiIconNav from '../icons/IconNav'
import CUiSearch  from '../forms/Search'

export default {
  name: 'VueCUi',

  components: {
    CUiSearch,
    CUiIconNav
  },

  mounted () {},

  props: {

    sidebarNavActive: {
      type: [ String, Number, Object ]
    },

    sidebarNav: {
      type: Array
    },

    sidebarWidth: {
      type: Number
    },

    sidebarBottom: {
      type:    Boolean,
      default: false
    },

    logo: {
      type:    String,
      default: 'img/logo.svg'
    },

    logoSmall: {
      type:    String,
      default: 'img/logo-small.svg'
    }
  },

  data () {

    return {
      sidebarClosed:   true,
      sidebarBodyShow: false
    }
  },

  computed: {

    sideMenuWidth () {
      return ( this.sidebarWidth )
             ? `${this.sidebarWidth}px`
             : `calc(240px + 240px + var(--cui-margin) + var(--cui-margin) + var(--cui-margin-small))`
    },

    logoImage () {return ( this.sidebarClosed ) ? this.logoSmall : this.logo}
  },

  methods: {

    sideMenuClick ( item ) {
      this.sidebarBodyShow = false
      this.$emit( 'sideMenuClick', null )
      setTimeout( () => {
        this.sidebarBodyShow = !!( item.data )
        if ( this.sidebarNavActive === item ) {
          this.sidebarBodyShow = false
        }
        this.$emit( 'sideMenuClick', item )
      }, 10 )
    },

    toggleSidebar () {this.sidebarClosed = !this.sidebarClosed}
  }

}
</script>
