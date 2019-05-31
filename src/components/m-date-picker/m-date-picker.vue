<template>
  <div class="calendar">
    <div class="calendar__container">
      <div class="calendar__header">
        <div>
          <i class="el-icon-d-arrow-left" @click="prevYear"></i>
          <i class="el-icon-arrow-left" @click="prevMonth"></i>
        </div>
        <div>
          <span> {{time.year}} 年</span>
          <span> {{time.month+1}} 月</span>
          <span> {{time.day}} 日</span>
        </div>
        <div>
          <i class="el-icon-arrow-right" @click="nextMonth"></i>
          <i class="el-icon-d-arrow-right" @click="nextYear"></i>
        </div>
      </div>
      <div class="calendar__content">
        <!-- 循环行和列,99乘法表 -->
        <div>
          <ul class="calendar__content--week">
            <li
              v-for="(week, index) in weekDays"
              :key="index"
              class="calendar__content--day"
            >
              {{week}}
            </li>
          </ul>
        </div>
        <div class="calendar__content--wrapper">
          <div
            v-for="(i, index) in 6"
            :key="index"
            class="calendar__content--raw">
            <span
              v-for="(j, index) in 7"
              :key="index"
              class="calendar__content--column"
              :class="{
                'hook': visibeDays[(i-1)*7+(j-1)].current,
                'select': visibeDays[(i-1)*7+(j-1)].select
              }"
              @click="chooseDate(visibeDays[(i-1)*7+(j-1)].time)">
              {{ visibeDays[(i-1)*7+(j-1)].day }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getYearMonthDay, getDate } from './utils'
export default {
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },


  data () {
    return {
      // 日历操作面板是否可见
      isVisiable: false,
      time: '',
      weekDays: ['日', '一', '二', '三', '四', '五', '六']
    }
  },

  computed: {
    formatDate () {
      let { year, month, day } = getYearMonthDay(this.value)
      return `${year}-${month+1}-${day}`
    },

    visibeYears () {
      let { year } = this.time

    },

    visibeDays () {
      let {year: currentYear, month:currentMonth, day:currentDay} = this.time
      let time = getDate(this.time.year, this.time.month, this.time.day)
      let { year, month } = getYearMonthDay(time)
      let currentFirstDay = new Date(year, month, 1)
      let week = currentFirstDay.getDay()
      let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
      let arr = []
      let count = 0
      for(let i = 0; i < 42; i++) {
        let time = new Date(startDay + i * 60 * 60 * 1000 * 24 )
        let { year, month, day } = getYearMonthDay(time)
        let params = {
          year,
          month,
          day,
          time,
          timeout: true,
          current: true,
          select: false
        }
        if (year !== currentYear || month !== currentMonth) {
          params.current = false
        }
        if (year === currentYear && month === currentMonth && day === currentDay) {
          params.select = true
        }
        if (day === 1) {
          count++
        }
        if (count === 1) {
          params.timeout = false
        }
        arr.push(params)
      }
      return arr
    }
  },

  created () {
    this.time = getYearMonthDay(this.value)
  },

  methods: {
    chooseDate (date) {
      this.time = getYearMonthDay(date)
      this.$emit('input', date)
    },
    prevMonth () {
      let d = getDate(this.time.year, this.time.month, 1)
      d.setMonth(d.getMonth() - 1)
      this.time = getYearMonthDay(d)
    },
    nextMonth () {
      let d = getDate(this.time.year, this.time.month, 1)
      d.setMonth(d.getMonth() + 1)
      this.time = getYearMonthDay(d)
    },
    currentMonth () {
      this.time = getYearMonthDay(new Date())
    },
    prevYear () {
      let d = getDate(this.time.year, this.time.month, 1)
      d.setFullYear(d.getFullYear() - 1)
      this.time = getYearMonthDay(d)
    },
    nextYear () {
      let d = getDate(this.time.year, this.time.month, 1)
      d.setFullYear(d.getFullYear() + 1)
      this.time = getYearMonthDay(d)
    }
  }
}
</script>

<style lang="stylus" scoped>
* {
  margin 0
  padding 0
}
.calendar__header {
  display flex
  align-items center
  justify-content space-between
  padding 0 12px 12px 12px
  height 30px
}
.calendar
  border: 1px solid #dcdfe6;
  background #fff
  border-radius 4px
  width 322px
  padding 15px

  &__content
    &--raw
      display flex
    &--column
      flex 1
      display flex
      align-items center
      justify-content center
      cursor pointer
      height 30px
      color #c0c4cc
      &:hover
        background #f2f8fe
    &--week
      display flex
      height 41px
      border-bottom: 1px solid #dcdfe6;
    &--day
      flex 1
      flex 1
      display flex
      align-items center
      justify-content center
      width 32px
      height 30px
.hook
  color #000
.today
  background #f2f8fe
  color #1989fa
.select
  background #f2f8fe !important
</style>
