<template>
  <el-dropdown @command="change">
    <span class="el-dropdown-link">
      <svg-icon iconClass="language" className="language"></svg-icon>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="k"
        v-for="(item, k) in messages"
        :key="k"
        :disabled="k === $i18n.locale"
        >{{ item.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
console.log(messages)
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    change(val) {
      this.$i18n.locale = val
      this.$router.go(0)
      Cookie.set('lang', val)
    }
  }
}
</script>

<style scoped>
.language {
  color: #fff;
  font-size: 20px;
}
</style>
