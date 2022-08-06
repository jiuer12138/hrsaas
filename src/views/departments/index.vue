<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <el-card class="box-card">
        <TreeTools @add="addFn" :treeNode="company" :isRoot="true"></TreeTools>
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="scope">
            <TreeTools
              @add="addFn"
              :treeNode="scope.data"
              @remove="loadDepts"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <AddDept
      :dialogVisible.sync="dialogVisible"
      :currentNode="currentNode"
    ></AddDept>
  </div>
</template>

<script>
import { getDeptsAPI } from '@/api'
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { transListToTree } from './resolveData'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name'
      },
      company: {
        name: '传智教育',
        manager: '负责人'
      },
      dialogVisible: false,
      currentNode: {}
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsAPI()
      console.log(res.depts)

      this.treeData = transListToTree(res.depts, '')
    },
    addFn(val) {
      this.dialogVisible = true
      this.currentNode = val
    }
  }
}
</script>

<style scoped lang="less"></style>
