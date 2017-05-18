app.controller('ActivityCheckCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        '$questionManage',
        '$activityManage',
        '$activityTypeManage',
        '$mdDialog',
        'lodash',
        '$mdToast',
        '$qiniuManage',
        '$qupload',
        '$uibModal',
        '$log',
        'NgTableParams',
        function(
        $scope,
        $routeParams,
        $location,
        $questionManage,
        $activityManage,
        $activityTypeManage,
        $mdDialog,
        lodash,
        $mdToast,
        $qiniuManage,
        $qupload,
        $uibModal,
        $log,
        NgTableParams
    ) {

            // 默认为本周
            $scope.isWeek = 0;
            $scope.activityType = $routeParams.type_id;
            $scope.status = $routeParams.status;

            $scope.applyTableParams = new NgTableParams({count: 10}, {
            getData:function(params){
                // 一页显示多少条
                var perPage = params.count();
                // 搜索内容 可以搜索：用户昵称,用户id，订单号，手机号
                var search = params.parameters().filter.search;
                // 第几页
                var page = params.page();
                return $activityManage.fetchApply(page, search, perPage).then(function(data){
                    // 一共有多少条数据
                    params.total(data.totalCount);
                    return data.founderApply;
                });
            }
            });
            $scope.checkTableParams = new NgTableParams({count: 10}, {
            getData:function(params){
                // 一页显示多少条
                var perPage = params.count();
                // 搜索内容 可以搜索：用户昵称,用户id，订单号，手机号
                var search = params.parameters().filter.search;
                // 第几页
                var page = params.page();
                return $activityManage.checkIndex(page, search, perPage).then(function(data){
                    // 一共有多少条数据
                    params.total(data.totalCount);
                    console.log(data.check.user);
                    console.log(data.check);
                    return data.check;
                });
            }
            });

            // 弹出选择dts对话框
            $scope.setdts = function(data) {
                // console.log(data);
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'selectdts.html',
                    controller: 'ModalInstanceCtrl',
                    data: data,
                    resolve: {
                        entity: function(){
                            return data;
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    $mdToast.show($mdToast.simple()
                            .content('对接的小海豹已经更新')
                            .hideDelay(3000)
                            .position("top right"));
                    angular.forEach($scope.applyTableParams.data, function(index, value) {
                        if (index.id == data.id) {
                            index.assign_dts = data.assign_dts;
                        }
                    })
                });
            };

            //弹出审核不通过理由
            $scope.open = function(data) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'question.html',
                    controller: 'ModalInstanceCtrl',
                    data: data,
                    resolve: {
                        entity: function() {
                            return data;
                        }
                    }
                });
            };
            //审核活动是否通过
            $scope.changeApplyStatus = function(id, status) {
                if (status == 1) {
                    var confirm = $mdDialog.confirm()
                        .title('确定要通过吗？')
                        .ariaLabel('delete activity item')
                        .ok('确定通过')
                        .cancel('点错了，再看看');
                } else if (status == 2) {
                    var confirm = $mdDialog.confirm()
                        .title('确定不通过吗？')
                        .ariaLabel('delete activity item')
                        .ok('确定不通过')
                        .cancel('点错了，再看看');
                }

                $mdDialog.show(confirm).then(function() {
                    $activityManage.updateApplyStatus(id, status).then(function(data) {
                        $location.path("/check/check");
                    });
                });
            }

            var id = $routeParams.id;
            // if (id > 0) {
            $activityManage.applyView(id).then(function(data) {
                $scope.today = new Date();
                $scope.data = data;
            })

            // }
        }
    ])
