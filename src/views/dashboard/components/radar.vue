<template>
  <div id="main">雷达图</div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.initRadar()
  },
  computed: {},
  methods: {
    initRadar() {
      var myChart = echarts.init(document.getElementById('main'))

      const radarOption = {
        title: {
          text: '绩效表'
        },
        legend: {
          data: ['张三', '李四']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '上班', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '喝酒', max: 100 },
            { name: '打代码', max: 100 },
            { name: 'bug', max: 100 },
            { name: '睡觉', max: 100 }
          ]
        },
        series: [
          {
            name: '绩效表',
            type: 'radar',
            data: [
              {
                value: [10, 20, 30, 40, 50, 60],
                name: '张三'
              },
              {
                value: [60, 50, 40, 30, 20, 10],
                name: '李四'
              }
            ]
          }
        ]
      }
      // 绘制图表
      myChart.setOption(radarOption)
    }
  }
}
</script>
<style scoped lang="scss">
#main {
  width: 700px;
  height: 500px;
}
</style>
