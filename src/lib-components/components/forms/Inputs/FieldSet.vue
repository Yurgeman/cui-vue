<template>
  <fieldset class="cui-fieldset"
            v-if="newFields">

    <legend class="cui-fieldset__legend"
            v-text="legend"
            v-if="legend"></legend>

    <component class="cui-fieldset__fields"
               v-for="(field, index) in newFields"
               :key="index"
               :large="large"
               :inline="field.inline"
               :value="field.value"
               :label="field.label"
               :placeholder="field.placeholder"
               :disabled="field.disabled"
               :validate="field.validate"
               :type="field.type"
               :readOnly="field.readOnly"
               :required="field.required"
               @update="update(field.fieldName, $event)"
               :is="field.component" />

    <div class="cui-fieldset__fields">
      <button class="cui-button success fill"
              @click.prevent="save"
              v-text="submitLabel"></button>
    </div>
  </fieldset>
</template>

<script>
import InputText from './InputText'

export default {

  name: 'Fieldset',

  components: { InputText },

  props: {

    large: {
      type:    Boolean,
      default: false
    },

    submit: {
      type:    Boolean,
      default: false
    },

    submitLabel: {
      type:    String,
      default: 'Отправить'
    },

    legend: {
      type: String,
      default () {}
    },

    fields: {
      type: Array,
      default () {}
    }
  },

  mounted () {
    this.$nextTick( () => this.setInputsComponents() )
  },

  data () {
    return {
      inputComponents: {
        text: InputText
      },
      newFields:       []
    }
  },

  methods: {

    save () {this.$emit( 'save' )},

    update ( fieldName, value ) {
      if ( !this.newFields ) return
      const field = this.newFields.find( i => i.fieldName === fieldName )
      field.value = value
      this.$emit( 'updateFieldset', this.newFields )
    },

    setInputsComponents () {
      if ( !this.fields ) return
      this.fields.forEach( i => {
        const type = this.inputComponents[ i.type ]
        i.component = ( type ) ? type : this.inputComponents.text
        this.newFields = [ ...this.newFields, i ]
      } )
    }
  }

}
</script>
