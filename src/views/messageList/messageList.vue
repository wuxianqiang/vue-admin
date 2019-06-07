<template>
  <div>
    <div class="title">成功提示</div>
    <m-button type="success" @click="handleSuccess">点击提示</m-button>
    <div class="title">错误提示</div>
    <m-button type="danger" @click="handleWarning">点击提示</m-button>
  </div>
</template>

<script>
import MButton from '@/components/m-button/m-button'

export default {
  components: {
    MButton
  },
  methods: {
    handleSuccess () {
      this.$message.success({
        message: '成功提示！'
      })
    },
    handleWarning () {
      this.$message.error({
        message: '错误提示！'
      })
    }
  }
}
</script>

<style scoped>
.title {
  margin: 20px 0;
}
</style>
