import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000

var jsonData = {//翻页控制项
  'Dxn_LoginUser':'00000000-0000-0000-0000-000000000001',
  'limit':5,
  'page':1,
  'p_schema':'Customer/Customer',
  'start':0,
  'filter':'[{"field":"IsEnabled","value":["10"],"type":"list","comparison":"in"}]',
  'isSelect':true,
  'sort':{}
}

export default {
  state: {
    CusData:[], //客户管理列表
    CusAddModalVisible: false, //添加模态框
    CusMsgModalVisible: false, //警告信息框
    CusMsgModal:'', //模态框信息
    Code: '', //客户编号
    CusLimit: 5,//当前每页条数 ==>仅仅是记录 不绑定状态
    CusTotalPage: 1, //共有多少翻页
    CusCurPage: 1,//当前页码数

    CusViewModalVisible: false, //查看模态框
    CusDetailId:'',//查看模态框内具体ID
    CusDetailInfo:{},//某个具体状态值
    CusCustomerAuditType:0,//公司类型

    CusViewCode: '',//查看页编号
    CusViewCustomerAuditType: 0,//公司类型
    CusViewParentId: 0,//上级公司
    CusViewCurrency: 0,//人名币类型
    CusIndustry:0,//行业类型

    CusLevelVisible: false, //公司次级框
    CusLevelTree: {},//上级列表

    CusAssociatedVisible: false //相关项目模态框展示
  },
  actions: {
    fetchCusData ({ commit }, pars) {
      commit('fetchCusDataMut', pars)
    },
    showAddModal ({ commit }, pars) {
      commit('AddModalMut', pars)
      if(pars.isShow){ //open model
        commit('getClientNoMut', pars)
      }
    },
    addClient ({ commit }, pars) {
      commit('addClientMut', pars)
    },
    //点击查看选项
    showViewModal ({ commit }, pars) {
      if(pars.isShow){ //open model
        //获得此客户信息
        commit('fetchCusInfoById', pars)
      }else {
        state.CusViewModalVisible = false
      }
      //commit('ViewModelMut', pars)
    },
    //获得栏目树
    getTopTree({ commit },pars) {
      commit('getTopTreeMut', pars)
    }
  },
  mutations: {
    //获得上级列表
    getTopTreeMut: function(state,pars)
    {
      //公司级次列表
        var jsonData = {//翻页控制项
          'Dxn_LoginUser':'00000000-0000-0000-0000-000000000001',
          'limit':50,
          'page':1,
          'p_schema':'Customer/CustomerSelectorAdmin',
          'start':0,
          'filter':'[]',
          'isSelect':false,
          'sort':'[]',
          'query_Id':pars.Id
        }
        //发送请求修改表单保存数据
        axios.post("http://dingxin.cmsmate.cn:80/Form/TreeList",
            qs.stringify(jsonData)
            , {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          })
        .then(function (response) {
          console.log(response.data);
          if(response.data.success){
            var bToObj=JSON.parse(response.data.data)
            console.log(bToObj.Data)
            state.CusLevelTree = bToObj.Data[0]
            //state.CusDetailInfo =  bToObj.Data
            //Object.assign(state.CusDetailInfo, bToObj)
            //state.CusCustomerAuditType = bToObj.CustomerAuditType.id;//更加深层的
            //state.CusViewCurrency = bToObj.Currency.id
            //state.CusIndustry = bToObj.Industry.id
            state.CusLevelVisible = true
          }
          else {
            state.CusMsgModal = response.data.message
            state.CusMsgModalVisible = true
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        //发送请求结束
    },
    //进行修改
    modifyCusInfoMus:function(state, pars) {
      var jsonData = {//翻页控制项
        'Id':state.CusDetailInfo.Id,
        'Timestamp':state.CusDetailInfo.Timestamp,
        'Code':pars.Code,
        'Name':pars.Name,
        'CustomerAuditType':pars.CustomerAuditType,
        'Level':state.CusDetailInfo.Level,
        'ParentId':state.CusDetailInfo.Level.Id,
        'TopCustomerId':state.CusDetailInfo.TopCustomerId.Id,
        'StatrMonth':state.CusDetailInfo.StatrMonth.id,
        'StatrDay':state.CusDetailInfo.StatrDay.id,
        'EndMonth':state.CusDetailInfo.EndMonth,
        'EndDay':state.CusDetailInfo.EndDay,
        'OrgCode':state.CusDetailInfo.OrgCode,
        'Industry':pars.Industry,
        'Currency':pars.Currency,
        'IsEnabled':state.CusDetailInfo.IsEnabled.id,
        'p_schema':'Customer/Customer',
        'add':false,
        'StateType':'Modified',
        'isReload':true
      }
      //发送请求修改表单保存数据
      axios.post("http://dingxin.cmsmate.cn:80/Form/save",
          qs.stringify(jsonData)
          , {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
      .then(function (response) {
        console.log(response.data);
        if(response.data.success){

          //var bToObj=JSON.parse(response.data.data)
          //console.log(bToObj)
          //state.CusDetailInfo =  bToObj.Data
          //Object.assign(state.CusDetailInfo, bToObj)
          //state.CusCustomerAuditType = bToObj.CustomerAuditType.id;//更加深层的
          //state.CusViewCurrency = bToObj.Currency.id
          //state.CusIndustry = bToObj.Industry.id
          state.CusMsgModal = '修改成功'
          state.CusMsgModalVisible = true
        }
        else {
          state.CusMsgModal = response.data.message
          state.CusMsgModalVisible = true
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      //发送请求结束
    },
    //根据某个Id返回具体的值
    fetchCusInfoById:function(state, pars){
      var jsonData = {//翻页控制项
        'p_schema':'Customer/Customer',
      }
      jsonData.Id = pars.Id;
      //发送请求开始
      axios.post("http://dingxin.cmsmate.cn:80/Form/detail",
          qs.stringify(jsonData)
          , {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
      .then(function (response) {
        console.log(response.data);
        if(response.data.success){
          var bToObj=JSON.parse(response.data.data)
          console.log(bToObj)
          //state.CusDetailInfo =  bToObj.Data
          Object.assign(state.CusDetailInfo, bToObj)
          state.CusCustomerAuditType = bToObj.CustomerAuditType.id;//更加深层的
          state.CusViewCurrency = bToObj.Currency.id
          state.CusIndustry = bToObj.Industry.id

          state.CusViewModalVisible = true
        }
        else {
          state.CusMsgModalVisible = true
          state.CusMsgModal = response.data.message
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      //发送请求结束
    },
    //获得当前客户列表
    fetchCusDataMut:function (state, pars){
      if(pars.limit){//每页条数
        jsonData.limit = pars.limit;
        state.CusLimit = pars.limit;//暂存样式
      }
      if(pars.page){//翻页
        if(pars.page < 1 ) //防止翻页过小
          pars.page = 1;
        if(pars.page > state.CusTotalPage)//防止翻页过大
          pars.page = state.CusTotalPage;

        jsonData.page = pars.page;
        state.CusCurPage = pars.page;
      }
      if(pars.filter){//查询条件
        jsonData.filter = pars.filter;
      }
      axios.post("http://dingxin.cmsmate.cn:80/Form/list",
          qs.stringify(jsonData)
          , {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
      .then(function (response) {
        //response = JSON.parse(response);
        if(response.data.success){
          var bToObj=JSON.parse(response.data.data)
          console.log(bToObj)
          //Object.assign(state.CusData, bToObj.Data)
          state.CusData = bToObj.Data //数据绑定
          state.CusTotalPage =  Math.ceil(bToObj.Total / state.CusLimit) //计算出来共有多少也
        }
        else {
          state.CusMsgModalVisible = true
          state.CusMsgModal = response.data.message
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // show add model
    AddModalMut (state, pars) {
      state.CusAddModalVisible = pars.isShow
    },
    // show view model
    ViewModelMut (state, pars){
      state.CusViewModalVisible = pars.isShow
    },
    // show msg modal
    MsgModalMut (state, pars) {
      state.CusMsgModalVisible = pars.isShow
      if(pars.msg){
        state.CusMsgModal = pars.msg;
      }
    },
    // show msg modal
    AssociatedModalMut (state, pars) {
      state.CusAssociatedVisible = pars.isShow
    },
    // 获得客户编号
    getClientNoMut (state, pars){
      var getCodePars = {
        'entityType':'Customer',
        'method':'ManualCustomerCode',
        'args': '["00000000-0000-0000-0000-000000000001"]'
      }
      axios.post("http://dingxin.cmsmate.cn:80/Common/CallEntityStaticMethod",
          qs.stringify(getCodePars)
          , {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
      .then(function (response) {
        console.log(response.data.data)
        //var bToObj=JSON.parse(response.data)
        //console.log(bToObj)
        state.Code = response.data.data
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 添加客户
    addClientMut (state, pars){
      var addClientPars = {
        'Id': '',
        'Timestamp': '',
        'Code': pars.Code,
        'Name': pars.Name,
        'CustomerAuditType': pars.CustomerAuditType,
        'Level': pars.Level,
        'ParentId': pars.ParentId,
        'TopCustomerId': pars.TopCustomerId,
        'StatrMonth': pars.StatrMonth,
        'StatrDay': 3,
        'EndMonth': pars.EndMonth,
        'EndDay': 3,
        'OrgCode': pars.OrgCode,
        'Industry': pars.Industry,
        'Currency': pars.Currency,
        'IsEnabled': 10,
        'p_schema': 'Customer/Customer',
        'StateType':'Added',
        'add': true,
        'isReload': true
      }
      console.log(addClientPars)
      //发送请求开始
      axios.post("http://dingxin.cmsmate.cn:80/Form/save",
          qs.stringify(addClientPars)
          , {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          }).then(function (response) {
              //console.log(response.data.data)
              //response = JSON.parse(response);
              if(response.data.success){
                state.CusMsgModalVisible = true
                state.CusMsgModal = '保存成功'
              }
              else {
                state.CusMsgModalVisible = true
                state.CusMsgModal = response.data.message
              }

          }).catch(function (error) {
              console.log(error);
          })
        // 请求结束
      },// 函数结束
      // show Level modal
      LevelModalMut (state, pars) {
        state.CusLevelVisible = pars.isShow
      },

      //mounted 函数结束
  },
  getters: {
  }
}
