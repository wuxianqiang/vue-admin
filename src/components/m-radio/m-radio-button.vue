<template>
  <div
    class="radio-button"
    :class="{active: picked === label}"
  >
    <input
      :id="_uid"
      :value="label"
      v-model="picked"
      type="radio"
      class="radio-input">
    <label
      :for="_uid"
      class="radio-label">
      <slot>
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Number],
      defalut: ''
    }
  },
  data () {
    return {
      picked: ''
    }
  },

  watch: {
    picked (value) {
      if (value !== '') {
        this.$parent.check(this._uid)
      }
    }
  }
}
</script>

<style scoped>
.radio-input {
  appearance: none;
  outline: none;
}
.radio-label {
  cursor: pointer;
  min-height: 40px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.radio-button {
  border: 1px solid #dcdfe6;
  border-left: none;
  min-width: 69px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  transition: all 0.3s;
}
.radio-button:last-child {
  border: 1px solid #dcdfe6;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.radio-button:first-child {
  border: 1px solid #dcdfe6;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.active {
  background: #409eff;
  border-color: #409eff !important;
  color: #fff;
}
</style>
