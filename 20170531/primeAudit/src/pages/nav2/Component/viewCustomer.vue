<!--      查看       -->

<template>
  <div v-if="visible">
    <div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                    <h4 class="modal-title" id="myModalLabel">客户管理 > 查看</h4>
                </div>
                
                <div class="modal-body">
                  <div class="button-div">
                     <div class="fuhejilu">
                       <el-button type="primary" icon="document" class="fuheBut" v-if="editBtnShow" @click="editDialog()">编辑</el-button>
                       <el-button type="primary" class="btn btn-default fuheBut" v-if="saveBtnShow" @click="saveChange(rowData.Id)"><span class="fa fa-save" style="padding-right:10px;"></span>保存</el-button>
                       <el-button type="primary" class="btn btn-default fuheBut" @click="uploadChange(rowData.Id)"><span class="fa fa-upload" style="padding-right:10px;"></span>提交</el-button>
                       <el-button type="primary" icon="document" class="fuheBut">更新</el-button>
                     </div>
                  </div>
                  <div class="projectSet">
                    <div class="subtitle"><span>项目设置</span></div>
                  </div>
                  <!--first start-->
                        <div class="form-div">
                          <div class="form-group has-feedback cusGroup">
                              <label class="col-sm-4 control-label cusConLabel">项目编号:</label>
                              <div class="col-sm-8">
                                <input disabled="disabled" type="text" class="form-control" name="cusNo" v-model="rowData.Code" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="name" ><i class="form-control-feedback" data-fv-icon-for="name"></i></div>
                          </div>
                          <div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>业务类型:</label>
                            <div class="col-sm-8">
                              <!--select class="form-control" :disabled="disabled">
                                <option></option>
                                <option></option>
                              </select-->
                              <input v-bind:value="rowData.BusinessTypeId.TreeName" v-show="disabled" type="text" disabled="false" class="form-control" name="">
                              <el-input
                                icon="search"
                                :on-icon-click="openBusinessModal"
                                v-model="businessName"
                                v-show="!disabled"
                                v-bind:value="rowData.BusinessTypeId.TreeName"
                                >
                              </el-input>
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>是否首次承接:</label>
                            <div class="col-sm-8">
                              <select class="form-control" :disabled="disabled" v-model="selected">
                                <option v-for="option in options" v-bind:value="option.value">
                                  {{option.text}}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>项目负责人:</label>
                            <div class="col-sm-8">
                              <input :disabled="disabled" v-model="rowData.ProjectManagerId.Name" type="text" class="form-control" name="cusBegin" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>审计期间开始日:</label>
                            <!--div class="col-sm-8">
                              <input v-model="rowData.StatrDate" :disabled="disabled" type="text" class="form-control" name="cusCode" value="" placeholder="">
                            </div-->
                            <div class="col-sm-8">
                              <div class="block date-select">
                                <el-date-picker
                                  v-model="rowData.StatrDate"
                                  :disabled="disabled"
                                  type="date"
                                  placeholder="选择审计日期开始日"
                                >
                                </el-date-picker>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--first end-->
                        <!--second start-->
                        <div class="form-div">
                          <div class="form-group has-feedback cusGroup">
                              <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>项目名称:</label>
                              <div class="col-sm-8">
                                <input v-model="rowData.Name" :disabled="disabled" type="text" class="form-control" name="cusNo" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="name"><i class="form-control-feedback" data-fv-icon-for="name" style="display: none;"></i>
                              </div>
                          </div>
                          <div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>被审计单位:</label>
                            <div class="col-sm-8">
                              <input @click="openUnitSet" v-model="rowData.CustomerId.Name" :disabled="disabled" type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo"><i class="form-control-feedback" data-fv-icon-for="machineNo" style="display: none;"></i>
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>老项目名称:</label>
                            <div class="col-sm-8">
                              <input v-model="rowData.OldProjectId.Name" :disabled="disabled" type="text" class="form-control" name="cusTopCompany" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>所属部门:</label>
                            <div class="col-sm-8">
                              <input :disabled="disabled" v-model="rowData.DeptId.Name" type="text" class="form-control" name="cusBegin" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="asterisk">*</span>审计期间结束日:</label>
                            <!--div class="col-sm-8">
                              <input v-model="rowData.EndDate" :disabled="disabled" type="text" class="form-control" name="cusCode" value="" placeholder="">
                            </div-->
                            <div class="col-sm-8">
                              <div class="block date-select">
                                <el-date-picker
                                  v-model="rowData.EndDate"
                                  :disabled="disabled"
                                  type="date"
                                  placeholder="选择审计日期开始日"
                                >
                                </el-date-picker>
                              </div>
                            </div>
                          </div>

                        </div>
                        <!--second end-->
                        <div style="clear:both"></div>
                <div class="unitSet">
                  <div class="subtitle"><span>基本信息设置</span></div>
                </div>
                <div class="fuhejilu xinzengBtn"><el-button type="primary" icon="document" class="fuheBut" @click="openBatchSetting">批量设置</el-button></div>
                  <div style="height:auto">
                    <table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
                        <thead class="unitThead">
                          <tr>
                              <th><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
                              <th><input type="checkbox" name=""></th>
                              <th>被审计单位</th>
                              <th>行业类型</th>
                              <th>风险等级</th>
                              <th>底稿模板</th>
                              <th>底稿附注</th>
                              <th>是否总部复核</th>
                              <th>复核总部</th>
                              <th>币种</th>
                              <th>财年开始日</th>
                              <th>财年结束日</th>
                              <th>项目合伙人</th>
                              <th>项目经理</th>
                              <th>现场负责人</th>
                              <th>编制人</th>
                              <th>状态</th>
                              <th>附件</th>
                          </tr>
                        </thead>
                        <tbody class="cutTaBody">
                          <template v-for="(item,key) in activatedData">
                            <tr>
                              <td>{{key+1}}</td>
                              <td><input type="checkbox" name=""></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              
                              <td>XXX</td>
                              <td>是</td>
                              <td>XXX</td>
                              <td>XXX</td>
                              <td>XXX</td>
                              <td>MM-DD</td>
                              <td>MM-DD</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
                                <span class="glyphicon glyphicon-eye-open" data-toggle="tooltip" data-placement="left" title="" data-original-title="查看" style="padding-left:10px;" @click="handleEdit(item)"></span>
                              </td>
                            </tr>
                          </template>

                        </tbody>
                    </table>
                  </div>
                </div>
                
                <!--div class="modal-footer">
                   
                </div-->
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
    <businessList
      :visible="businessModal"
      @close="closeBusinessModal"
    >
    </businessList>
  </div>
</template>

<script>
import batchSetting from '../Component/batchSetting.vue'
import businessList from '../Component/businessList.vue'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    batchSetting,
    businessList
  },
  data() {
    return {
      unitSetting: false,
      batchSettingModal: false,
      disabled: true,
      editBtnShow: true,
      saveBtnShow: false,
      options: [
        {text:"是" , value:"false"},
        {text:"否" , value:"true"}
      ],
      selected: Boolean,
      activatedData: {},
      businessModal: false,
      businessName: ""
    }
  },
  props: {
    visible: Boolean,
    rowId: String,
    rowData: Object
  },
  created: function(){

  },
  beforeMount(){
    var getCodePars = {
//        'Dxn_LoginUser': "c96e31b8-1c7b-c299-a1fd-08d39b1c789a",
    'limit': "10",
    'page': "1",
    'p_schema': "Project/ProjectMember",
    'start': "0",
    'filter': "[]",
    'isSelect': "false",
    'sort': "[]",
    'query_ProjectId': "this.rowData.Id"
    }
    var self = this
    axios.post("http://dingxin.cmsmate.cn:80/form/TreeList",
        qs.stringify(getCodePars)
        , {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
    .then(function (response) {
      self.activatedData = JSON.parse(response.data.data)
      self.activatedData = self.activatedData["Data"]
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    close () {
      this.$emit('close');
      this.unitSetting = false
      this.editBtnShow = true
      this.disabled = true
      this.saveBtnShow = false
      console.log(this.rowData)
    },
    openUnitSet() {
      this.unitSetting = true
    },
    openBatchSetting() {
      this.batchSettingModal = true
    },
    closeBatchSetting() {
      this.batchSettingModal = false
    },
    editDialog() {
      this.disabled = false
      this.editBtnShow = false
      this.saveBtnShow = true
    },
    saveChange(projectId) { //  保存
      console.log(projectId)
      this.disabled = true
      this.editBtnShow = true
      this.saveBtnShow = false
    },
    uploadChange(projectId) { //  提交
      console.log(projectId)
    },
    closeBusinessModal() {
      this.businessModal = false
    },
    openBusinessModal() {
      this.businessModal = true
    }
  },
  mounted() {
    console.log('add load...');
    //load datatable
  }
}
</script>

<style scoped lang="scss">
/**对话框样式**/
#addModal {margin-top: 200px; }
.modal-dialog {width: 1300px;}
.modal-content{}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"微软雅黑"; padding: 0px !important; padding-left: 10px !important;}
.modal-header button{color: red;font-size: 24px; }
.modal-header .close{margin-top: 0px; padding-right: 10px; font-size: 28px;}

.modal-title{font-weight: normal;font-size: 13px; height: 30px; line-height: 30px; }
.cusGroup{height: 36px;line-height: 36px;}
.cusConLabel{text-align: right;}
.button-div{margin-left: 10px;margin-top: 10px;margin-bottom: 10px;}

.projectSet{background-color: #F6F6F6; height: 30px; line-height: 30px;margin-top: 10px;}
.unitSet{background-color: #F6F6F6; height: 30px; line-height: 30px;}
.unitThead{background-color: #1DBBA4;}
/*
.fuhejilu{
  .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid; height: 30px; width: 60px;line-height: 5px; font-size: 13px;}
  .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}
*/
/*  表格样式  */
#dataSearch{padding-left:0px;}
#customerTable{margin-top: 10px !important;}
#customerTable:hover{cursor:pointer;}
#customerTable>thead{background-color: #a1d9d1;font-family:"微软雅黑","Microsoft YaHei",Arial,Helvetica,sans-serif;border-bottom: 0px;}
#customerTable>thead>tr th{font-weight: normal;font-weight: 400;height: 40px;font-size:14px;text-align: center;border-bottom: 0px solid #111;padding: 0px;line-height: 40px;}
.cutTaBody{border: 0px; }
.cutTaBody tr{height: 40px;border-right: 0px solid #cdcece;}
.cutTaBody tr td{text-align: center;border-right: 1px solid #cdcece;}
.cutTaBody tr td:last-child{border-right: 0px !important;}
.tooltip{background-color: red!important; color: red;}
table.dataTable.no-footer {border-bottom: 1px solid #cdcece;}

.subtitle{
  padding: 0 1%;
  border-left: 5px solid #1DBBA4;
  font-weight: normal;
  margin: 1% 0;
  height: 30px;
  margin-top: 5px;
}
.subtitle span{font-size: 13px;}

.modal-body label{
  font-weight: normal;
  font-size: 13px;
}

.el-button--primary{background-color: #fff;border-color: #1DBBA4;color: #1DBBA4}

.fuhejilu{
  .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid; height: 30px; width: 60px;line-height: 5px; font-size: 13px;}
  .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}

/*
.fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid;}
.fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
*/
.form-div{
  width:600px; 
  float:left;
  margin-top: 15px;
}

.form-control{height: 30px !important;font-size: 13px;}
.el-input{height: 30px !important;}

.modal-body{
  max-height: 600px;
  height: 600px;
  overflow-y: auto;
  padding: 0;
}
.el-date-editor.el-input{width: 100%;}
tbody tr:hover{
  background-color: #C9E9E5;
}
.asterisk{
  color: red;
}
.form-control{height: 30px !important;font-size: 13px;}
.xinzengBtn{margin-left: 10px;margin-top: 10px;}
.xinzengBtn .fuheBut{width: 85px !important}
.el-button{padding: 0px}
</style>
