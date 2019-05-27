<template>
  <div class="radio-button">
    <input
      :id="_uid"
      :value="label"
      v-model="picked"
      type="radio"
      class="radio-input"
      :class="{active: picked === label}">
    <label
      :for="_uid"
      class="radio-label"
      :class="{text: picked === label}">
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
      type: [String, Number, Boolean],
      default: ''
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      picked: '',
      isRadio: true
    }
  },
  mounted () {
    if (this.value === this.label) {
      this.picked = this.value
    }
  },
  watch: {
    picked (value) {
      if (value !== '') {
        this.$emit('input', this.label)
        this.isRadio = false
        this.$parent.$children.forEach(item => {
          if (item.isRadio) {
            item.picked = ''
          }
        })
        this.isRadio = true
      }
    }
  }
}
</script>

<style scoped>
.radio-button {
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  margin-right: 30px;
}
.radio-button:last-child {
  margin-right: 0;
}
.radio-input {
  outline: none;
  appearance: none;
  border: 1px solid #dcdfe6;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  vertical-align: middle;
}
.active {
  border-color: #409eff;
  background: #409eff;
  position: relative;
}
.active::after {
  border-radius: 50%;
  content: '';
  width: 4px;
  height: 4px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0)
}
.radio-label {
  padding-left: 8px;
  cursor: pointer;
  vertical-align: middle;
}
.text {
  color: #409eff;
}
</style>
