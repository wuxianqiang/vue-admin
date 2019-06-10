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
      <div class="title">文本框</div>
      <m-textarea v-model="text" placeholder="请输入"></m-textarea>
    </div>
    <div>
      <div class="title">时间选择</div>
      <m-time-picker></m-time-picker>
    </div>
  </div>
</template>

<script>
import MSelect from '@/components/m-select/m-select'
import MOption from '@/components/m-select/m-option'
import MDatePicker from '@/components/m-date-picker/m-date-picker'
import MTextarea from '@/components/m-textarea/m-textarea'
import MTimePicker from '@/components/m-time-picker/m-time-picker'
export default {
  components: {
    MSelect,
    MOption,
    MDatePicker,
    MTextarea,
    MTimePicker
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
