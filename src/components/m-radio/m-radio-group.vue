<template>
  <div class="radio">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (label) {
        this.$nextTick(() => {
          this.$children.forEach(item => {
            if (item.label === label) {
              item.picked = item.label
            } else {
              item.picked = ''
            }
          })
        })
      }
    }
  },
  methods: {
    check (_uid) {
      this.$children.forEach(item => {
        if (item._uid === _uid) {
          item.picked = item.label
          this.$emit('input', item.label)
        } else {
          item.picked = ''
        }
      })
    }
  }
}
</script>


<style scoped>
.radio {
  vertical-align: top;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
}
</style>
