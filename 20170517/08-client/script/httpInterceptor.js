app.config([
  '$httpProvider', '$provide',
  function ($httpProvider, $provide) {
    /* ///////// 配置 api 接口 start ///////// */
    $provide.factory('myHttpInterceptor', ['$q', function ($q) {
      return {
        request: function (config) {
          return config;
        },
        requestError: function (rejection) {
          return rejection;
        },
        response: function (response) {
          var data,
            method = response.config.method.toUpperCase();

          if (method === 'POST') {
            if (typeof response === 'object' && typeof response.data === 'object' && (data = response.data)) {
              if (data.success == '1') {
                return data.data;
              } else if (data.success == '0') {
                return $q.reject(new Error(data.errmsg || '请求出错，请重试'));
              }

              return data;
            } else {
              return $q.reject(new Error('invalid response format'));
            }

          } else if (method === 'GET' && !/^.*\.(html|svg)$/.test(response.config.url)) {
            if (typeof response === 'object' && typeof response.data === 'object' && (data = response.data)) {
              if (data.success == '1') {
                return data.data;
              } else if (data.success == '0') {
                return $q.reject(new Error(data.errmsg || '请求出错，请重试'));
              }

              return data;
            } else {
              return $q.reject(new Error('invalid response format'));
            }
          }

          return response;
        },
        responseError: function (rejection) {
          return rejection;
        }
      };
    }]);
    $httpProvider.interceptors.push('myHttpInterceptor');
    /* ///////// 配置 api 接口 end ///////// */
  }]);
