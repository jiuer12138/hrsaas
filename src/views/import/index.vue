<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeUpload="fn"></upload-excel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'importModule',
  data() {
    return {}
  },

  created() {},

  methods: {
    fn() {
      console.log(123)
    }
  }
}
</script>

<style scoped></style>
