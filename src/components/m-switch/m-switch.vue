<template>
  <div class="switch-wrapper">
    <input
      type="checkbox"
      class="checkbox"
      v-model="select"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false
    },
    activeValue: {
      type: [Number, String, Boolean],
      default: true
    },
    inactiveVlaue: {
      type: [Number, String, Boolean],
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      select: false
    }
  },

  created () {
    // if (this.value === this.activeValue) {
    //   this.select = true
    // } else {
    //   this.select = false
    // }
  },

  methods: {
  },

  watch: {
    select (value) {
      if (value) {
        this.$emit('input', this.activeValue)
      } else {
        this.$emit('input', this.inactiveVlaue)
      }
    },
    value: {
      immediate: true,
      handler (newValue) {
        if (newValue === this.activeValue) {
          this.select = true
        } else {
          this.select = false
        }
      }
    }
  }
}
</script>

<style scoped>
.switch-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.checkbox:checked {
  background-color: rgb(19, 206, 102);
}

.checkbox:checked::after{
  left: 22px;
}

.checkbox {
  appearance: none;
  outline: none;
  width: 38px;
  height: 18px;
  background-color: rgb(255, 73, 73);
  border-radius: 10px;
  transition: background-color 0.3s;
  position: relative;
  cursor: pointer;
}

.checkbox::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.3s;
  z-index: 8;
}
</style>
