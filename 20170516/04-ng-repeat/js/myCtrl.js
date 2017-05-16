angular.module('app',[])
.controller('UserCtrl', function($scope){
  $scope.list = [
    {id:1,address:'1层'},
    {id:2,address:'2层'},
    {id:3,address:'3层'},
    {id:4,address:'4层'},
    {id:5,address:'5层'},
    {id:6,address:'6层'}
  ]
});
