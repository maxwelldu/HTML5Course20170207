<template>
	<!-- complex tabs -->
	<div class="col-lg-12" style="padding-right: 10px;padding-left: 10px;">
        <div class="panel panel-default panelCustomer">
            <!-- panel-heading -->
            <div class="panel-body" style="margin-top:10px;">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs">
                    <li class="tabLi active" v-on:click="IsQueryEnalbed(1)"><a href="#activated" data-toggle="tab" aria-expanded="fals e">已启用</a>
                    </li>
                    <li class="tabLi" v-on:click="IsQueryEnalbed(0)"><a href="#disabled" data-toggle="tab" aria-expanded="false" >已禁用</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
									  <!--第一个页签开始-->
                    <div class="tab-pane fade in active" id="activated">
                        <div class="col-lg-10 toolBar">
														<div class="fuhejilu"><el-button type="primary" icon="document" class="fuheBut" @click="handleAdd">新增</el-button>
														</div>
												</div>
												<div class="col-lg-2 form-group input-group toolSearch" style="display:none;">
														<input type="text" class="form-control">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button"><i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
												<!-- data table -->
												<div class="col-lg-12" style="padding-left:10px;">
													<div style="height:100%">
														<div style="width:100%;overflow:auto;">
															<table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
																	<thead>
																	<tr>
																			<th style="width:40px;"><span class="glyphicon glyphicon-search" id="dataSearch" @click="triggerSearch"></span></th>
																			<th style="width:80px;" @click="handleSort('Code')">客户编号</th>
																			<th @click="handleSort('Name')">客户名称</th>
																			<th style="width:80px;" @click="handleSort('CustomerAuditType')">公司类型</th>
																			<th style="width:80px;" @click="handleSort('Level')">公司级次</th>
																			<th @click="handleSort('ParentId')">上级公司</th>
																			<th @click="handleSort('TopCustomerId')">最上级集团名称</th>
																			<th style="display:none;" @click="handleSort('Redundancy')">财年开始日</th>
																			<th style="display:none;" @click="handleSort('Redundancy2')">财年结束日</th>
																			<th style="width:160px;" @click="handleSort('OrgCode')" >统一社会信用代码</th>
																			<th @click="handleSort('Industry')">行业类型</th>
																			<th style="width:80px;" @click="handleSort('Currency')">币种</th>
																			<th style="display:none;">是否启用</th>
																			<th style="width:80px;" @click="handleSort('DocStatus')">运营状态</th>
																			<th style="width:100px;">操作</th>
																	</tr>
																	</thead>
																	<tbody class="cutTaBody">
																		<tr id="contSearch" v-show="showSearch">
																			<td style="width:40px;"></td>
																			<td><input v-model="Code" v-on:blur="mutilSearch()"/></td><!--客户编号-->
																			<td><input v-model="Name" v-on:blur="mutilSearch()"/> </td><!--客户名称-->
																			<td>
																					<select v-model="CustomerAuditType"  v-on:blur="mutilSearch()">
																						<option ></option>
																						<option value="10">母公司</option>
																						<option value="70">子公司</option>
																						<option value="80">分公司</option>
																					</select>
																			</td><!--客户公司类型-->
																			<td><input v-model="Level" v-on:blur="mutilSearch()"/></td><!--公司次级-->
																			<td><input v-model="ParentId" v-on:blur="mutilSearch()"/></td><!--上级公司-->
																			<td><input v-model="TopCustomerId" v-on:blur="mutilSearch()"/></td><!--上级集团名称-->
																			<td style="display:none;"><input v-model="Redundancy" v-on:blur="mutilSearch()"/></td><!--财年开始日-->
																			<td style="display:none;"><input v-model="Redundancy2" v-on:blur="mutilSearch()"/></td><!--财年结束日-->
																			<td><input v-model="OrgCode" v-on:blur="mutilSearch()"/></td><!--统一社会信用代码-->
																			<td>
																				<select v-model="CustomerIndustry"  v-on:blur="mutilSearch()">
																					<option></option>
					                                <option value="411">农、林、牧、渔业</option>
					                                <option value="433">采矿业</option><option value="449">制造业</option><option value="646">电力、燃气及水的生产和供应业</option><option value="656">建筑业</option><option value="663">交通运输、仓储和邮政业</option><option value="696">信息传输、计算机服务和软件业</option><option value="710">批发和零售业</option><option value="731">住宿和餐饮业</option><option value="741">金融业</option><option value="762">房地产业</option><option value="768">租赁和商务服务业</option><option value="782">科学研究、技术服务和地质勘查业</option><option value="806">水利、环境和公共设施管理业</option><option value="818">居民服务和其他服务业</option><option value="833">教育</option><option value="840">卫生、社会保障和社会福利业</option><option value="854">文化、体育和娱乐业</option><option value="882">公共管理和社会组织</option><option value="906">国际组织</option>
																					<option value="910">综合类</option>
																				</select>
																			</td><!--行业类型-->
																			<td>
																				<select  v-model="CustomerCurrency"  v-on:blur="mutilSearch()">
					                                <option></option>
					                                <option value="10">人民币</option>
					                                <option value="20">美元</option>
					                                <option value="30">港元</option>
					                                <option value="40">日元</option>
					                                <option value="50">新加坡元</option>
					                              </select>
																			</td>
																			<td></td>
																			<td>
																				<select v-model="CustomerDocStatus"  v-on:blur="mutilSearch()">
																					<option></option>
																					<option value="10">新创建</option>
																					<option value="20">审批中</option>
																					<option value="30">使用中</option>
																					<option value="40">已禁用</option>
																				</select>
																			</td>
																			<td style="display:none;">
																			</td>
																		</tr>
																	<template v-for="(item,index) in CusData">
																		<tr  @dblclick.prevent="dbClickRow(item.Id)">
																			<td style="width:40px;">{{index + 1}}</td>
																			<td>{{item.Code}}</td>
																			<td :title="item.Name">{{item.Name}}</td>
																			<td>{{item.CustomerAuditType.text}}</td>
																			<td @click="showLevel(item)">{{item.Level}}</td>
																			<td :title="item.ParentId.Name">{{item.ParentId.Name}}</td>
																			<td :title="item.TopCustomerId.Name">{{item.TopCustomerId.Name}}</td>
																			<td style="display:none;">{{item.Redundancy}}</td>
																			<td style="display:none;">{{item.Redundancy2}}</td>
																			<td>{{item.OrgCode}}</td>
																			<td :title="item.Industry.text">{{item.Industry.text}}</td>
																			<td>{{item.Currency.text}}</td>
																			<td style="display:none;">{{item.IsEnabled.text}}</td>
																			<td>{{item.DocStatus.text}}</td>
																			<td>
																				<span class="fa fa-chain" data-toggle="tooltip" data-placement="left" data-original-title="查看关联项目" title="查看关联项目" @click="showAssociatedModal"></span>
																				<span class="glyphicon glyphicon-minus-sign" data-toggle="tooltip" data-placement="left" title="禁用" data-original-title="禁用" style="padding-left:10px;" @click="banItem(item)"></span>
																				<span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="删除" data-original-title="删除" style="padding-left:10px;"></span>

																			</td>
																		</tr>
																	</template>

																	</tbody>
															</table>
															</div>
															<div class="col-lg-12 cusFoot">
																<div class="cusPagNum" style="float:left;"><!--翻页列表-->
																	<nav  v-if="totalPage < 7" aria-label="Page navigation">
																			<ul class="pagination">
																				<li v-bind:class="{'disabled':curPage <= 1,'butDisable':curPage <= 1}">
																					<a href="javascript:void(0);" aria-label="Previous" @click="pageTurn(curPage-1)">
																						<span aria-hidden="true" style="font-family: cursive;">&lt;</span>
																					</a>
																				</li>
																				<template v-for="(item,index) in totalPage">
																						<li v-if="(index+1) == curPage"><a class="aPageNumActived" href="javascript:void(0);"  @click="pageTurn(index+1)">{{index+1}}</a></li>
																						<li v-else><a href="javascript:void(0);"  @click="pageTurn(index+1)">{{index+1}}</a></li>
																				</template>
																				<li v-bind:class="{'disabled':curPage >= totalPage,'butDisable':curPage >= totalPage}">
																					<a href="javascript:void(0);" aria-label="Next"  @click="pageTurn(curPage+1)">
																						<span aria-hidden="true" style="font-family: cursive;">&gt;</span>
																					</a>
																				</li>
																			</ul>
																	</nav>
																</div>
																<div class="inputPageDiv">
																	第<input class="form-control inputPage">页
																</div>
																<div class="PagNumSel" style="width:160px;float:left;">
																	每页
																	<div class="btn-group">
																      <button type="button" class="btn btn-default selBut">5</button>
																      <button type="button" class="btn btn-default dropdown-toggle selButTri" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																        <span class="caret"></span>
																        <span class="sr-only">Toggle Dropdown</span>
																      </button>
																      <ul class="dropdown-menu">
																        <li><a href="#">10</a></li>
																        <li><a href="#">15</a></li>
																        <li><a href="#">50</a></li>
																        <li><a href="#">100</a></li>
																      </ul>
																    </div>
																		条
																</div>
																<!--
																	<div class="cusPagNum" style="float:left;margin-left:20px;">
																		每页<select v-model="pagevalue">
																			 <option>5</option>
																			 <option>10</option>
																			 <option>20</option>
																			 <option>50</option>
																			 <option>100</option>
																		 </select>条
																	</div>
																-->
																	<div class="cusTabInfo" style="float:left;margin-left:20px;">当前第{{curPage}}页 (共有{{totalPage}}页)</div>

															</div>
													</div>
												</div>
												<div style="clear:both;"></div>
												<!-- data table end -->
                    </div>
                    <div class="tab-pane fade" id="disabled">
                        <!--第二个页签开始-->
														<!-- data table -->
														<div class="col-lg-12">
															<div style="height:100%">
																<div style="width:100%;overflow:auto;">
																	<table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
																			<thead>
																			<tr>
																				<th><span class="glyphicon glyphicon-search" id="dataSearch" @click="triggerSearch"></span></th>
																				<th @click="handleSort('Code')">客户编号</th>
																				<th @click="handleSort('Name')">客户名称</th>
																				<th @click="handleSort('CustomerAuditType')">公司类型</th>
																				<th @click="handleSort('Level')">公司级次</th>
																				<th @click="handleSort('ParentId')">上级公司</th>
																				<th @click="handleSort('TopCustomerId')" style="width:150px;">最上级集团名称</th>
																				<th @click="handleSort('Redundancy')">财年开始日</th>
																				<th @click="handleSort('Redundancy2')">财年结束日</th>
																				<th @click="handleSort('OrgCode')" style="width:150px;">统一社会信用代码</th>
																				<th @click="handleSort('Industry')">行业类型</th>
																				<th @click="handleSort('Currency')">币种</th>
																				<th>是否启用</th>
																				<th @click="handleSort('DocStatus')">运营状态</th>
																				<th>操作</th>
																			</tr>
																			</thead>
																			<tbody class="cutTaBody">
																				<tr id="contSearch" v-show="showSearch">
																					<td></td>
																					<td><input v-model="Code" v-on:blur="mutilSearch()"/></td><!--客户编号-->
																					<td><input v-model="Name" v-on:blur="mutilSearch()"/> </td><!--客户名称-->
																					<td>
																							<select v-model="CustomerAuditType"  v-on:blur="mutilSearch()">
																								<option ></option>
																								<option value="10">母公司</option>
																								<option value="70">子公司</option>
																								<option value="80">分公司</option>
																							</select>
																					</td><!--客户公司类型-->
																					<td><input v-model="Level" v-on:blur="mutilSearch()"/></td><!--公司次级-->
																					<td><input v-model="ParentId" v-on:blur="mutilSearch()"/></td><!--上级公司-->
																					<td><input v-model="TopCustomerId" v-on:blur="mutilSearch()"/></td><!--上级集团名称-->
																					<td><input v-model="Redundancy" v-on:blur="mutilSearch()"/></td><!--财年开始日-->
																					<td><input v-model="Redundancy2" v-on:blur="mutilSearch()"/></td><!--财年结束日-->
																					<td><input v-model="OrgCode" v-on:blur="mutilSearch()"/></td><!--统一社会信用代码-->
																					<td>
																						<select v-model="CustomerIndustry"  v-on:blur="mutilSearch()">
																							<option></option>
																							<option value="411">农、林、牧、渔业</option>
																							<option value="433">采矿业</option><option value="449">制造业</option><option value="646">电力、燃气及水的生产和供应业</option><option value="656">建筑业</option><option value="663">交通运输、仓储和邮政业</option><option value="696">信息传输、计算机服务和软件业</option><option value="710">批发和零售业</option><option value="731">住宿和餐饮业</option><option value="741">金融业</option><option value="762">房地产业</option><option value="768">租赁和商务服务业</option><option value="782">科学研究、技术服务和地质勘查业</option><option value="806">水利、环境和公共设施管理业</option><option value="818">居民服务和其他服务业</option><option value="833">教育</option><option value="840">卫生、社会保障和社会福利业</option><option value="854">文化、体育和娱乐业</option><option value="882">公共管理和社会组织</option><option value="906">国际组织</option>
																							<option value="910">综合类</option>
																						</select>
																					</td>
																					<td>
																						<select v-model="CustomerCurrency"  v-on:blur="mutilSearch()">
							                                <option></option>
							                                <option value="10">人民币</option>
							                                <option value="20">美元</option>
							                                <option value="30">港元</option>
							                                <option value="40">日元</option>
							                                <option value="50">新加坡元</option>
							                              </select>
																					</td>
																					<td></td>
																					<td>
																							<select v-model="CustomerDocStatus" v-on:blur="mutilSearch()">
																								<option></option>
																								<option value="10">新创建</option>
																								<option value="20">审批中</option>
																								<option value="30">使用中</option>
																								<option value="40">已禁用</option>
																							</select>
																					</td>
																					<td>
																					</td>
																				</tr>
																			<template v-for="(item,index) in CusData">
																				<tr  @dblclick.prevent="dbClickRow(item.Id)">
																					<td>{{index + 1}}</td>
																					<td>{{item.Code}}</td>
																					<td>{{item.Name}}</td>
																					<td>{{item.CustomerAuditType.text}}</td>
																					<td @click="showLevel(item)">{{item.Level}}</td>
																					<td>{{item.ParentId.Name}}</td>
																					<td>{{item.TopCustomerId.Name}}</td>
																					<td>{{item.Redundancy}}</td>
																					<td>{{item.Redundancy2}}</td>
																					<td>{{item.OrgCode}}</td>
																					<td>{{item.Industry.text}}</td>
																					<td>{{item.Currency.text}}</td>
																					<td>{{item.IsEnabled.text}}</td>
																					<td>{{item.DocStatus.text}}</td>
																					<td>
																						<span class="fa fa-chain" data-toggle="tooltip" data-placement="left" title="" data-original-title="查看关联项目" @click="showAssociatedModal"></span>
																						<span class="fa fa-check-circle-o" data-toggle="tooltip" data-placement="left" title="" data-original-title="开启" style="padding-left:10px;" @click="banItem(item)"></span>
																						<span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除" style="padding-left:10px;"></span>

																					</td>
																				</tr>
																			</template>

																			</tbody>
																	</table>
																	</div>
																	<div class="col-lg-12 cusFoot">
																		<div class="cusPagNum" style="float:left;">
																			<nav  v-if="totalPage < 7" aria-label="Page navigation">
																					<ul class="pagination">
																						<li>
																							<a href="javascript:void(0);" aria-label="Previous" @click="pageTurn(curPage-1)">
																								<span aria-hidden="true" class="fa fa-chevron-left"></span>
																							</a>
																						</li>
																						<template v-for="(item,index) in totalPage">
																								<li v-if="(index+1) == curPage"><a class="aPageNumActived" href="javascript:void(0);"  @click="pageTurn(index+1)">{{index+1}}</a></li>
																								<li v-else><a href="javascript:void(0);"  @click="pageTurn(index+1)">{{index+1}}</a></li>
																						</template>
																						<li>
																							<a href="javascript:void(0);" aria-label="Next"  @click="pageTurn(curPage+1)">
																								<span aria-hidden="true" style="font-family: cursive;">&gt;</span>
																							</a>
																						</li>
																					</ul>
																			</nav>
																		</div>
																			<div class="cusPagNum" style="float:left;margin-left:20px;">
																				每页<select v-model="pagevalue">
																					 <option>5</option>
																					 <option>10</option>
																					 <option>20</option>
																					 <option>50</option>
																					 <option>100</option>
																				 </select>条
																			</div>
																			<div class="cusTabInfo" style="float:left;margin-left:20px;">当前第{{curPage}}页 (共有{{totalPage}}页)</div>

																	</div>
															</div>
														</div>
														<div style="clear:both;"></div>
												<!--第二个页签结束-->
                    </div>
                </div>
            </div>
            <!-- panel body end -->
      </div>
      <!-- panel end -->
			<!-- add dialog start -->

			<!-- add-dialog-end -->
			<addCustomer></addCustomer>
			<viewCustomer></viewCustomer>
			<LevelCustomer></LevelCustomer>
			<AssociatedProDialog></AssociatedProDialog>
			<MsgDialog></MsgDialog>


	</div>

</template>

<script>
	import qs from 'qs'
	import addCustomer from './Component/addCustomer.vue';
	import viewCustomer from './Component/viewCustomer.vue';
	import LevelCustomer from './Component/LevelCustomer.vue';
	import MsgDialog from './Component/MsgDialog.vue';
	import AssociatedProDialog from './Component/AssociatedPro.vue';
	export default {
		components: {
    	addCustomer,
			MsgDialog,
			viewCustomer,
			LevelCustomer,
			AssociatedProDialog
  	},
		data() {
				return {//控制翻页组合
        pagevalue: '5',//当前page值
				showSearch: false,//是否显示搜索
				Code: '',//搜索input框
				Name: '',//客户名称
				CustomerAuditType: '',//公司类型
				Level:'',//公司级次
				IsEnabledFilter:{"field":"IsEnabled","value":["10"],"type":"list","comparison":"in"},//全局过滤条件
				ParentId:'',//上级公司
				TopCustomerId:'',//最上级集团名称
				Redundancy:'',//财年开始日
				Redundancy2:'',//财年结束日
				OrgCode:'',//组织结构代码
				CustomerIndustry:'',//行业类型
				CustomerCurrency:'',//人民币类型
				CustomerDocStatus:'',//运行状态
				CustomerSort:{"property":"Name","direction":"ASC"}//记录当前排序状态
      }
		},
		computed: {
	    CusData: function () {
	      return this.$store.state.customer.CusData
	    },
			totalPage: function () {
	      return this.$store.state.customer.CusTotalPage
	    },
			curPage: function (){
				return this.$store.state.customer.CusCurPage
			}
  	},
		watch: {//监测
			  'pagevalue': function () { //每页翻页数发生变化
					console.log('commit fetch!');
				 	this.$store.commit('fetchCusDataMut', {limit: this.pagevalue}) //提前挂载
				}
		},
		methods: {
			showAssociatedModal: function () {
	      this.$store.commit('AssociatedModalMut', {isShow: true})
	    },
			handleAdd: function(){//添加元素
				this.$store.dispatch('showAddModal', {isShow: true})
			},
			dbClickRow: function(Id){//行双击
				console.log(Id)
				this.$store.dispatch('showViewModal', {isShow: true, Id: Id})
			},
			showLevel: function(item){//点击展示级次
				console.log(item.Id)
				this.$store.dispatch('getTopTree', {Id: item.Id})
			},
			pageTurn: function(index){//翻页
				this.$store.commit('fetchCusDataMut', {page: index})
			},
			triggerSearch: function(){//触发搜索
				if(this.showSearch){
					this.showSearch = false;
					this.Code='';
					this.Name='';
					this.CustomerAuditType='';
					this.mutilSearch();
				}
				else {
					this.showSearch = true;
				}
			},
			mutilSearch: function(){//复合搜索
				//开始逐步遍历变量 拼接查询条件
				console.log("mutilSearch!");
				var filter=[]
				if(this.Code){//客户编号
						var codeFilter={"field":"Code","value":this.Code,"type":"string","comparison":"like"};
						filter.push(codeFilter);
				}
				if(this.Name){//客户名称
					var nameFilter={"field":"Name","value":this.Name,"type":"string","comparison":"like"};
					filter.push(nameFilter);
				}
				if(this.CustomerAuditType){
					var TemArr=[this.CustomerAuditType]
					var customerAuditTypeFilter={"field":"CustomerAuditType","value":TemArr,"type":"list","comparison":"in"};
					filter.push(customerAuditTypeFilter);
				}
				if(this.Level){
					var customerLevelFilter={"field":"Level","value":this.Level,"type":"string","comparison":"eq"}
					console.log(customerLevelFilter)
					filter.push(customerLevelFilter);
				}
				if(this.ParentId){//上级集团
					var customerParentIdFilter={"field":"ParentId","value":this.ParentId,"type":"string","comparison":"like"}
					filter.push(customerParentIdFilter);
				}
				if(this.TopCustomerId){//最上级集团
					var customerTopCustomerIdFilter={"field":"TopCustomerId","value":this.TopCustomerId,"type":"string","comparison":"like"}
					filter.push(customerTopCustomerIdFilter);
				}
				if(this.Redundancy){//财年开始日
					var customerRedundancyFilter={"field":"Redundancy","value":this.Redundancy,"type":"string","comparison":"like"}
					filter.push(customerRedundancyFilter);
				}
				if(this.Redundancy2){//财年结束日
					var customerRedundancy2Filter={"field":"Redundancy2","value":this.Redundancy2,"type":"string","comparison":"like"}
					filter.push(customerRedundancy2Filter);
				}
				if(this.OrgCode){//组织机构代码
					var customerOrgCodeFilter={"field":"OrgCode","value":this.OrgCode,"type":"string","comparison":"like"}
					filter.push(customerOrgCodeFilter);
				}
				if(this.CustomerIndustry){
					var TemArr=[this.CustomerIndustry]
					var customerIndustryFilter={"field":"Industry","value":TemArr,"type":"list","comparison":"in"};
					filter.push(customerIndustryFilter);
				}
				if(this.CustomerCurrency){
					var TemArr=[this.CustomerCurrency]
					var customerCurrencyFilter={"field":"Currency","value":TemArr,"type":"list","comparison":"in"};
					filter.push(customerCurrencyFilter);
				}
				if(this.CustomerDocStatus){
					var TemArr=[this.CustomerDocStatus]
					var customerDocStatusFilter={"field":"DocStatus","value":TemArr,"type":"list","comparison":"in"};
					filter.push(customerDocStatusFilter);
				}
				filter.push(this.IsEnabledFilter);
				this.$store.commit('fetchCusDataMut', {filter: JSON.stringify(filter)})//提交搜索
			},
			handleSort: function(property){//CustomerSort:{"property":"Name","direction":"ASC"}//触发列头排序
				var direction='ASC'
				if(this.CustomerSort.property == property)
				{
					if(this.CustomerSort.direction == 'ASC')
						this.CustomerSort.direction = 'DESC'
					else {
						this.CustomerSort.direction = 'ASC'
					}
					direction=this.CustomerSort.direction
				}else {
					this.CustomerSort.property=property
				}
				var filter=[]
				var SortFilter={"property":property,"direction":direction};
				filter.push(SortFilter);
				this.$store.commit('fetchCusDataMut', {sort: JSON.stringify(filter)})//提交搜索
			},
			IsQueryEnalbed : function(isEnabled){//触发页签
				var filter=[]
				if(isEnabled == 0)
					this.IsEnabledFilter = {"field":"IsEnabled","value":["20"],"type":"list","comparison":"in"};
				else
					this.IsEnabledFilter  = {"field":"IsEnabled","value":["10"],"type":"list","comparison":"in"};
				filter.push(this.IsEnabledFilter);

				this.$store.commit('fetchCusDataMut', {filter: JSON.stringify(filter),page: 1})//提交搜索
			}
		},
		beforeCreate(){
			this.$store.commit('fetchCusDataMut', {}) //提前挂载
			console.log('Customer beforeCreate!')
		},
		beforeMount(){// 首先获得数据
			console.log('CusTomer beforeMout')
			//this.$store.commit('fetchCusDataMut', {})
		},
		mounted() {
			/*$("#customerTable").tooltip({
				selector: "[data-toggle=tooltip]",
				container: "body"
			})
			*/
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
	.fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid; height: 30px; width: 60px;line-height: 5px;}
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
.cusFoot{ height: 30px;}
.cusPagNum{ text-align: right;height: 30px; line-height: 30px;margin-top: 1px;
	.pagination{margin: 0px;}
}
.cusTabInfo{height: 30px;line-height: 30px;}
.table{margin-bottom: 10px; border-bottom: 1px solid #cdcece;}
#contSearch input{width: 80%;}

#dataSearch{padding-left:0px;}
#customerTable{margin-top: 10px !important;table-layout:fixed;}
#customerTable:hover{cursor:pointer;}
#customerTable>thead{background-color: #a1d9d1;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";border-bottom: 0px;}
#customerTable>thead>tr th{font-weight: normal;font-weight: 400;height: 30px;font-size:13px;text-align: center;border-bottom: 0px solid #111;padding: 0px;line-height: 30px;border-right: 1px solid #cdcece;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody{border: 0px; font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr{height: 30px;border-right: 0px solid #cdcece;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr:hover{background-color:#bae7e0;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr td{text-align: center;border-right: 1px solid #cdcece;overflow:hidden;text-overflow:ellipsis;word-break:keep-all;white-space:nowrap;font-size:13px !important;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";height: 30px;padding:0px 8px; line-height: 30px;}
.cutTaBody tr td:first-child{border-left: 1px solid #cdcece;}
.cutTaBody tr td:last-child{/*border-right: 0px !important*/;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.tooltip{background-color: red!important; color: red;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
table.dataTable.no-footer {border-bottom: 1px solid #cdcece;}
.pagination{}
.pagination>li>a, .pagination>li>span{border:1px solid #fff; color: #000;padding: 1px 10px; background-color: #fff;margin-left: 2px;}
/*
.pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover{border:1px solid #1dbba4; border-radius: 4px; color: #1dbba4;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
*/
.aPageNumActived{border:1px solid #1dbba4 !important; border-radius: 4px !important; color: #1dbba4 !important;}
.panel{-webkit-box-shadow: 0 0px 0px rgba(0,0,0,.05);font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.panel-body {padding:0px;}
.tab-content{padding: 10px 0px;}
.nav-tabs>li {margin-left: 10px;}
.col-lg-10{padding-left:10px;}
.col-lg-12{padding-left: 10p;padding-right: 10px;}
.tabLi{height: 30px;}
.tabLi a{height: 30px; line-height: 30px; padding:0px 10px 0px 10px;font-size:13px;}
.el-button{padding:0px;font-size: 13px;}
.butDisable{}
.butDisable a{color:#ccc !important;}
.inputPageDiv{float:left;padding:0px 10px 0px 10px;line-height: 26px;margin: 0px;}
.inputPage {display: inline; width: 40px;height: 23px;margin:-1px 4px 0px 4px;border: 1px solid #1dbba4;line-height: 30px;}
.selBut{padding:0px 2px; border-color: #1dbba4;width: 40px;height: 23px;}
.selButTri{padding:0px 2px; border-color: #1dbba4;height: 23px;}
.PagNumSel{ text-align: right;height: 30px; margin-top: 4px;}
</style>
