<template>
  <div class="found" title="点击回到首页" @click="back">
    404
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.push({path: '/'})
    }
  }
}
</script>


<style scoped>
.found {
  position: relative;
  font-size: 400px;
  text-align: center;
  color: #eee;
}
</style>
