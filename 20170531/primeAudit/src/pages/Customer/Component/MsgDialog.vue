<template>
  <div v-if="visible" >
    <div id="myModal1" class="modal fade in" style="display: block; padding-right: 21px;z-index:1750;" v-on:keyup.esc="close">
        <div class="modal-dialog" style="margin-top:200px;width:360px;" v-on:keyup.esc="close">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                    <h4 class="modal-title" id="myModalLabel">消息提示!</h4>
                </div>
                <div class="modal-body" style="min-height:80px;">
                  <!--first start-->
                    {{CusMsg}}
                </div>

            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->

    </div>
    <div class="modal-backdrop fade in" style="z-index:1500"></div>
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
      return this.$store.state.customer.CusMsgModalVisible
    },
    CusMsg: function(){
      return this.$store.state.customer.CusMsgModal
    }
  },
  methods: {
    close: function () {
      this.$store.commit('MsgModalMut', {isShow: false})
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
.modal-content{border-radius: 0px; text-align: center; line-height: 30px;}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.modal-header button{color: red;font-size: 24px;}
.modal-title{font-weight: normal; }
.cusGroup{height: 36px;line-height: 36px;}
.cusConLabel{text-align: right;font-weight: 400;}
.modal-footer{text-align: left;border-bottom: 1px solid #e5e5e5;}
</style>
