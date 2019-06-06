<template>
  <div class="checkbox-button">
    <input
      :id="_uid"
      :value="label"
      :class="{'checkbox-active': picked}"
      v-model="picked"
      type="checkbox"
      class="checkbox-input"
    >
    <label
      :for="_uid"
      :class="{'checkbox-text': picked}"
      class="checkbox-label"
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
      picked: false
    }
  },
  watch: {
    picked () {
      this.$parent.check(this._uid)
    }
  }
}
</script>

<style scoped>
.checkbox-button {
  display: inline-block;
  margin-right: 30px;
}
.checkbox-button:last-child {
  margin-right: 0;
}
.checkbox-input {
  appearance: none;
  outline: none;
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  vertical-align: middle;
  cursor: pointer;
}
.checkbox-input::after {
  position: absolute;
  left: 4px;
  top: 0;
  content: "";
  display: inline-block;
  width: 3px;
  height: 7px;
  transform: rotate(45deg);
  border-right: 1px solid #409eff;
  border-bottom: 1px solid #409eff;
  opacity: 0;
  transition: opacity 0.3s;
}
.checkbox-active {
  border-color: #409eff;
  background: #409eff;
  position: relative;
}
.checkbox-active::after {
  border-color: #fff;
  opacity: 1;
}
.checkbox-text {
  color: #409eff;
}
.checkbox-label {
  display: inline-block;
  padding-left: 10px;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
}
</style>
