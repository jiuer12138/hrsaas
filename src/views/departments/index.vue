<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <el-card class="box-card">
        <TreeTools :treeNode="company" :isRoot="true"></TreeTools>
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="scope">
            <TreeTools :treeNode="scope.data"></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
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
        manage: '负责人'
      }
    }
  },

  components: {
    TreeTools
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
