<template>
  <div class="radio-button">
    <input
      :id="_uid"
      :value="label"
      :class="{'radio-active': picked === label}"
      v-model="picked"
      type="radio"
      class="radio-input"
    >
    <label
      :for="_uid"
      :class="{'radio-text': picked === label}"
      class="radio-label"
    >
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
      default: ''
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
  position: relative;
}
.radio-input::after {
  border-radius: 50%;
  content: '';
  width: 4px;
  height: 4px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
  opacity: 0;
  transition: opacity 0.3s;
}
.radio-active {
  border-color: #409eff;
  background: #409eff;
}
.radio-active::after {
  opacity: 1;
}
.radio-label {
  padding-left: 8px;
  cursor: pointer;
  vertical-align: middle;
  user-select: none;
}
.radio-text {
  color: #409eff;
}
</style>
