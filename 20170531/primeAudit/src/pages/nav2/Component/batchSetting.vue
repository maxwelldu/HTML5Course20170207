<!--      批量设置      -->

<template>
	<div v-if="visible" class="thisPage">
		<div class="modal fade in" id="myModal" style="display: block; padding-right: 21px;">
        	<div class="modal-dialog">
            	<div class="modal-content" style="height: 380px;">
            		<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close">×</button>
                    	<h4 class="modal-title" id="myModalLabel"> 项目管理 > 已激活 > 新增 > 批量设置</h4>
                	</div>
                	<div class="button-div">
                  <div class="fuhejilu"><el-button type="primary" icon="" class="btn btn-default fuheBut"><span class="fa fa-save" style="padding-right:10px;"></span>保存</el-button></div>
	                </div>
                	<div class="modal-body">
                		<div style="width:450px; float:left;">
                			<div class="form-group has-feedback cusGroup">
                				<label class="col-sm-4 control-label cusConLabel">风险等级:</label>
                				<div class="col-sm-8">
                                	<!--input type="text" class="form-control" name="cusNo" value="" placeholder="" required="" data-fv-notempty-message="项目编号必填" data-fv-field="name"><i class="form-control-feedback" data-fv-icon-for="name" style="display: none;"></i-->
                                	<select class="form-control">
                                		<option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                	</select>
                                </div>
                			</div>
                			<div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">底稿附注:</label>
                            <div class="col-sm-8">
                              <!--input type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo"><i class="form-control-feedback" data-fv-icon-for="machineNo" style="display: none;"></i-->
                              <select class="form-control">
                        		<option></option>
                              </select>
                             </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">复核总部:</label>
                            <div class="col-sm-8">
                              <!--input type="text" class="form-control" name="cusTopCompany" value="" placeholder=""-->
                              <el-input
                                icon="search"
                                :on-icon-click="openReview"
                                v-show="isDisabled"
                                >
                                </el-input>
                                <input class="form-control" v-show="!isDisabled" type="text" disabled="false" name="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel">项目经理:</label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control" name="cusBegin" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">编制人:</label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control" name="cusCode" value="" placeholder="">
                            </div>
                          </div>
                		</div>
                		<div style="width:450px; float:left;">
                		<div class="form-group has-feedback cusGroup">
                              <label class="col-sm-4 control-label cusConLabel">底稿模板:</label>
                              <div class="col-sm-8">
                                <!--input type="text" class="form-control" name="cusNo" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="name"><i class="form-control-feedback" data-fv-icon-for="name" style="display: none;"></i-->
                                <el-input
                                icon="search"
                                :on-icon-click="openManuscript"
                                >
                                </el-input>
                              </div>
                          </div>
                          <div class="form-group has-feedback cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">是否总部复核:</label>
                            <div class="col-sm-8">
                              <!--input type="text" class="form-control" name="cusType" value="" placeholder="" required="" data-fv-notempty-message="客户编号必填" data-fv-field="machineNo"><i class="form-control-feedback" data-fv-icon-for="machineNo" style="display: none;"></i>
                              <small class="help-block" data-fv-validator="notEmpty" data-fv-for="machineNo" data-fv-result="NOT_VALIDATED" style="display: none;">客户编号必填</small-->
                              <!--select class="form-control">
                                <option>是</option >
                                <option>否</option>
                              </select-->
                              <select class="form-control" v-model="isDisabled">
                                <option v-for="option in options" v-bind:value="option.value">
                                  {{option.text}}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label class="col-sm-4 control-label cusConLabel">项目合伙人:</label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control" name="cusTopCompany" value="" placeholder="">
                            </div>
                          </div>
                          <div class="form-group cusGroup">
                            <label  class="col-sm-4 control-label cusConLabel">现场负责人:</label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control" name="cusBegin" value="" placeholder="">
                            </div>
                          </div>
                		</div>
                	</div>
                	<!--div class="modal-footer">
                		<button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-save" style="padding-right:10px;"></span>保存</button>
                	</div-->
            	</div>
            </div>
        </div>
        <div class="modal-backdrop fade in"></div>
        <manuscript
        :visible="addManuscript"
        @close="closeManuscript"
        >
        </manuscript>
        <review
        :visible="reviewShow"
        @close="closeReview"
        >
        </review>
	</div>
</template>

<script>
import manuscript from '../Component/manuscript.vue';
import review from '../Component/review.vue';
export default {
  components: {
    manuscript,
    review
  },
  data() {
  	return {
      addManuscript: false,
      reviewShow: false,
      isDisabled: false,
      options: [
        {text:"是",value:true},
        {text:"否",value:false},
      ]
    }
  },
  props: {
    visible: Boolean
  },
  methods: {
  	close () {
      this.$emit('close')
    },
    closeManuscript() {
      this.addManuscript = false
    },
    openManuscript() {
      this.addManuscript = true
    },
    closeReview() {
      this.reviewShow = false
    },
    openReview() {
      this.reviewShow = true
    }
  }
}
</script>

<style scoped lang="scss">
#addModal {margin-top: 200px; }
#batchSetting {margin-top: 200px;}
.modal-dialog {width: 1000px;}
.modal-content{margin-top: 150px;}
.modal-header{background-color: #1dbba4; color:#fff;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"微软雅黑"; padding: 0px !important; padding-left: 10px !important;}
.modal-header button{color: red;font-size: 24px; }
.modal-header .close{margin-top: 0px; padding-right: 10px; font-size: 28px;}

.modal-title{font-weight: normal;font-size: 13px; height: 30px; line-height: 30px; }
.cusGroup{height: 36px;line-height: 36px;}
.cusConLabel{text-align: right;}
.projectSet{background-color: #F6F6F6; height: 30px; line-height: 30px;}
.unitSet{background-color: #F6F6F6; height: 30px; line-height: 30px;}
.unitThead{background-color: #1DBBA4;}

#cusTool{float:left;}
.toolSearch{margin-bottom: 0px;}
.cusAdd{background-color: #fff!important;color: #1dbba4 !important;border: 1px solid #1dbba4 !important;}
.cusAdd:hover{background-color: #1dbba4!important;color: #ffffff !important;}
.cusPus{padding-right: 6px !important;}
.clear{clear: both;}
.cusSearch input{display: block;width: 100%;height: 30px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);box-shadow: inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;}
.cusFoot{ height: 40px;}
.cusPagNum{ text-align: right;
  .pagination{margin: 0px;}
}
.cusTabInfo{height: 40px;line-height: 40px;}
.table{margin-bottom: 10px; border-bottom: 1px solid #cdcece;}

.form-control{height: 30px !important;font-size: 13px;}

.fuhejilu{
  .fuheBut{background-color:#ffffff;color: #1dbba4;border: 1px #1dbba4 solid; height: 30px; width: 60px;line-height: 5px; font-size: 13px;}
  .fuheBut:hover{background-color:#1dbba4;color: #ffffff;border: 1px #1dbba4 solid;}
}

.dialogspan{
  margin-left: 10px;
}
.button-div{margin-left: 10px;margin-top: 10px;margin-bottom: 10px;}

.modal-body label{
  font-weight: normal;
  font-size: 13px;
}
.modal{
	z-index: 1080;
}
.modal-backdrop{
	z-index: 1060;
}

.el-button--primary{background-color: #fff;border-color: #1DBBA4;color: #1DBBA4}
tbody tr:hover{
  background-color: #C9E9E5;
}

.el-button{padding: 0px}
</style>