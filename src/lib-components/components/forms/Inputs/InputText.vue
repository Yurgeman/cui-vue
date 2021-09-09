<template>
  <label class="cui-field-input"
         :class="{
            'cui-field-input--inline': inline,
            'cui-field-input--large': large
         }">

    <span class="cui-field-input__label">
      <span v-text="label"
            v-if="label"></span>
      <span class="cui-field-input__label-required"
            v-if="required">*</span>
    </span>

    <input class="cui-field-input__field"
           :type="type"
           v-model="newValue"
           :class="{
             'cui-field-input__field--valid': valid
           }"
           :disabled="disabled"
           :readonly="readOnly"
           :placeholder="placeholder"
           @input="updateValue">
  </label>
</template>

<script>
export default {
  name: 'InputText',

  props: {

    label: {
      type: String,
      default () {}
    },

    value: {
      type:    String,
      default: ''
    },

    type: {
      type:    String,
      default: 'text'
    },

    placeholder: {
      type:    String,
      default: ''
    },

    large: {
      type:    Boolean,
      default: false
    },

    inline: {
      type:    Boolean,
      default: false
    },

    required: {
      type:    Boolean,
      default: false
    },

    readOnly: {
      type:    Boolean,
      default: false
    },

    disabled: {
      type:    Boolean,
      default: false
    },

    emitOnInput: {
      type:    Boolean,
      default: true
    },

    validate: {
      type:    RegExp,
      default: null
    }
  },

  watch: {
    value () {this.setValue()}
  },

  mounted () {this.setValue()},

  data () {
    return {
      newValue: ''
    }
  },

  computed: {
    valid () {
      if (!this.validate) return true
      return this.validate.test(this.newValue)
    }
  },

  methods: {

    setValue (value) {this.newValue = (value) ? value : this.value},

    updateValue () {
      this.$emit('update', this.newValue)
    }

  }
}
</script>
