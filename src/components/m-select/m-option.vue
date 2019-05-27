<template>
  <li
    @click="handleClick"
    :class="{active: isActive, hover: isHover}"
    class="item"
    @mouseover="handleMouse"
  >
    {{ label }}
  </li>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'lable'
    },
    value: {
      type: String,
      default: 'value'
    }
  },

  data () {
    return {
      isActive: false,
      isHover: false
    }
  },

  methods: {
    handleClick () {
      this.$parent.handleSelect(this.value, this.label, this._uid)
    },
    handleMouse () {
      this.$parent.handleHover(this._uid)
    }
  }
}
</script>

<style scoped>
.active {
  color: #409eff;
  font-weight: 700;
}
.item {
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 34px;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
}
.hover {
  background: #f5f7fa;
}
</style>
