<template>
  <div class="select-wrapper" v-click-outside>
    <input type="text"
      :value="formatDate"
      readonly
      class="input"
      ref="hook"
    >
    <i class="el-icon-arrow-down select-icon" ref="icon"></i>
    <transition :name="animate">
      <div
        v-show="isVisiable"
        :class="top?'select-top':'select-bottom'">
        <div :class="top?'select-up':'select-down'">
        </div>
        <div class="select-inner" ref="select">
          <div>
            <div class="calendar">
              <div>
                <div class="calendar__header">
                  <div>
                    <i
                      class="el-icon-d-arrow-left mouse"
                      @click="prevYear">
                    </i>
                    <i
                      class="el-icon-arrow-left mouse"
                      @click="prevMonth"
                      v-show="!showYear && !showMonth">
                    </i>
                  </div>
                  <div>
                    <div v-show="!showYear && !showMonth">
                      <span @click="handleYear" class="mouse"> {{time.year}} 年</span>
                      <span @click="handleMonth" class="mouse"> {{time.month+1}} 月</span>
                    </div>
                    <div v-show="showYear">{{ title }}</div>
                    <div
                      v-show="showMonth"
                      @click="handleYear">
                      {{ time.year }}年
                    </div>
                  </div>
                  <div>
                    <i
                      class="el-icon-arrow-right mouse"
                      @click="nextMonth"
                      v-show="!showYear && !showMonth">
                    </i>
                    <i
                      class="el-icon-d-arrow-right mouse"
                      @click="nextYear">
                    </i>
                  </div>
                </div>
                <div class="calendar__body">
                  <div>
                    <!-- 日期 -->
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
                          class="calendar__column mouse"
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
                          class="calendar__column mouse"
                          :class="{active: visibeYears[(i-1)*4+(j-1)] === value.getFullYear()}"
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
                          class="calendar__column mouse"
                          :class="{active:( ((i-1)*4+(j-1)) === value.getMonth()) && (value.getFullYear() === time.year)}"
                          @click="handleSelectMonth((i-1)*4+(j-1))">
                          {{months[(i-1)*4+(j-1)]}}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getYearMonthDay, getDate } from './utils'

export default {
  directives: {
    clickOutside: {
      bind (el, bindings, vnode) {
        let handler = e => {
          if (el.contains(e.target)) {
            if (e.target.className === 'input') {
              if (!vnode.context.isVisiable) {
                vnode.context.focus()
              } else {
                vnode.context.blur()
              }
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
      type: Date,
      default: () => new Date()
    }
  },

  data () {
    return {
      isVisiable: false,
      top: false,
      animate: 'el-zoom-in-top',
      showYear: false,
      showMonth: false,
      time: {},
      activeYear: '',
      label: '2019-06-06'
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
        list.push(Number('' + start + i))
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
    focus () {
      this.$refs.icon.style.transform = 'rotateZ(-180deg)'
      this.time = getYearMonthDay(this.value)
      this.activeYear = Math.trunc(this.time.year / 10)
      // 自动处理选择框的方向
      let height = window.innerHeight - this.$refs.hook.getBoundingClientRect().bottom
      let offsetHeight = 355 + 30
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
      this.$refs.icon.style.transform = 'rotateZ(0deg)'
      this.isVisiable = false
      this.showYear = false
      this.showMonth = false
    },

    handleClick () {
      this.isVisiable = !this.isVisiable
    },
    chooseDate (date) {
      this.time = getYearMonthDay(date)
      this.$emit('input', date)
      this.isVisiable = false
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
  background: #fff;
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
  /* cursor: pointer; */
}
.mouse:hover {
  cursor: pointer;
  color: #409eff;
}

.current {
  color: #606266;
}
.timeout {
  color: #c0c4cc;
}
.select {
  background: #409eff;
  color: #fff !important;
}
.active {
  color: #409eff;
}
.input {
  outline: none;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  padding: 0 15px;
}
.select-icon {
  position: absolute;
  right: 10px;
  top: 15px;
  transition: transform 0.3s;
  transform: rotateZ(0);
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
  min-width: 100%;
}
.select-wrapper {
  display: inline-block;
  position: relative;
}
.select-inner {
  position: relative;
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

</style>
