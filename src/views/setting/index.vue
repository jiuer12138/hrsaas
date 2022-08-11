<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="AddDialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            layout="sizes, prev, pager, next"
            :page-size="pagesize"
            :total="total"
            :page-sizes="[3, 5, 10, 20]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="companyForm" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled v-model="companyForm.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyForm.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyForm.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增dialog -->
    <el-dialog
      title="提示"
      :visible.sync="AddDialogVisible"
      width="50%"
      @close="onClose"
    >
      <el-form
        ref="AddRoleForm"
        :model="AddRoleForm"
        :rules="AddRoleFormRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="AddRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="AddRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRolesAPI, getRolesAPI, getCompanyInfoAPI } from '@/api'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 3,
      page: 1,
      AddDialogVisible: false,
      AddRoleForm: {
        name: '',
        description: ''
      },
      AddRoleFormRules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ]
      },
      companyForm: {}
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const res = await getRolesAPI({
        page: this.page,
        pagesize: this.pagesize
      })
      // console.log(res)
      this.tableData = res.rows
      this.total = res.total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    async onConfirm() {
      await this.$refs.AddRoleForm.validate()
      await addRolesAPI(this.AddRoleForm)
      this.getRoles()
      this.onClose()
    },

    onClose() {
      this.AddDialogVisible = false
      this.$refs.AddRoleForm.resetFields()
      this.AddRoleForm.description = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoAPI(
        this.$store.state.user.userInfo.companyId
      )
      console.log(res)
      this.companyForm = res
    }
  }
}
</script>

<style scoped lang="less"></style>
