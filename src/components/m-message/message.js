import Vue from 'vue'
import MessageComponent from './m-message.vue'

let getInstance = () => {
  let vm = new Vue({
    render: h => h(MessageComponent)
  }).$mount()
  document.body.appendChild(vm.$el)
  let component = vm.$children[0]
  return {
    add (options, type) {
      component.add(options, type)
    }
  }
}

let instance;
let getInt = () => {
  instance = instance || getInstance()
  return instance
}

const Message = {
  success (options) {
    getInt().add(options, 'success')
  },
  error (options) {
    getInt().add(options, 'error')
  }
}

export {
  Message
}
let _Vue;
export default {
  install (Vue) {
    if (!_Vue) {
      _Vue = Vue
      const $message = (options = {}) => {
        let { type = 'success', message = '' } = options
        Message[type]({message})
      }
      Object.keys(Message).forEach(type => {
        $message[type] = Message[type]
      })
      Vue.prototype.$message = $message
    }
  }
}
