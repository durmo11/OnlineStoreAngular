var topbarDirective=angular.module('topbarDirective',[]);
topbarDirective.controller('topbarController',['$scope','CategoryService','$mdSidenav',
 function($scope,CategoryService, $mdSidenav){
   $scope.categories=CategoryService.query();
   $scope.toggleLeft = buildDelayedToggler('left');
   function buildDelayedToggler(navID) {
       $mdSidenav(navID).toggle();
   }
 }

]);
topbarDirective.directive('topbar', [
  function(){
    return {
        restrict : 'E',
        controller : 'topbarController',
        scope: {
        },
        transclude: true,
        templateUrl: 'Components/topbar/topbar.html',

    };
}]);
