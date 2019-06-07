<template>
  <div>
    <div @click="handleClick" class="title">
      <slot name="title">
        {{title}}
      </slot>
    </div>
    <div class="line">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="isShow" class="content">
        <slot></slot>
      </div>
    </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
    this.elTransition = '0.3s height ease-in-out'
  },
  methods: {
    handleClick () {
      this.$parent.changeState(this._uid)
    },
    beforeEnter (el) {
      // 动画之前
      el.style.height = 0
    },
    enter (el, done) {
      // 动画过程
      let height = el.scrollHeight
      el.style.transition = this.elTransition
      el.style.height = `${height}px`
      el.addEventListener('transitionend', () => {
        done()
      })
    },
    afterEnter () {
      // 动画之后
      // console.log('展开动画完成')
    },
    leave (el, done) {
      // 动画过程
      el.style.height = 0
      el.addEventListener('transitionend', () => {
        done()
      })
    },
    afterLeave () {
      // console.log('关闭动画完成')
    }
  }
}
</script>

<style scoped>
.content {
  overflow: hidden;
}
.title {
  cursor: pointer;
  line-height: 48px;
}
.line {
  border-bottom: 1px solid #000;
}
</style>
