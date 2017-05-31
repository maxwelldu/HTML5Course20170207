<template>
  <div v-show="visible">
    <div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                    <h4 class="modal-title" id="myModalLabel">客户管理 > 查看</h4>
                </div>
                <div class="modal-footer">
                  <button v-show="editModel" type="button" class="btn btn-default PU"  data-dismiss="modal"  @click="activeInput(false)" style="margin-left:5px;"><span class="fa fa-edit" style="padding-right:10px;"></span>编辑</button>
                   <button v-show="saveModel" type="button" class="btn btn-default PU" data-dismiss="modal"  @click="activeInput(true)"><span class="fa fa-save" style="padding-right:10px;"></span>保存</button>
                   <button type="button" class="btn btn-default PU" @click="modifyCusInfo"><span class="fa fa-upload" style="padding-right:10px;"></span>提交</button>
                </div>
                <form id="register-form" role="form" class="form-horizontal" method="get">
                <div class="modal-body" id="validatorDiv">
                  <!--first start-->
                        <div style="width:450px; float:left;">
                          <div class="form-group has-feedback cusGroup">
                              <label class="col-sm-4 control-label cusConLabel">客户编号:</label>
                              <div class="col-sm-8">
                                <input type="text" id="ViewCode" class="form-control ViewDisable" v-model="DetailInfo.Code"/>
                            </div>
                          </div>

                          <div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">公司类型:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo">-->
                              <select class="form-control ViewDisable" id="ViewCustomerAuditType" v-model="CustomerAuditType">
                                <option></option>
                                <option value="10">母公司</option>
                                <option value="70">子公司</option>
                                <option value="80">分公司</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">上级公司:</label>
                            <div class="col-sm-8">
                              <input id="ViewParentId" type="text" class="form-control ViewDisable" name="cusTopCompany" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel">财年开始日:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusBegin" value="" placeholder="">-->

                                <el-date-picker
                                  v-model="StatrMonth"
                                  type="date"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions0">
                                </el-date-picker>

                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">信用代码:</label>
                            <div class="col-sm-8">
                              <input type="text" id="ViewOrgCode" class="form-control ViewDisable" name="cusCode" value="" placeholder="" v-model="DetailInfo.OrgCode">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">币种:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusMoneyType" value="" placeholder="">-->
                              <select class="form-control ViewDisable" id="ViewCurrency" type="select" name="Currency" v-model="CusViewCurrency">
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
                              <label class="col-sm-4 control-label cusConLabel" for="Name">客户名称:</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control ViewDisable" id="ViewName" v-model="DetailInfo.Name" name="Name" value="" placeholder="" />
                              </div>
                          </div>


                          <div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">公司层级:</label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control ViewDisable" id="ViewLevel" v-model="DetailInfo.Level">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">最上级集团名称:</label>
                            <div class="col-sm-8">
                              <input type="text" id="ViewTopCustomerId" class="form-control ViewDisable" name="cusTopCompany" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel">财年结束日:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusBegin" value="" placeholder="">-->

                              <el-date-picker
                                v-model="EndMonth"
                                type="date"
                                placeholder="选择日期"
                                format='yyyy-MM-dd'
                                :picker-options="pickerOptions0">
                              </el-date-picker>

                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">行业类型:</label>
                            <div class="col-sm-8">
                              <!--<input type="text" class="form-control" name="cusCode" value="" placeholder="">-->
                              <select class="form-control ViewDisable" id="ViewIndustry" v-model="Industry" lable="行业类型">
                                <option></option>
                                <option value="411">农、林、牧、渔业</option>
                                <option value="433">采矿业</option><option value="449">制造业</option><option value="646">电力、燃气及水的生产和供应业</option><option value="656">建筑业</option><option value="663">交通运输、仓储和邮政业</option><option value="696">信息传输、计算机服务和软件业</option><option value="710">批发和零售业</option><option value="731">住宿和餐饮业</option><option value="741">金融业</option><option value="762">房地产业</option><option value="768">租赁和商务服务业</option><option value="782">科学研究、技术服务和地质勘查业</option><option value="806">水利、环境和公共设施管理业</option><option value="818">居民服务和其他服务业</option><option value="833">教育</option><option value="840">卫生、社会保障和社会福利业</option><option value="854">文化、体育和娱乐业</option><option value="882">公共管理和社会组织</option><option value="906">国际组织</option><option value="910">综合类</option>
                              </select>
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
       EndMonth: '',//财年结束日
       pageIndustry:'',
       editModel: true,
       saveModel: false,
    }
  },
  computed: {
    visible: function () {
      return this.$store.state.customer.CusViewModalVisible
    },
    Code: function () {
      return this.$store.state.customer.CusViewCode
    },
    DetailInfo: function (){
      return this.$store.state.customer.CusDetailInfo
    },
    CustomerAuditType: function (){
      return this.$store.state.customer.CusCustomerAuditType
    },
    CusViewCurrency: function (){
      return this.$store.state.customer.CusViewCurrency
    },
    Industry:function (){
      return this.$store.state.customer.CusIndustry
    }
  },
  methods: {
    // 关闭掉对话框
    close: function () {
      this.$store.commit('ViewModelMut', {isShow: false})
      $(".ViewDisable").attr("disabled",true)//将input框置于不可用状态
    },
    modifyCusInfo: function () {
      this.$store.commit('modifyCusInfoMus',
        {
          Code:$("#ViewCode").val(),
          CustomerAuditType:$("#ViewCustomerAuditType").val(),
          Name:$("#ViewName").val(),
          Currency:$("#ViewCurrency").val(),
          Industry:$("#ViewIndustry").val()
        });
    },
    activeInput: function(isActive) {//将input激活
      console.log(isActive)
      if(isActive){
        $(".ViewDisable").attr("disabled",true);
        this.saveModel = false
        this.editModel = true
      }else {
        $(".ViewDisable").attr("disabled",false);
        this.saveModel = true
        this.editModel = false
      }
    }
    /*handleAdd: function () {
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
    */
  },
  beforeCreate() {
    console.log('beforCreate')
    this.pageIndustry = this.$store.state.customer.CusIndustry
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    $(".ViewDisable").attr("disabled",true);

    /*
    console.log('addCode')
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
    */
  }
}
</script>

<style scoped lang="scss">
/**对话框样式**/
#addModal {margin-top: 200px; }
.modal-dialog {width: 960px;}
.modal-content{}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.modal-header button{color: red;font-size: 24px;}
.modal-title{font-weight: normal; }
.cusGroup{line-height: 36px;}
.cusConLabel{text-align: right;font-weight: 400;}
.modal-footer{text-align: left;border-bottom: 1px solid #e5e5e5;}
.PU {color: #1dbba4;background-color: #fff;border-color:#1dbba4;font-size: 16px;}
.PU:hover{color: #fff;background-color: #1dbba4;border-color:#1dbba4;}
</style>
