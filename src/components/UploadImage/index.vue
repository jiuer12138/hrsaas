<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="{ 'custom-class': true }"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="showPreview">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDvf9MK1ScZGgpgGZbLp1wax3sQgfNnwoP',
  SecretKey: 'KN9espVu2sRkmWzB5i49xUjhOoxoPjlW'
})
export default {
  name: 'UploadImage',
  data() {
    return {
      fileList: [],
      imgUrl: '',
      showPreview: false,
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'jiuer-1313341591' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          console.log(err || data)
          if (err || data.statusCode != 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', { url: 'https://' + data.Location })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.showPreview = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请输入' + types.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片不能超过2MB')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.custom-class {
  overflow: hidden;
  width: 148px;
  height: 148px;
}
</style>
