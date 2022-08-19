<template>
  <el-dialog
    title="分配角色"
    :visible="visible"
    @open="onOpen"
    @close="onClose"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.id" v-for="item in roleList" :key="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { assignRoles, getRolesAPI, getUserDetailAPI } from '@/api'
export default {
  data() {
    return {
      checkList: [],
      roleList: []
    }
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    async getRoleList() {
      const res = await getRolesAPI()
      // console.log(res)
      this.roleList = res.rows
    },
    async getUserInfo() {
      const { roleIds } = await getUserDetailAPI(this.roleId)
      this.checkList = [...roleIds]
    },
    onOpen() {
      this.getRoleList()
      this.getUserInfo()
    },
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('未分配角色')
      await assignRoles({
        id: this.roleId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.onClose()
    }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
