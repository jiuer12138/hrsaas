<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :isShowLeft="false">
        <template #right>
          <el-button type="primary" size="small" @click="showDialogFn('0', 1)"
            >添加权限</el-button
          >
        </template>
      </pageTools>

      <el-table
        ref="table"
        :data="permissions"
        style="width: 100%; margin-top: 10px"
        row-key="id"
      >
        <el-table-column label="名称" width="180">
          <template slot-scope="{ row }">
            <i
              :class="row.expand ? 'el-icon-folder-opened' : 'el-icon-folder'"
              v-if="row.children"
              @click="expand(row)"
            ></i>
            <i v-else-if="row.type !== 1" class="el-icon-tickets"></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="showDialogFn(row.id, 2)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog title="添加权限点" :visible.sync="showDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { transListToTree } from '@/views/departments/resolveData'
import { addPermission, getPermissionList } from '@/api'
export default {
  data() {
    return {
      permissions: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getPermission()
  },

  methods: {
    async getPermission() {
      const res = await getPermissionList()
      // console.log(res)
      this.permissions = transListToTree(res, '0')
    },
    expand(row) {
      row.expand = !row.expand
      this.$refs.table.toggleRowExpansion(row, row.expand)
    },
    btnCancel() {
      this.showDialog = false
      this.$refs.perForm.resetFields()
    },
    btnOK() {
      this.$refs.perForm.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加权限成功')
        this.showDialog = false
        this.getPermission()
      })
    },
    showDialogFn(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
