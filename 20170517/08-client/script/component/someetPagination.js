angular.module('someetPagination', ['ui.bootstrap'])
  .run(["$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pager.html",
      "<ul class=\"pager\">\n" +
      "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a></li>\n" +
      "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n" +
      "</ul>");
  }])
  .run(["$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pagination.html",
      "<ul class=\"app-pagination pagination\" layout=\"row\">\n" +
      "  <li class=\"md-button md-default-theme\" ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><span ng-click=\"selectPage(1, $event)\">{{getText('first')}}</span></li>\n" +
      "  <li class=\"md-button md-default-theme\" ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><span ng-click=\"selectPage(page - 1, $event)\">{{getText('previous')}}</span></li>\n" +
      "  <li class=\"md-button md-default-theme\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><span ng-click=\"selectPage(page.number, $event)\">{{page.text}}</span></li>\n" +
      "  <li class=\"md-button md-default-theme\" ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><span ng-click=\"selectPage(page + 1, $event)\">{{getText('next')}}</span></li>\n" +
      "  <li class=\"md-button md-default-theme\" ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><span  ng-click=\"selectPage(totalPages, $event)\">{{getText('last')}}</span></li>\n" +
      "</ul>");
  }]);
