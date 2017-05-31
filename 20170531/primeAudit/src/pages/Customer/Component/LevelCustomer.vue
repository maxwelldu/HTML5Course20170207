<template>
  <div v-show="visible">
    <div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                    <h4 class="modal-title" id="myModalLabel">客户管理 > 公司级次</h4>
                </div>
                <div class="modal-footer">
                   <button type="button" class="btn btn-default" data-dismiss="modal" @click="showAssociatedModal" ><span class="fa fa-chain" style="padding-right:10px;"></span>关联项目</button>
                   <button type="button" class="btn btn-default" style="display:none;"><span class="fa fa-upload" style="padding-right:10px;"></span>提交</button>
                </div>

                <div class="modal-body" id="validatorDiv">
                  <!--body 开始-->
                  <table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
                      <thead>
                      <tr>
                          <th><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
                          <th>客户名称</th>
                          <th>公司类型</th>
                          <th>上级公司</th>
                      </tr>
                      </thead>
                      <tbody class="cutTaBody">
                        <tr>
                          <td>1</td>
                          <td>{{LevelTree.Name}}</td>
                          <td>{{LevelTree.Level}}</td>
                          <td>{{LevelTree.ParentId}}</td>
                        </tr>
                      </tbody>
                  </table>
                  <!--body 结束 -->
                </div>

            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->

    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>

export default {
  data(){

    return {
    /*      pickerOptions0: {
        disabledDate(time) {
          //return time.getTime() < Date.now() - 8.64e7;
        }
      },
       StatrMonth: '',//财年开始日
       EndMonth: '',//财年结束日
       pageIndustry:''    */
    }

  },
  computed: {

    visible: function () {
      return this.$store.state.customer.CusLevelVisible
    },
    LevelTree: function () {
      return this.$store.state.customer.CusLevelTree
    },

/*    Code: function () {
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
    }*/
  },
  methods: {
    // 关闭掉对话框
   close: function () {
      this.$store.commit('LevelModalMut', {isShow: false})
    },
    showAssociatedModal: function () {
      this.$store.commit('AssociatedModalMut', {isShow: true})
    }

/*     modifyCusInfo: function () {
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
      }else {
        $(".ViewDisable").attr("disabled",false);
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
    //console.log('beforCreate')
    //this.pageIndustry = this.$store.state.customer.CusIndustry
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    //$(".ViewDisable").attr("disabled",true);

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
