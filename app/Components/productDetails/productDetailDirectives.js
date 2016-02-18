var productDetailsDirective=angular.module('productDetailsDirective',[]);
productDetailsDirective.controller('productDetailsController',['$scope','$stateParams', 'ProductService','filterFilter',
 function($scope,$stateParams, ProductService,filterFilter){
   $scope.products= ProductService.query();
   $scope.id=$stateParams.id;
   console.log($scope.id);
   $scope.productKeyValue={id: $stateParams.id};
   console.log($scope.productKeyValue);
 }
]);

productDetailsDirective.directive('ngproductDetails', ['ProductService',
  function(ProductService){
    return {
        restrict : 'E',
        controller : 'productDetailsController',
        scope: {

        },
        transclude: true,
        templateUrl: 'Components/productDetails/product-details.html',
    };
}]);
