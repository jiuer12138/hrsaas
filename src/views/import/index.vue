<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel
        :beforeUpload="beforeUploadFn"
        :onSuccess="onSuccess"
      ></upload-excel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
import { importEmployeesAPI } from '@/api'
import { formatTime } from '@/filters'

export default {
  name: 'importModule',
  data() {
    return {}
  },

  created() {},

  methods: {
    beforeUploadFn(file) {
      if (!file.name.endsWith('.xlsx')) return false
      return true
    },
    async onSuccess({ header, results }) {
      console.log(header)
      console.log(results)

      const newArr = results.map((item) => {
        const Obj = {}
        for (let key in employees.importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            Obj[employees.importMapKeyPath[key]] = formatTime(date)
          } else {
            Obj[employees.importMapKeyPath[key]] = item[key]
          }
        }
        return Obj
      })
      await importEmployeesAPI(newArr)
      this.$message.success('导入成功')
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
