<template>
  <div class="select-wrapper" v-click-outside>
    <input type="text"
      :value="label"
      readonly
      class="input"
      ref="hook"
    >
    <transition :name="animate">
      <div v-show="isVisiable" :class="top?'select-top':'select-bottom'">
        <div :class="top?'select-up':'select-down'"></div>
        <ul class="select-inner">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  directives: {
    clickOutside: {
      bind (el, bindings, vnode) {
        let handler = e => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisiable) {
              vnode.context.focus()
            } else {
              vnode.context.blur()
            }
          } else {
            if (vnode.context.isVisiable) {
              vnode.context.blur()
            }
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind (el) {
        document.removeEventListener('click', el.handler)
      }
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isVisiable: false,
      label: '',
      top: false,
      animate: 'el-zoom-in-top'
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.$children.forEach(item => {
        if (item.value === this.value) {
          this.label = item.label
        }
      })
    })
  },

  watch: {
    isVisiable (value) {
      if (value) {
        setTimeout(() => {
          this.$children.forEach(item => {
            if (item.label === this.label) {
              item.isActive = true
              item.isHover = true
            } else {
              item.isActive = false
              item.isHover = false
            }
          })
        }, 20);
      }
    }
  },

  methods: {
    handleSelect (value, label, _uid) {
      this.label = label
      this.$emit('input', value)
      this.$children.forEach(item => item.isActive = item._uid === _uid)
    },

    handleHover (_uid) {
      this.$children.forEach(item => item.isHover = item._uid === _uid)
    },

    focus () {
      // 自动处理选择框的方向
      let height = window.innerHeight - this.$refs.hook.getBoundingClientRect().bottom
      let offsetHeight = this.$children.length * 34 + 30
      if (height < offsetHeight) {
        this.top = true
        this.animate = 'el-zoom-in-bottom'
      } else {
        this.top = false
        this.animate = 'el-zoom-in-top'
      }
      this.isVisiable = true
    },

    blur () {
      this.isVisiable = false
    },

    handleClick () {
      this.isVisiable = !this.isVisiable
    }
  }
}
</script>

<style scoped>
.input {
  outline: none;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  padding: 0 15px;
}
.select-bottom {
  position: absolute;
  z-index: 88;
  left: 0;
  top: 120%;
  display: inline-block;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: #fff;
  max-height: 260px;
  min-width: 100%;
}
.select-top {
  bottom: 120%;
  position: absolute;
  z-index: 88;
  left: 0;
  display: inline-block;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: #fff;
  max-height: 260px;
  min-width: 100%;
}
.select-wrapper {
  display: inline-block;
  position: relative;
}
.select-inner {
  position: relative;
  max-height: 260px;
  overflow-y: auto;
  z-index: 88;
  padding: 6px 0;
  box-sizing: border-box;
  background: #fff;
  border-radius: 4px;
}
.select-container {
  display: block;
  width: 100%;
}
.select-up {
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  position: absolute;
  left: 28px;
  bottom: -4px;
  background: #fff;
  border: 1px solid #e4e7ed;
}

.select-down {
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  position: absolute;
  left: 28px;
  top: -4px;
  background: #fff;
  border: 1px solid #e4e7ed;
}


.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}
.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}

.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center bottom;
}
.el-zoom-in-bottom-enter,
.el-zoom-in-bottom-leave-active {
  opacity: 0;
  transform: scaleY(0);
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  box-shadow: inset006pxrgba(0,0,0,0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0,0,0,0.1);
  box-shadow: inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255,0,0,0.4);
}
</style>
