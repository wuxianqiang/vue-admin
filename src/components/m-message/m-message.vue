<template>
  <transition-group name="move">
      <div
        v-for="(item, index) in messages"
        :key="index"
        class="message"
        :class="type">
        {{ item.message }}
      </div>
  </transition-group>
</template>

<script>
export default {
  data () {
    return {
      messages: [],
      type: ''
    }
  },
  mounted() {
    this.id = 0
  },
  methods: {
    add (options, type) {
      this.type = type
      let id = this.id++ // 每个弹层的ID
      let layer = {
        duration: 3000,
        ...options,
        id
      }
      this.messages.push(layer)
      // 到达指定的时候删除
      layer.timer = setTimeout(() => {
        this.remove(layer)
      }, layer.duration);
    },
    remove (layer) {
      clearTimeout(layer.timer)
      this.messages = this.messages.filter(message => message.id !== layer.id)
    }
  },
}
</script>

<style scoped lang="less">
.move-enter-active, .move-leave-active {
  transition: all 0.3s;
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.move-enter, .move-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

.message {
  position: absolute;
  top: 48px;
  left: 50%;
  min-width: 300px;
  margin-left: -150px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
}

.success {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}
.error {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
</style>
