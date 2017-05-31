<template>
<div v-if="visible">
  <div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
          <h4 class="modal-title" id="myModalLabel">被审计单位&nbsp;&gt;&nbsp;已激活&nbsp;&gt;&nbsp;{{title1[whetherGroup]}}&nbsp;&gt;&nbsp;{{title2[viewType]}}&nbsp;&gt;&nbsp;{{title3}}</h4>
        </div>
        <div class="modal-body">
          <div class="toolbar">
            <div class="fuhejilu" v-if="btnShow">
              <button v-if="1 == viewType || 2 == viewType" class="fuheBut" @mouseover="modalBtnIcon1='sub-btn_h';" @mouseout="modalBtnIcon1='sub-btn';">
                <img :src="'static/img/' + modalBtnIcon1 + '.png'"/>
                <span>提交</span>
              </button>
              <button v-if="3 == viewType && editOrSave" class="fuheBut" @mouseover="modalBtnIcon2='edit_h';" @mouseout="modalBtnIcon2='edit';" @click="basicEdit1=true; basicEdit2=true; editOrSave=false;">
                <img :src="'static/img/' + modalBtnIcon2 + '.png'"/>
                <span>编辑</span>
              </button>
              <button v-if="!editOrSave" class="fuheBut" @mouseover="modalBtnIcon3='save_h';" @mouseout="modalBtnIcon3='save';" @click="modalBtnIcon2='edit_h'; basicEdit1=false; basicEdit2=false; editOrSave=true;">
                <img :src="'static/img/' + modalBtnIcon3 + '.png'"/>
                <span>保存</span>
              </button>
              <!--<button class="fuheBut" @click="close();" @mouseover="modalBtnIcon3='back_h';" @mouseout="modalBtnIcon3='back';">
                <img :src="'static/img/' + modalBtnIcon3 + '.png'"/>
                <span>返回</span>
              </button>-->
              <button class="fuheBut" @mouseover="modalBtnIcon4='sign-batch_h';" @mouseout="modalBtnIcon4='sign-batch';">
                <img :src="'static/img/' + modalBtnIcon4 + '.png'"/>
                <span>批量签字</span>
              </button>
              <button class="fuheBut" @mouseover="modalBtnIcon5='sign-batch-cancel_h';" @mouseout="modalBtnIcon5='sign-batch-cancel';">
                <img :src="'static/img/' + modalBtnIcon5 + '.png'"/>
                <span>批量取消签字</span>
              </button>
            </div>
          </div>
          <div class="clearfix" style="height:90%;">
            <div class="panel panel-default" style="height:100%;">
              <!-- panel-heading -->
              <div class="panel-body" style="height:100%;">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs clearfix" style="background-color:#eee;padding-top:1%;">
                  <li @click="title3='基本信息';btnShow=true;getBasicData();setBtnTitle();" class="active">
                    <a href="#basic" data-toggle="tab" aria-expanded="false">基本信息</a>
                  </li>
                  <li @click="title3='项目组成员';btnShow=true;getMemberData(1);setBtnTitle();">
                    <a href="#member" data-toggle="tab" aria-expanded="false">项目组成员</a>
                  </li>
                  <li @click="title3='审计计划';btnShow=true;getPlanData();setBtnTitle();">
                    <a href="#plan" data-toggle="tab" aria-expanded="false">审计计划</a>
                  </li>
                  <li @click="title3='审计完成';btnShow=false;">
                    <a href="#complete" data-toggle="tab" aria-expanded="false">审计完成</a>
                  </li>
                  <li @click="title3='复核意见';btnShow=true;">
                    <a href="#opinion" data-toggle="tab" aria-expanded="false">复核意见</a>
                  </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content" style="margin-top:2%;padding:0 2%;overflow-y:auto;height:80%;">
                  <div class="tab-pane fade in active" id="basic">
                    <div class="clearfix">
                      <div class="pull-left form-group has-feedback cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>项目名称</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusNo" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="name" readonly="readonly" v-model="basic.projectName"/>
                          <i class="form-control-feedback" data-fv-icon-for="name"></i>
                          <small class="help-block" data-fv-validator="notEmpty" data-fv-for="name" data-fv-result="NOT_VALIDATED" style="display: none;">客户编号必填</small>
                        </div>
                      </div>
                      <div class="pull-left form-group has-feedback cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>被审计单位</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo" readonly="readonly" v-model="basic.managerProjectName"/>
                          <i class="form-control-feedback" data-fv-icon-for="machineNo" style="display: none;"></i>
                          <small class="help-block" data-fv-validator="notEmpty" data-fv-for="machineNo" data-fv-result="NOT_VALIDATED" style="display: none;">客户编号必填</small>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>行业类型</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusTopCompany" value="" placeholder="" readonly="readonly" v-model="basic.industryType"/>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label  class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>风险等级</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusBegin" value="" placeholder="" readonly="readonly" v-model="basic.riskLevel"/>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>是否总部复核</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusCode" value="" placeholder="" readonly="readonly" v-model="basic.isHeadquartersReview"/>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>复核总部</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusMoneyType" value="" placeholder="" readonly="readonly" v-model="basic.reviewHeadquarters"/>
                        </div>
                      </div>
                      <div class="pull-left form-group has-feedback cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>审计期间开始日</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusNo" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="name" readonly="readonly" v-model="basic.auditStartDate"/>
                          <i class="form-control-feedback" data-fv-icon-for="name" style="display: none;"></i>
                          <small class="help-block" data-fv-validator="notEmpty" data-fv-for="name" data-fv-result="NOT_VALIDATED" style="display: none;">客户编号必填</small>
                        </div>
                      </div>
                      <div class="pull-left form-group has-feedback cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>审计期间结束日</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo" readonly="readonly" v-model="basic.auditEndDate"/>
                          <i class="form-control-feedback" data-fv-icon-for="machineNo" style="display: none;"></i>
                          <small class="help-block" data-fv-validator="notEmpty" data-fv-for="machineNo" data-fv-result="NOT_VALIDATED" style="display: none;">客户编号必填</small>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>底稿模板</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusTopCompany" value="" placeholder="" readonly="readonly" v-model="basic.manuscriptTemplateName"/>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label  class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>底稿附注</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusBegin" value="" placeholder="" v-model="basic.noteAppendedTypeName" :readonly="basicEdit1 ? false : true"/>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>财年开始日</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusCode" value="" placeholder="" readonly="readonly" v-model="basic.fiscalYearStartDate"/>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>财年结束日</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusCode" value="" placeholder="" readonly="readonly" v-model="basic.fiscalYearEndDate"/>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>币种</span>
                        </label>
                        <div class="col-sm-8">
                          <select class="form-control" name="cusCode" v-model="basic.currency" :disabled="basicEdit2 ? false : true">
                            <option v-for="(value,key) in currency" :value="key">{{value}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="pull-left form-group cusGroup">
                        <label class="col-sm-4 control-label cusConLabel">
                          <span class="required"></span>
                          <span>创建时间</span>
                        </label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="cusCode" value="" placeholder="" readonly="readonly" v-model="basic.projectCreateDate"/>
                        </div>
                      </div>
                    </div>
                    <!--second end-->
                  </div>
                  <div class="tab-pane fade" id="member">
                    <div class="panel panel-default">
                      <!-- panel-heading -->
                      <div class="panel-body clearfix" style="margin-top:10px;">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs pull-left member-nav">
                          <li @click="getMemberData(1);setBtnTitle();" class="active">
                            <a href="#review" data-toggle="tab" aria-expanded="false">复核人员</a>
                          </li>
                          <li @click="getMemberData(2);setBtnTitle();">
                            <a href="#organization" data-toggle="tab" aria-expanded="false">编制人员</a>
                          </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content pull-left member-content">
                          <div class="tab-pane fade in active" id="review">
                            <div class="fuhejilu">
                              <button v-if="40 == projectRole || 60 == projectRole" class="fuheBut" @click="openAddMember(1);" v-on:mouseover="addMember1Icon='add_h';" v-on:mouseout="addMember1Icon='add';">
                                <img :src="'static/img/' + addMember1Icon + '.png'"/>
                                <span>新增复核专员</span>
                              </button>
                            </div>
                            <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                              <colgroup>
                                <col style="width:5%;"/>
                                <col style="width:18%;"/>
                                <col style="width:22%;"/>
                                <col style="width:22%;"/>
                                <col style="width:18%;"/>
                                <col style="width:15%;"/>
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>
                                    <span class="data-search" @click="member1Query = member1Query ? false : true;">
                                      <img src="static/img/search.png"/>
                                    </span>
                                  </th>
                                  <th>姓名</th>
                                  <th>登录名</th>
                                  <th>部门</th>
                                  <th>项目角色</th>
                                  <th>操作</th>
                                </tr>
                              </thead>
                              <tbody class="cutTaBody">
                                <tr v-if="member1Query">
                                  <td></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td>
                                    <img src="static/img/search.png"/>
                                  </td>
                                </tr>
                                <template v-for="(item,index) in member[0]">
                                  <tr>
                                    <td>{{index + 1}}</td>
                                    <td>{{item.FullName}}</td>
                                    <td>{{item.JobNumber}}</td>
                                    <td>{{item.DeptName}}</td>
                                    <td>{{item.ProjectRoles}}</td>
                                    <td>
                                      <span v-if="50 == item.ProjectRoleType || 70 == item.ProjectRoleType" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除">
                                          <img src="static/img/del.png" style="width:15%;"/>
                                      </span>
                                    </td>
                                  </tr>
                                </template>
                              </tbody>
                            </table>
                            <!--<div class="clearfix cusFoot">
                              <div class="pull-left cusPagNum">
                                <nav aria-label="Page navigation">
                                  <ul class="pagination">
                                    <li>
                                      <a href="javascript:void(0);" aria-label="Previous" @click="member1PageNum-=1;getMemberData(1);">
                                        <span aria-hidden="true">〈</span>
                                      </a>
                                    </li>
                                    <li :class="{active:1 == member1PageNum}"><a href="javascript:void(0);" @click="member1PageNum=1;getMemberData(1);">1</a></li>
                                    <li v-for="n in member1PageTotal" v-if="1 < n && n < member1PageTotal && n > member1PageTotal - 3 && n < member1PageTotal + 3" :class="{active:n == member1PageNum}">
                                      <a href="javascript:void(0);" @click="member1PageNum=n;getMemberData(1);">{{n}}</a>
                                    </li>
                                    <li v-if="1 < member1PageTotal" :class="{active:member1PageTotal == member1PageNum}"><a href="javascript:void(0);" @click="member1PageNum=member1PageTotal;getMemberData(1);">{{member1PageTotal}}</a></li>
                                    <li>
                                      <a href="javascript:void(0);" aria-label="Next" @click="member1PageNum+=1;getMemberData(1);">
                                        <span aria-hidden="true">〉</span>
                                      </a>
                                    </li>
                                  </ul>
                                </nav>
                              </div>
                              <div class="pull-left cusTabInfo">
                                <span>第</span>
                                <input type="tel" class="form-control pager-input" v-model.lazy.number.trim="member1PageNum" @keyup.enter="getMemberData(1);"/>
                                <span>页</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>每页</span>
                                <div class="btn-group dropup" style="margin:0px 10px;">
                                  <button type="button" class="btn btn-default" id="pageNum">{{member1PageSize}}</button>
                                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#1dbba4;">
                                    <span class="caret"></span>
                                  </button>
                                  <ul class="dropdown-menu" style="min-width:45px;">
                                    <li class="pageList" data-val="5"><a href="javascript:void(0);" @click="member1PageSize=5;getMemberData(1);">5</a></li>
                                    <li class="pageList" data-val="10"><a href="javascript:void(0);" @click="member1PageSize=10;getMemberData(1);">10</a></li>
                                  </ul>
                                </div>
                                <span>条</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>共{{member1DataTotal}}条</span>
                              </div>
                            </div>-->
                          </div>
                          <div class="tab-pane fade" id="organization">
                            <div class="fuhejilu">
                              <button class="fuheBut" @click="openAddMember(2);" v-on:mouseover="addMember2Icon='add_h';" v-on:mouseout="addMember2Icon='add';">
                                <img :src="'static/img/' + addMember2Icon + '.png'"/>
                                <span>新增编制专员</span>
                              </button>
                            </div>
                            <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                              <colgroup>
                                <col style="width:5%;"/>
                                <col style="width:14%;"/>
                                <col style="width:18%;"/>
                                <col style="width:18%;"/>
                                <col style="width:14%;"/>
                                <col style="width:16%;"/>
                                <col style="width:15%;"/>
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>
                                    <span class="data-search" @click="member2Query = member2Query ? false : true;">
                                      <img src="static/img/search.png"/>
                                    </span>
                                  </th>
                                  <th>姓名</th>
                                  <th>登录名</th>
                                  <th>部门</th>
                                  <th>项目角色</th>
                                  <th>项目人员状态</th>
                                  <th>操作</th>
                                </tr>
                              </thead>
                              <tbody class="cutTaBody">
                                <tr v-if="member2Query">
                                  <td></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td><input type="text" class="form-control"/></td>
                                  <td>
                                    <img src="static/img/search.png"/>
                                  </td>
                                </tr>
                                <template v-for="(item,index) in member[1]">
                                  <tr>
                                    <td>{{index + 1}}</td>
                                    <td>{{item.FullName}}</td>
                                    <td>{{item.JobNumber}}</td>
                                    <td>{{item.DeptName}}</td>
                                    <td>{{item.ProjectRoles}}</td>
                                    <td>{{10 == item.IsEnable ? "开启" : (20 == item.IsEnable ? "关闭" : "")}}</td>
                                    <td>
                                      <span data-toggle="tooltip" data-placement="left" title="" data-original-title="删除">
                                          <img src="static/img/del.png" style="width:15%;"/>
                                      </span>
                                    </td>
                                  </tr>
                                </template>
                              </tbody>
                            </table>
                            <!--<div class="clearfix cusFoot">
                              <div class="pull-left cusPagNum">
                                <nav aria-label="Page navigation">
                                  <ul class="pagination">
                                    <li>
                                      <a href="javascript:void(0);" aria-label="Previous" @click="member2PageNum-=1;getMemberData(2);">
                                        <span aria-hidden="true">〈</span>
                                      </a>
                                    </li>
                                    <li :class="{active:1 == member2PageNum}"><a href="javascript:void(0);" @click="member2PageNum=1;getMemberData(2);">1</a></li>
                                    <li v-for="n in member2PageTotal" v-if="1 < n && n < member2PageTotal && n > member2PageTotal - 3 && n < member2PageTotal + 3" :class="{active:n == member2PageNum}">
                                      <a href="javascript:void(0);" @click="member2PageNum=n;getMemberData(2);">{{n}}</a>
                                    </li>
                                    <li v-if="1 < member2PageTotal" :class="{active:member2PageTotal == member2PageNum}"><a href="javascript:void(0);" @click="member2PageNum=member2PageTotal;getMemberData(2);">{{member2PageTotal}}</a></li>
                                    <li>
                                      <a href="javascript:void(0);" aria-label="Next" @click="member2PageNum+=1;getMemberData(2);">
                                        <span aria-hidden="true">〉</span>
                                      </a>
                                    </li>
                                  </ul>
                                </nav>
                              </div>
                              <div class="pull-left cusTabInfo">
                                <span>第</span>
                                <input type="tel" class="form-control pager-input" v-model.lazy.number.trim="member2PageNum" @keyup.enter="getMemberData(2);"/>
                                <span>页</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>每页</span>
                                <div class="btn-group dropup" style="margin:0px 10px;">
                                  <button type="button" class="btn btn-default" id="pageNum">{{member2PageSize}}</button>
                                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#1dbba4;">
                                    <span class="caret"></span>
                                  </button>
                                  <ul class="dropdown-menu" style="min-width:45px;">
                                    <li class="pageList" data-val="5"><a href="javascript:void(0);" @click="member2PageSize=5;getMemberData(2);">5</a></li>
                                    <li class="pageList" data-val="10"><a href="javascript:void(0);" @click="member2PageSize=10;getMemberData(2);">10</a></li>
                                  </ul>
                                </div>
                                <span>条</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>共{{member2DataTotal}}条</span>
                              </div>
                            </div>-->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="plan">
                    <div>
                      <div>
                        <div class="subtitle">关键信息</div>
                        <div class="clearfix plan-key-container">
                          <!--<div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">重要性水平</div>
                            <div class="pull-right plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">内部控制汇总</div>
                            <div class="pull-right plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">重大帐户列表</div>
                            <div class="pull-right plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">风险应对程序</div>
                            <div class="pull-right plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">已识别的风险汇总</div>
                            <div class="pull-right plan-key-view">进入查看</div>
                          </div>-->
                          <template v-if="10 == whetherGroup">
                            <div v-for="(item,index) in plan[0]" class="pull-left plan-key">
                              <div class="pull-left plan-key-title">{{item.ItemName}}</div>
                              <div class="pull-left plan-key-name">{{item.EditorName}}</div>
                              <div class="pull-left plan-key-time">{{item.EditTime}}</div>
                              <div class="pull-right plan-key-view">进入查看</div>
                            </div>
                          </template>
                          <template v-if="20 == whetherGroup">
                            <div v-for="(item,index) in plan[0]" class="pull-left plan-key">
                              <div class="pull-left plan-key-title">{{item.ItemName}}</div>
                              <div class="pull-right plan-key-view">进入查看</div>
                            </div>
                          </template>
                        </div>
                      </div>
                      <div>
                        <div class="subtitle">工作底稿</div>
                        <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                          <colgroup>
                            <col style="width:11%;"/>
                            <col style="width:15%;"/>
                            <col style="width:15%;"/>
                            <col style="width:11%;"/>
                            <col style="width:11%;"/>
                            <col style="width:11%;"/>
                            <col style="width:11%;"/>
                            <col style="width:15%;"/>
                          </colgroup>
                          <thead>
                            <tr>
                              <th>
                                <span class="data-search" @click="planQuery = planQuery ? false : true;">
                                  <img src="static/img/search.png"/>
                                  &nbsp;&nbsp;
                                  <input type="checkbox"/>
                                </span>
                              </th>
                              <th>底稿名称</th>
                              <th>审计期间</th>
                              <th>编制人</th>
                              <th>一级复核人</th>
                              <th>提交状态</th>
                              <th>复核状态</th>
                              <th>操作</th>
                            </tr>
                          </thead>
                          <tbody class="cutTaBody">
                            <!--<tr>
                              <td>1</td>
                              <td colspan="7">初步业务活动工作底稿</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>初步承接</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>初步业务活动</td>
                              <td>2013.07至2013.08</td>
                              <td>编制人</td>
                              <td>项目经理</td>
                              <td>可提交</td>
                              <td>编制中</td>
                              <td>
                                <span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
                              </td>
                            </tr>-->
                            <tr v-if="planQuery">
                              <td></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td>
                                <img src="static/img/search.png"/>
                              </td>
                            </tr>
                            <template v-for="(item,index) in plan[1]">
                              <tr>
                                <td>
                                  <span>{{index + 1}}&nbsp;&nbsp;</span>
                                  <input type="checkbox"/>
                                </td>
                                <td>{{item.ManuscriptName}}</td>
                                <td>{{item.AuditStartDate}}&nbsp;至&nbsp;{{item.AuditEndDate}}</td>
                                <td>{{item.CompilingPersonSignName}}</td>
                                <td>{{item.FirstLevelReviewerSignName}}</td>
                                <td>{{item.SubmitState}}</td>
                                <td>{{10 == item.ReviewState ? "未复核" : (20 == item.ReviewState ? "复核中" : (30 == item.ReviewState ? "复核完成" : ""))}}</td>
                                <td>
                                  <span data-toggle="tooltip" data-placement="left" title="" data-original-title="签字">
                                    <img class="plan-table-btn-img" src="static/img/sign.png"/>
                                  </span>
                                  <span data-toggle="tooltip" data-placement="left" title="" data-original-title="底稿附件">
                                    <img class="plan-table-btn-img" src="static/img/attachment.png"/>
                                  </span>
                                  <span v-if="2 == viewType" data-toggle="tooltip" data-placement="left" title="" data-original-title="新增复核意见" @click="openAddReview(item.ID, item.ManuscriptName);">
                                    <img class="plan-table-btn-img" src="static/img/add.png"/>
                                  </span>
                                </td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!--<div>
                      <div>
                        <div class="subtitle">关键信息</div>
                        <div class="clearfix plan-key-container">
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">识别主要组成部分</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">集团层面重大错报风险表</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">了解集团层面控制</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">了解合并过程</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">确定集团层面和组成部分重要性</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">了解组成部分注册会计师</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">确定对组成部分执行工作的类型</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                          <div class="pull-left plan-key">
                            <div class="pull-left plan-key-title">总体审计策略</div>
                            <div class="pull-left plan-key-name">张三</div>
                            <div class="pull-left plan-key-time">YYYY-MM-DD HH:MM:SS</div>
                            <div class="pull-left plan-key-view">进入查看</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="subtitle">工作底稿</div>
                        <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                          <thead>
                            <tr>
                              <th><span class="glyphicon glyphicon-search" id="dataSearch"></span></th>
                              <th>底稿名称</th>
                              <th>审计期间</th>
                              <th>编制人</th>
                              <th>一级复核人</th>
                              <th>提交状态</th>
                              <th>复核状态</th>
                              <th>操作</th>
                            </tr>
                          </thead>
                          <tbody class="cutTaBody">
                            <tr>
                              <td>1</td>
                              <td colspan="7">初步业务活动工作底稿</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>初步承接</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>初步业务活动</td>
                              <td>2013.07至2013.08</td>
                              <td>编制人</td>
                              <td>项目经理</td>
                              <td>可提交</td>
                              <td>编制中</td>
                              <td>
                                <span class="glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="left" title="" data-original-title="删除"></span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>-->
                  </div>
                  <div class="tab-pane fade" id="complete">
                    <div v-if="!activationState">
                      <div class="subtitle">状态：未激活</div>
                      <div class="complete-content">
                        <button type="button" class="complete-btn" @click="setActive();">激活</button>
                        <div class="complete-text">进一步审计程序阶段激活状态：复核未完成，不能编辑</div>
                      </div>
                    </div>
                    <div v-if="activationState">
                      <div class="clearfix">
                        <div class="pull-left subtitle">状态：已激活</div>
                        <div class="pull-right complete-text">进一步审计程序阶段激活状态：复核未完成，不能编辑</div>
                      </div>
                      <hr/>
                      <div>
                        <div class="subtitle">工作底稿</div>
                        <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                          <colgroup>
                            <col style="width:11%;"/>
                            <col style="width:15%;"/>
                            <col style="width:15%;"/>
                            <col style="width:11%;"/>
                            <col style="width:11%;"/>
                            <col style="width:11%;"/>
                            <col style="width:11%;"/>
                            <col style="width:15%;"/>
                          </colgroup>
                          <thead>
                            <tr>
                              <th>
                                <span class="data-search" @click="complete1Query = complete1Query ? false : true;">
                                  <img src="static/img/search.png"/>
                                </span>
                              </th>
                              <th>底稿名称</th>
                              <th>审计期间</th>
                              <th>编制人</th>
                              <th>一级复核人</th>
                              <th>提交状态</th>
                              <th>复核状态</th>
                              <th>操作</th>
                            </tr>
                          </thead>
                          <tbody class="cutTaBody">
                            <tr v-if="complete1Query">
                              <td></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td>
                                <img src="static/img/search.png"/>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td colspan="7">初步业务活动工作底稿</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>初步承接</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <span data-toggle="tooltip" data-placement="left" title="" data-original-title="签字">
                                  <img class="plan-table-btn-img" src="static/img/sign.png"/>
                                </span>
                                <span data-toggle="tooltip" data-placement="left" title="" data-original-title="新增复核意见" @click="openAddReview('','');">
                                  <img class="plan-table-btn-img" src="static/img/add.png"/>
                                </span>
                                <span data-toggle="tooltip" data-placement="left" title="" data-original-title="底稿附件">
                                  <img class="plan-table-btn-img" src="static/img/attachment.png"/>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>初步业务活动</td>
                              <td>2013.07至2013.08</td>
                              <td>编制人</td>
                              <td>项目经理</td>
                              <td>可提交</td>
                              <td>编制中</td>
                              <td>
                                <span data-toggle="tooltip" data-placement="left" title="" data-original-title="签字">
                                  <img class="plan-table-btn-img" src="static/img/sign.png"/>
                                </span>
                                <span data-toggle="tooltip" data-placement="left" title="" data-original-title="新增复核意见" @click="openAddReview('','');">
                                  <img class="plan-table-btn-img" src="static/img/add.png"/>
                                </span>
                                <span data-toggle="tooltip" data-placement="left" title="" data-original-title="底稿附件">
                                  <img class="plan-table-btn-img" src="static/img/attachment.png"/>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <div class="subtitle">报告&附注</div>
                        <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                          <colgroup>
                            <col style="width:8%;"/>
                            <col style="width:22%;"/>
                            <col style="width:25%;"/>
                            <col style="width:30%;"/>
                            <col style="width:15%;"/>
                          </colgroup>
                          <thead>
                            <tr>
                              <th>
                                <span class="data-search" @click="complete2Query = complete2Query ? false : true;">
                                  <img src="static/img/search.png"/>
                                </span>
                              </th>
                              <th>报告名称</th>
                              <th>审计期间</th>
                              <th>复核状态</th>
                              <th>操作</th>
                            </tr>
                          </thead>
                          <tbody class="cutTaBody">
                            <tr v-if="complete2Query">
                              <td></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td><input type="text" class="form-control"/></td>
                              <td>
                                <img src="static/img/search.png"/>
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>审计报告</td>
                              <td>2013.07至2013.08</td>
                              <td>编制中</td>
                              <td>
                                <span data-toggle="tooltip" data-placement="left" title="" data-original-title="底稿附件">
                                  <img class="complete-table-btn-img" src="static/img/attachment.png"/>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--<div class="clearfix cusFoot">
                          <div class="pull-left cusPagNum">
                            <nav aria-label="Page navigation">
                              <ul class="pagination">
                                <li>
                                  <a href="javascript:void(0);" aria-label="Previous">
                                    <span aria-hidden="true">〈</span>
                                  </a>
                                </li>
                                <li class="active"><a href="javascript:void(0);">1</a></li>
                                <li>
                                  <a href="javascript:void(0);" aria-label="Next">
                                    <span aria-hidden="true">〉</span>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                          <div class="pull-left cusTabInfo">
                            <span>第</span>
                            <input type="tel" class="form-control pager-input"/>
                            <span>页</span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>每页</span>
                            <div class="btn-group dropup" style="margin:0px 10px;">
                              <button type="button" class="btn btn-default" id="pageNum">5</button>
                              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#1dbba4;">
                                <span class="caret"></span>
                              </button>
                              <ul class="dropdown-menu" style="min-width:45px;">
                                <li class="pageList" data-val="5"><a href="javascript:void(0);">5</a></li>
                                <li class="pageList" data-val="10"><a href="javascript:void(0);">10</a></li>
                              </ul>
                            </div>
                            <span>条</span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>共&nbsp;&nbsp;条</span>
                          </div>
                        </div>-->
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="opinion">
                    <div class="fuhejilu">
                      <button class="fuheBut" @click="openAddReview('','');" v-on:mouseover="addReviewIcon='add_h';" v-on:mouseout="addReviewIcon='add';">
                        <img :src="'static/img/' + addReviewIcon + '.png'"/>
                        <span>新增复核意见</span>
                      </button>
                    </div>
                    <div>
                      <div class="subtitle">项目组内</div>
                      <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                        <thead>
                          <tr>
                            <th>复核人员</th>
                            <th>复核意见</th>
                            <th>复核附件</th>
                            <th>关联底稿</th>
                            <th>复核时间</th>
                            <th>复核操作</th>
                            <th>复核意见</th>
                            <th>复核附件</th>
                            <th>复核人员</th>
                            <th>复核时间</th>
                          </tr>
                        </thead>
                        <tbody class="cutTaBody">
                          <tr>
                            <td>现场负责人复核</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>张三</td>
                            <td>文本内容</td>
                            <td>
                              <span class="opinion-cell-a">附件名</span>
                            </td>
                            <td>
                              <span class="opinion-cell-a">关联底稿</span>
                            </td>
                            <td>YYYY-MM-DD HH:MM:SS</td>
                            <td>
                              <span class="opinion-cell-a" @click="openReplyReview();">回复</span>
                            </td>
                            <td>——</td>
                            <td>
                              <span class="opinion-cell-a">附件名</span>
                            </td>
                            <td>王刚（编辑人）</td>
                            <td>YYYY-MM-DD HH:MM:SS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <div class="subtitle">项目组外</div>
                      <table cellspacing="0" width="100%" class="table table-striped table-bordered audit-table">
                        <thead>
                          <tr>
                            <th>复核人员</th>
                            <th>复核意见</th>
                            <th>复核附件</th>
                            <th>关联底稿</th>
                            <th>复核时间</th>
                            <th>复核操作</th>
                            <th>复核意见</th>
                            <th>复核附件</th>
                            <th>复核人员</th>
                            <th>复核时间</th>
                          </tr>
                        </thead>
                        <tbody class="cutTaBody">
                          <tr>
                            <td>独立复核</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>张三</td>
                            <td>文本内容</td>
                            <td>
                              <span class="opinion-cell-a">附件名</span>
                            </td>
                            <td>
                              <span class="opinion-cell-a">关联底稿</span>
                            </td>
                            <td>YYYY-MM-DD HH:MM:SS</td>
                            <td>
                              <span class="opinion-cell-a" @click="openReplyReview();">回复</span>
                            </td>
                            <td>——</td>
                            <td>
                              <span class="opinion-cell-a">附件名</span>
                            </td>
                            <td>王刚（编辑人）</td>
                            <td>YYYY-MM-DD HH:MM:SS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
  <div class="modal-backdrop fade in"></div>
<addMember :ifShowAddMember="showAddMember" :projectId="projectId" :addMemberType="addMemberType" @closeAddMemberInMoal="closeAddMember"></addMember>
<addReview :ifShowAddReview="showAddReview" :projectId="projectId" :msInfo="msInfo" @closeAddReviewInMoal="closeAddReview"></addReview>
<replyReview :ifShowReplyReview="showReplyReview" :projectId="projectId" @closeReplyReviewInMoal="closeReplyReview"></replyReview>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import addMember from './addMember.vue';
import addReview from './addReview.vue';
import replyReview from './replyReview.vue';
export default {
    components: {
        addMember,
        addReview,
        replyReview
    },
    data: function() {
        var data = {};
        data["title1"] = {10:"集团", 20:"单体"};
        data["title2"] = {1:"提交", 2:"复核", 3:"查看"};
        data["title3"] = "基本信息";
        data["btnShow"] = true;
        //data["projectId"] = this.project-id;
        //data["industryType"] = this.industry-type;
        //data["riskLevel"] = this.risk-level;
        //data["currency"] = this.currency-type;
        data["pageSize"] = 10,
        data["basic"] = {projectName:"", managerProjectName:"", industryType:"", riskLevel:"", isHeadquartersReview:"", reviewHeadquarters:"", auditStartDate:"", auditEndDate:"", manuscriptTemplateName:"", noteAppendedTypeName:"", fiscalYearStartDate:"", fiscalYearEndDate:"", currency:"", projectCreateDate:""};
        data["basicEdit1"] = false;
        data["basicEdit2"] = false;
        data["projectRole"] = 0;
        data["member"] = {0:[], 1:[]};
        data["member1DataTotal"] = 0;
        data["member1PageSize"] = 10;
        data["member1PageNum"] = 1;
        data["member1PageTotal"] = 1;
        data["member1Query"] = false;
        data["member2DataTotal"] = 0;
        data["member2PageSize"] = 10;
        data["member2PageNum"] = 1;
        data["member2PageTotal"] = 1;
        data["member2Query"] = false;
        data["plan"] = {0:[], 1:[]};
        data["planQuery"] = false;
        data["msInfo"] = {};
        data["activationState"] = false;
        data["complete1Query"] = false;
        data["complete2Query"] = false;
        data["whetherGroup"] = this.isGroup;
        data["showAddMember"] = false;
        data["addMemberType"] = 1;
        data["showAddReview"] = false;
        data["showReplyReview"] = false;
        data["editOrSave"] = true;
        data["modalBtnIcon1"] = "sub-btn";
        data["modalBtnIcon2"] = "edit";
        data["modalBtnIcon3"] = "save_h";
        data["modalBtnIcon4"] = "sign-batch";
        data["modalBtnIcon5"] = "sign-batch-cancel";
        data["addMember1Icon"] = "add";
        data["addMember2Icon"] = "add";
        data["addReviewIcon"] = "add";
        return data;
    },
    props: {
        visible: Boolean,
        projectId: String,
        isGroup: Number,
        viewType: Number,
        industryType: Object,
        riskLevel: Object,
        currency: Object
    },
    created: function(){
        
    },
    methods: {
        close () {
            this.$emit('close');
            this.btnShow = true;
            this.editOrSave = true;
            this.modalBtnIcon2 = "edit";
            this.modalBtnIcon3 = "save_h";
            this.basicEdit1 = false;
            this.basicEdit2 = false;
            this.basic = {projectName:"", managerProjectName:"", industryType:{}, riskLevel:{}, isHeadquartersReview:"", reviewHeadquarters:"", auditStartDate:"", auditEndDate:"", manuscriptTemplateName:"", noteAppendedTypeName:"", fiscalYearStartDate:"", fiscalYearEndDate:"", currency:{}, projectCreateDate:""};
            this.member = {0:[], 1:[]};
            this.plan = {0:[], 1:[]};
            this.msInfo = {};
        },
        setBtnTitle() {
            $(".table").tooltip({
                selector: "[data-toggle=tooltip]",
                container: "body"
            });
        },
        getBasicData() {
            this.$http({
                    methods: 'get',
                    url: 'http://dingxin.cmsmate.cn/api/AuditProject/auditProjectModel?AuditProjectId=' + this.projectId,
                    transformResponse: [(data) => {
                        return JSON.parse(data);
                    }],
                    params: {

                    }
                }).then((response) => {
                    this.basic.projectName = response.data.ProjectName;
                    this.basic.managerProjectName = response.data.ManagerProjectName;
                    this.basic.industryType = this.industryType[response.data.IndustryType] + "业";
                    this.basic.riskLevel = this.riskLevel[response.data.RiskLevel];
                    this.basic.isHeadquartersReview = 1 == response.data.IsHeadquartersReview ? "是" : (0 == response.data.IsHeadquartersReview ? "否" : "");
                    this.basic.reviewHeadquarters = response.data.ReviewHeadquarters;
                    this.basic.auditStartDate = response.data.AuditStartDate;
                    this.basic.auditEndDate = response.data.AuditEndDate;
                    this.basic.manuscriptTemplateName = response.data.ManuscriptTemplateName;
                    this.basic.noteAppendedTypeName = response.data.NoteAppendedTypeName;
                    this.basic.fiscalYearStartDate = response.data.FiscalYearStartDate;
                    this.basic.fiscalYearEndDate = response.data.FiscalYearEndDate;
                    this.basic.currency = response.data.Currency;
                    this.basic.projectCreateDate = response.data.ProjectCreateDate;
                    this.whetherGroup = response.data.WhetherGroup;
                    this.activationState = response.data.ActivationState;
                }).catch((error) => {
                    console.log(error);
                });
        },
        getMemberData(type) {
            if (1 == type)
            {
                this.$http({
                    methods: "get",
                    url: "http://dingxin.cmsmate.cn/api/AuditProject/GetUserRoleLeavl?LoginUserId=C96E31B8-1C7B-C299-A1FD-08D39B1C789A",
                    transformResponse: [(data) => {
                        return JSON.parse(data);
                    }],
                    params: {

                    }
                }).then((response) => {
                    this.projectRole = response.data;
                }).catch((error) => {
                    console.log(error);
                });
            }
            
            this.$http({
                methods: 'get',
                url: 'http://dingxin.cmsmate.cn/api/AuditProject/GetProjectTeamPersonnel?ProjectId=' + this.projectId + "&roleType=" + (type * 10) + "&pageSize=10&pageNum=1",
                transformResponse: [(data) => {
                    return JSON.parse(data);
                }],
                params: {

                }
            }).then((response) => {
                this.member[type - 1] = response.data.AuditworkProjectMembersDTO;
                if (1 == type)
                {
                    this.member1DataTotal = response.data.total;
                    this.member1PageTotal = Math.ceil(response.data.total / this.member1PageSize);
                }
                else
                {
                    this.member2DataTotal = response.data.total;
                    this.member2PageTotal = Math.ceil(response.data.total / this.member2PageSize);
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        getPlanData() {
            this.$http({
                methods: 'get',
                url: 'http://dingxin.cmsmate.cn/api/AuditPlan/KeyInformationItemList?AuditProjectId=' + this.projectId,
                transformResponse: [(data) => {
                    return JSON.parse(data);
                }],
                params: {

                }
            }).then((response) => {
                this.plan[0] = response.data;
            }).catch((error) => {
                console.log(error);
            });
            
            if (10 == this.whetherGroup)
            {
                this.$http({
                    methods: 'get',
                    url: 'http://dingxin.cmsmate.cn/api/AuditPlan/ManuscriptItemList?AuditId=' + this.projectId + "&pageSize=" + this.pageSize + "&pageNum=1",
                    transformResponse: [(data) => {
                        return JSON.parse(data);
                    }],
                    params: {

                    }
                }).then((response) => {
                    this.plan[1] = response.data.ManuscriptItemDTO;
                }).catch((error) => {
                    console.log(error);
                });
            }
            else if (20 == this.whetherGroup)
            {
                this.$http({
                    methods: 'get',
                    url: 'http://dingxin.cmsmate.cn/api/AuditPlan/ManuscriptItemList?AuditId=' + this.projectId + "&pageSize=" + this.pageSize + "&pageNum=1",
                    transformResponse: [(data) => {
                        return JSON.parse(data);
                    }],
                    params: {

                    }
                }).then((response) => {
                    this.plan[1] = response.data.ManuscriptItemDTO;
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        setActive() {
            var self = this;
            axios.post("http://dingxin.cmsmate.cn/TaskProject/SetTaskProjectActivationState", qs.stringify({AuditworkProjectId:this.projectId}), {headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            .then(function (response) {
                if (response.data)
                {
                    this.activationState = true;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        openAddMember(type) {
            this.addMemberType = type;
            this.showAddMember = true;
        },
        closeAddMember() {
            this.showAddMember = false;
        },
        openAddReview(id, name) {
            this.msInfo = {"id":id, "name":name};
            this.showAddReview = true;
        },
        closeAddReview() {
            this.showAddReview = false;
        },
        openReplyReview() {
            this.showReplyReview = true;
        },
        closeReplyReview() {
            this.showReplyReview = false;
        }
    },
    mounted() {
        console.log('add load...');
        //load datatable
    },
    watch: {
        visible: function(val) {
            if (val)
            {
                this.getBasicData();
            }
        }
    }
}
</script>

<style scoped lang="scss">
table { table-layout:fixed; }
tr { height:30px; }
th,td { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; height:30px; padding:4px; }
label { font-weight:normal; }
.panel { border:0;margin-bottom:0; }
.fuhejilu{
    .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid;padding:0.5% 1%;border-radius:5px;margin-right:1%;}
    .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}
/**对话框样式**/
.modal-dialog { width:75%; margin:2% auto; height:92%; }
.modal-content { height:100%; }
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
.modal-body { padding:0; overflow-y:hidden; height:90%; }
.close { color:white; opacity:1; font-size:30px; margin-top:-9px; }
.modal-title{font-weight: normal; }
.toolbar { margin:1% 2%; }
.panel-body { padding:0; }
.cusGroup{height: 36px;line-height: 36px; width:50%; }
.cusConLabel{text-align: right;}
.nav-tabs>li>a { color:#000000; }
.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{color:#1dbba4;}
.required { color:red; }
.required::before { content:"*" }
.member-nav { width:12%; }
.member-nav>li { float:none; padding:8% 0; border:1px solid #ccc; border-left:0; border-right:0; }
.member-nav>li>a { padding:0; border:0 !important; border-left:5px solid transparent !important; text-align:center; border-radius:0; background-color:white; }
.member-nav>.active>a { border-left-color:#1dbba4 !important; }
.member-content { width:82%; padding-left:3%; border-left:1px solid #ccc; }
.cusFoot{ height: 40px;}
.cusPagNum{ }
.cusTabInfo { margin-left:2%; }
.cusTabInfo button { background-color:white; border-color:#1dbba4; }
.pager-input { display:inline-block; border:1px solid #1dbba4; border-radius:5px; width:20%; margin:0 1%; padding:0 1%; text-align:center; }
.pagination { margin:0; }
.pagination>li>a { border:1px solid transparent; background-color:transparent !important; color:black; }
.pagination>li.active>a { border-color:#1dbba4; color:#1dbba4; }
#dataSearch{padding-left:0px;}
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
.subtitle { padding:0 1%; border-left:3px solid black; font-weight:bold; margin:1% 0; }
.plan-key-container { margin:0; }
.plan-key { width:48%; margin:0.5% 0 0.5% 2%; }
.plan-key>div { margin-left:1%; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.plan-key-title { width:39%; }
.plan-key-name { width:9%; }
.plan-key-time { width:34%; }
.plan-key-view { width:14%; color:#1dbba4; }
.plan-table-btn-img { width:12%; margin:0 3%; }
.complete-content { padding:0 30%; text-align:center; }
.complete-btn { width:100%; border:1px solid #1dbba4; border-radius:1px; padding:10% 0; background-color:white; font-size:50px; line-height:50px; margin-bottom:10%; }
.complete-text { color:gray; }
.opinion-cell-a { color:#1dbba4; }
</style>