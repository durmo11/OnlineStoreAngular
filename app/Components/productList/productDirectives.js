var productDirective=angular.module('productDirective',[]);
productDirective.controller('productController',['$scope','ngCart','$stateParams', 'ProductService', 
 function($scope,ngCart,$stateParams, ProductService){
   ngCart.setTaxRate(7.5);
   ngCart.setShipping(2.99);
   $scope.products= ProductService.query();
   console.log($scope.products);
   $scope.category=$stateParams.id;
   $scope.categoryKeyValue={category: $stateParams.id};
   console.log($scope.categoryKeyValue);
   $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
      console.log($scope.mainImageUrl);
    };
 }
]);

productDirective.directive('ngProduct', ['ProductService',
  function(ProductService){
    return {
        restrict : 'E',
        controller : 'productController',
        scope: {

        },
        transclude: true,
        templateUrl: 'Components/productList/product-list.html',
    };
}]);
