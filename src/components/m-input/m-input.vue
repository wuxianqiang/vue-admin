<template>
  <div class="input-wrapper">
    <slot name="prefix">
      <span class="input-icon"></span>
    </slot>
    <input
      type="text"
      class="input"
      v-model="msg"
      @input="handleInput"
      :class="{'input-left': isPrefix, 'input-right': isSuffix}"
      v-bind="$attrs">
    <slot name="suffix">
      <span class="input-icon"></span>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    replace: {
      type: RegExp,
      default: ''
    }
  },
  
  data () {
    return {
      msg: '',
      isPrefix: false,
      isSuffix: false
    }
  },

  created () {
    this.msg = this.value
    let { prefix, suffix } = this.$slots
    if (prefix) {
      this.isPrefix = true
    }
    if (suffix) {
      this.isSuffix = true
    }
  },

  methods: {
    handleInput (e) {
      let reg = this.replace
      let value = e.target.value
      try {
        value = value.replace(reg, '')
      } catch (error) {
        console.log(error)
      }
      this.msg = value
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  display: inline-block;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  padding: 0 10px;
}
.input {
  outline: none;
  height: 40px;
  border: none;
}
.input-left {
  padding-left: 10px;
}
.input-right {
  padding-right: 10px;
}
</style>
