<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="isShowLeft">
          <i :class="iconName"></i>
          <slot name="left"></slot>
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'pageTools',
  data() {
    return {}
  },

  props: {
    iconName: {
      type: String,
      default: 'el-icon-info'
    },
    isShowLeft: {
      type: Boolean,
      default: true
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
