<template>
  <div class="x-bar">
   <div id="highChartsDiv" style="width:100%; height:400px;"></div>
  </div>
</template>
<script>
var options = {
  bar: {//模拟数组  后期导入chart组件模拟数据
    chart: {
      type: 'bar',
    },
    series: [{
      data: [50, 235, 809, 947]
    }]
  }
}
import HighCharts from 'highcharts'

export default {
	data() {
		return {
			highChartsDiv: null,
		}
	},
	 mounted: function () {
		var _this = this;
		//基于准备好的dom，初始化echarts实例
		this.highChartsDiv =new HighCharts.Chart({
                    chart: {
                        renderTo: document.getElementById('highChartsDiv'),
                        type: 'bar',
                        height: 200,
                        margin: [0, 20, 0, 40]
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        lineColor: null,
                        labels: {
                            rotation: -90
                        },
                        categories: [
                            'Brick'
                        ]
                    },
                    yAxis: [{
                        min: 0,
                        max:100,
                        endOnTick: true,
                        maxPadding: 0.02,
                        gridLineColor: null,

                        title: {
                            text: null
                        },
                        labels: {
                            y: -50
                        },


                    }],
                    legend: {
                        shadow: false,
                        verticalAlign: 'bottom'
                    },
                    tooltip: {
                        shared: true,
                        followPointer: true
                    },
                    plotOptions: {
                        column: {
                            grouping: true,
                            shadow: false,
                            borderWidth: 0
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Objetivo',
                        color: 'rgba(224,224,224,1)',
                        data: [100],
                        pointPadding: 0.3,
                        pointPlacement: -0.2
                    }, {
                        name: 'Realizado',
                        color: 'rgba(106,166,46,.9)',
                        data: [76],
                        pointPadding: 0.4,
                        pointPlacement: 0.1
                    }, {
                        type:'spline',
                        name: 'Projeção',
                        color: 'rgba(106,166,46,.9)',
                        top: 10,
                        pointPlacement: -0.05,
                        data: [95],
                        marker: {
                            radius: 8,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }]
                });
		//数据完成
	 }

}
</script>