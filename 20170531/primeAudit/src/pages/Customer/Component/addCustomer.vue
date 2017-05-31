<template>
  <div v-show="visible">
    <div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                    <h4 class="modal-title" id="myModalLabel">客户管理 > 新增</h4>
                </div>
                <div class="modal-footer">
                   <button type="button" class="btn btn-default PU" data-dismiss="modal"><span class="glyphicon glyphicon-edit" style="padding-right:10px;"></span>编辑</button>
                   <button type="button" class="btn btn-default PU" data-dismiss="modal"><span class="fa fa-save" style="padding-right:10px;"></span>保存</button>
                   <button type="button" class="btn btn-default PU" @click="handleAdd"><span class="fa fa-upload" style="padding-right:10px;"></span>提交</button>
                   <button style="display:none;" type="button" class="btn btn-default PU" data-dismiss="modal"><span class="fa fa-check-circle-o" style="padding-right:10px;"></span>启用</button>
                   <button style="display:none;" type="button" class="btn btn-default PU" data-dismiss="modal"><span class="glyphicon glyphicon-minus-sign" style="padding-right:10px;"></span>禁用</button>
                </div>
                <form id="register-form" role="form" class="form-horizontal" method="get">
                <div class="modal-body" id="validatorDiv">
                  <!--first start-->
                        <div style="width:450px; float:left;">
                          <div class="form-group has-feedback cusGroup">
                              <label class="col-sm-4 control-label cusConLabel">客户编号:</label>
                              <div class="col-sm-8">
                                <input type="text" id="Code" class="form-control" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="name"  v-model="Code" disabled/>
                            </div>
                          </div>

                          <div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="star">*</span>公司类型:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo">-->
                              <select class="form-control" id="CustomerAuditType" v-model="CustomerAuditType" type="select" name="CustomerAuditType" lable="公司类型">
                                <option></option>
                                <option value="10">母公司</option>
                                <option value="70">子公司</option>
                                <option value="80">分公司</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="star">*</span>上级公司:</label>
                            <div class="col-sm-8 form-group input-group" style="padding-left:14px;width:306px;">
                                <input id="ParentId" :disabled="parentIddisabled" class="form-control" name="cusTopCompany" value="" placeholder="">
                                <span class="input-group-btn" v-show="treeSearch" style="line-height:34px;">
                                    <button class="btn btn-default" type="button"><i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                            <div class="col-sm-8" style="display:none;">
                              <input id="ParentId" type="text" class="form-control" name="cusTopCompany" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel"><span class="star">*</span>财年开始日:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusBegin" value="" placeholder="">-->

                                <el-date-picker
                                  v-model="StatrMonth"
                                  type="date"
                                  format="MM-dd"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions0">
                                </el-date-picker>

                            </div>

                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="star">*</span>统一社会信用码:</label>
                            <div class="col-sm-8">
                              <input type="text" id="OrgCode" v-model="OrgCode" class="form-control" name="cusCode" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="star">*</span>币种:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusMoneyType" value="" placeholder="">-->
                              <select class="form-control" v-model="Currency" id="Currency" type="select" name="Currency" controltype="Combobox" lable="币种">
                                <option></option>
                                <option value="10">人民币</option>
                                <option value="20">美元</option>
                                <option value="30">港元</option>
                                <option value="40">日元</option>
                                <option value="50">新加坡元</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <!--first end-->
                        <!--second start-->
                        <div style="width:450px; float:left;">
                          <div style="display:block;" class="form-group cusGroup">
                              <label class="col-sm-4 control-label cusConLabel" for="Name"><span class="star">*</span>客户名称:</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control" id="Name" v-model="Name" name="Name" value="" placeholder="" />
                              </div>
                          </div>


                          <div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="star">*</span>公司级次:</label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control" id="Level" value="" disabled v-model="companyLevel">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="star">*</span>最上级集团名称:</label>
                            <div class="col-sm-8">
                              <input type="text" id="TopCustomerId" class="form-control" name="cusTopCompany" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel"><span class="star">*</span>财年结束日:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusBegin" value="" placeholder="">-->

                              <el-date-picker
                                v-model="EndMonth"
                                type="date"
                                disabled
                                placeholder="选择日期"
                                format='MM-dd'
                                :picker-options="pickerOptions0">
                              </el-date-picker>

                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel"><span class="star">*</span>行业类型:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusCode" value="" placeholder="">-->
                              <select class="form-control" v-model="Industry" id="Industry" lable="行业类型">
                                <option></option>
                                <option value="411">农、林、牧、渔业</option>
                                <option value="433">采矿业</option><option value="449">制造业</option><option value="646">电力、燃气及水的生产和供应业</option><option value="656">建筑业</option><option value="663">交通运输、仓储和邮政业</option><option value="696">信息传输、计算机服务和软件业</option><option value="710">批发和零售业</option><option value="731">住宿和餐饮业</option><option value="741">金融业</option><option value="762">房地产业</option><option value="768">租赁和商务服务业</option><option value="782">科学研究、技术服务和地质勘查业</option><option value="806">水利、环境和公共设施管理业</option><option value="818">居民服务和其他服务业</option><option value="833">教育</option><option value="840">卫生、社会保障和社会福利业</option><option value="854">文化、体育和娱乐业</option><option value="882">公共管理和社会组织</option><option value="906">国际组织</option><option value="910">综合类</option></select>
                            </div>
                          </div>
                        </div>
                        <!--second end-->
                        <div style="clear:both"></div>

                </div>
              </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->

    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  data(){
    return {
      pickerOptions0: {
        disabledDate(time) {
          //return time.getTime() < Date.now() - 8.64e7;
        }
      },
       StatrMonth: '',//财年开始日
       CustomerAuditType:'10',
       Name:'',//客户名称
       OrgCode:'',//统一社会信用代码不能为空
       Industry:'',//行业类型不能为空
       Currency:'',//币种类型不能为空
       treeSearch:false,//是否显示搜索树
       parentIddisabled:true,//上级id是否使用
    }
  },
  computed: {
    visible: function () {
      return this.$store.state.customer.CusAddModalVisible
    },
    Code: function(){
      return this.$store.state.customer.Code
    },
    companyLevel: function(){
      var level = ''
      if(this.CustomerAuditType == 10){
        this.treeSearch = false
        this.parentIddisabled=true
        level=1
      }
      else if(this.CustomerAuditType == 70){
        this.treeSearch=true
        this.parentIddisabled=false
        level=2
      }
      else if(this.CustomerAuditType == 80){
        this.treeSearch=true
        this.parentIddisabled=false
       level=3
      }
      return level
    },
    EndMonth: function(){//财年结束
      if(this.StatrMonth){
        const date = new Date();
        return date.setTime(this.StatrMonth- 3600 * 1000 * 24);
      }else {
        return ''
      }
    },
  },
  methods: {
    // 关闭掉对话框
    close: function () {
      this.$store.dispatch('showAddModal', {isShow: false})
    },
    handleAdd: function () {
      console.log(this.Name)
      if(this.Name==''){//客户名称为空
        this.$store.commit('MsgModalMut',{isShow:true,msg:"客户名称不能为空"})
        $("#Name").addClass("has-error")
        $("#Name").focus();
        return
      }else {
        $("#Name").removeClass("has-error")
      }
      if(this.CustomerAuditType == ''){//公司类型为空
        this.$store.commit('MsgModalMut',{isShow:true,msg:"公司类型不能为空"})
        $("#CustomerAuditType").addClass("has-error")
        $("#CustomerAuditType").focus();
        return
      }else {
          $("#CustomerAuditType").removeClass("has-error")
      }
      if(this.StatrMonth == ''){//财年开始月不能为空
        this.$store.commit('MsgModalMut',{isShow:true,msg:"财年开始日不能为空"})
        $("#StatrMonth").addClass("has-error")
        $("#StatrMonth").focus();
        return
      }else {
          $("#StatrMonth").removeClass("has-error")
      }
      if(this.OrgCode == '' || this.OrgCode.length != 18){//统一社会信用代码验证
        this.$store.commit('MsgModalMut',{isShow:true,msg:"统一社会信用代码长度不正确"})
        $("#OrgCode").addClass("has-error")
        $("#OrgCode").focus();
        return
      }else {
          $("#OrgCode").removeClass("has-error")
      }
      if(this.Industry == ''){//行业类型验证
        this.$store.commit('MsgModalMut',{isShow:true,msg:"行业类型不能为空"})
        $("#Industry").addClass("has-error")
        $("#Industry").focus();
        return
      }else {
          $("#Industry").removeClass("has-error")
      }
      if(this.Currency == ''){//币种类型不能为空
        this.$store.commit('MsgModalMut',{isShow:true,msg:"币种类型不能为空"})
        $("#Currency").addClass("has-error")
        $("#Currency").focus();
        return
      }else {
          $("#Currency").removeClass("has-error")
      }


      this.$store.dispatch('addClient',{
        Timestamp:'',
        Code: $('#Code').val(),
        Name: $('#Name').val(),
        CustomerAuditType: $('#CustomerAuditType').val(),
        Level: $('#Level').val(),
        ParentId: $('#ParentId').val(),
        TopCustomerId: $('#TopCustomerId').val(),
        StatrMonth: moment(this.StatrMonth).format("YYYY-MM-DD").substring(5,7),
        EndMonth: moment(this.EndMonth).format("YYYY-MM-DD").substring(5,7),
        OrgCode: $('#OrgCode').val(),
        Industry: $('#Industry').val(),
        Currency: $('#Currency').val(),
      })
    }
  },
  beforeCreate() {
    console.log('beforCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('addCode')
/*
    //mounted 开始
    $("#register-form").validate({//表单验证开始
		    errorElement : 'span',
		    errorClass : 'help-block',
		rules : {
        Name : "required",
		},
		messages : {
      Name : "客户名称不能为空",
		},

		errorPlacement : function(error, element) {
			element.next().remove();
			element.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
			element.closest('.form-group').append(error);
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error has-feedback');
		},
		success : function(label) {
			var el=label.closest('.form-group').find("input");
			el.next().remove();
			el.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
			label.closest('.form-group').removeClass('has-error').addClass("has-feedback has-success");
			label.remove();
		},
		submitHandler: function(form) {
			alert("submitted!");
		}

	})//表单验证结束
*/
  //设置datepick开始
  //$("#upAddDateAddInput").datepicker();
  //var format = 'YYYY-MM-DD';
	//$('#upAddDateAddInput').datetimepicker({
  //              format: 'YYYY-MM-DD',
  //              showTodayButton:true,
  //          });
  //$('#upAddDateAddInput').datetimepicker({
  //   viewMode: 'years'
   //});
  //设置datepick结束
    //mounted 结束
  }
}
</script>

<style scoped lang="scss">
/**对话框样式**/
#addModal {margin-top: 200px; }
.modal-dialog {width: 960px;}
.modal-content{border-radius: 0px;}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.modal-header button{color: red;font-size: 24px;}
.modal-title{font-weight: normal; }
.cusGroup{line-height: 36px;}
.cusConLabel{text-align: right;font-weight: 400;}
.modal-footer{text-align: left;border-bottom: 1px solid #e5e5e5;}
.el-date-editor.el-input{width:290px;}
.star{color:red;padding-right: 4px;}
.form-horizontal .control-label{padding-top: 0px;}
.PU {color: #1dbba4;background-color: #fff;border-color:#1dbba4;font-size: 16px;}
.PU:hover{color: #fff;background-color: #1dbba4;border-color:#1dbba4;}
.has-error {border-color: #a94442;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);box-shadow: inset 0 1px 1px rgba(0,0,0,.075);}
</style>
