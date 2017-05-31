<!--	老项目		-->

<template>
	<div v-if="visible">
		<div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                <div class="modal-header">
	                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
	                    <h4 class="modal-title" id="myModalLabel">项目管理 > 已激活 > 新增 > 被审计单位</h4>
	                </div>
	                <div class="modal-body">
	                	<div class="button-div">
	                	<div class="fuhejilu">
	                		<el-button @click="confirm" type="primary" class="btn btn-default fuheBut"><span class="fa fa-save" style="padding-right:10px;"></span>确认</el-button>
		                    <el-button @click="close" type="primary" class="btn btn-default fuheBut"><span class="fa fa-upload" style="padding-right:10px;"></span>取消</el-button>
	                	</div>
		                    
	                  	</div>
	                  	<div style="height:100%">
		                	<table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
		                        <thead class="unitThead">
		                          <tr>
		                              <th width="30"><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
		                              <th>项目编号</th>
		                              <th>项目名称</th>
		                              <th>被审计单位</th>
		                              <th width="70">业务类型</th>
		                              <th width="110">审计时间开始日</th>
		                              <th width="110">审计时间结束日</th>
		                              <th width="70">项目负责人</th>
		                              <th>部门</th>
		                              
		                              <!--th>是否首次承接</th-->
		                          </tr>
		                        </thead>
		                        <tbody class="cutTaBody">
		                          <template v-for="(item,key) in oldProjectList">
		                            <tr @click="chooseProject(item.Id,item.Name)">
		                              <td>{{key+1}}</td>
		                              <td>{{item.Code}}</td>
		                              <td>{{item.Name}}</td>
		                              <td>{{item.CustomerId.Name}}</td>
		                              <td>{{item.BusinessTypeId.TreeName}}</td>
		                              <td>{{item.StatrDate}}</td>
		                              <td>{{item.EndDate}}</td>
		                              <td>{{item.ProjectManagerId.Name}}</td>
		                              <td>{{item.DeptId.Name}}</td>
		                              
		                              <!--td>{{item.AppraiseTable.text}}</td-->
		                            </tr>
		                          </template>

		                        </tbody>
		                    </table>
	                    </div>
	                  	<div style="clear:both"></div>
	                </div>

	            </div>
	            <!-- /.modal-content -->
	        </div>
	        <!-- /.modal-dialog -->
	    </div>
	</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default{
	data() {
		return{
			oldProjectList: [],
			oldProjectName: "",
			oldProjectId: ""
		}
	},
	props: {
		visible: Boolean
	},
	methods: {
		close () {
	      this.$emit('close');
	    },
	    confirm() {
	    	this.$emit("oldProject",this.oldProjectName)
	    	this.$emit('close')
	    },
	    chooseProject(oldProjectId,oldProjectName) {
	    	this.oldProjectName = oldProjectName
	    	this.oldProjectId = oldProjectId
	    }
	},
	beforeMount() {
		var self = this
	    var getCodePars = {
	    'limit':"5",
	    'page':"1",
	    'p_schema':"Project/ProjectSelector",
	    'start':"0",
	    'filter':"[]",
	    'isSelect':"false",
	    'sort':"[]"
	    }
	    axios.post("http://dingxin.cmsmate.cn:80/form/list",
	        qs.stringify(getCodePars)
	        , {
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	      })
	    .then(function (response) {
//	      	console.log(response.data.data)
	      	self.oldProjectList = JSON.parse(response.data.data)
	      	self.oldProjectList = self.oldProjectList.Data
	      	console.log(self.oldProjectList)
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}
}
</script>

<style scoped lang="scss">
/**	对话框样式	**/
#addModal {margin-top: 200px; }
.modal-dialog {width: 900px;}
.modal-content{}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"微软雅黑"; padding: 0px !important; padding-left: 10px !important;}
.modal-header button{color: red;font-size: 24px; }
.modal-title{font-weight: normal;font-size: 13px; height: 30px; line-height: 30px; }
.cusGroup{height: 36px;line-height: 36px;}
.cusConLabel{text-align: right;}
.modal{z-index: 1080;}
.modal-backdrop{z-index: 1060;}

#cusTool{float:left;}
.toolSearch{margin-bottom: 0px;}
.cusAdd{background-color: #fff!important;color: #1dbba4 !important;border: 1px solid #1dbba4 !important;}
.cusAdd:hover{background-color: #1dbba4!important;color: #ffffff !important;}
.cusPus{padding-right: 6px !important;}
.clear{clear: both;}
.cusSearch input{display: block;width: 100%;height: 30px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);box-shadow: inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;}
.cusFoot{ height: 40px;}
.cusPagNum{ text-align: right;height: 40px; line-height: 40px;
  .pagination{margin: 0px;}
}
.cusTabInfo{height: 40px;line-height: 40px;}
.table{margin-bottom: 10px; border-bottom: 1px solid #cdcece;}

.button-div{margin-bottom: 10px;}
.fuhejilu{
  .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid; height: 30px; width: 60px;line-height: 5px; font-size: 13px;}
  .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}
.table>thead>tr>th{font-weight: 400}
thead {background-color: #1dbba4}

/*	表格样式	*/
#dataSearch{padding-left:0px;}
#customerTable{margin-top: 10px !important;}
#customerTable:hover{cursor:pointer;}
#customerTable>thead{background-color: #a1d9d1;font-family:"微软雅黑","Microsoft YaHei",Arial,Helvetica,sans-serif;border-bottom: 0px;}
#customerTable>thead>tr th{font-weight: normal;font-weight: 400;height: 30px;font-size:13px;text-align: center;border-bottom: 0px solid #111;padding: 0px;line-height: 30px;}
.cutTaBody{border: 0px; }

.cutTaBody tr{height: 30px;border-right: 0px solid #cdcece;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr:hover{background-color:#e8fffc;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr td{text-align: center;border-right: 1px solid #cdcece;overflow:hidden;text-overflow:ellipsis;word-break:keep-all;white-space:nowrap;font-size:13px !important;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";height: 30px;padding:0px 8px; line-height: 30px;}
.tooltip{background-color: red!important; color: red;}
table.dataTable.no-footer {border-bottom: 1px solid #cdcece;}

table{
table-layout:fixed;
} 
tbody tr:hover{
  background-color: #C9E9E5;
}

.table thead tr th{
  white-space:nowrap;
}

.modal-body{
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
}

.el-button{padding: 0px}
</style>