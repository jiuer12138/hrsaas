<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="updateCalendar"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
          >{{ item }}</el-option
        >
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px; margin-left: 10px"
        @change="updateCalendar"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeekend(date)" style="color: red">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null,
      yearList: []
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.yearList = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
    },
    isWeekend(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
  .cell-box {
    color: green;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
