<template>
<!-- complex tabs -->
<div class="col-lg-12" style="margin-top:10px;">
  <div class="panel panel-default panelCustomer">
    <!-- panel-heading -->
    <div class="panel-body" style="margin-top:10px;padding:15px 0;">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs">
        <li @click="getActiveData();" class="active">
          <a href="#activated" data-toggle="tab" aria-expanded="false">已激活</a>
        </li>
        <li @click="getInactiveData();">
          <a href="#disabled" data-toggle="tab" aria-expanded="false">已终止</a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div class="tab-pane fade in active" id="activated">
          <!-- data table -->
          <div class="col-lg-12">
            <div style="height:100%">
              <!--<table cellspacing="0" class="table audit-table col-menu" id="colMenuActive">
                <colgroup>
                  <col style="width:5%;"/>
                  <col style="width:9%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:7%;"/>
                  <col style="width:7%;"/>
                  <col style="width:12%;"/>
                  <col style="width:8%;"/>
                  <col style="width:12%;"/>
                </colgroup>
                <thead>
                  <tr class="col-menu-cell">
                    <div>正序</div>
                    <div>倒序</div>
                    <div>
                        <div>列</div>
                        <div>
                          <div></div>
                        </div>
                    </div>
                    <div>取消锁定列</div>
                    <div>锁定列</div>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>-->
              <table cellspacing="0" class="table table-striped table-bordered audit-table">
                <colgroup>
                  <col style="width:5%;"/>
                  <col style="width:9%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:7%;"/>
                  <col style="width:7%;"/>
                  <col style="width:12%;"/>
                  <col style="width:8%;"/>
                  <col style="width:12%;"/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <span class="data-search" @click="activeQuery = activeQuery ? false : true;">
                        <img src="static/img/search.png"/>
                      </span>
                    </th>
                    <th title="被审计单位">被审计单位</th>
                    <th title="行业类型">行业类型</th>
                    <th title="风险等级">风险等级</th>
                    <th title="是否总部复核">是否总部复核</th>
                    <th title="审计期间开始日">审计期间开始日</th>
                    <th title="审计期间结束日">审计期间结束日</th>
                    <th title="底稿模板">底稿模板</th>
                    <th title="底稿附注">底稿附注</th>
                    <th title="创建时间">创建时间</th>
                    <th title="状态">状态</th>
                    <th title="操作">操作</th>
                  </tr>
                </thead>
                <tbody class="cutTaBody">
                  <tr v-if="activeQuery">
                    <td></td>
                    <td><input type="text" class="form-control" v-model="activeSearch.projectName"/></td>
                    <td>
                      <select class="form-control" v-model="activeSearch.industryType">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in industryType" :value="key">{{value}}业</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="activeSearch.riskLevel">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in riskLevel" :value="key">{{value}}</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="activeSearch.isHeadquartersReview">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in isHeadquartersReview" :value="key">{{value}}</option>
                      </select>
                    </td>
                    <td><input type="text" class="form-control" v-model="activeSearch.auditStartDate"/></td>
                    <td><input type="text" class="form-control" v-model="activeSearch.auditEndDate"/></td>
                    <td><input type="text" class="form-control" v-model="activeSearch.manuscriptTemplateName"/></td>
                    <td><input type="text" class="form-control" v-model="activeSearch.noteAppendedTypeName"/></td>
                    <td><input type="text" class="form-control" v-model="activeSearch.projectCreateDate"/></td>
                    <td>
                      <select class="form-control" v-model="activeSearch.submitState">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in submitState" :value="key">{{value.name}}</option>
                      </select>
                    </td>
                    <td>
                      <img src="static/img/search.png" @click="activePageNum=1;getActiveData();"/>
                    </td>
                  </tr>
                  <template v-for="(item,index) in activeData">
                    <tr @dblclick="openViewDialog(item.ID, item.WhetherGroup, 30);">
                      <td :title="index + 1">{{index + 1}}</td>
                      <td :title="item.ProjectName">{{item.ProjectName}}</td>
                      <td :title="industryType[item.IndustryType] + '业'">{{industryType[item.IndustryType]}}业</td>
                      <td :title="riskLevel[item.RiskLevel]">{{riskLevel[item.RiskLevel]}}</td>
                      <td :title="isHeadquartersReview[item.IsHeadquartersReview]">{{isHeadquartersReview[item.IsHeadquartersReview]}}</td>
                      <td :title="item.AuditStartDate">{{item.AuditStartDate}}</td>
                      <td :title="item.AuditEndDate">{{item.AuditEndDate}}</td>
                      <td :title="item.ManuscriptTemplateName">{{item.ManuscriptTemplateName}}</td>
                      <td :title="item.NoteAppendedTypeName">{{item.NoteAppendedTypeName}}</td>
                      <td :title="item.ProjectCreateDate">{{item.ProjectCreateDate}}</td>
                      <td :title="submitState[item.SubmitState]['name']">{{submitState[item.SubmitState]['name']}}</td>
                      <td>
                        <span data-toggle="tooltip" data-placement="left" title="" :data-original-title="submitState[item.SubmitState]['title']" @click="openViewDialog(item.ID, item.WhetherGroup, item.SubmitState);">
                          <img class="table-btn-img" src="static/img/sub.png"/>
                        </span>
                        <span data-toggle="tooltip" data-placement="left" title="" data-original-title="底稿返工">
                          <img class="table-btn-img" src="static/img/ms.png"/>
                        </span>
                        <span data-toggle="tooltip" data-placement="left" title="" data-original-title="终止" @click="setInactive(item.ID);">
                          <img class="table-btn-img" src="static/img/stop.png"/>
                        </span>
                        <span data-toggle="tooltip" data-placement="left" title="" data-original-title="删除">
                          <img class="table-btn-img" src="static/img/del.png"/>
                        </span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="clearfix cusFoot">
                <div class="pull-left cusPagNum">
                  <nav aria-label="Page navigation">
                    <ul class="pagination">
                      <li>
                        <a href="javascript:void(0);" aria-label="Previous" @click="activePageNum-=1;getActiveData();">
                          <span aria-hidden="true">〈</span>
                        </a>
                      </li>
                      <li :class="{active:1 == activePageNum}"><a href="javascript:void(0);" @click="activePageNum=1;getActiveData();">1</a></li>
                      <li v-for="n in activePageTotal" v-if="1 < n && n < activePageTotal && n > activePageTotal - 3 && n < activePageTotal + 3" :class="{active:n == activePageNum}">
                        <a href="javascript:void(0);" @click="activePageNum=n;getActiveData();">{{n}}</a>
                      </li>
                      <li v-if="1 < activePageTotal" :class="{active:activePageTotal == activePageNum}"><a href="javascript:void(0);" @click="activePageNum=activePageTotal;getActiveData();">{{activePageTotal}}</a></li>
                      <!--<li><a href="javascript:void(0);">1</a></li>
                      <li><a href="javascript:void(0);">2</a></li>
                      <li><a href="javascript:void(0);">3</a></li>
                      <li><a href="javascript:void(0);">4</a></li>
                      <li><a href="javascript:void(0);">5</a></li>-->
                      <li>
                        <a href="javascript:void(0);" aria-label="Next" @click="activePageNum+=1;getActiveData();">
                          <span aria-hidden="true">〉</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="pull-left cusTabInfo">
                  <span>第</span>
                  <input type="tel" class="form-control pager-input" v-model.lazy.number.trim="activePageNum" @keyup.enter="getActiveData();"/>
                  <span>页</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>每页</span>
                  <div class="btn-group dropup" style="margin:0px 10px;">
                    <button type="button" class="btn btn-default" id="pageNum">{{activePageSize}}</button>
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#1dbba4;">
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" style="min-width:45px;">
                      <li class="pageList" data-val="5"><a href="javascript:void(0);" @click="activePageSize=5;getActiveData();">5</a></li>
                      <li class="pageList" data-val="10"><a href="javascript:void(0);" @click="activePageSize=10;getActiveData();">10</a></li>
                    </ul>
                  </div>
                  <span>条</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>共{{activeDataTotal}}条</span>
                </div>
              </div>
            </div>
          </div>
          <div style="clear:both;"></div>
          <!-- data table end -->
        </div>
        <div class="tab-pane fade" id="disabled">
          <!-- data table -->
          <div class="col-lg-12">
            <div style="height:100%">
              <table cellspacing="0" class="table table-striped table-bordered audit-table">
                <colgroup>
                  <col style="width:5%;"/>
                  <col style="width:9%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:8%;"/>
                  <col style="width:7%;"/>
                  <col style="width:7%;"/>
                  <col style="width:12%;"/>
                  <col style="width:8%;"/>
                  <col style="width:12%;"/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <span class="data-search" @click="inActiveQuery = inActiveQuery ? false : true;">
                        <img src="static/img/search.png"/>
                      </span>
                    </th>
                    <th title="被审计单位">被审计单位</th>
                    <th title="行业类型">行业类型</th>
                    <th title="风险等级">风险等级</th>
                    <th title="是否总部复核">是否总部复核</th>
                    <th title="审计期间开始日">审计期间开始日</th>
                    <th title="审计期间结束日">审计期间结束日</th>
                    <th title="底稿模板">底稿模板</th>
                    <th title="底稿附注">底稿附注</th>
                    <th title="创建时间">创建时间</th>
                    <th title="状态">状态</th>
                    <th title="操作">操作</th>
                  </tr>
                </thead>
                <tbody class="cutTaBody">
                  <tr v-if="inActiveQuery">
                    <td></td>
                    <td><input type="text" class="form-control"/></td>
                    <td>
                      <select class="form-control" v-model="inactiveSearch.industryType">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in industryType" :value="key">{{value}}业</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="inactiveSearch.riskLevel">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in riskLevel" :value="key">{{value}}</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="inactiveSearch.isHeadquartersReview">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in isHeadquartersReview" :value="key">{{value}}</option>
                      </select>
                    </td>
                    <td><input type="text" class="form-control"/></td>
                    <td><input type="text" class="form-control"/></td>
                    <td><input type="text" class="form-control"/></td>
                    <td><input type="text" class="form-control"/></td>
                    <td><input type="text" class="form-control"/></td>
                    <td>
                      <select class="form-control" v-model="inactiveSearch.submitState">
                        <option value="">未选择</option>
                        <option v-for="(value,key) in submitState" :value="key">{{value.name}}</option>
                      </select>
                    </td>
                    <td>
                      <img src="static/img/search.png" @click="inactivePageNum=1;getInactiveData();"/>
                    </td>
                  </tr>
                  <template v-for="(item,index) in inactiveData">
                    <tr>
                      <td :title="index + 1">{{index + 1}}</td>
                      <td :title="item.ProjectName">{{item.ProjectName}}</td>
                      <td :title="industryType[item.IndustryType] + '业'">{{industryType[item.IndustryType]}}业</td>
                      <td :title="riskLevel[item.RiskLevel]">{{riskLevel[item.RiskLevel]}}</td>
                      <td :title="isHeadquartersReview[item.IsHeadquartersReview]">{{isHeadquartersReview[item.IsHeadquartersReview]}}</td>
                      <td :title="item.AuditStartDate">{{item.AuditStartDate}}</td>
                      <td :title="item.AuditEndDate">{{item.AuditEndDate}}</td>
                      <td :title="item.ManuscriptTemplateName">{{item.ManuscriptTemplateName}}</td>
                      <td :title="item.NoteAppendedTypeName">{{item.NoteAppendedTypeName}}</td>
                      <td :title="item.ProjectCreateDate">{{item.ProjectCreateDate}}</td>
                      <td :title="submitState[item.SubmitState]['name']">{{submitState[item.SubmitState]['name']}}</td>
                      <td>
                        <!--<span data-toggle="tooltip" data-placement="left" title="" data-original-title="提交" @click="handleEdit(item.ID);">
                          <img class="table-btn-img" src="static/img/sub.png"/>
                        </span>
                        <span data-toggle="tooltip" data-placement="left" title="" data-original-title="底稿返工">
                          <img class="table-btn-img" src="static/img/ms.png"/>
                        </span>-->
                        <span data-toggle="tooltip" data-placement="left" title="" data-original-title="激活" @click="setActive(item.ID);">
                          <img class="table-btn-img" src="static/img/enable.png"/>
                        </span>
                        <span data-toggle="tooltip" data-placement="left" title="" data-original-title="删除">
                          <img class="table-btn-img" src="static/img/del.png"/>
                        </span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="clearfix cusFoot">
                <div class="pull-left cusPagNum">
                  <nav aria-label="Page navigation">
                    <ul class="pagination">
                      <li>
                        <a href="javascript:void(0);" aria-label="Previous" @click="inactivePageNum-=1;getInactiveData();">
                          <span aria-hidden="true">〈</span>
                        </a>
                      </li>
                      <li :class="{active:1 == inactivePageNum}"><a href="javascript:void(0);" @click="inactivePageNum=1;getInactiveData();">1</a></li>
                      <li v-for="n in inactivePageTotal" v-if="1 < n && n < inactivePageTotal && n > inactivePageTotal - 3 && n < inactivePageTotal + 3" :class="{active:n == inactivePageNum}">
                        <a href="javascript:void(0);" @click="inactivePageNum=n;getInactiveData();">{{n}}</a>
                      </li>
                      <li v-if="1 < inactivePageTotal" :class="{active:inactivePageTotal == inactivePageNum}"><a href="javascript:void(0);" @click="inactivePageNum=inactivePageTotal;getInactiveData();">{{inactivePageTotal}}</a></li>
                      <!--<li><a href="javascript:void(0);">1</a></li>
                      <li><a href="javascript:void(0);">2</a></li>
                      <li><a href="javascript:void(0);">3</a></li>
                      <li><a href="javascript:void(0);">4</a></li>
                      <li><a href="javascript:void(0);">5</a></li>-->
                      <li>
                        <a href="javascript:void(0);" aria-label="Next" @click="inactivePageNum+=1;getInactiveData();">
                          <span aria-hidden="true">〉</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="pull-left cusTabInfo">
                  <span>第</span>
                  <input type="tel" class="form-control pager-input" v-model.lazy.number.trim="inactivePageNum" @keyup.enter="getInactiveData();"/>
                  <span>页</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>每页</span>
                  <div class="btn-group dropup" style="margin:0px 10px;">
                    <button type="button" class="btn btn-default" id="pageNum">{{inactivePageSize}}</button>
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#1dbba4;">
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" style="min-width:45px;">
                      <li class="pageList" data-val="5"><a href="javascript:void(0);" @click="inactivePageSize=5;getInactiveData();">5</a></li>
                      <li class="pageList" data-val="10"><a href="javascript:void(0);" @click="inactivePageSize=10;getInactiveData();">10</a></li>
                    </ul>
                  </div>
                  <span>条</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>共{{inactiveDataTotal}}条</span>
                </div>
              </div>
            </div>
          </div>
          <div style="clear:both;"></div>
          <!-- data table end -->
        </div>
      </div>
    </div>
    <!-- panel body end -->
  </div>
  <!-- panel end -->
<!-- add dialog start -->

<!-- add-dialog-end -->
<viewAudit :visible="viewModal" :projectId="projectId" :isGroup="whetherGroup" :viewType="viewType" :industryType="industryType" :riskLevel="riskLevel" :currency="currency" @close="closeViewDialog"></viewAudit>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import viewAudit from './Component/viewAudit.vue';
export default {
    components: {
        viewAudit
    },
    data() {
        return {
            addModal: false,
            viewModal: false,
            activeQuery: false,
            inActiveQuery: false,
            activeData: {},
            activeDataTotal: 0,
            activePageSize: 10,
            activePageNum: 1,
            activePageTotal: 1,
            inactiveData: {},
            inactiveDataTotal: 0,
            inactivePageSize: 10,
            inactivePageNum: 1,
            inactivePageTotal: 1,
            industryType: {411:"农、林、牧、渔", 433:"采矿", 449:"制造", 646:"电力、燃气及水的生产和供应", 656:"建筑", 663:"交通运输、仓储和邮政", 696:"信息传输、计算机服务和软件", 710:"批发和零售", 731:"住宿和餐饮", 741:"金融", 762:"房地产", 768:"租赁和商务服务", 782:"科学研究、技术服务和地址勘查", 806:"水利、环境和公共设施管理", 818:"居民服务和其他服务"},
            riskLevel: {10:"A", 20:"B", 30:"C"},
            isHeadquartersReview : {1:"是", 0:"否"},
            currency: {10:"人民币", 20:"美元", 30:"港元", 40:"日元", 50:"新加坡元"},
            projectId: "",
            whetherGroup: 0,
            submitState: {10:{"type":1, "name":"编制中", "title":"提交"}, 20:{"type":2, "name":"复核中", "title":"复核"}, 30:{"type":3, "name":"复核完成", "title":"查看"}, 40:{"type":3, "name":"已归档", "title":"查看"}},
            viewType: 0,
            activeSearch: {"projectName":"", "industryType":"", "riskLevel":"", "isHeadquartersReview":"", "auditStartDate":"", "auditEndDate":"", "manuscriptTemplateName":"", "noteAppendedTypeName":"", "projectCreateDate":"", "submitState":""},
            inactiveSearch: {"projectName":"", "industryType":"", "riskLevel":"", "isHeadquartersReview":"", "auditStartDate":"", "auditEndDate":"", "manuscriptTemplateName":"", "noteAppendedTypeName":"", "projectCreateDate":"", "submitState":""}
        }
    },
    methods: {
        openViewDialog(id, group, state) {
            this.projectId = id;
            this.whetherGroup = group;
            this.viewType = this.submitState[state]["type"];
            this.viewModal = true;
        },
        closeViewDialog () {
            this.viewModal = false;
        },
        getActiveData() {
            if (1 > this.activePageNum)
            {
                this.activePageNum = 1;
            }
            else if (this.activePageNum > this.activePageTotal)
            {
                this.activePageNum = this.activePageTotal;
            }
            /*this.$http({
                methods: "get",
                url: "http://dingxin.cmsmate.cn/api/AuditProject/ShowAuditProject?LoginUserId=C96E31B8-1C7B-C299-A1FD-08D39B1C789A&PageSize=" + this.activePageSize + "&PageNum=" + this.activePageNum,
                transformResponse: [(data) => {
                    return JSON.parse(data);
                }],
                params: {

                }
            }).then((response) => {
                this.activeData = response.data.AuditworkProjectDTO;
                this.activeDataTotal = response.data.total;
                this.activePageTotal = Math.ceil(response.data.total / this.activePageSize);
            }).catch((error) => {
                console.log(error);
            });*/
            var self = this;
            axios.post("http://dingxin.cmsmate.cn/api/AuditProject/ShowAuditProject", qs.stringify({LoginUserId:"C96E31B8-1C7B-C299-A1FD-08D39B1C789A", PageSize:self.activePageSize, PageNum:self.activePageNum, ProjectName:self.activeSearch.projectName, IndustryType:self.activeSearch.industryType, RiskLevel:self.activeSearch.riskLevel, IsHeadquartersReview:self.activeSearch.isHeadquartersReview, AuditStartDate:self.activeSearch.auditStartDate, AuditEndDate:self.activeSearch.auditEndDate, ManuscriptTemplateName:self.activeSearch.manuscriptTemplateName, NoteAppendedTypeName:self.activeSearch.noteAppendedTypeName, ProjectCreateDate:self.activeSearch.projectCreateDate, SubmitState:self.activeSearch.submitState}), {headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            .then(function (response) {
                self.activeData = response.data.AuditworkProjectDTO;
                self.activeDataTotal = response.data.total;
                self.activePageTotal = Math.ceil(response.data.total / self.activePageSize);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getInactiveData() {
            /*this.$http({
                methods: "get",
                url: "http://dingxin.cmsmate.cn/api/AuditProject/GetTerminationAuditworkProjectList?LoginUserId=C96E31B8-1C7B-C299-A1FD-08D39B1C789A&PageSize=" + this.inactivePageSize + "&PageNum=" + this.inactivePageNum,
                transformResponse: [(data) => {
                    return JSON.parse(data);
                }],
                params: {

                }
            }).then((response) => {
                this.inactiveData = response.data.AuditworkProjectDTO;
                this.inactiveDataTotal = response.data.total;
                this.inactivePageTotal = Math.ceil(response.data.total / this.inactivePageSize);
            }).catch((error) => {
                console.log(error);
            });*/
            var self = this;
            axios.post("http://dingxin.cmsmate.cn/api/AuditProject/GetTerminationAuditworkProjectList", qs.stringify({LoginUserId:"C96E31B8-1C7B-C299-A1FD-08D39B1C789A", PageSize:self.inactivePageSize, PageNum:self.inactivePageNum, ProjectName:self.inactiveSearch.projectName, IndustryType:self.inactiveSearch.industryType, RiskLevel:self.inactiveSearch.riskLevel, IsHeadquartersReview:self.inactiveSearch.isHeadquartersReview, AuditStartDate:self.inactiveSearch.auditStartDate, AuditEndDate:self.inactiveSearch.auditEndDate, ManuscriptTemplateName:self.inactiveSearch.manuscriptTemplateName, NoteAppendedTypeName:self.inactiveSearch.noteAppendedTypeName, ProjectCreateDate:self.inactiveSearch.projectCreateDate, SubmitState:self.inactiveSearch.submitState}), {headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            .then(function (response) {
                self.inactiveData = response.data.AuditworkProjectDTO;
                self.inactiveDataTotal = response.data.total;
                self.inactivePageTotal = Math.ceil(response.data.total / self.inactivePageSize);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        setInactive(id) {
            var self = this;
            axios.post("http://dingxin.cmsmate.cn/api/AuditProject/TerminationProject", qs.stringify({AuditProjectId:id}), {headers:{"Content-Type":"application/x-www-form-urlencoded"}}
            ).then(function (response) {
                if (response.data)
                {
                    self.getActiveData();
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        setActive(id) {
            var self = this;
            axios.post("http://dingxin.cmsmate.cn/api/AuditProject/EnableProject", qs.stringify({AuditProjectId:id}), {headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            .then(function (response) {
                if (response.data)
                {
                    self.getInactiveData();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    beforeMount(){// 首先获得数据
        this.getActiveData();
    },
    mounted() {
        $(".table").tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        });
        //load datatable
        
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
    .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid;}
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
.cusFoot{ height: 40px;}
.cusPagNum{ }
.cusTabInfo { margin-left:2%; }
.cusTabInfo button { background-color:white; border-color:#1dbba4; }
.pager-input { display:inline-block; border:1px solid #1dbba4; border-radius:5px; width:20%; margin:0 1%; padding:0 1%; text-align:center; }
.pagination { margin:0; }
.pagination>li>a { border:1px solid transparent; background-color:transparent !important; color:black; }
.pagination>li.active>a { border-color:#1dbba4; color:#1dbba4; }

.table{margin-bottom: 10px; border-bottom: 1px solid #cdcece;}

.data-search{padding-left:0px;}
.audit-table{margin-top: 10px !important;}
.audit-table:hover{cursor:pointer;}
.audit-table>thead{background-color: #a1d9d1;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";border-bottom: 0px;}
.audit-table>thead>tr th{font-weight: normal;font-weight: 400;height: 40px;font-size:14px;text-align: center;border-bottom: 0px solid #111;padding: 0px;line-height: 40px;}
.cutTaBody{border: 0px; }
.cutTaBody tr{height: 30px;border-right: 0px solid #cdcece;}
.cutTaBody tr td{text-align: center;border-right: 1px solid #cdcece;}
.cutTaBody tr td:last-child{border-right: 0px !important;}
.tooltip{background-color: red!important; color: red;}
table.dataTable.no-footer {border-bottom: 1px solid #cdcece;}

.table-btn-img { width:12%; margin:0 5%; }
table { table-layout:fixed; }
tr { height:30px; }
th,td { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; height:30px; padding:4px; }
.table>tbody>tr:hover { background-color:#a1d9d1; }

.col-menu { position:absolute; }
.col-menu-cell { }
</style>