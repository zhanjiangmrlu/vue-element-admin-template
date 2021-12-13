<template>
  <div class="echarts">
    <h4 class="head">大舜攻击态势报告(日报)</h4>
    <div class="title_content">2021年12月01日</div>
    <div class="echarts_block">
      <div class="chart">
        <h6>攻击源ip</h6>
        <div class="strategy" ref="source"></div>
      </div>
      <div class="chart">
        <h6>目标ip</h6>
        <!-- <div class="strategy" ref="source"></div> -->
      </div>
      <div class="chart">
        <h6>告警等级统计</h6>
        <div class="amount" ref="amount"></div>
      </div>
      <div class="chart">
        <h6>告警源类型统计</h6>
      </div>
      <div class="chart">
        <h6>处置状态统计</h6>
        <div class="strategy" ref="dispose"></div>
      </div>
      <div class="chart">
        <h6>策略处置统计</h6>
        <div class="strategy" ref="strategy"></div>
      </div>
    </div>
    <div class="alarm">
      <h6>24小时告警趋势图</h6>
      <div id="alarm " ref="alarm"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Echarts",

  data() {
    return {};
  },

  mounted() {
    // this.alarmPicture()
    // this.totalState()
    // this.disposeState()
    // this.attackSource()
    // this.totalAlarm()
    Promise.all([
      this.alarmPicture(),
      this.totalState(),
      this.disposeState(),
      this.attackSource(),
      this.totalAlarm(),
    ]);
  },

  methods: {
    //攻击源
    attackSource() {
      var myChart = echarts.init(this.$refs.source);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
        },
        series: [
          {
            type: "bar",
            data: [1820, 239, 34, 100, 744, 60],
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
          // emphasis: {
          //   itemStyle: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: '#2378f7' },
          //       { offset: 0.7, color: '#2378f7' },
          //       { offset: 1, color: '#83bff6' }
          //     ])
          //   }
          // },
        ],
      };

      option && myChart.setOption(option);
    },

    //告警等级统计
    totalAlarm() {
      var myChart = echarts.init(this.$refs.amount);
      var option;
      option = {
        xAxis: {
          type: "category",
          data: ["高危", "中危", "低危", "全部"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80],
            type: "bar",
            barWidth: 40,
            barMinHeight: "100%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 0, color: "#188df0" },
              ]),
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },

    //24小时告警趋势图
    alarmPicture() {
      var myChart = echarts.init(this.$refs.alarm);
      var option;
      option = {
        title: {},
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
    },

    //策略处置统计
    totalState() {
      var myChart = echarts.init(this.$refs.strategy);
      var option;

      option = {
        title: {
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false, //把侧边的标记隐藏
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 735, name: "Direct" },
              { value: 1, name: "Email" },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    },

    //处置状态统计
    disposeState() {
      var myChart = echarts.init(this.$refs.dispose);
      var option;

      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background: #f7faff;

  .head {
    line-height: 40px;
    text-align: center;
  }

  .title_content {
    padding: 10px 10px;
    background: #fff;
  }

  .echarts_block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;

    .chart {
      width: 395px;
      height: 180px;
      padding: 10px;
      margin-bottom: 20px;
      background: #fff;
    }
  }

  .alarm {
    width: 100%;
    height: 540px;
    padding: 10px;
    background: #fff;
  }

  #alarm {
    height: 440px;
  }

  .state {
    margin: auto;
  }

  .strategy {
    height: 160px;
  }

  .amount {
    height: 180px;
  }
}
</style>
