angular.module('backendServices')
    .factory('$activityManage', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        return {
            //查看某个活动的日志
            fetchLogByActivityId: function (activity_id) {
                return $http.get('/activity/log?id='+activity_id);
            },
            fetchData: function () {
                return $http.get('/activity/data-view');
            },
            // 创建发起人
            createFounder: function(activity_id, founder_id) {
                return $http.get('/activity/add-founder', { activity_id: 'activity_id', founder_id: 'founder_id' }).then(function(data) {
                    return data;
                })
            },
            //小班表单列表
            fetchApply: function(page, search, perPage) {
                if (search == 'undefined' || search == null) {
                    search = '';
                }

                page = page || 1;
                var params = {
                    'search': search,
                    'page': page,
                    'perPage': perPage, //每页多少条
                };

                return $http.get('/activity/founder-apply-index', { params: params }).then(function(data) {
                    return data;
                });
            },
            //待审核活动列表
            checkIndex: function(page, search, perPage) {
                if (search == 'undefined' || search == null) {
                    search = '';
                }

                page = page || 1;
                var params = {
                    'search': search,
                    'page': page,
                    'perPage': perPage, //每页多少条
                };

                return $http.get('/activity/check-index', { params: params }).then(function(data) {
                    return data;
                });
            },
            // 添加联合发起人
            updateCoFounder: function(id, newEntity) {
                return $http.post('/activity/update-co-founder?id=' + id, newEntity).then(function(data) {
                    return data;
                });
            },
            //给发起人发送预发布通知
            preventPush: function(activity_id, user_id) {
                return $http.get('/activity/prevent-push?activity_id=' + activity_id).then(function(data) {
                    return data;
                });
            },
            //删除发起人
            deteFounder: function(id){
                return $http.get('/activity/dete-founder?id=' + id).then(function(data){
                    return data;
                })
            },
            //获取最大的系列id
            getMaxSequence: function(user_id) {
                return $http.get('/activity/max-sequence-id?user_id=' + user_id).then(function(data) {
                    return data;
            })
            },
            //小班表单详情
            applyView: function(id) {
                return $http.get('/activity/apply-view?id=' + id).then(function(data) {
                    return data;
            })
            },
            //更新活动是否全平台开放
            updateAllowVip: function(id, allow_vip) {
                return $http.get('/activity/update-allow-vip?id=' + id +'&allow_vip=' + allow_vip).then(function(data) {
                    return data;
            })
            },
            //搜索标题  分配活动系列使用
            searchTitle: function(query, user_id) {
                return $http.get('/activity/search-sequence?title=' + query + '&user_id=' + user_id);
            },
            //搜索分类  分配活动分类使用
            searchType: function(query) {
                return $http.get('/activity-type/search-type?title=' + query);
            },
            // 获取系列标题
            sequence: function(sequence_id, user_id) {
                return $http.get('/activity/sequence?sequence_id=' + sequence_id + '&user_id=' + user_id);
            },
            // 获取活动组标题
            group: function(group_id, sequence_id, user_id) {
                return $http.get('/activity/group?group_id=' + group_id + '&sequence_id=' + sequence_id + '&user_id=' + user_id);
            },
            //搜索标题  分配活动组使用
            searchGroup: function(sequence_id, user_id) {
                return $http.get('/activity/search-group?sequence_id=' + sequence_id + '&user_id=' + user_id);
            },
             //搜索二级标签
            searchTag: function(type_id) {
                return $http.get('/activity-tag/search-tag?type_id=' + type_id);
            },
            // 更新状态
            updateStatus: function(id, status) {
                return $http.get('/activity/update-status?id=' + id + '&status=' + status).then(function(data) {
                    return data;
                })
            },
            // 更新发起人小班表单状态
            updateApplyStatus: function(id, status, reject_reason) {
                return $http.get('/activity/update-apply-status?id=' + id + '&status=' + status + '&reject_reason=' + reject_reason).then(function(data) {
                    return data;
                })
            },
            // 更新小班表单小海豹
            updateApplyDts: function(id, dts) {
                return $http.get('/activity/update-apply-dts?id=' + id + '&dts=' + dts ).then(function(data) {
                    return data;
                })
            },
            // 得到系列下最大的组id
            maxGroupId: function(sequence_id, user_id) {
                return $http.get('/activity/max-group-id?sequence_id=' + sequence_id + '&user_id=' + user_id).then(function(data) {
                    return data;
                })
            },
            //审核发起人提交的活动
            changeStatus: function(id, status, reject_reason) {
                return $http.get('/activity/change-status?id=' + id + '&status=' + status + '&reject_reason=' + reject_reason).then(function(data) {
                    return data;
                })
            },
            updateAllPrevent: function(newEntity) {
                return $http.get('/activity/update-all-prevent').then(function(data) {
                    return data;
                })
            },

            filterPrevent: function(newEntity) {
                return $http.get('/activity/filter-prevent').then(function(data) {
                    return data;
                })
            },
            create: function(newEntity) {
                return $http.post('/activity/create', newEntity).then(function(data) {
                    return data;
                });
            },
            delete: function(entity) {
                return $http.post('/activity/delete?id=' + entity.id, {}).success(function(data) {
                    return data;
                });
            },
            update: function(id, newEntity) {
                return $http.post('/activity/update?id=' + id, newEntity).then(function(data) {
                    return data;
                });
            },
            //更新活动二维码
            updateGroupCode: function(id, newEntity) {
                return $http.post('/activity/update-group-code?id=' + id, newEntity).then(function(data) {
                    return data;
                });
            },
            fetch: function(id) {
                var url = typeof id == 'undefined' ? '/activity/index' : '/activity/view?id=' + id;

                return $http.get(url).then(function(data) {
                    return data;
                });
            },
            listByType: function(type_id) {
                return $http.get('/activity/list-by-type-id?type_id=' + type_id).then(function(data) {
                    return data;
                });
            },
            tags: function(query) {
                return $http.get('/activity-tag/list?query=' + query);
            },
            //搜索活动名字
            search: function(search, page, status) {
                if (typeof search == 'undefined') {
                    search = '';
                }
                page = page || 1;
                var params = {
                    'page': page,
                    'perPage': 20, //每页20条
                    'status' : status
                };
                return $http.get('/activity/search?search=' + search,{params: params});
            },
            //搜索场地
            searchSpace: function(query) {
                return $http.get('/space-spot/search-spot?name=' + query).then(function(data) {
                    return data.models;
                });
            },

            //搜索空间
            searchSection: function(query) {
                return $http.get('/space-spot/search?name=' + query).then(function(data) {
                    // console.log(data);
                    return data.models;
                });
            },
            //搜索用户
            searchUser: function(query) {
                return $http.get('/member/search?username=' + query);
            },
            //搜索发起人
            searchFounder: function(query) {
                return $http.get('/member/search-by-auth?username=' + query + '&auth=founder');
            },
            //搜索pma
            searchPrincipal: function(query) {

                return $http.get('/member/search-by-auth?username=' + query + '&auth=pma');
            },
            //搜索管理员
            searchDts: function(query) {
                return $http.get('/member/search-by-auth?username=' + query + '&auth=admin');
            },
            modelPageMeta: function(type, pageNum, isWeek, search) {
                console.log(search);
                if (typeof search == 'undefined') {
                    search = '';
                }

                return $http.get('/activity?scenario=total&perPage=' + pageNum + '&type=' + type + '&isWeek=' + isWeek + '&search=' + search
                    ).then(function(data) {
                    return data;
                });
            },
            fetchPage: function(type, page, isWeek,status,user_id) {
                page = page || 1;
                var params = {
                    'type': type,
                    'page': page,
                    'isWeek': isWeek,
                    'perPage': 20 ,//每页20条
                    'status' : status,
                    'user_id' : user_id
                };
                return $http.get('/activity', {
                    params: params
                }).then(function(data) {
                    return data;
                });

            }
        };
    }]);
