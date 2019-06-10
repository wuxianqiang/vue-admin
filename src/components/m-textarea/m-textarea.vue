<template>
  <div class="textarea">
    <textarea
      ref="textarea"
      v-model="msg"
      v-bind="$attrs"
      @input="handleInput"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  watch: {
    value (newValue) {
      if (newValue !== this.msg) {
        this.$nextTick(() => {
          this.handleInput()
        })
      }
    }
  },
  methods: {
    handleInput() {
      this.$refs.textarea.style.height = ''
      const height = this.$refs.textarea.scrollHeight
      this.$refs.textarea.style.height = `${height + 2}px`
      this.$emit('input', this.msg)
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
textarea {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background: none;
  resize: none;
  overflow: hidden;
}
.textarea {
  border: 1px solid #e4e7ed;
  width: 100%;
  min-height: 50px;
  border-radius: 5px;
  padding: 15px;
  background: #fff;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
