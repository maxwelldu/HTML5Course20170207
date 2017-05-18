angular.module('backendServices')
  .factory('$activityTypeManage', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    return {
      create: function (newEntity) {
        return $http.post('/activity-type/create', newEntity).then(function (data) {
          return data;
        });
      },
      delete: function (entity) {
        return $http.post('/activity-type/delete?id=' + entity.id, {}).success(function (data) {
          return data;
        });
      },
      update: function (id, newEntity) {
        return $http.post('/activity-type/update?id=' + id, newEntity).then(function (data) {
          return data;
        });
      },
      fetch: function (id) {
        var url = typeof id == 'undefined' ? '/activity-type/index' : '/activity-type/view?id=' + id;

        return $http.get(url).then(function (data) {
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