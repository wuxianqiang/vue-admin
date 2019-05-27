<template>
  <div class="about">
    <button @click="handleClick">
      提示
    </button>
  </div>
</template>

<script>
// import { Message } from '@/components/m-message/message'

export default {
  data () {
    return {
      msg: '提示'
    }
  },
  methods: {
    handleClick () {
      // Message.success({message: '提示'})
      // this.$message({
      //   message: '提示'
      // })
      this.$message.success({message: '提示'})
    }
  }
}
</script>

<style lang="less" scoped>
.about-title {
  line-height: 36px;
  font-size: 18px;
}
.title {
  height: 500px;
  background: pink;
  width: 100%;
}
</style>
