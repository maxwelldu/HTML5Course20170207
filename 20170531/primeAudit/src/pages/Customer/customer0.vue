<template>
	<!-- complex tabs -->
	<div class="col-lg-12">
        <div class="panel panel-default panelCustomer">
            <!-- panel-heading -->
            <div class="panel-body" style="margin-top:10px;">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#activated" data-toggle="tab" aria-expanded="false">已启用</a>
                    </li>
                    <li class=""><a href="#disabled" data-toggle="tab" aria-expanded="false">已禁用</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane fade in active" id="activated">
                        <div class="col-lg-10 toolBar">
														<div class="fuhejilu"><el-button type="primary" icon="document" class="fuheBut" @click="openAddDialog">新增</el-button></div>
												</div>
												<div class="col-lg-2 form-group input-group toolSearch">
														<input type="text" class="form-control">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button"><i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
												<!-- data table -->
												<div class="col-lg-12">
													<div style="height:100%">
															<table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
																	<thead>
																	<tr>
																			<th><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
																			<th>客户编号</th>
																			<th>客户名称</th>
																			<th>公司类型</th>
																			<th>公司级次</th>
																			<th>上级公司</th>
																			<th>最上级集团名称</th>
																			<th>财年开始日</th>
																			<th>财年结束日</th>
																			<th>统一社会信用代码</th>
																			<th>行业类型</th>
																			<th>币种</th>
																			<th>是否启用</th>
																			<th>运营状态</th>
																			<th>操作</th>
																	</tr>
																	</thead>
																	<tbody class="cutTaBody">
																	<template v-for="(item,index) in CusData">
																		<tr>
																			<td>1</td>
																			<td>{{item.Code}}</td>
																			<td>{{item.Name}}</td>
																			<td>{{item.Industry.text}}</td>
																			<td>{{item.Level}}</td>
																			<td>XXX</td>
																			<td>XXX</td>
																			<td>MM-DD</td>
																			<td>MM-DD</td>
																			<td>统一社会信用代码</td>
																			<td>行业类型</td>
																			<td>人民币</td>
																			<td>是</td>
																			<td>使用中</td>
																			<td>
																				<span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
																				<span class="glyphicon glyphicon-eye-open" data-toggle="tooltip" data-placement="left" title="" data-original-title="查看" style="padding-left:10px;" @click="handleEdit(item)"></span>
																			</td>
																		</tr>
																	</template>

																	</tbody>
															</table>
															<div class="col-lg-12 cusFoot">
																	<div class="col-lg-2 cusPagNum">
																		每页<div class="btn-group" style="margin:0px 10px;">
																				<button type="button" class="btn btn-default" id="pageNum">10</button>
																				<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																					<span class="caret"></span>
																					<span class="sr-only">Toggle Dropdown</span>
																				</button>
																				<ul class="dropdown-menu" style="min-width:45px;">
																					<li class="pageList" data-val="5"><a href="javascript:void(0);">5</a></li>
																					<li class="pageList" data-val="10"><a href="javascript:void(0);">10</a></li>
																					<li class="pageList" data-val="50"><a href="javascript:void(0);">50</a></li>
																					<li class="pageList" data-val="100"><a href="javascript:void(0);">100</a></li>
																				</ul>
																				</div>条
																	</div>
																	<div class="col-lg-2 cusTabInfo">当前第3页 (共有10页)</div>
																	<div class="col-lg-8 cusPagNum">
																		<nav aria-label="Page navigation">
																				<ul class="pagination">
																					<li>
																						<a href="javascript:void(0);" aria-label="Previous">
																							<span aria-hidden="true">&laquo;</span>
																						</a>
																					</li>
																					<li><a href="javascript:void(0);">1</a></li>
																					<li><a href="javascript:void(0);">2</a></li>
																					<li><a href="javascript:void(0);">3</a></li>
																					<li><a href="javascript:void(0);">4</a></li>
																					<li><a href="javascript:void(0);">5</a></li>
																					<li>
																						<a href="javascript:void(0);" aria-label="Next">
																							<span aria-hidden="true">&raquo;</span>
																						</a>
																					</li>
																				</ul>
																				</nav>
																	</div>
															</div>
													</div>
												</div>
												<div style="clear:both;"></div>
												<!-- data table end -->
                    </div>
                    <div class="tab-pane fade" id="disabled">
                        <h4>Profile Tab</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
            <!-- panel body end -->
      </div>
      <!-- panel end -->
			<!-- add dialog start -->

			<!-- add-dialog-end -->
			<addCustomer
				:visible="addModal"
				@close="closeAddDialog"
			></addCustomer>
			<viewCustomer
				:visible="viewModal"
        :rowData="rowData"
				@close="closeViewDialog"
        @edit="editCusData"
			></viewCustomer>
	</div>

</template>

<script>
	import addCustomer from './Component/addCustomer.vue';
	import viewCustomer from './Component/viewCustomer.vue';
	export default {
		components: {
    	addCustomer,
			viewCustomer
  	},
		data() {
			return {
				  addModal: false,
					viewModal: false,
					CusData: [],
          rowData: {}
			}
		},
		methods: {
			openAddDialog () {
	      this.addModal = true
    	},
	    closeAddDialog () {
      	this.addModal = false
    	},
			handleEdit: function (rowData) {//处理查看事件
	      console.log(rowData);
        this.rowData = rowData;
        this.openViewDialog();
	    },


      openViewDialog () { //打开查看模态框
	      this.viewModal = true
    	},
	    closeViewDialog () { //关闭模态框
      	this.viewModal = false
    	},
      editCusData (){ //编辑数据模态框
        this.viewModal=false;
        this.openAddDialog ();
      }
		},
		beforeMount(){// 首先获得数据
					this.$http({
					 methods: 'get',
					 url: '/dxn/customer.json',
					 transformResponse: [(data) => {
						 return JSON.parse(data.replace(/T00:00:00/g, ''))
					 }],
					 params: {

					 }
				 }).then((response) => {
					 console.log(response.data.data.Data)
					 this.CusData = response.data.data.Data;
				 }).catch((error) => {
					 console.log(error)
				 })
		},
		mounted() {
			$("#customerTable").tooltip({
				selector: "[data-toggle=tooltip]",
				container: "body"
			})
			//load datatable
		}

}
</script>

<style scoped lang="scss">
.panelCustomer{background-color: none;border: 0px solid transparent}
.panel-body{background-color: #f0f0f0;}
.tab-content{background-color: #fff;}
.nav-tabs>li>a {color:#000000;}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{color:#1dbba4;}
.tab-content{padding:10px;}
.fuhejilu{
	.fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid;}
	.fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}
/**表格样式**/
/**customer dataTable**/
#cusTool{float:left;}
.toolSearch{margin-bottom: 0px;}
.cusAdd{background-color: #fff!important;color: #1dbba4 !important;border: 1px solid #1dbba4 !important;}
.cusAdd:hover{background-color: #1dbba4!important;color: #ffffff !important;}
.cusPus{padding-right: 6px !important;}
.clear{clear: both;}
.cusSearch input{display: block;width: 100%;height: 30px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);box-shadow: inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;}
.cusFoot{ height: 40px;}
.cusPagNum{ text-align: right;
	.pagination{margin: 0px;}
}
.cusTabInfo{height: 40px;line-height: 40px;}
.table{margin-bottom: 10px; border-bottom: 1px solid #cdcece;}

#dataSearch{padding-left:0px;}
#customerTable{margin-top: 10px !important;}
#customerTable:hover{cursor:pointer;}
#customerTable>thead{background-color: #a1d9d1;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";border-bottom: 0px;}
#customerTable>thead>tr th{font-weight: normal;font-weight: 400;height: 40px;font-size:14px;text-align: center;border-bottom: 0px solid #111;padding: 0px;line-height: 40px;}
.cutTaBody{border: 0px; }
.cutTaBody tr{height: 40px;border-right: 0px solid #cdcece;}
.cutTaBody tr td{text-align: center;border-right: 1px solid #cdcece;}
.cutTaBody tr td:last-child{border-right: 0px !important;}
.tooltip{background-color: red!important; color: red;}
table.dataTable.no-footer {border-bottom: 1px solid #cdcece;}

</style>
