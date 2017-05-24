// custom text angular image insert image link and video insert
angular.module('someetTextAngular', ['textAngular'])
  .config(['$provide', function($provide) {

    $provide.decorator('taOptions', ['$delegate', 'taRegisterTool', '$uploadService', '$http', '$window', '$mdToast','$qupload', '$qiniuManage', '$uibModal',
      function(taOptions, taRegisterTool, $uploadService, $http, $window, $mdToast,$qupload, $qiniuManage, $uibModal) {
        // taOptions.toolbar = [
        //   ['clear','redo', 'undo'],
        //   ['bold', 'p'],
        //   ['justifyLeft','justifyCenter','justifyRight', 'indent', 'outdent','html'],
        //   []
        // ];

        // 拖放图片上传
        taOptions.defaultFileDropHandler = function(file, insertAction) {
          $uploadService.upload(file).then(function(filename) {
            var imgUrl = '<p><img src="http://img.someet.cc/' + filename +'?imageView2/2/w/800" style="width: 100%;"/></p>';
            document.execCommand("insertHTML", false, imgUrl);
          });
          return true;
        };        

        taRegisterTool('uploadImage', {
          buttontext: '上传图片',
          iconclass: "fa fa-image",
          action: function (deferred, restoreSelection) {
                  $uibModal.open({
                            controller: 'UploadImageModalInstance',
                            templateUrl: 'partial/activity/upload.html',
                            backdrop:false,
                        }).result.then(
                            function (result) {
                                var imgUrl = '<p><img src="' + result +'?imageView2/2/w/800" style="width: 100%;"/></p>';
                                document.execCommand("insertHTML", false, imgUrl);
                                deferred.resolve();
                            },
                            function () {
                                deferred.resolve();
                            }
                        );
                  return false;
              }
          });
        taOptions.toolbar[0].push('uploadImage');
        return taOptions;
      }]);
  }]);
