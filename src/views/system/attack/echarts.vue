<template>
	<div class="echarts">
		<h4 class="head">大舜攻击态势报告(日报)</h4>
		<div class="title_content">2021年12月01日</div>
		<div class="echarts_block">
			<div class="chart"></div>
			<div class="chart"></div>
			<div class="chart"></div>
			<div class="chart"></div>
			<div class="chart"></div>
			<div class="chart"></div>
		</div>
		<div class="alarm" ref="alarm"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	name: 'Echarts',

	data() {
		return {}
	},

	methods: {
		alarmPicture() {
			// var chartDom = document.getElementById('main')
			var myChart = echarts.init(this.$refs.alarm)
			var option
			option = {
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: 'line',
					},
				],
			}
			option && myChart.setOption(option)
		},
	},
}
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
			width: 410px;
			height: 200px;
			margin-bottom: 20px;
			background: #fff;
		}
	}
}
</style>
