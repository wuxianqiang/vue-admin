<template>
  <div class="home">
    <div class="home-inner">
      <h1 class="home-title">Vue组件</h1>
      <p>使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。</p>
      <m-button
        type="primary"
        @click="handleClick"
        class="home-link">
        Github
      </m-button>
    </div>
    <div class="home-image"></div>
  </div>
</template>

<script>
import MButton from '@/components/m-button/m-button'

export default {
  components: {
    MButton
  },
  data () {
    return {
      time: new Date(),
      sex: 0,
      msg: 1
    }
  },
  methods: {
    handleClick () {
      location.href = 'https://github.com/wuxianqiang/vue-admin'
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row !important;
}
.home-inner {
  margin-top: 100px;
  padding: 0 50px;
  width: 40%;
  height: 50%;
  flex: 1;
}
.home-image {
  flex: 1;
  background: url("./home.png") no-repeat right bottom;
  background-size: cover;
}
.home-title {
  line-height: 80px;
}
.home-link {
  margin-top: 20px;
}
</style>
