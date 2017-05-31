<template>
	<section>
		<el-row >
			<!--左侧-->
			<el-col :span="4" style="background-color:#ffffff;">
				<div class="leftView">
					<div class="tip">我的总进度</div>
					<div id="chartPie"></div>
					<div class="tip">项目总进度</div>
					<div id="chartColumn"></div>
					<div class="recentTip">
						<div class="tip">最近打开被审计单位</div>
					</div>

					<div id="recentPro">
						<ul>
								<li><a href="#">大海科技有限公司(合并)</a></li>
								<li><a href="#">大海科技有限公司(本部)</a></li>
								<li><a href="#">大海科技有限公司(A)</a></li>
								<li><a href="#">大海科技有限公司(B)</a></li>
								<li><a href="#">大海科技有限公司(C)</a></li>
						</ul>
					</div>
				</div>
			</el-col>
			<!--右侧-->
		  <el-col :span="20">
				<div class="rightView">
					<!--任务栏开始-->
					<div class="toolBar">
						<div class="search">
							<el-input placeholder="请输入内容">
									<el-button slot="append" icon="search" class="searchIcon"></el-button>
	 						</el-input>
						</div>
						<div class="fuhejilu"><el-button type="primary" icon="document" class="fuheBut">复核记录</el-button></div>
						<div class="fuheCheck"><el-checkbox v-model="checked" class="fuheSel">未完成</el-checkbox></div>
					</div>
					<!--表单开始-->
					<div style="clear:both"></div>
					<!--表单开始-->
					<div class="divTable">

						<div class="wt100" style="position:relative; overflow:hidden; height:100%">
						    <table id="example" class="display" cellspacing="0" width="100%" style="display:block;">
						        <thead style="background-color:#B1E8E0;height:50px;display:block;width:100%;">
						        <tr style="font-size:14px; font-weight:normal;line-height:50px; width:100%;display:block;">
						            <th style="width:19%; font-weight:normal">被审计单位</th>
						            <th style="width:12%; font-weight:normal;text-align:center;">我的进度</th>
						            <th style="width:6.6%; font-weight:normal;text-align:center;">项目次级</th>
						            <th style="width:6.6%; font-weight:normal;text-align:center;">风险等级</th>
						            <th style="width:6.8%; font-weight:normal;text-align:center;">是否总部审核</th>
						            <th style="width:6.6%; font-weight:normal;text-align:center;">项目合伙人</th>
						            <th style="width:6.6%; font-weight:normal;text-align:center;">项目经理</th>
						            <th style="width:6.6%; font-weight:normal;text-align:center;">现场负责人</th>
												<th style="width:18%; font-weight:normal;text-align:center;">项目进度</th>
						        </tr>
						        </thead>
						        <tbody style="display:block;width:100%;">
						        <tr style="font-size:14px; font-weight:normal;line-height:50px; width:100%;display:block;">
						            <td style="width:16%; font-weight:normal">大海科技有限公司</td>
												<td style="width:12%; font-weight:normal;text-align:center;"></td>
						            <td style="width:6.6%; font-weight:normal;text-align:center;">1</td>
						            <td style="width:6.6%; font-weight:normal;text-align:center;">A</td>
						            <td style="width:6.8%; font-weight:normal;text-align:center;">是</td>
						            <td style="width:6.6%; font-weight:normal;text-align:center;">李明</td>
						            <td style="width:6.6%; font-weight:normal;text-align:center;">张三</td>
												<td style="width:6.6%; font-weight:normal;text-align:center;">李四</td>
												<td style="width:18%; font-weight:normal;text-align:center;"></td>
						        </tr>


						        </tbody>
						    </table>
						</div>

					</div>
					<!--表单结束-->
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script>

import echarts from 'echarts/echarts.common.min.js'
export default {
    data() {
        return {
            chartPie: null,
						chartColumn: null,
						 checked: true,
						 tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        }
    },
    mounted: function () {
        var _this = this;
        //基于准备好的dom，初始化echarts实例
        _this.chartPie = echarts.init(document.getElementById('chartPie'));
				_this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        _this.chartPie.setOption({
            //配置开始
						tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'horizontal',
				        x: 'center',
								y: 15,
				        data:['复核完成','复核中']
				    },
				    series: [
				        {
				            name:'我的进度',
				            type:'pie',
				            radius: ['50%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:335, name:'复核完成',itemStyle:{ normal:{color:'#5a92d1'}}},
				                {value:310, name:'复核中',itemStyle:{ normal:{color:'#8bb2df'}}},
				            ]
				        }
				    ]
						//配置结束
        });

				//柱状图开始
				this.chartColumn.setOption({
						tooltip: {},
						xAxis: {
								data: ["编辑中", "复核中", "复核完成"]
						},
						yAxis: {},
						series: [{
								name: '项目总进度',
								type: 'bar',
								data: [
									{value:20, name:'复核完成',itemStyle:{ normal:{color:'#5a92d1'}}},
									{value:10, name:'复核中',itemStyle:{ normal:{color:'#8bb2df'}}},
									{value:5, name:'编辑中',itemStyle:{ normal:{color:'#bdd3ec'}}},
								]
						}]
				});

				//柱状图结束
    }

}

</script>

<style scoped lang="scss">
.leftView{height: 100%; background-color: #ffffff;}
.rightView{margin: 20px 20px 0px 20px; background-color: #ffffff; height: 500px;}
.leftView{}
.tip{border-left:4px solid #1dbba4; padding:0px 0px 0px 10px; margin-top: 20px;}
.recentTip{border-bottom: 1px solid #f1f1f2;padding-bottom: 20px;}
#chartPie{width:100%;height:300px;border-bottom: 1px solid #f1f1f2;}
#chartColumn{width:100%; height:300px;border-bottom: 1px solid #f1f1f2;}
#recentPro{width:100%;margin-bottom: 80px;border-bottom: 1px solid #f1f1f2; }
#recentPro ul{list-style-type: none;}
#recentPro ul li{line-height: 30px;}
#recentPro ul li a{line-height: 30px; color:#000000;}
.toolBar{height: 65px;
	.search{width:250px;float: left;margin-left: 50px;margin-top: 20px;}
	.el-input-group__append{border:0px;}
	.el-button{background-color: #1dbba4;border:0px;}
	.el-button:hover{background-color: #18a38e;}
	.searchIcon{color:#fff;font-size: 16px;}
	.fuhejilu{float:left;margin-left: 20px;margin-top: 20px;
		.fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid;}
		.fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
	}
	.fuheCheck{float: left;height: 36px; margin-left: 20px; margin-top: 20px; line-height: 36px; font-weight: normal !important;}
	.fuheSel{color:#000;font-weight:normal;}
	.el-checkbox__input.is-checked .el-checkbox__inner{background-color: red !important;border-color: red;}

}
.divTable{margin-top: 10px;}
</style>
