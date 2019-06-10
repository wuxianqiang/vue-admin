<template>
  <div>
    <m-select>
      <m-option
        v-for="(item, index) in list"
        :key="index"
        :label="item.name"
        :value="item.id">
      </m-option>
    </m-select>
  </div>
</template>

<script>
import MSelect from '@/components/m-select/m-select'
import MOption from '@/components/m-select/m-option'
import { calculateLastTime } from './utils'
export default {
  components: {
    MSelect,
    MOption
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.list = calculateLastTime(800, 900, 5)
  }
}
</script>
