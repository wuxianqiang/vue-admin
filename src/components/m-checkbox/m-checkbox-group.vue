<template>
  <div class="checkbox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: (() => ([]))
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (label) {
        this.$nextTick(() => {
          this.$children.forEach(item => {
            item.picked = label.includes(item.label)
          })
        })
      }
    }
  },
  methods: {
    check () {
      let list = []
      this.$children.forEach(item => {
        if (item.picked) {
          list.push(item.label)
        }
      })
      this.$emit('input', list)
    }
  }
}
</script>


<style scoped>
.checkbox {
  vertical-align: top;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
}
</style>
