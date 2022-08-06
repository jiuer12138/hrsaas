<template>
  <el-dialog title="提示" :visible="dialogVisible" width="50%" @close="onClose">
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code"></el-input>
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
        <el-input type="textarea" v-model="formData.introduce"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddDeptsAPI, getDeptsAPI, getEmployeesListAPI } from '@/api'
export default {
  name: 'AddDept',
  data() {
    const checkName = (rule, value, callback) => {
      console.log(this.currentNode)
      const isRepeat = this.currentNode.children?.some(
        (item) => item.name == value
      )
      isRepeat ? callback(new Error('部门名称重复')) : callback()
    }
    const checkCode = async (rule, value, callback) => {
      const { depts } = await getDeptsAPI()
      const isRepeat = depts.some((item) => item.code == value)
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

  methods: {
    async getEmployeesList() {
      const res = await getEmployeesListAPI()
      this.employeesList = res
    },
    onClose() {
      this.$emit('update:dialogVisible', false)
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      const res = await AddDeptsAPI(this.formData)
      console.log(res)
    }
  }
}
</script>

<style scoped></style>
