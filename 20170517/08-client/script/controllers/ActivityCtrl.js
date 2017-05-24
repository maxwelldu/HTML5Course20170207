angular.module('controllers', ['ngTagsInput'])
    .controller('ActivityListCtrl', [
        '$scope',
        '$route',
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
        function(
            $scope,
            $route,
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
            $log
        ) {
            //新的总览页数据
            $activityManage.fetchData().then(function(data) {
                $scope.data = data;
            });
            // 默认为本周
            $scope.isWeek = 0;
            $scope.activityType = $routeParams.type_id;

            // 二维码上传
            // qiniu upload 群二维码 start //
            $scope.qrPicture = null;
            $scope.uploadQrcode = function($files, id) {
                // console.log('uploadQrcode ' + $files[0]);
                $scope.qrPicture = $files[0];
                var modalInstance = $uibModal.open({
                    controller: 'UploadQrPictureModalInstance',
                    templateUrl: 'partial/activity/uploadQrpicture.html',
                    size: 'lg',
                    backdrop:false,
                    resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                          qrPicture: function () {//items是一个回调函数
                          return $scope.qrPicture;//这个值会被模态框的控制器获取到
                        }
                    },
                }).result.then(
                    function (result) {
                        var fileName = JSON.parse(result);
                        // console.log(id + ' http://img.someet.cc/'+fileName.key);
                        var obj = {};
                        obj.group_code = 'http://img.someet.cc/'+fileName.key;
                        obj.id = id;
                        updateActivity(obj);
                    },
                    function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
            // qiniu upload 群二维码 end //
            
            function updateActivity(obj) {
                $activityManage.updateGroupCode(obj.id, obj).then(function(data) {
                    $mdToast.show($mdToast.simple()
                        .content('二维码更新成功')
                        .hideDelay(3000)
                        .position("top right"));
                        angular.forEach($scope.list, function(index, value) {
                            if (index.id == data.id) {
                                index.group_code = data.group_code;
                            }
                        });
                }, function(err) {
                    $mdToast.show($mdToast.simple()
                        .content(err.toString())
                        .hideDelay(3000)
                        .position("top right"));
                });
            }

            // 弹出问题表单
            $scope.open = function(entity) {
                // d(entity);
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'question.html',
                    controller: 'ModalInstanceCtrl',
                    entity: entity,
                    resolve: {
                        entity: function() {
                            return entity;
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    // modelPagination();
                    angular.forEach($scope.list, function(index, value) {
                        if (index.id == data.activity_id) {
                            index.question = data;
                        }
                    });
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };


            //活动列表开始
            modelPagination();

            // 改变页数
            $scope.pageChange = function() {
                if (!$scope.search) {
                    fetchPage($scope.status);
                    
                } else {
                    searchActivity($scope.search, $scope.modelPagination.currentPage)
                }
            }

            // 初始化分页
            function modelPagination() {
                $scope.modelPagination = {
                    totalItems: 0,
                    currentPage: 1,
                    maxSize: 5,
                    itemsPerPage: 2, //每页多少条
                };
                fetchPage();
            }
            // 正常分页
            function fetchPage(status) {
                $activityManage.fetchPage($scope.activityType, $scope.modelPagination.currentPage, $scope.isWeek, status).then(function(data) {
                    angular.forEach(data.activities, function(index, value) {
                        // 当标题长度超过35个字符就省略
                        if (index.title.length > 35) {
                            index.title = index.title.substr(0, 35) + '...';
                        }
                    });
                    $scope.list = data.activities;
                    // d(data.activities);
                    $scope.modelPagination.totalItems = data.totalCount;
                });
            }
            // 发送预发布push通知
            $scope.preventPush = function(entity) {
                activity_id = entity.id;
                var confirm = $mdDialog.confirm()
                        .title('确定要给发起人发送预发布提醒push消息吗？')
                        .ariaLabel('prevent activity push')
                        .ok('确定发送')
                        .cancel('点错了，再看看');
                $mdDialog.show(confirm).then(function(data){
                    $activityManage.preventPush(activity_id).then(function(data) {
                    $mdToast.show($mdToast.simple()
                            .content('发送预发布提醒成功')
                            .hideDelay(3000)
                            .position("top right"));
                    angular.forEach($scope.list, function(index, value) {
                            if (index.id == data.id) {
                                index.is_push = data.is_push;
                            }
                        });
                    }, function(err) {
                        $mdToast.show($mdToast.simple()
                            .content('发送预发布提醒失败')
                            .hideDelay(3000)
                            .position("top right"));
                    });
                });
            }
            //搜索活动按钮 页面使用
            $scope.getActivity = function(query) {
                $scope.modelPagination.currentPage = 1;
                if (typeof $scope.search == 'undefined' || $scope.search == '') {
                    $mdToast.show($mdToast.simple()
                        .content('搜索内容不能为空')
                        .hideDelay(3000)
                        .position("top right"));
                } else {
                    searchActivity($scope.search, 1);
                }
            }

            //搜索活动函数 分页调用 活动按钮调用
            function searchActivity(query, page) {
                $activityManage.search(query, page).then(function(data) {
                    if (data.status == 1) {
                        $scope.list = data.models;
                        $scope.modelPagination.totalItems = data.totalCount;
                    } else {
                        $scope.list = '';
                    }
                });
            }


            // 本周活动
            $scope.weekActivity = function() {
                $scope.isWeek = 0;
                fetchPage();
            }

            // 历史活动
            $scope.historyActivity = function() {
                $scope.isWeek = 1;
                fetchPage();
            }

            // 更新活动状态
            $scope.updateStatus = function(id, status) {
                $activityManage.updateStatus(id, status).then(function(data) {
                    angular.forEach($scope.list, function(index, value) {
                        if (index.id == data.id) {
                            index.status = data.status;
                        }
                    });
                });
            }

            // 活动类型列表
            $activityTypeManage.fetch().then(function(data) {
                $scope.activityTypeList = data;
            }, function(err) {
                alert(err);
            });
            $activityTypeManage.fetchAll().then(function(data){
                $scope.allActivityTypeList = data;
            }, function(err){
                alert(err);
            });

            // 过滤大部分不用的分组
            $scope.typeFilter = function (item) {
                return item.id > 35 || item.id == 10 || item.id == 8 || item.id == 22 || item.id == 28 || item.id == 23 || item.id == 29 || item.id == 9 || item.id == 30;
            };
            
            // 一键发布预发布活动
            $scope.prevenIssuetActivity = function() {
                    var confirm = $mdDialog.confirm()
                        .title('确定要一键发布预发布活动吗？')
                        .ariaLabel('publish activity item')
                        .ok('确定发布')
                        .cancel('点错了，再看看');
                    $mdDialog.show(confirm).then(function(data){
                        $activityManage.updateAllPrevent().then(function(data) {
                        $mdToast.show($mdToast.simple()
                            .content('一键发布预发布活动成功')
                            .hideDelay(3000)
                            .position("top right"));
                        $scope.list = data;
                    }, function(err) {
                        $mdToast.show($mdToast.simple()
                            .content(err.toString())
                            .hideDelay(3000)
                            .position("top right"));
                    });
                }); 
            }
            // 预发布活动
            $scope.preventActivity = function(status) {
                // fetchPage(status);
                $scope.status = status;
                $activityManage.fetchPage($scope.activityType, $scope.modelPagination.currentPage, $scope.isWeek, status).then(function(data) {

                    $scope.list = data.activities;
                    $scope.modelPagination.totalItems = data.totalCount;
                });
                // $activityManage.filterPrevent().then(function(data) {
                //     $scope.list = data;
                // });
            }

            // 调整顺序
            $scope.adjust_order = function(entity) {
                // entity.display_order
                $activityManage.update(entity.id, entity).then(function(data) {
                    // $location.path('/activity/list/' + type_id);
                }, function(err) {
                    alert(err);
                });
            }

            // 更新活动类型
            $scope.onTypeChangeClick = function(activity, city_id, city, type_id) {
                activity.type_id = type_id;
                activity.city_id = city_id;
                activity.city = city;
                $activityManage.update(activity.id, activity).then(function(data) {
                    angular.forEach($scope.list, function(index, value) {
                        if (index.id == data.id) {
                            index.type.city = data.city;
                            index.type.name = getTypeName(data.type_id);
                            $mdToast.show($mdToast.simple()
                                .content('成功更新活动分类')
                                .hideDelay(3000)
                                .position("top right"));
                        }
                    });
                }, function(err) {
                    alert(err);
                });
            };

            var getTypeName = function(type_id) {
                var typeName = type_id;
                angular.forEach($scope.allActivityTypeList, function(index, value) {
                    if (index.id == type_id) {
                        typeName = index.name;
                    }
                });
                return typeName;
            };

            // 设置报名表单状态 20关闭 10打开
            $scope.applyStatus = function(entity, status) {
                var new_question = entity.question;
                new_question.status = status;
                $questionManage.update(entity.question.id, new_question).then(function(data) {}, function(err) {
                    alert(err);
                });
            };


            // 复制一个活动 如果表单存在则复制表单
            $scope.copy = function(activityData) {

                // 原活动的id  下面下面直接取不到值 会被覆盖
                var originActivityID = activityData.id;

                var confirm = $mdDialog.confirm()
                    .title('确定要复制“' + activityData.title + '”吗？')
                    .ariaLabel('delete activity item')
                    .ok('确定复制')
                    .cancel('点错了，再看看');

                // 确认提醒
                $mdDialog.show(confirm).then(function() {
                    var originActivity = activityData;
                    originActivity.id = null;
                    originActivity.group_code = "";
                    originActivity.join_people_count = 0;
                    originActivity.is_full = 0;
                    originActivity.apply_rate = 0;
                    originActivity.group_id = 0;
                    originActivity.is_top = 0;
                    originActivity.display_order = 99;
                    originActivity.title = activityData.title + " 副本";
                    originActivity.status = 10; //活动状态10为草稿
                    originActivity.start_time = Date.parse(new Date()) / 1000 + 86400;
                    originActivity.end_time = Date.parse(new Date()) / 1000 + 86400 * 7;
                    $activityManage.create(originActivity).then(function(newActivity) {
                        // 复制表单
                        $questionManage.fetchByActivityId(originActivityID).then(function(originQuestion) {

                            // 如果表单问题存在则创建表单
                            if (originQuestion) {

                                // 组建新的问题表单
                                var newQuestion = {
                                    // 新的活动的id
                                    activity_id: newActivity.id,
                                    questionItemList: [],
                                };

                                // 遍历表单数据结构
                                for (var k in originQuestion.questionItemList) {
                                    var questionItem = {
                                        label: originQuestion.questionItemList[k].label,
                                    };
                                    newQuestion.questionItemList.push(questionItem);
                                }

                                // 创建活动的表单
                                $questionManage.create(newQuestion).then(function(lastQuestion) {
                                    $mdToast.show($mdToast.simple()
                                        .content('活动和问题复制成功')
                                        .hideDelay(3000)
                                        .position("top right"));
                                    fetchPage();
                                    // $location.path('/activity/list/' + activityData.type_id);
                                }, function(err) {
                                    alert(err);
                                });
                            } else {
                                $mdToast.show($mdToast.simple()
                                    .content('活动复制成功')
                                    .hideDelay(3000)
                                    .position("top right"));
                                fetchPage();
                            }
                            // 重新请求数据
                        }, function(err) {
                            alert(err);
                        });
                    }, function(err) {
                        alert(err);
                    });
                });
            };


            // 草稿
            $scope.draft = function(entity) {

                // var confirm = $mdDialog.confirm()
                //   .title('确定要更改为草稿吗')
                //   .ariaLabel('delete activity item')
                //   .ok('确定发布')
                //   .cancel('点错了，再看看');

                // $mdDialog.show(confirm).then(function() {


                var newEntity = entity;
                newEntity.status = 10; //活动状态20为发布
                $activityManage.update(newEntity.id, newEntity).then(function(data) {
                    // $location.path('/activity/list/' + entity.type_id);
                    $mdToast.show($mdToast.simple()
                        .content('切换为草稿成功')
                        .hideDelay(3000)
                        .position("top right"));

                }, function(err) {
                    $mdToast.show($mdToast.simple()
                        .content(err.toString())
                        .hideDelay(3000)
                        .position("top right"));
                });
                // });

            }

            // 预发布
            $scope.prevent = function(entity) {

                // var confirm = $mdDialog.confirm()
                //   .title('确定要预发布活动“' + entity.title + '”吗？')
                //   .ariaLabel('delete activity item')
                //   .ok('确定发布')
                //   .cancel('点错了，再看看');

                // $mdDialog.show(confirm).then(function() {


                var newEntity = entity;
                newEntity.status = 15; //活动状态20为发布
                $activityManage.update(newEntity.id, newEntity).then(function(data) {
                    // $location.path('/activity/list/' + entity.type_id);
                    $mdToast.show($mdToast.simple()
                        .content('切换为预发布成功')
                        .hideDelay(3000)
                        .position("top right"));

                }, function(err) {
                    $mdToast.show($mdToast.simple()
                        .content(err.toString())
                        .hideDelay(3000)
                        .position("top right"));
                });
                // });

            }
            // 发布活动
            $scope.release = function(entity) {
                if (entity.group_code == '') {
                    var dialog = $mdDialog.alert()
                      .title('请先设置群二维码然后再发布活动')
                      .clickOutsideToClose(true)
                      .ariaLabel('')
                      .ok('知道了');
                    $mdDialog.show(dialog);
                } else if(!entity.question) {
                    var dialog = $mdDialog.alert()
                      .title('请先设置群问题表单然后再发布活动')
                      .clickOutsideToClose(true)
                      .ariaLabel('')
                      .ok('知道了');
                    $mdDialog.show(dialog);
                } else if(entity.start_time >= entity.end_time) {
                    var dialog = $mdDialog.alert()
                      .title('活动结束时间必须大于活动开始时间')
                      .clickOutsideToClose(true)
                      .ariaLabel('')
                      .ok('知道了');
                    $mdDialog.show(dialog);
                } else {
                    var confirm = $mdDialog.confirm()
                        .title('确定要发布活动“' + entity.title + '”吗？')
                        .ariaLabel('publish activity item')
                        .ok('确定发布')
                        .cancel('点错了，再看看');

                    $mdDialog.show(confirm).then(function() {
                        var newEntity = entity;
                        newEntity.status = 20; //活动状态20为发布
                        $activityManage.updateStatus(entity.id,20).then(function(data) {
                            // $location.path('/activity/list/' + entity.type_id);
                            // modelPagination();
                            $mdToast.show($mdToast.simple()
                                .content('活动 “' + entity.title + '” 已发布')
                                .hideDelay(3000)
                                .position("top right"));

                        }, function(err) {
                            $mdToast.show($mdToast.simple()
                                .content(err.toString())
                                .hideDelay(3000)
                                .position("top right"));
                        });
                    });
                }

            }

            // 删除
            $scope.delete = function(entity) {
                var confirm = $mdDialog.confirm()
                    .title('确定要删除活动“' + entity.title + '”吗？')
                    .ariaLabel('delete activity item')
                    .ok('确定删除')
                    .cancel('手滑点错了，不删');

                $mdDialog.show(confirm).then(function() {
                    $activityManage.delete(entity).then(function(data) {

                        lodash.remove($scope.list, function(tmpRow) {
                            return tmpRow == entity;
                        });

                        $mdToast.show($mdToast.simple()
                            .content('删除活动“' + entity.title + '”成功')
                            .hideDelay(3000)
                            .position("top right"));

                    }, function(err) {
                        $mdToast.show($mdToast.simple()
                            .content(err.toString())
                            .hideDelay(3000)
                            .position("top right"));
                    });
                });
            };

            // 置顶/取消置顶
            $scope.top = function(entity, is_top) {
                var newEntity = entity;
                newEntity.is_top = is_top > 0 ? 1 : 0; // 是否置顶
                var toastText = is_top > 0 ? "活动置顶成功" : "取消置顶成功"; // 是否置顶
                $activityManage.update(entity.id, newEntity).then(function(data) {
                    $mdToast.show($mdToast.simple()
                        .content(toastText)
                        .hideDelay(3000)
                        .position("top right"));
                }, function(err) {
                    $mdToast.show($mdToast.simple()
                        .content(err.toString())
                        .hideDelay(3000)
                        .position("top right"));
                });
            }

            function copyTextToClipboard(url) {
                window.prompt("复制链接：Command + C, Enter\n关闭窗口：Esc", url);
            }


            // 更新活动排名序号
            // $scope.$watch($scope.list,function(newvalue,oldvalue){
            // });



            // 复制预览链接
            $scope.copyPreviewUrl = function(activity) {
                copyTextToClipboard(activity.preview_url);
            }

            // 复制筛选链接
            $scope.copyFilterUrl = function(activity) {
                copyTextToClipboard(activity.filter_url);
            }

            // 复制活动链接
            $scope.copyActivityUrl = function(activity) {
                copyTextToClipboard('https://m.someet.cc/activity/' + activity.id);
            }

            // 设置问题
            $scope.viewQuestion = function(activity) {
                $location.path('/question/view/' + activity.id);
            }

            // 查看报名
            $scope.viewAnswer = function(activity) {
                $location.path('/answer/' + activity.id);
            }

            // 查看反馈
            $scope.viewFeedback = function(activity) {
                $location.path('/activity-feedback/' + activity.id);
            }

            // 预览问题
            $scope.previewQuestion = function(entity) {
                $location.path('/answer/view/' + entity.id);
            }

            // tab
            $scope.isActive = function(type_id) {
                var route = "/activity/list/" + type_id
                return route === $location.path() || $location.path() === '/question' || $location.path() === '/answer';
            }

            //点击增加类型按钮
            $scope.onTypeAddClicked = function() {
                $scope.showAddForm = true;
            };

            //搜索活动
            // $scope.getActivity = function(query) {
            //     var title = $scope.title;
            //     $activityManage.search(title).then(function(activityList) {
            //         if (activityList.status == 1) {
            //             $scope.list = activityList.models;
            //         } else {
            //             $scope.list = '';
            //         }
            //     });
            // } 



            //ng-if会增加新的child，需要设置初始值
            $scope.addForm = {
                newType: ""
            };

            // 取消增加新类型
            $scope.cancelAddType = function() {
                $scope.showAddForm = false;
            };

            var addTypeName = function(data) {
                var newEntity = {
                    name: data,
                    display_order: 3
                };
                $activityTypeManage.create(newEntity).then(function(data) {
                    $activityTypeManage.fetch().then(function(data) {
                        $scope.activityTypeList = data;
                    }, function(err) {
                        alert(err);
                    });

                    $location.path('/activity/list/0');
                    $mdToast.show($mdToast.simple()
                        .content('添加活动类型成功')
                        .hideDelay(3000)
                        .position("top right"));
                }, function(err) {
                    $mdToast.show($mdToast.simple()
                        .content(err.toString())
                        .hideDelay(3000)
                        .position("top right"));
                });
                $scope.showAddForm = false;
                $scope.addForm = {
                    newType: ""
                };
            };

            // 增加新的类型
            $scope.commitTypeName = function(typeName) {

                if (typeName.length < 2) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content("分组名称不能少于2个字符")
                        .hideDelay(3000)
                        .position("top right"));
                } else if (typeName.length > 60) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content("分组名称不能超过60个字符")
                        .hideDelay(3000)
                        .position("top right"));
                } else {
                    addTypeName(typeName);
                }

            };

            // 增加新活动
            $scope.createPage = function() {
                $location.path('/activity/add');
            }

        }
    ])
