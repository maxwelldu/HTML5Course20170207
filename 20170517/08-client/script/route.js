app.config(
    ['$routeProvider',
        function($routeProvider) {
            $routeProvider
                //标签列表页面
                .when('/user-tags/index',{
                    templateUrl: '/partial/user-tags/index.html',
                    controller: 'UserTagsCtrl'
                })
                //标签分类页面
                .when('/user-tags/type/:id',{
                    templateUrl: '/partial/user-tags/index.html',
                    controller: 'UserTagsCtrl'
                })
                .when('/group-up/index',{
                    templateUrl: '/partial/group-up/index.html',
                    controller: 'GroupUpCtrl'
                })
                .when('/group-type/index',{
                    templateUrl: '/partial/group-up/type.html',
                    controller: 'GroupTypeCtrl'
                })
                .when('/group-up/type/:id',{
                    templateUrl: '/partial/group-up/index.html',
                    controller: 'GroupTypeCtrl'
                })
                .when('/group-type/view/:id',{
                    templateUrl: '/partial/group-up/add-type.html',
                    controller: 'GroupTypeCtrl'
                })
                .when('/group-type/view',{
                    templateUrl: '/partial/group-up/add-type.html',
                    controller: 'GroupTypeCtrl'
                })
                .when('/group-up/check',{
                    templateUrl: '/partial/group-up/check.html',
                    controller: 'GroupUpCtrl'
                })
                .when('/group-up/check/:id', {
                    templateUrl: '/partial/group-up/view.html',
                    controller: 'GroupUpCtrl'
                })
                .when('/group-answer/:id', {
                    templateUrl: '/partial/group-up/answer.html',
                    controller: 'GroupAnswerCtrl'
                })
                //周活动数据
                .when('/data/activity',{
                  templateUrl: '/partial/data/activity.html',
                  controller: 'DataActivityCtrl'
                })
                //活动标签添加
                .when('/tag-act/:id', {
                    templateUrl: '/partial/tag-act/add.html',
                    controller: 'TagActCtrl'
                })
                //新统计数据页面
                .when('/data/view', {
                    templateUrl: '/partial/data/view.html',
                    controller: 'ActivityListCtrl'
                })
                //城市游乐场列表
                .when('/playground/index', {
                    templateUrl: '/partial/playground/index.html',
                    controller: 'PlayGroundCtrl'
                })
                //试管筛选
                .when('/playground/view/:id', {
                    templateUrl: '/partial/playground/view.html',
                    controller: 'PlayGroundCtrl'
                })
                //城市游乐场总览
                .when('/playground/over-view', {
                    templateUrl: '/partial/playground/overView.html',
                    controller: 'PlayGroundCtrl'
                })
                //试管列表页面
                .when('/playground/test-tube', {
                    templateUrl: '/partial/playground/testTube.html',
                    controller: 'PlayGroundCtrl'
                })
                //活动标签列表
                .when('/tag-act', {
                    templateUrl: '/partial/tag-act/index.html',
                    controller: 'TagActCtrl'
                })

                //发起人结算页面
                .when('/charge/founder-tf', {
                    templateUrl: '/partial/charge/founderTf.html',
                    controller: 'FounderTfCtrl'
                })
                //愿望详情
                .when('/wish/:id', {
                    templateUrl: '/partial/wish/view.html',
                    controller: 'WishCtrl'
                })
                //愿望列表
                .when('/wish', {
                    templateUrl: '/partial/wish/index.html',
                    controller: 'WishCtrl'
                })
                //兑换用户列表
                .when('/exchange/userinfo/:exchange_id', {
                    templateUrl: '/partial/exchange/userinfo.html',
                    controller: 'ExchangeUserinfoCtrl'
                })
                //创建兑换码
                .when('/exchange/create', {
                    templateUrl: '/partial/exchange/create.html',
                    controller: 'ExchangeCreateCtrl'
                })
                //兑换列表
                .when('/exchange', {
                    templateUrl: '/partial/exchange/index.html',
                    controller: 'ExchangeCtrl'
                })
                //转账页面
                .when('/order/transfer', {
                    templateUrl: '/partial/order/transfer.html',
                    controller: 'TransferCtrl'
                })
                //VIP订单详情
                .when('/charge/vip/:id', {
                    templateUrl: '/partial/charge/vipview.html',
                    controller: 'VipViewCtrl'
                })
                //活动订单详情
                .when('/charge/order-view/:id', {
                    templateUrl: '/partial/charge/orderview.html',
                    controller: 'ActivityOrderViewCtrl'
                })
                // ngtable
                .when('/charge', {
                    templateUrl: '/partial/charge/index.html',
                    controller: 'ChargeCtrl'
                })
                // ngtable
                .when('/ngtable', {
                    templateUrl: '/partial/ngtable/index.html',
                    controller: 'NgTableCtrl'
                })
                // 面板
                .when('/dashboard', {
                    templateUrl: '/partial/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                // 频道
                .when('/channel/:name', {
                    templateUrl: '/partial/channel/index.html',
                    controller: 'ChannelCtrl'
                })
                //分享
                .when('/share', {
                    templateUrl: '/partial/share/index.html',
                    controller: 'ShareCtrl'
                })
                //更新分享
                .when('/share/update/:id', {
                    templateUrl: '/partial/share/update.html',
                    controller: 'ShareUpdateCtrl'
                })
                //uga数据统计
                .when('/uga', {
                    templateUrl: '/partial/uga/index.html',
                    controller: 'UgaCtrl'
                })
                //uga问题列表
                .when('/uga-question-list', {
                    templateUrl: '/partial/uga/question.html',
                    controller: 'UgaQuestionListCtrl'
                })
                //添加UGA问题
                .when('/uga-question/add', {
                    templateUrl: '/partial/uga/questionview.html',
                    controller: 'UgaQuestionListCtrl'
                })
                //uga回答列表
                .when('/uga-answer-list/:id', {
                    templateUrl: '/partial/uga/answer.html',
                    controller: 'UgaAnswerListCtrl'
                })
                //活动类型列表
                .when('/type-list', {
                    templateUrl: '/partial/activity-type/index.html',
                    controller: 'ActivityTypeCtrl'
                })
                //发起人小班表单详情
                .when('/check/apply/:id', {
                    templateUrl: '/partial/check/apply.html',
                    controller: 'ActivityCheckCtrl'
                })
                //添加活动类型
                .when('/activity-type/add', {
                    templateUrl: '/partial/activity-type/view.html',
                    controller: 'ActivityTypeViewCtrl'
                })
                //查看活动类型
                .when('/activity-type/:id', {
                    templateUrl: '/partial/activity-type/view.html',
                    controller: 'ActivityTypeViewCtrl'
                })
                //活动类型列表
                .when('/activity-tag', {
                    templateUrl: '/partial/activity-tag/index.html',
                    controller: 'ActivityTagCtrl'
                })
                //添加活动标签
                .when('/activity-tag/add', {
                    templateUrl: '/partial/activity-tag/view.html',
                    controller: 'ActivityTagViewCtrl'
                })
                //查看活动标签
                .when('/activity-tag/:id', {
                    templateUrl: '/partial/activity-tag/view.html',
                    controller: 'ActivityTagViewCtrl'
                })
                //DTS
                .when('/dts/:status',{
                    templateUrl:'/partial/activity/index.html',
                    controller:'ActivityDtsCtrl'
                })
                //回收站
                .when('/activity/recovery/:status',{
                    templateUrl: '/partial/activity/delete.html',
                    controller:'ActivityDeleteCtrl'
                })
                //审核发起人提交的活动
                .when('/check/:status',{
                    templateUrl: '/partial/check/check.html',
                    controller:'ActivityCheckCtrl'
                })
                //根据分类id查询活动列表
                .when('/activity/list/:type_id', {
                        templateUrl: '/partial/activity/index.html',
                        controller: 'ActivityListCtrl'
                    })
                //添加活动
                .when('/activity/add', {
                    templateUrl: '/partial/activity/view.html',
                    controller: 'ActivityViewCtrl'
                })
                //查看活动
                .when('/activity/:id', {
                    templateUrl: '/partial/activity/view.html',
                    controller: 'ActivityViewCtrl'
                })
                //查看活动日志
                .when('/activity/log/:id', {
                    templateUrl: '/partial/activity/log.html',
                    controller: 'ActivityLogCtrl'
                })
                // 发起人查看活动列表
                .when('/founder', {
                    templateUrl: '/partial/founder/index.html',
                    controller: 'FounderListCtrl'
                })
                //发起人编辑活动
                .when('/founder/:id', {
                    templateUrl: '/partial/founder/view.html',
                    controller: 'FounderViewCtrl'
                })
                //发起人添加活动
                .when('/founder/add', {
                    templateUrl: '/partial/founder/view.html',
                    controller: 'ActivityViewCtrl'
                })
                //专题列表
                .when('/special', {
                    templateUrl: '/partial/special/index.html',
                    controller: 'SpecialCtrl'
                })
                //添加专题
                .when('/special/add', {
                    templateUrl: '/partial/special/view.html',
                    controller: 'SpecialViewCtrl'
                })
                //查看专题
                .when('/special/:id', {
                    templateUrl: '/partial/special/view.html',
                    controller: 'SpecialViewCtrl'
                })
                //用户列表
                .when('/member', {
                    templateUrl: '/partial/user/list.html',
                    controller: 'UserListCtrl'
                })
                //添加用户
                .when('/member/add', {
                    templateUrl: '/partial/user/add.html',
                    controller: 'UserAddCtrl'
                })
                //查看用户
                .when('/member/:id', {
                    templateUrl: '/partial/user/update.html',
                    controller: 'UserUpdateCtrl'
                })
                //删除用户
                .when('/member/delete/:id', {
                    templateUrl: '/partial/user/add.html',
                    controller: 'UserDeleteCtrl'
                })
                //白名单,黑名单, PMA, 发起人列表
                .when('/member/list/:type', {
                    templateUrl: '/partial/user/list.html',
                    controller: 'UserListCtrl'
                })
                //添加问题
                .when('/question/add/:activity_id', {
                    templateUrl: '/partial/question/add.html',
                    controller: 'QuestionAddCtrl'
                })
                //添加/查看活动
                .when('/question/view/:activity_id', {
                    templateUrl: '/partial/question/view.html',
                    controller: 'QuestionViewCtrl'
                })
                //预览问题
                .when('/answer/view/:activity_id', {
                    templateUrl: '/partial/answer/add.html',
                    controller: 'AnswerAddCtrl'
                })
                //查看答案
                .when('/answer/:activity_id', {
                    templateUrl: '/partial/answer/index.html',
                    controller: 'AnswerCtrl'
                })
                //查看活动反馈
                .when('/activity-feedback/:activity_id', {
                    templateUrl: '/partial/activity-feedback/index.html',
                    controller: 'ActivityFeedbackCtrl'
                })
                //消息模板列表
                .when('/sms-template', {
                    templateUrl: '/partial/sms-template/index.html',
                    controller: 'SmsTemplateCtrl'
                })
                //添加消息模板
                .when('/sms-template/add', {
                    templateUrl: '/partial/sms-template/view.html',
                    controller: 'SmsTemplateViewCtrl'
                })
                //查看消息模板
                .when('/sms-template/:id', {
                    templateUrl: '/partial/sms-template/view.html',
                    controller: 'SmsTemplateViewCtrl'
                })

                //城市列表
              .when('/city', {
                  templateUrl: '/partial/city/index.html',
                  controller: 'CityCtrl'
              })
              //添加城市
              .when('/city/add', {
                  templateUrl: '/partial/city/view.html',
                  controller: 'CityViewCtrl'
              })
              //查看城市
              .when('/city/:id', {
                  templateUrl: '/partial/city/view.html',
                  controller: 'CityViewCtrl'
              })

            //根据场地分类id查询场地列表
            .when('/space-spot/list/:type_id', {
                    templateUrl: '/partial/space-spot/index.html',
                    controller: 'SpaceSpotCtrl'
                })
                //添加场地
                .when('/space-spot/add', {
                    templateUrl: '/partial/space-spot/view.html',
                    controller: 'SpaceSpotViewCtrl'
                })
                //查看场地
                .when('/space-spot/:id', {
                    templateUrl: '/partial/space-spot/view.html',
                    controller: 'SpaceSpotViewCtrl'
                })

            //查询场地设备列表
            .when('/space-spot-device', {
                    templateUrl: '/partial/space-spot-device/index.html',
                    controller: 'SpaceSpotDeviceCtrl'
                })
                //添加设备
                .when('/space-spot-device/add', {
                    templateUrl: '/partial/space-spot-device/view.html',
                    controller: 'SpaceSpotDeviceViewCtrl'
                })
                //查看设备
                .when('/space-spot-device/:id', {
                    templateUrl: '/partial/space-spot-device/view.html',
                    controller: 'SpaceSpotDeviceViewCtrl'
                })

            //查看区间列表
            .when('/space-section/list/:spot_id', {
                    templateUrl: '/partial/space-section/index.html',
                    controller: 'SpaceSectionListCtrl'
                })
                //查看区间
                .when('/space-section/:id', {
                    templateUrl: '/partial/space-section/view.html',
                    controller: 'SpaceSectionViewCtrl'
                })
                //添加区间
                .when('/space-section/add/:spot_id', {
                    templateUrl: '/partial/space-section/view.html',
                    controller: 'SpaceSectionViewCtrl'
                });

        }
    ]);
