<template>
  <div v-if="visible" >
    <div id="myModal1" class="modal fade in" style="display: block; padding-right: 21px;z-index:1800;" v-on:keyup.esc="close">
        <div class="modal-dialog" style="margin-top:260px;" v-on:keyup.esc="close">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                  <h4 class="modal-title" id="myModalLabel">客户管理 > 公司级次 > 关联项目</h4>
              </div>

              <div class="modal-body" id="validatorDiv">
                <!--body 开始-->
                <table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
                    <thead>
                    <tr>
                        <th><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
                        <th>项目名称</th>
                        <th>被审计单位</th>
                        <th>行业类型</th>
                        <th>风险等级</th>
                        <th>是否总部审核</th>
                        <th>审计期间开始日</th>
                        <th>设计期间结束日</th>
                        <th>底稿模板</th>
                        <th>底稿附注</th>
                        <th>创建时间</th>
                    </tr>
                    </thead>
                    <tbody class="cutTaBody">
                      <tr>
                        <td>1</td>
                        <td>--</td>
                        <td>--</td>
                        <td>互联网</td>
                        <td>A</td>
                        <td>是</td>
                        <td>2015-01-01</td>
                        <td>2015-01-01</td>
                        <td>--</td>
                        <td>--</td>
                        <td>YYYY-MM-DD HH:MM:SS</td>
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
    <div class="modal-backdrop fade in" style="z-index:1600"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  computed: {
    visible: function () {
      return this.$store.state.customer.CusAssociatedVisible
    },
  },
  methods: {
    close: function () {
      this.$store.commit('AssociatedModalMut', {isShow: false})
    },
    /*
    // 关闭掉对话框
    close: function () {
      this.$store.dispatch('showAddModal', {isShow: false})
    },
    handleAdd: function () {
      this.$store.dispatch('addClient',{
        Timestamp:'',
        Code: $('#Code').val(),
        Name: $('#Name').val(),
        CustomerAuditType: $('#CustomerAuditType').val(),
        Level: $('#Level').val(),
        ParentId: $('#ParentId').val(),
        TopCustomerId: $('#TopCustomerId').val(),
        StatrMonth: $('#StatrMonth').val(),
        EndMonth: $('#EndMonth').val(),
        OrgCode: $('#OrgCode').val(),
        Industry: $('#Industry').val(),
        Currency: $('#Currency').val(),
      })
    }
    */
  },
  beforeMount() {
  },
  mounted() {
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
.cusGroup{height: 36px;line-height: 36px;}
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
