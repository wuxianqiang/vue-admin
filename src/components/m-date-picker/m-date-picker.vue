<template>
  <div class="calendar">
    <div>
      <div class="calendar__header">
        <div>
          <i class="el-icon-d-arrow-left" @click="prevYear"></i>
          <i class="el-icon-arrow-left" @click="prevMonth" v-show="!showYear && !showMonth"></i>
        </div>
        <div>
          <div v-show="!showYear && !showMonth">
            <span @click="handleYear"> {{time.year}} 年</span>
            <span @click="handleMonth"> {{time.month+1}} 月</span>
          </div>
          <div v-show="showYear">{{ title }}</div>
          <div
            v-show="showMonth"
            @click="handleYear">
            {{ time.year }}年
          </div>
        </div>
        <div>
          <i class="el-icon-arrow-right" @click="nextMonth" v-show="!showYear && !showMonth"></i>
          <i class="el-icon-d-arrow-right" @click="nextYear"></i>
        </div>
      </div>
      <div class="calendar__body">
        <!-- 日期 -->
        <div>
          <div class="calendar__wrapper">
            <ul class="calendar__row">
              <li
                v-for="(week, index) in weekDays"
                :key="index"
                class="calendar__column">
                {{week}}
              </li>
            </ul>
            <div
              v-for="(i, index) in 6"
              :key="index"
              class="calendar__row">
              <span
                v-for="(j, index) in 7"
                :key="index"
                class="calendar__column"
                :class="{
                  'current': visibeDays[(i-1)*7+(j-1)].current,
                  'select': visibeDays[(i-1)*7+(j-1)].select,
                  'timeout': visibeDays[(i-1)*7+(j-1)].timeout
                }"
                @click="chooseDate(visibeDays[(i-1)*7+(j-1)].time)">
                {{ visibeDays[(i-1)*7+(j-1)].day }}
              </span>
            </div>
          </div>
          <!-- 年份 -->
          <div class="calendar__wrapper" v-show="showYear">
            <div
              v-for="(i, index) in 3"
              :key="index"
              class="calendar__row">
              <span
                v-for="(j, index) in 4"
                :key="index"
                class="calendar__column"
                @click="handleSelectYear(visibeYears[(i-1)*4+(j-1)])">
                {{visibeYears[(i-1)*4+(j-1)]}}
              </span>
            </div>
          </div>
          <!-- 月份 -->
          <div class="calendar__wrapper" v-show="showMonth">
            <div
              v-for="(i, index) in 3"
              :key="index"
              class="calendar__row">
              <span
                v-for="(j, index) in 4"
                :key="index"
                class="calendar__column"
                @click="handleSelectMonth((i-1)*4+(j-1))">
                {{months[(i-1)*4+(j-1)]}}
              </span>
            </div>
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
      showYear: false,
      showMonth: false,
      time: {},
      activeYear: ''
    }
  },

  computed: {
    formatDate () {
      let { year, month, day } = getYearMonthDay(this.value)
      return `${year}-${month+1}-${day}`
    },

    visibeYears () {
      let start = this.activeYear
      let list = []
      for (let i = 0; i < 10; i++) {
        list.push('' + start + i)
      }
      return list
    },

    visibeDays () {
      let {
        year: currentYear,
        month: currentMonth
      } = this.time
      let {
        year: activeYear,
        month: activeMonth,
        day: activeDay
      } = getYearMonthDay(this.value)
      let currentFirstDay = new Date(currentYear, currentMonth, 1)
      let week = currentFirstDay.getDay()
      const milliseconds = 60 * 60 * 1000 * 24
      let startDay = currentFirstDay - week * milliseconds
      let arr = []
      let count = 0
      for(let i = 0; i < 42; i++) {
        let time = new Date(startDay + i * milliseconds )
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
        if (year === activeYear && month === activeMonth && day === activeDay) {
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
    },

    title () {
      let start = this.activeYear
      return `${start}0 年 - ${start}9 年`
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (time) {
        this.time = getYearMonthDay(time)
        this.activeYear = Math.trunc(this.time.year / 10)
      }
    }
  },

  created () {
    this.months = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
      '十三月'
    ]
    this.weekDays = [
      '日',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六'
    ]
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
      if (this.showYear) {
        this.activeYear--
        return
      }
      let d = getDate(this.time.year, this.time.month, 1)
      d.setFullYear(d.getFullYear() - 1)
      this.time = getYearMonthDay(d)
    },
    nextYear () {
      if (this.showYear) {
        this.activeYear++
        return
      }
      let d = getDate(this.time.year, this.time.month, 1)
      d.setFullYear(d.getFullYear() + 1)
      this.time = getYearMonthDay(d)
    },
    handleYear () {
      this.showYear = true
      this.showMonth = false
    },
    handleSelectYear (year) {
      this.showYear = false
      this.showMonth = true
      this.time.year = Number(year)
    },
    handleMonth () {
      this.showMonth = true
    },
    handleSelectMonth (month) {
      this.showMonth = false
      this.time.month = month
    }
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}
.calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 12px 12px;
  height: 30px;
}
.calendar__body {
  height: 269px;
  position: relative;
}
.calendar__wrapper {
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar {
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  width: 322px;
  padding: 15px;
  box-sizing: border-box;
  position: relative;
}
.calendar__row {
  display: flex;
  flex: 1;
}
.calendar__column {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current {
  color: #606266;
}
.timeout {
  color: #c0c4cc;
}
.select {
  color: #409eff;
}
</style>
