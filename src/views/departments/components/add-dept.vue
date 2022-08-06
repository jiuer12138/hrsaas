<template>
  <el-dialog
    :title="dialogTitle"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="请输入部门编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择活动区域"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employeesList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          v-model="formData.introduce"
          placeholder="请输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  AddDeptsAPI,
  editDeptsAPI,
  getDeptsAPI,
  getEditDeptsAPI,
  getEmployeesListAPI
} from '@/api'
export default {
  name: 'AddDept',
  data() {
    const checkName = async (rule, value, callback) => {
      let isRepeat
      if (this.formData.id) {
        const { depts } = await getDeptsAPI()
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id
          )
          .some((item) => item.name == value)
      } else {
        isRepeat = this.currentNode.children?.some((item) => item.name == value)
      }
      isRepeat ? callback(new Error('部门名称重复')) : callback()
    }
    const checkCode = async (rule, value, callback) => {
      const { depts } = await getDeptsAPI()
      let isRepeat
      if (!this.formData.id) {
        isRepeat = depts.some((item) => item.name == value)
      } else {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.name === value)
      }
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employeesList: []
    }
  },

  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getEmployeesList()
  },

  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  },

  methods: {
    async getEmployeesList() {
      const res = await getEmployeesListAPI()
      this.employeesList = res
    },
    onClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async onSave() {
      await this.$refs.form.validate()

      try {
        if (this.formData.id) {
          const res = await editDeptsAPI(this.formData)
          this.onClose()
          this.$emit('addSuccess')
          this.$message.success('编辑成功')
        } else {
          this.formData.pid = this.currentNode.id
          const res = await AddDeptsAPI(this.formData)
          // console.log(res)
          this.$emit('addSuccess')
          this.onClose()
          this.$message.success('添加成功')
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    async getDeptById(id) {
      this.formData = await getEditDeptsAPI(id)
    }
  }
}
</script>

<style scoped></style>
