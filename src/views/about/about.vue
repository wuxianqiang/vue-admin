<template>
  <div class="about">
    <div class="title">克隆项目代码</div>
    <m-copy></m-copy>
    <div class="title">GitHub中查看项目代码</div>
    <a href="https://github.com/wuxianqiang/vue-admin.git">地址</a>
  </div>
</template>

<script>
import MCopy from '@/components/m-copy/m-copy'

export default {
  components: {
    MCopy
  },
  data () {
    return {
      msg: '提示'
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
  margin: 20px 0;
}
</style>
