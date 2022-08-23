<template>
  <div>
    <svg-icon
      @click="onScreenFull"
      className="fullscreen"
      iconClass="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onScreenFull() {
      if (screenfull.isEnabled) {
        screenfull.request()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  margin: 0 8px;
  color: #fff;
}
</style>
