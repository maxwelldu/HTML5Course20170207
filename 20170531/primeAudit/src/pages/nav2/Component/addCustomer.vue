<!--    新增    -->

<template>
  <div v-if="visible">
    <div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                    <h4 class="modal-title" id="myModalLabel">项目管理 > 已激活 > 新增</h4>
                </div>
                <div class="modal-body">
                  <div class="button-div">
                    <!--button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-save" style="padding-right:10px;"></span>保存</button>
                    <button type="button" class="btn btn-primary"><span class="fa fa-upload"></span>提交</button>
                    <button type="button" class="btn btn-primary"><span class="fa fa-upload"></span>更新</button-->
                    <div class="fuhejilu"><el-button @click="saveNew" type="primary" class="btn btn-default fuheBut"><span class="fa fa-save"></span>保存</el-button>
                    <el-button type="primary" class="btn btn-default fuheBut"><span class="fa fa-upload"></span>提交</el-button>
                    <!--<el-button type="primary" icon="document" class="btn btn-default fuheBut"><span></span>更新</el-button>--></div>
                  </div>
                  <div class="projectSet">
                    <div class="subtitle"><span>项目设置</span></div>
                  </div>
                  <!--first start-->
                    <div style="" class="form-div">
                      <div class="form-group has-feedback cusGroup">
                          <label class="col-sm-4 control-label cusConLabel">项目编号:</label>
                          <div class="col-sm-8">
                            <input  disabled="disabled" type="text" class="form-control" name="cusNo" v-model="this.newProjectID" placeholder="" required="" data-fv-notempty-message="项目编号必填" data-fv-field="name"><i class="form-control-feedback" data-fv-icon-for="name" style="display: none;"></i>
                          </div>
                      </div>
                      <div class="form-group has-feedback cusGroup">
                        <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>业务类型:</label>
                        <div class="col-sm-8">
                          <!--input @click="openBusinessModal" type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo"-->
                          <el-input
                            icon="search"
                            :on-icon-click="openBusinessModal"
                            v-model="businessName"
                            v-bind:class="{isRed:isRed}"
                            >
                          </el-input>
                          <i class="form-control-feedback" data-fv-icon-for="machineNo" style="display: none;"></i>
                          <small class="help-block" data-fv-validator="notEmpty" data-fv-for="machineNo" data-fv-result="NOT_VALIDATED" style="display: none;">业务类型必填</small>
                        </div>
                      </div>
                      <div class="form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>是否首次承接:</label>
                        <div class="col-sm-8">
                          <select class="form-control" v-model="selected">
                            <option v-for="option in options" v-bind:value="option.value">
                              {{option.text}}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group cusGroup">
                        <label  class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>项目负责人:</label>
                        <div class="col-sm-8">
                          <input v-model="userName" disabled="false" type="text" class="form-control" name="cusBegin" value="" placeholder="">
                        </div>
                      </div>
                      <div class="form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>审计期间开始日:</label>
                        <div class="col-sm-8">
                          <div class="block date-select">
                            <el-date-picker
                              v-model="startDate"
                              type="date"
                              placeholder="选择审计日期开始日"
                              v-bind:class="{isRed:isRed}"
                            >
                            </el-date-picker>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--first end-->
                    <!--second start-->
                    <div style="width:600px; float:left;" class="form-div">
                      <div class="form-group has-feedback cusGroup">
                          <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>项目名称:</label>
                          <div class="col-sm-8">
                            <input v-bind:class="{isRed:isRed}" v-model:value="projectName" type="text" class="form-control" name="cusNo" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="name"><i class="form-control-feedback" data-fv-icon-for="name" style="display: none;"></i>
                          <small class="help-block" data-fv-validator="notEmpty" data-fv-for="name" data-fv-result="NOT_VALIDATED" style="display: none;">客户编号必填</small></div>
                      </div>
                      <div class="form-group has-feedback cusGroup">
                        <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>被审计单位:</label>
                        <div class="col-sm-8">
                          <!--input @click="openUnitSet" type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo"-->
                          <el-input
                            v-model="unitName"
                            icon="search"
                            :on-icon-click="openUnitSet"
                            v-bind:class="{isRed:isRed}"
                          >
                          </el-input>
                          <i class="form-control-feedback" data-fv-icon-for="machineNo" style="display: none;"></i>
                        <small class="help-block" data-fv-validator="notEmpty" data-fv-for="machineNo" data-fv-result="NOT_VALIDATED" style="display: none;">客户编号必填</small></div>
                      </div>
                      <div class="form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>老项目名称:</label>
                        <div class="col-sm-8">
                          <input v-show="selected" @click="openOldProjectModal" type="text" class="form-control" name="cusTopCompany" disabled="false" value="" placeholder="">
                          <el-input
                            v-model="oldProjectName"
                            v-show="!selected"
                            icon="search"
                            :on-icon-click="openOldProjectModal">
                          </el-input>
                        </div>
                      </div>
                      <div class="form-group cusGroup">
                        <label  class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>所属部门:</label>
                        <div class="col-sm-8">
                          <input v-model="userDeparment" disabled="false" type="text" class="form-control" name="cusBegin" value="" placeholder="">
                        </div>
                      </div>
                      <div class="form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>审计期间结束日:</label>
                        <div class="col-sm-8">
                          <div class="block date-select">
                            <el-date-picker
                              v-model="endDate"
                              type="date"
                              placeholder="选择审计日期结束日"
                            >
                            </el-date-picker>
                          </div>
                        </div>
                      </div>

                    </div>
                    <!--second end-->
                  <div style="clear:both"></div>
                  <div v-show="unitSetting" class="unitTable">
                <div class="unitSet">
                  <div class="subtitle"><span>基本信息设置</span></div>
                </div>
                <div class="fuhejilu xinzengBtn"><el-button type="primary" icon="document" class="fuheBut" @click="openBatchSetting">批量设置</el-button></div>
                  <div style="height:100%">
                    <table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
                        <thead class="unitThead">
                          <tr>
                              <th><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
                              <th><input type="checkbox" name=""></th>
                              <th>被审计单位</th>
                              <th>行业类型</th>
                              <th width="60">风险等级</th>
                              <th>底稿模板</th>
                              <th>底稿附注</th>
                              <th width="85">是否总部复核</th>
                              <th>复核总部</th>
                              <th>币种</th>
                              <th width="75">财年开始日</th>
                              <th width="75">财年结束日</th>
                              <th width="75">项目合伙人</th>
                              <th width="65">项目经理</th>
                              <th width="75">现场负责人</th>
                              <th width="55">编制人</th>
                              <th width="60">状态</th>
                              <th width="60">附件</th>
                          </tr>
                        </thead>
                        <tbody class="cutTaBody">
                          <template v-for="(item,key) in customerList">
                            <tr>
                              <td>{{item.Code}}</td>
                              <td><input type="checkbox" name=""></td>
                              <td>{{item.Name}}</td>
                              <td>{{item.Industry}}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td><span>{{partnerName}}</span><img style="margin-left: 5px;" src="static/img/project/search.png" @click="openProjectPartner"></td>
                              <td><span>{{manageName}}</span><img style="margin-left: 5px;" src="static/img/project/search.png" @click="openManage"></td>
                              <td><span>{{leadingName}}</span><img style="margin-left: 5px;" src="static/img/project/search.png" @click="openLeading"></td>
                              <td><span>{{editorName}}</span><img style="margin-left: 5px;" src="static/img/project/search.png" @click="openEditor"></td>
                              <td></td>
                              <td>
                                <span class="glyphicon glyphicon-eye-open" data-toggle="tooltip" data-placement="left" title="" data-original-title="查看" style="padding-left:10px;" @click="handleEdit(item)"></span>
                              </td>
                            </tr>
                          </template>

                        </tbody>
                    </table>
                  </div>
                </div>
               </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <div class="modal-backdrop fade in"></div>
    <batchSetting
      :visible="batchSettingModal"
      @close="closeBatchSetting"
    >
    </batchSetting>
    <unitDialog
      :visible="unitModal"
      @close="closeUnitSet"
      @unitName="unitChoose"
      @unitId="unitIdSet"
    >
    </unitDialog>
    <businessList
      :visible="businessModal"
      @close="closeBusinessModal"
      @businessName="businessChoose"
      @businessId="businessIdSet"
    >
    </businessList>
    <oldProject
      :visible="oldProjectModal"
      @oldProject="projectChoose"
      @close="closeOldProjectModal"
    >
    </oldProject>
    <projectPartner
    :visible="partnerModal"
    @close="closeProjectPrtner"
    @partnerId="partnerIdSet"
    @partnerName="partnerNameSet"
    >
    </projectPartner>
    <editor
    :visible="eidtorModal"
    @close="closeEditor"
    @editorId="editorIdSet"
    @editorName="editorNameSet"
    >
    </editor>
    <leading
    :visible="leadingModal"
    @close="closeLeading"
    @leadingId="leadingIdSet"
    @leadingName="leadingNameSet"
    >
    </leading>
    <projectManage
    :visible="manageModal"
    @close="closeManage"
    @manageId="manageIdSet"
    @manageName="manageNameSet"
    >
    </projectManage>
  </div>
</template>

<script>
import batchSetting from '../Component/batchSetting.vue'
import unitDialog from '../Component/unitDialog.vue'
import businessList from '../Component/businessList.vue'
import oldProject from '../Component/oldProject.vue'
import projectPartner from '../Component/projectPartner'
import editor from '../Component/editor'
import leading from '../Component/leading'
import projectManage from '../Component/projectManage'
import Vue from "vue"
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    batchSetting,
    unitDialog,
    businessList,
    oldProject,
    projectPartner,
    editor,
    leading,
    projectManage,
  },
  data() {
    return {
      unitData: [],
      batchSettingModal: false,
      unitSetting: false,
      unitModal: false,
      businessModal: false,
      oldProjectModal: false,
      partnerModal: false,
      eidtorModal: false,
      leadingModal: false,
      manageModal: false,
      partnerName: "",
      partnerId: "",
      leadingName: "",
      leadingId: "",
      editorName: "",
      editorId: "",
      manageName: "",
      manageId: "",
      startDate: '',
      endDate: '',
      customerList: [],
      newProjectID: '',
      options: [
        {text:"是",value:true},
        {text:"否",value:false},
      ],
      selected: Boolean,
      businessName: "",
      businessId: "",
      projectName: "",
      isRed: false,
      oldProjectName: "",
      unitName: "",
      unitId: "",
      userId: "",
      userName: "",
      userDeparment: "",
      oldProjectId: "",
      isFrist: "",
      deptId: ""
    }
  },
  props: {
    visible: Boolean,

  },
  validators: {
    noempty:function(val){
        var reg = /^\s*$/g, isFlag = true;
        if(val == "" || reg.test(val)){
            isFlag = false;
        }
        return  isFlag;
    }
  },
  methods: {
    close () {
      this.$emit('close');
      this.unitSetting = false
      this.isRed = false
      this.oldProjectName = ""
      this.unitName = ""
      this.businessName = ""
      this.selected = true
      //console.log(this.businessName)
    },
    openAlert() {
      this.$confirm('是否生成被审计单位列表?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.unitSetting = true
        var self = this
        var getCodePars = {
        'oldProjectId': self.oldProjectId,
        'customerId': self.unitId
        }
        axios.post("http://dingxin.cmsmate.cn:80/Project/SetProjectCutomer",
            qs.stringify(getCodePars)
            , {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          })
        .then(function (response) {
          self.customerList = JSON.parse(response.data.data)
         // self.customerList = self.customerList.data
          console.log(self.customerList)
        })
        .catch(function (error) {
          console.log(error);
        });

        this.$message({
          type: 'success',
          message: '生成成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消生成'
        });          
      });
    },
    openBatchSetting() {
      this.batchSettingModal = true
    },
    closeBatchSetting() {
      this.batchSettingModal = false
    },
    openUnitSet() {
      this.unitModal = true
    },
    closeUnitSet() {
      this.unitModal = false
    },
    closeBusinessModal() {
      this.businessModal = false
    },
    openBusinessModal() {
      this.businessModal = true
    },
    openOldProjectModal() {
      if(this.unitId === ""){this.unitAlert()}
        else{this.oldProjectModal = true}
    },
    closeOldProjectModal() {
      this.oldProjectModal = false
    },
    closeProjectPrtner() {
      this.partnerModal = false
    },
    openProjectPartner() {
      this.partnerModal = true
    },
    closeEditor() {
      this.eidtorModal = false
    },
    openEditor() {
      this.eidtorModal = true
    },
    closeManage() {
      this.manageModal = false
    },
    openManage() {
      this.manageModal = true
    },
    closeLeading() {
      this.leadingModal = false
    },
    openLeading() {
      this.leadingModal = true
    },
    /*
    blurTest(value) {
      if (value === "") { 
          this.isRed = true
      }else{
          this.isRed = false
      }
    },
    */
    businessChoose(value) {
      this.businessName = value
    },
    businessIdSet(value) {
      this.businessId = value
    },
    projectChoose(value) {
      this.oldProjectName = value
    },
    unitChoose(value) {
      this.openAlert()
      this.unitName = value
    },
    unitIdSet(value) {
      this.unitId = value
    },
    unitAlert() {
      this.$alert('请先选择被审计单位', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '请先选择被审计单位'
          });
        }
      });
    },
    partnerIdSet(value) {
      this.partnerId = value
    },
    partnerNameSet(value) {
      this.partnerName = value
    },
    leadingIdSet(value) {
      this.leadingId = value
    },
    leadingNameSet(value) {
      this.leadingName = value
    },
    editorIdSet(value) {
      this.editorId = value
    },
    editorNameSet(value) {
      this.editorName = value
    },
    manageNameSet(value) {
      this.manageName = value
    },
    manageIdSet(value) {
      this.manageId = value
    },
    saveNew() {
      if(this.selected){this.isFrist = "10"}
      else{this.isFrist = "20"}
      var self = this
      var getCodePars = {
        //'Id': "",
        //'entityName': "Project",
        //'Code': "",
        'Name': self.projectName,
        'BusinessTypeId': self.businessId,
        'CustomerId': self.unitId,
        'AppraiseTable': self.isFrist,
        //'OldProjectId': self.oldProjectId,
        'ProjectManageId': self.userId,
        "DeptId": self.deptId,
        "StartDate": self.startDate,
        "EndDate": self.endDate,
        "DocStatus": "10",
        'status': "10",
        'p_schema': "Project/Project",
        'add': "false",
        'StateType': "Modified",
        'isReload': "true",
        'ProjectCustomer': self.customerList, //  被审计单位信息
        'ProjectMembers': [{'ProjectCopartnerId':self.partnerId},{'SitemanagerId':self.leadingId},{'ProjectManagerId':self.manageId}]  //  被审计单位项目成员
      }
      axios.post("http://dingxin.cmsmate.cn:80/form/save",
          qs.stringify(getCodePars)
          , {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted() {
//    console.log('add load...');
    //load datatable
    
    this.$on("businessName",function(businessName) {
      //console.log(businessName)
    })
    
  },
  beforeMount() {
    var self = this
    var getCodePars = {
    'entityType': "Project",
    'method': "ManualProjectCode",
    'args': '["57c24e4e-c77f-c2ba-b57d-08d39b1c2fdf"]'
    }
    axios.post("http://dingxin.cmsmate.cn:80/Common/CallEntityStaticMethod",
        qs.stringify(getCodePars)
        , {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
    .then(function (response) {
      self.newProjectID = response.data.data
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get("http://dingxin.cmsmate.cn:80/Project/GetLoginName",
      qs.stringify()
      , {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then(function (response) {
      var userInfo = JSON.parse(response.data.data)
      self.userName = userInfo.Name
      self.userDeparment = userInfo.DeptName
      console.log(userInfo)
      self.userId = userInfo.Id
      self.deptId = userInfo.DeptId
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}
</script>

<style scoped lang="scss">
/**对话框样式**/
#addModal {margin-top: 200px; }
#batchSetting {margin-top: 200px;}
.modal-dialog {width: 1300px;}
.modal-content{}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"微软雅黑"; padding: 0px !important; padding-left: 10px !important;}
.modal-header button{color: red;font-size: 24px; }
.modal-title{font-weight: normal;font-size: 13px; height: 30px; line-height: 30px; }
.cusGroup{height: 36px;line-height: 36px;}
.cusConLabel{text-align: right;}
.projectSet{background-color: #F6F6F6; height: 30px; line-height: 30px;}
.unitSet{background-color: #F6F6F6; height: 30px; line-height: 30px;}
.unitThead{background-color: #1DBBA4;}

#cusTool{float:left;}
.toolSearch{margin-bottom: 0px;}
.cusAdd{background-color: #fff!important;color: #1dbba4 !important;border: 1px solid #1dbba4 !important;}
.cusAdd:hover{background-color: #1dbba4!important;color: #ffffff !important;}
.cusPus{padding-right: 6px !important;}
.clear{clear: both;}

.cusFoot{ height: 40px;}
.cusPagNum{ text-align: right;
  .pagination{margin: 0px;}
}
.cusTabInfo{height: 40px;line-height: 40px;}
.table{margin-bottom: 10px; border-bottom: 1px solid #cdcece;}
.fuhejilu{
  .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid; height: 30px; width: 60px;line-height: 5px; font-size: 13px;}
  .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}
/*el-button span{margin-left: 0px;}*/
.modal-header .close{margin-top: 0px; padding-right: 10px; font-size: 28px;}

.button-div{margin-left: 10px;margin-top: 10px;margin-bottom: 10px;}

.form-control{height: 30px !important;font-size: 13px;}
.el-input{height: 30px !important;}
/*.el-button{height: 30px; width: 60px;}*/

/*  表格样式  */
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


.el-date-editor.el-input{width: 100%;}

.subtitle{
  padding: 0 1%;
  border-left: 5px solid #1DBBA4;
  font-weight: normal;
  margin: 1% 0;
  height: 30px;
  margin-top: 5px;
}
.subtitle span{font-size: 13px;}
.modal-body{
  max-height: 600px;
  height: 400px;
  overflow-y: auto;
  padding: 0;
}

.modal-body label{
  font-weight: normal;
  font-size: 13px;
}

.el-button--primary{background-color: #fff;border-color: #1DBBA4;color: #1DBBA4}
/*
.fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid;font-size: 13px;}
.fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
*/
.form-div{
  width:600px; 
  float:left;
  margin-top: 15px;
}
.borderColor{
  border-color: red;
}
.asterisk{
  color: red;
}
tbody tr:hover{
  background-color: #C9E9E5;
}
.el-button{padding: 0px}
.isRed{border-color: red !important;}

.xinzengBtn{margin-left: 10px;margin-top: 10px;}
.xinzengBtn .fuheBut{width: 85px !important}
</style>
<style type="text/css">
  .el-input__inner{height: 30px;font-size: 13px}
</style>