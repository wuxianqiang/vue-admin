<template>
  <div>
    <div class="title">选择框</div>
    <div>
      <m-select v-model="value" placeholder="请选择">
        <m-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value">
        </m-option>
      </m-select>
    </div>
    <div>
      <div class="title">日期框</div>
      <m-date-picker v-model="time"></m-date-picker>
    </div>
    <div>
      <div class="title">高度自适应的文本框</div>
      <m-textarea v-model="text" placeholder="请输入"></m-textarea>
    </div>
    <div>
      <div class="title">时间选择</div>
      <m-time-picker></m-time-picker>
    </div>
    <div>
      <div class="title">表单</div>
      <m-input
        placeholder="请选择日期"
        v-model="input1">
        <i slot="suffix" class="el-icon-date"></i>
      </m-input>
      <div class="title">带图标</div>
      <m-input
        placeholder="请输入内容"
        v-model="input2">
        <i slot="prefix" class="el-icon-search"></i>
      </m-input>
      <div class="title">不带图标</div>
      <m-input
        placeholder="请输入内容"
        v-model="input3">
      </m-input>
    </div>
  </div>
</template>

<script>
import MSelect from '@/components/m-select/m-select'
import MOption from '@/components/m-select/m-option'
import MDatePicker from '@/components/m-date-picker/m-date-picker'
import MTextarea from '@/components/m-textarea/m-textarea'
import MInput from '@/components/m-input/m-input'
import MTimePicker from '@/components/m-time-picker/m-time-picker'
export default {
  components: {
    MSelect,
    MOption,
    MDatePicker,
    MTextarea,
    MTimePicker,
    MInput
  },
  data () {
    return {
      sex: 0,
      city: 0,
      select: '',
      value: '',
      radio: '1',
      msg: '1',
      list: [0],
      time: new Date(),
      open: false,
      text: '',
      input1: '',
      input2: '',
      input3: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  created () {
    this.type = ['', 'primary', 'success', 'info', 'warning', 'danger']
  },
  methods: {
    handleAll () {
      this.list = [0,1,2]
    }
  }
}
</script>

<style scoped>
.button {
  width: 150px;
  display: inline-block;
}
.title {
  margin: 20px 0;
}
</style>
