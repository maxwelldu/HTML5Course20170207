<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="专题名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="topiclist" highlight-current-row border v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			
			<el-table-column type="expand">
			  <template scope="props">
				<el-form label-position="left" inline class="demo-table-expand">
				  <el-form-item label="专题id">
					<span>{{ props.row.id }}</span>
				  </el-form-item>
				  <el-form-item label="专题名">
					<span>{{ props.row.topicname }}</span>
				  </el-form-item>
				  <el-form-item label="相关词">
					<span>{{ props.row.relateword }}</span>
				  </el-form-item>
				  <el-form-item label="排除词">
					<span>{{ props.row.excludeword }}</span>
				  </el-form-item>
				  <el-form-item label="负面词">
					<span>{{ props.row.negativeword}}</span>
				  </el-form-item>
				</el-form>
			  </template>
			</el-table-column>
			
			<el-table-column prop="id" label="专题id" width="100">
			</el-table-column>
			<el-table-column prop="topicname" label="专题名称" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="专题id" prop="id" v-if="isShow">
					<el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="专题名">
					<el-input v-model="editForm.topicname" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="相关词">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 24}"
					  v-model="editForm.relateword">
					</el-input>
				</el-form-item>
				<el-form-item label="排除词">
					<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 24}"
					  v-model="editForm.excludeword">
					</el-input>
				</el-form-item>
				<el-form-item label="负面词">
					<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 24}"
					  v-model="editForm.negativeword">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增专题" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="专题名:" prop="topicname">
					<el-input v-model="addForm.topicname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="相关词" prop="relateword">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 24}"
					  v-model="addForm.relateword">
					</el-input>
					<p class="confInstru">相关词组用“,”分隔，匹配规则：“*”表示“与”，“+”表示“或”，“()”表示“优先级”</p>
				</el-form-item>
				<el-form-item label="排除词">
					<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 24}"
					  v-model="addForm.excludeword">
					</el-input>
				</el-form-item>
				<el-form-item label="负面词">
					<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 24}"
					  v-model="addForm.negativeword">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				//是否显示隐藏元素
				isShow:false,
				filters: {
					name: ''
				},
				users: [],
				topiclist:[],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					topicname: '',
					relateword: '',
					excludeword: '',
					negativeword: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					topicname: [
						{ required: true, message: '请输入专题名', trigger: 'blur' }
					],
					relateword:[
						{ required: true, message: '相关词不能为空', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					id: 0,
					topicname: '',
					relateword: '',
					excludeword: '',
					negativeword: ''
				}

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				NProgress.start();
				/*
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					NProgress.done();
				});
				*/
				//
				this.$http.jsonp('http://192.168.1.66:81/biradarserver/function/api.php?op=topic_list&callback=?').then((res)=>{
					this.total = res.data.result.total;
					this.topiclist = res.data.result.topicList;
					this.listLoading = false;
					NProgress.done();

				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						NProgress.done();
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					topicname: '',
					relateword: '',
					excludeword: '',
					negativeword: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								NProgress.done();
								this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							NProgress.start();
							let para = Object.assign({}, this.addForm);
							console.log(para);
							this.$http.jsonp('http://192.168.1.66:81/biradarserver/function/api.php?op=topic_setting&callback=?',
								 {params :{
									op_type:1,topicname:para.topicname,relateword:para.relateword,excludeword:para.excludeword,negativeword:para.negativeword 
								}}
							).then((res)=>{
								this.addLoading = false;
								NProgress.done();
								if(res.data.status != '0')
								{
									this.$notify({
										title: '失败',
										message: typeOf(res.msg)!= "undefined" ?res.data.msg:"内部错误!",
										type: 'false'
									});
								}
								else{
									this.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									});
								}
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
							/*
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								NProgress.done();
								this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
							*/
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						NProgress.done();
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .confInstru{
	color:gray;
	padding-top:4px;
	font-weight:normal;
	line-height:120%;
  }

</style>