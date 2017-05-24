angular.module('backendServices')
  .factory('$activityTagManage', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    return {
      create: function (newEntity) {
        return $http.post('/tag-act/create', newEntity).then(function (data) {
          return data;
        });
      },
      delete: function (entity) {
        return $http.post('/activity-type/delete?id=' + entity.id, {}).success(function (data) {
          return data;
        });
      },
      update: function (id, newEntity) {
        return $http.post('/tag-act/update?id=' + id, newEntity).then(function (data) {
          return data;
        });
      },
      fetch: function(id) {
                var url =  '/tag-act/view?id=' + id;
                return $http.get(url).then(function(data) {
                    return data;
                });
            },
      index: function(page, search, perPage) {
                if (search == 'undefined' || search == null) {
                    search = '';
                }
                page = page || 1;
                var params = {
                    'search': search,
                    'page': page,
                    'perPage': perPage, //每页多少条
                };

                return $http.get('/tag-act/index', { params: params }).then(function(data) {
                    return data;
                });
            },

      fetchAll: function () {
        var url = '/activity-type/fetch-all';

        return $http.get(url).then(function (data) {
          return data;
        });
      }
    };
  }]);