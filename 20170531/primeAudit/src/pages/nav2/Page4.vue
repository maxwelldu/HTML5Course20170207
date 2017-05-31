<template>
  <!--div>
    <h1>vuex 测试</h1>
    Clicked: {{ getCount }} times
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div-->
    <!-- complex tabs -->
  <div class="col-lg-12">
        <div class="panel panel-default panelCustomer">
            <!-- panel-heading -->
            <div class="panel-body" style="margin-top:10px;">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs">
                    <li class="tabLi active"><a href="#activated" data-toggle="tab" aria-expanded="false">已启用</a>
                    </li>
                    <li class="tabLi"><a href="#disabled" data-toggle="tab" aria-expanded="false">已终止</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane fade in active" id="activated">
                        <div class="col-lg-10 toolBar">
                            <div class="fuhejilu"><el-button type="primary" icon="document" class="fuheBut" @click="openAddDialog">新增</el-button></div>
                        </div>
                        
            <!-- data table -->
            <div class="col-lg-12">
              <div style="height:100%">
                  <table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
                      <thead>
                      <tr>
                          <th width="40px"><span class="glyphicon glyphicon-search" id="dataSearch" @click="triggerSearch"></span></th>
                          <th>项目编号</th>
                          <th>项目名称</th>
                          <th>业务类型</th>
                          <th>被审计单位</th>
                          <th>是否首次承接</th>
                          <th>老项目名称</th>
                          <th>项目负责人</th>
                          <th>所属部门</th>
                          <th>审计期间开始日</th>
                          <th>审计期间结束日</th>
                          <th>运营状态</th>
                          <th width="70px">操作</th>
                      </tr>
                      </thead>
                      <tbody class="cutTaBody">
                      <tr id="contSearch" v-show="showSearch">
                        <td></td>
                        <td><input v-model="Code" v-on:blur="mutilSearch()"/></td><!--客户编号-->
                        <td><input v-model="Name" v-on:blur="mutilSearch()"/> </td><!--客户名称-->
                        <td><input type="" name=""></td><!--客户公司类型-->
                        <td><input type="" name=""></td><!--公司次级-->
                        <td><input type="" name=""></td><!--上级公司-->
                        <td><input type="" name=""></td><!--上级集团名称-->
                        <td><input type="" name=""></td>
                        <td><input type="" name=""></td>
                        <td><input type="" name=""></td>
                        <td><input type="" name=""></td>
                        <td><input type="" name=""></td>
                        <td></td>
                      </tr>
                      <template class="tableBody" v-for="(item,key) in activatedData">
                        <tr @dblclick.prevent="handleEdit(item)">
                          <td>{{key+1}}</td>
                          <td>{{item.Code}}</td>
                          <td>{{item.Name}}</td>
                          <td>{{item.BusinessTypeId.TreeName}}</td>
                          <td>{{item.CustomerId.Name}}</td>
                          <td>{{item.AppraiseTable.text}}</td>
                          <td>{{item.OldProjectId.Name}}</td>
                          <td>{{item.ProjectManagerId.Name}}</td>
                          <td>{{item.DeptId.Name}}</td>
                          <td>{{item.StatrDate}}</td>
                          <td>{{item.EndDate}}</td>
                          <td>{{item.DocStatus.text}}</td>
                          <td>
                            <img src="static/img/project/stop.png" v-on:click="forbidden(item.Id)">
                            <img src="static/img/project/delete.png" v-on:click="deleteCustomer(item.Id)">
                            <!--span class="glyphicon glyphicon-minus-sign" data-toggle="tooltip" data-placement="left" title="" data-original-title="查看" style="padding-left:10px;color: #1dbba4" @click="handleEdit(item)"></span>
                            <span style="color: #1dbba4" class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
                            <span class="glyphicon glyphicon-eye-open" data-toggle="tooltip" data-placement="left" title="" data-original-title="查看" style="padding-left:10px;" @click="handleEdit(item)"></span-->
                          </td>
                        </tr>
                      </template>

                      </tbody>
                  </table>
                  <div class="col-lg-12 cusFoot">
                      <div class="col-lg-2 cusPagNum">
                        每页<select v-model="pagevalue">
                               <option>5</option>
                               <option>10</option>
                               <option>20</option>
                               <option>50</option>
                               <option>100</option>
                             </select>条
                      </div>
                      <div class="col-lg-2 cusTabInfo">当前第1页 (共有 {{activatedData.length}} 条)</div>
                      <div class="col-lg-8 cusPagNum">
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                              <li>
                                <a href="javascript:void(0);" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
                              <li><a href="javascript:void(0);">1</a></li>
                              <li><a href="javascript:void(0);">2</a></li>
                              <li><a href="javascript:void(0);">3</a></li>
                              <li><a href="javascript:void(0);">4</a></li>
                              <li><a href="javascript:void(0);">5</a></li>
                              <li>
                                <a href="javascript:void(0);" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>
                            </ul>
                          </nav>
                      </div>
                  </div>
              </div>
            </div>
            <div style="clear:both;"></div>
            <!-- data table end -->
                    </div>
                    <div class="tab-pane fade" id="disabled">
                        <div style="height:100%">
                  <table id="customerTable" cellspacing="0" width="100%" class="table table-striped" >
                      <thead>
                      <tr>
                          <th width="40px"><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
                          <th>项目编号</th>
                          <th>项目名称</th>
                          <th>业务类型</th>
                          <th>被审计单位</th>
                          <th>是否首次承接</th>
                          <th>老项目名称</th>
                          <th>项目负责人</th>
                          <th>所属部门</th>
                          <th>审计期间开始日</th>
                          <th>审计期间结束日</th>
                          <th>运营状态</th>
                          <th width="70px">操作</th>
                      </tr>
                      </thead>
                      <tbody class="cutTaBody">
                      <template v-for="item in disabledData">
                        <tr>
                          <td>1</td>
                          <td>{{item.Code}}</td>
                          <td>{{item.Name}}</td>
                          <td>{{item.BusinessTypeId.TreeName}}</td>
                          <td>{{item.CustomerId.Name}}</td>
                          <td>{{item.AppraiseTable.text}}</td>
                          <td>{{item.OldProjectId.Name}}</td>
                          <td>{{item.ProjectManagerId.Name}}</td>
                          <td>{{item.DeptId.Name}}</td>
                          <td>{{item.StatrDate}}</td>
                          <td>{{item.EndDate}}</td>
                          <td>{{item.DocStatus.text}}</td>
                          <td>
                            <img src="static/img/project/start.png">
                            <img src="static/img/project/delete.png">
                            <!--span style="color: #1dbba4;padding-right: :10px;" class="glyphicon glyphicon-ok-circle" data-toggle="tooltip" data-placement="left" title="" data-original-title="启用"></span>
                            <span style="color: #1dbba4" class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
                            <span class="glyphicon glyphicon-eye-open" data-toggle="tooltip" data-placement="left" title="" data-original-title="查看" style="padding-left:10px;" @click="handleEdit(item)"></span-->
                          </td>
                        </tr>
                      </template>

                      </tbody>
                  </table>
                  <div class="col-lg-12 cusFoot">
                      <div class="col-lg-2 cusPagNum">
                            每页<select v-model="pagevalue">
                               <option>5</option>
                               <option>10</option>
                               <option>20</option>
                               <option>50</option>
                               <option>100</option>
                             </select>条
                      </div>
                      <!--div class="col-lg-2 cusTabInfo">当前第1页 (共有 {{disabledData.length}} 条)</div>
                      <div class="col-lg-8 cusPagNum">
                        <nav aria-label="Page navigation">
                          <ul class="pagination">
                            <li>
                              <a href="javascript:void(0);" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            <li><a href="javascript:void(0);">1</a></li>
                            <li><a href="javascript:void(0);">2</a></li>
                            <li><a href="javascript:void(0);">3</a></li>
                            <li><a href="javascript:void(0);">4</a></li>
                            <li><a href="javascript:void(0);">5</a></li>
                            <li>
                              <a href="javascript:void(0);" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div-->
                  </div>
              </div>
                    </div>
                </div>
            </div>
            <!-- panel body end -->
      </div>
      <!-- panel end -->
      <!-- add dialog start -->

      <!-- add-dialog-end -->
      <addCustomer
        :visible="addModal"
        @close="closeAddDialog"
      ></addCustomer>
      <viewCustomer
        :visible="viewModal"
        :rowData="rowData"
        @close="closeViewDialog"
      ></viewCustomer>
      
  </div>
</template>

<script>
/*
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
    },
    methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ])
      //...mapActions({
      //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      //})
    }
  }
*/
  import addCustomer from './Component/addCustomer.vue';
  import viewCustomer from './Component/viewCustomer.vue';
  import axios from 'axios'
  import qs from 'qs'

  export default {
    components: {
      addCustomer,
      viewCustomer
    },
    data() {
      return {
        addModal: false,
        viewModal: false,
        CusData: [],
        rowData: {},
        activatedData: [],  //  已启用数据
        disabledData: [],   //  已终止数据
        showSearch: false,  //是否显示搜索
        Code: '', //搜索input框
        Name: '', //项目名称
        pagevalue: '5'  //  每页显示条数
      }
    },
    watch: {
      pagevalue() {
        var self = this
        var getCodePars = {
          'limit': self.pagevalue,
          'page': "1",
          'p_schema': "Project/Project",
          'start': "0",
          'filter': "[]",
          'isSelect': "false",
          'sort': "[]",
          }
          axios.post("http://dingxin.cmsmate.cn:80/form/list",
              qs.stringify(getCodePars)
              , {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })
          .then(function (response) {
            self.activatedData = JSON.parse(response.data.data)
            self.activatedData = self.activatedData["Data"]
          })
          .catch(function (error) {
            console.log(error);
          });

          var getDisabledCodePars = {
          'limit': self.pagevalue,
          'page': "1",
          'p_schema': "Project/EndProject",
          'start': "0",
          'filter': "[]",
          'isSelect': "false",
          'sort': "[]",
          }
          axios.post("http://dingxin.cmsmate.cn:80/form/list",
              qs.stringify(getDisabledCodePars)
              , {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })
          .then(function (response) {
            self.disabledData = JSON.parse(response.data.data)
            self.disabledData = self.disabledData["Data"]
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    methods: {
      openAddDialog () {
        this.addModal = true
      },
      closeAddDialog () {
        this.addModal = false;
        //this.unitSetting = false
      },
      handleEdit: function (rowData) {//处理查看事件
        this.rowData = rowData;
        this.openViewDialog();
      },
      openViewDialog () {
        this.viewModal = true
      },
      closeViewDialog () {
        this.viewModal = false
      },
      triggerSearch() {//触发搜索
        if(this.showSearch){
          this.showSearch = false;
          this.Code='';
          this.Name='';
          this.CustomerAuditType='';
          this.mutilSearch();
        }
        else {
          this.showSearch = true;
        }
      },
      mutilSearch() {//复合搜索
        //开始逐步遍历变量 拼接查询条件
        console.log("mutilSearch!");
        var filter=[]
        if(this.Code){//项目编号
            var codeFilter={"field":"Code","value":this.Code,"type":"string","comparison":"like"};
            filter.push(codeFilter);
        }
        if(this.Name){//项目名称
          var nameFilter={"field":"Name","value":this.Name,"type":"string","comparison":"like"};
          filter.push(nameFilter);
        }
        if(this.CustomerAuditType){
          var TemArr=[this.CustomerAuditType]
          var customerAuditTypeFilter={"field":"CustomerAuditType","value":TemArr,"type":"list","comparison":"in"};
          filter.push(customerAuditTypeFilter);
        }
        this.$store.commit('fetchCusDataMut', {filter: JSON.stringify(filter)})//提交搜索
      },
      forbidden(projectId) {
        console.log(projectId)
      },
      deleteCustomer(projectId) {
        console.log("delete")
      } 
    },
    beforeMount(){// 首先获得数据
          /*
          this.$http({
           methods: 'get',
           url: '/dxn/customer.json',
           //methods: 'post',
           //url: '111.200.193.129:8088',
           transformResponse: [(data) => {
             return JSON.parse(data.replace(/T00:00:00/g, ''))
           }],
           params: {

           }
         }).then((response) => {
           console.log(response.data.data.Data)
           this.CusData = response.data.data.Data;
         }).catch((error) => {
           console.log(error)
         })
         */
         var self = this
         var getCodePars = {
          'limit': "5",
          'page': "1",
          'p_schema': "Project/Project",
          'start': "0",
          'filter': "[]",
          'isSelect': "false",
          'sort': "[]",
          }
          axios.post("http://dingxin.cmsmate.cn:80/form/list",
              qs.stringify(getCodePars)
              , {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })
          .then(function (response) {
            self.activatedData = JSON.parse(response.data.data)
            self.activatedData = self.activatedData["Data"]
          })
          .catch(function (error) {
            console.log(error);
          });

          var getDisabledCodePars = {
          'limit': "10",
          'page': "1",
          'p_schema': "Project/EndProject",
          'start': "0",
          'filter': "[]",
          'isSelect': "false",
          'sort': "[]",
          }
          axios.post("http://dingxin.cmsmate.cn:80/form/list",
              qs.stringify(getDisabledCodePars)
              , {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })
          .then(function (response) {
            self.disabledData = JSON.parse(response.data.data)
            self.disabledData = self.disabledData["Data"]
            console.log(self.disabledData)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    mounted() {
      $("#customerTable").tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
      })
    }

}
</script>

<style scoped lang="scss">
.panelCustomer{background-color: none;border: 0px solid transparent}
.panel-body{background-color: #f0f0f0;}
.tab-content{background-color: #fff;}
.nav-tabs>li>a {color:#000000;}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{color:#1dbba4;}
.tab-content{padding:10px;}
.fuhejilu{
  .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid; height: 30px; width: 60px;line-height: 5px;}
  .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}
/**表格样式**/
/**customer dataTable**/
#cusTool{float:left;}
.toolSearch{margin-bottom: 0px;}
.cusAdd{background-color: #fff!important;color: #1dbba4 !important;border: 1px solid #1dbba4 !important;}
.cusAdd:hover{background-color: #1dbba4!important;color: #ffffff !important;}
.cusPus{padding-right: 6px !important;}
.clear{clear: both;}
.cusSearch input{display: block;width: 100%;height: 30px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);box-shadow: inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;}
.cusFoot{ height: 30px;}
.cusPagNum{ text-align: right;height: 30px; line-height: 30px;margin-top: 1px;
  .pagination{margin: 0px;}
}
.cusTabInfo{height: 30px;line-height: 30px;}
.table{margin-bottom: 10px; border-bottom: 1px solid #cdcece;}
#contSearch input{width: 80%;}

#dataSearch{padding-left:0px;}
#customerTable{margin-top: 10px !important;table-layout:fixed;}
#customerTable:hover{cursor:pointer;}
#customerTable>thead{background-color: #b1e8e0;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";border-bottom: 0px;}
#customerTable>thead>tr th{font-weight: normal;font-weight: 400;height: 30px;font-size:13px;text-align: center;border-bottom: 0px solid #111;padding: 0px;line-height: 30px;border-right: 1px solid #cdcece;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr{height: 30px;border-right: 0px solid #cdcece;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr:hover{background-color:#e8fffc;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.cutTaBody tr td{text-align: center;border-right: 1px solid #cdcece;overflow:hidden;text-overflow:ellipsis;word-break:keep-all;white-space:nowrap;font-size:13px !important;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";height: 30px;padding:0px 8px; line-height: 30px;}
.cutTaBody tr td:first-child{border-left: 1px solid #cdcece;}
.cutTaBody tr td:last-child{/*border-right: 0px !important*/;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.tooltip{background-color: red!important; color: red;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
table.dataTable.no-footer {border-bottom: 1px solid #cdcece;}
.pagination{}
.pagination>li>a, .pagination>li>span{border:1px solid #fff; color: #000;padding: 1px 10px; background-color: #fff;margin-left: 2px;}

.aPageNumActived{border:1px solid #1dbba4 !important; border-radius: 4px !important; color: #1dbba4 !important;}
.panel{-webkit-box-shadow: 0 0px 0px rgba(0,0,0,.05);font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.panel-body {padding:0px;}
.tab-content{padding: 10px 0px;}
.nav-tabs>li {margin-left: 10px;}
.col-lg-10{padding-left:10px;}
.col-lg-12{padding-left: 10px;padding-right: 10px;}
.tabLi{height: 30px;}
.tabLi a{height: 30px; line-height: 30px; padding:0px 10px 0px 10px;font-size:13px;}
.el-button{padding:0px;font-size: 13px;}
.butDisable{}
.butDisable a{color:#ccc !important;}
.inputPageDiv{float:left;padding:0px 10px 0px 10px;line-height: 26px;margin: 0px;}
.inputPage {display: inline; width: 40px;height: 23px;margin:-1px 4px 0px 4px;border: 1px solid #1dbba4;line-height: 30px;}
.selBut{padding:0px 2px; border-color: #1dbba4;width: 40px;height: 23px;}
.selButTri{padding:0px 2px; border-color: #1dbba4;height: 23px;}
.PagNumSel{ text-align: right;height: 30px; margin-top: 4px;}



#contSearch input{width: 80%;}
.cutTaBody tr td{
  text-overflow:ellipsis;
  overflow:hidden; 
  white-space: nowrap;
}

.cutTaBody tr td:hover{
text-overflow:inherit;
/*overflow:visible;*/
} 

table{
table-layout:fixed;
} 
tbody tr:hover{
  background-color: #C9E9E5;
}

.table thead tr th{
  white-space:nowrap;
}
</style>