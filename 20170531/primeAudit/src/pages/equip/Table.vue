<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="设备名称"></el-input>
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
		<el-table :data="equips" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>

			<el-table-column prop="name" label="设备名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="model" label="型号" width="100" sortable>
			</el-table-column>
			<el-table-column prop="size" label="尺寸" width="100" sortable>
			</el-table-column>
			<el-table-column prop="amount" label="数量" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sysNo" label="系统编号" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="addDate" label="投入时间" min-width="120" sortable>
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
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="true">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="设备名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="型号" prop="model">
					<el-input v-model="editForm.model" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="尺寸" prop="model">
					<el-select v-model="editForm.size" placeholder="请选择">
						<el-option
						  v-for="item in dictOptions"
						  :label="item.dis"
						  :value="item.val">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数量">
					<el-input v-model="editForm.amount" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="系统编号">
					<el-input v-model="editForm.sysNo"  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="添加时间">
					<el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="editForm.addDate"></el-date-picker>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增设备" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="设备名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="型号">
					<el-input v-model="addForm.model" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="尺寸" prop="size">
					<el-select v-model="addForm.size" placeholder="请选择">
						<el-option
						  v-for="item in dictOptions"
						  :label="item.dis"
						  :value="item.val">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数量" prop="amount">
					<el-input v-model="addForm.amount" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="系统编号" prop="sysNo">
					<el-input v-model="addForm.sysNo"  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="添加时间">
					<el-date-picker type="date"  format="yyyy-MM-dd" placeholder="选择日期" v-model="addForm.addDate"></el-date-picker>
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
	import NProgress from 'nprogress'
	import { getEqupList,addEquip, removeUser, batchRemoveUser, editEquip, addUser,removeEquip,batchRemoveEquip } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				equips: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					equipName: -1,
					model: 0,
					size: '',
					amount: 0,
					sysNo:0,
					addDate:'',
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					equipName: -1,
					model: 0,
					size: '',
					amount: 0,
					sysNo:0,
					addDate:''
				},
				//下拉菜单选项
				 dictOptions: [],

			}
		},
		methods: {

			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};

				this.$http('/hw/dict/', {code :'size'}).then((res) => console.log(res.data));
				//NProgress.start();
				/*
				getEqupList(para).then((res) => {
					this.total = res.data.total;
					this.equips = res.data.data;
					this.listLoading = false;
					NProgress.done();
				});
				*/
			},








		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>
