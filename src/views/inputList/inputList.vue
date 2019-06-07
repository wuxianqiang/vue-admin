<template>
  <div>
    <div class="title">按钮</div>
    <div>
      <ul>
        <li
          v-for="(item, index) in type"
          :key="index"
          class="button">
          <m-button :type="item">按钮</m-button>
        </li>
      </ul>
    </div>
    <div class="title">单选框</div>
    <div>
      <m-radio-group v-model="sex">
        <m-radio v-model="sex" :label="0">男生</m-radio>
        <m-radio v-model="sex" :label="1">女生</m-radio>
      </m-radio-group>
    </div>
    <div class="title">按钮组</div>
    <div>
      <m-radio-group v-model="city">
        <m-radio-button :label="0">北京</m-radio-button>
        <m-radio-button :label="1">上海</m-radio-button>
        <m-radio-button :label="2">广州</m-radio-button>
      </m-radio-group>
    </div>
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
    <div class="title">复选框</div>
    <div>
      <m-checkbox-group v-model="list">
        <m-checkbox :label="0">篮球</m-checkbox>
        <m-checkbox :label="2">足球</m-checkbox>
        <m-checkbox :label="1">羽毛球</m-checkbox>
      </m-checkbox-group>
    </div>
    <div>
      <div class="title">日期框</div>
      <m-date-picker v-model="time"></m-date-picker>
    </div>
    <div>
      <div class="title">开关</div>
      <m-switch v-model="open"></m-switch>
    </div>
  </div>
</template>

<script>
import MButton from '@/components/m-button/m-button'
import MRadioGroup from '@/components/m-radio/m-radio-group'
import MRadioButton from '@/components/m-radio/m-radio-button'
import MRadio from '@/components/m-radio/m-radio'
import MSelect from '@/components/m-select/m-select'
import MOption from '@/components/m-select/m-option'
import MCheckboxGroup from '@/components/m-checkbox/m-checkbox-group'
import MCheckbox from '@/components/m-checkbox/m-checkbox'
import MDatePicker from '@/components/m-date-picker/m-date-picker'
import MSwitch from '@/components/m-switch/m-switch'
export default {
  components: {
    MButton,
    MRadioButton,
    MRadioGroup,
    MRadio,
    MSelect,
    MOption,
    MCheckboxGroup,
    MCheckbox,
    MDatePicker,
    MSwitch
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
