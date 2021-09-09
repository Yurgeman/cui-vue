<template>

  <Fieldset :fields="fields"
            :submit="true"
            @save="save($event)"
            @updateFieldset="update($event)"
            submitLabel="Войти"
            :legend="legend" />

</template>

<script>
import Fieldset from '../../forms/Inputs/FieldSet'

export default {
  name:       'AuthFormLogin',
  components: { Fieldset },

  props: {

    fields: {
      type: Array,
      default () {}
    },

    legend: {
      type: String,
      default () {}
    }
  },

  methods: {
    save () {this.$emit( 'save' )},
    update ( event ) {
      this.$emit( 'updateAuthFormLogin', event )
    }
  }
}
</script>
