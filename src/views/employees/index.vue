<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="AddEmployeesFn"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="员工" sortable>
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                alt=""
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                v-imgError="require('@/assets/common/123.gif')"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            :page-size="pages.size"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>

    <AddEmployees
      @add-success="getEmployeesInfo"
      :visible.sync="showAddVisible"
    ></AddEmployees>
  </div>
</template>

<script>
import { delEmployee, getEmployeesInfoAPI } from '@/api'
import EmployeesList from '@/constant/employees'
import AddEmployees from './components/add-employee.vue'
export default {
  name: 'Employees',
  data() {
    return {
      employees: [],
      pages: {
        page: 1,
        size: 5
      },
      total: 0,
      showAddVisible: false
    }
  },

  created() {
    this.getEmployeesInfo()
  },

  components: {
    AddEmployees
  },

  methods: {
    async getEmployeesInfo() {
      const res = await getEmployeesInfoAPI(this.pages)
      // console.log(res)
      this.employees = res.rows
      this.total = res.total
    },
    changePage(val) {
      this.pages.page = val
      this.getEmployeesInfo()
    },
    formatEmployment(row, column, cellValue, index) {
      const findItem = EmployeesList.hireType.find(
        (item) => item.id === cellValue
      )
      return findItem ? findItem.value : '未知'
    },
    async onRemove(id) {
      await this.$confirm('是否确认删除？')
      await delEmployee(id)
      this.$message.success('删除成功')
    },
    AddEmployeesFn() {
      this.showAddVisible = true
    }
  }
}
</script>

<style scoped lang="less"></style>
