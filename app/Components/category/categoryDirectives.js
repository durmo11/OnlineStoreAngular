var categoryDirective=angular.module('categoryDirective',[]);
categoryDirective.controller('categoryController',['$scope','CategoryService','$mdSidenav',
 function($scope,CategoryService, $mdSidenav){
   $scope.categories=CategoryService.query();
   $scope.toggleLeft = buildDelayedToggler('left');
   function buildDelayedToggler(navID) {
       $mdSidenav(navID).toggle();
   }
 }

]);
categoryDirective.directive('ngCategory', [
  function(){
    return {
        restrict : 'E',
        controller : 'categoryController',
        scope: {
        },
        transclude: true,
        templateUrl: 'Components/category/category.html',

    };
}]);
