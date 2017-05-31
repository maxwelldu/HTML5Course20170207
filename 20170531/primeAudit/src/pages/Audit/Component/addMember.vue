<template>
<div v-if="ifShowAddMember">
  <div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeAddMemberInMoal();">×</button>
          <h4 class="modal-title" id="myModalLabel">被审计单位&nbsp;&gt;&nbsp;已激活&nbsp;&gt;&nbsp;提交&nbsp;&gt;&nbsp;新增<span>{{title}}</span>专员</h4>
        </div>
        <div class="modal-body">
          <div class="toolbar">
            <div class="fuhejilu">
              <button class="fuheBut" v-on:mouseover="saveIcon='save_h';" v-on:mouseout="saveIcon='save';">
                <img :src="'static/img/' + saveIcon + '.png'">
                <span>保存</span>
              </button>
            </div>
          </div>
          <div class="clearfix member-container">
            <div class="clearfix">
              <div class="pull-left member-title">
                <span class="required"></span>
                <span>姓名</span>
              </div>
              <div class="pull-left member-content">
                <input type="text" class="form-control"/>
              </div>
            </div>
            <div class="clearfix">
              <div class="pull-left member-title">
                <span class="required"></span>
                <span>登录名</span>
              </div>
              <div class="pull-left member-content">
                <input type="text" class="form-control"/>
              </div>
            </div>
            <div class="clearfix">
              <div class="pull-left member-title">
                <span class="required"></span>
                <span>部门</span>
              </div>
              <div class="pull-left member-content">
                <input type="text" class="form-control"/>
              </div>
            </div>
            <div class="clearfix">
              <div class="pull-left member-title">
                <span class="required"></span>
                <span>项目角色</span>
              </div>
              <div class="pull-left member-content">
                <input type="text" class="form-control"/>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="modal-footer"></div>-->
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data: function() {
        var data = {};
        data["title"] = 1 == this.addMemberType ? "复核" : (2 == this.addMemberType ? "编制" : "");
        data["saveIcon"] = "save";
        return data;
    },
    props: {
        ifShowAddMember: Boolean,
        projectId: String,
        addMemberType: Number
    },
    created: function(){
        
    },
    methods: {
        closeAddMemberInMoal () {
            this.$emit('closeAddMemberInMoal');
        }
    },
    mounted() {
        //console.log('add load...');
        //load datatable
        //console.log(this.projectId);
    },
    watch: {
        
    }
}
</script>

<style scoped lang="scss">
.fuhejilu{
    .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid;padding:0.5% 1%;border-radius:5px;margin-right:1%;}
    .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}
/**对话框样式**/
.modal-dialog {width: 50%;margin:8% auto;}
.modal-content{}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.modal-body { padding:0; }
.close { color:white; opacity:1; font-size:30px; margin-top:-9px; }
.modal-title{font-weight: normal; }
.toolbar { margin:1% 2%; }
.panel-body { padding:0; }
.cusGroup{height: 36px;line-height: 36px; width:50%; }
.cusConLabel{text-align: right;}
.nav-tabs>li>a {color:#000000;}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{color:#1dbba4;}
.required { color:red; }
.required::before { content:"*" }
.member-nav { width:15%; }
.member-nav>li { float:none; }
.member-content { width:85%; }
.cusFoot{ height: 40px;}
.cusPagNum{ text-align: right;
    .pagination{margin: 0px;}
}
.cusTabInfo{height: 40px;line-height: 40px;}
#dataSearch{padding-left:0px;}
.audit-table{margin-top: 10px !important;}
.audit-table:hover{cursor:pointer;}
.audit-table>thead{background-color: #a1d9d1;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";border-bottom: 0px;}
.audit-table>thead>tr th{font-weight: normal;font-weight: 400;height: 40px;font-size:14px;text-align: center;border-bottom: 0px solid #111;padding: 0px;line-height: 40px;}
.cutTaBody{border: 0px; }
.cutTaBody tr{height: 40px;border-right: 0px solid #cdcece;}
.cutTaBody tr td{text-align: center;border-right: 1px solid #cdcece;}
.cutTaBody tr td:last-child{border-right: 0px !important;}
.tooltip{background-color: red!important; color: red;}
table.dataTable.no-footer {border-bottom: 1px solid #cdcece;}
.subtitle { padding:0 1%; border-left:3px solid black; font-weight:bold; margin:1% 0; }
.plan-key-container { margin:0; }
.plan-key { width:48%; margin:0.5% 0 0.5% 2%; }
.plan-key>div { margin-left:1%; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.plan-key-title { width:39%; }
.plan-key-name { width:9%; }
.plan-key-time { width:34%; }
.plan-key-view { width:14%; color:#1dbba4; }
.complete-content { padding:0 30%; text-align:center; }
.complete-btn { width:100%; border:1px solid #1dbba4; border-radius:1px; padding:10% 0; background-color:white; font-size:50px; line-height:50px; margin-bottom:10%; }
.complete-text { color:gray; }

.member-container { margin:1% 5%; }
.member-container>div { margin:2% 0; }
.member-title { width:12%; margin-right:3%; text-align:right; line-height:240%; }
.member-content { width:85%; }
.member-content>input,.member-content button,.member-content>textarea { width:100%; border-radius:5px; }
.member-content button { background-color:white; color:#1dbba4; border:1px solid #1dbba4; padding:1% 0; }
.member-content>textarea { padding:2%; }
</style>