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
productDetailsDirective.directive('productColor',
  function(){
    return {
        restrict : 'E',
        transclude:true,
        scope: {
          product:'=',
          imgUrl:'@',
          colorUrl:'@',
          imgIndex:'='
        },
        link: function($scope, $element, $attrs) {
           $scope.setImageColor = function(img,index) {
             $scope.imgUrl=img;
             $scope.colorIndex=index;
             $scope.imgIndex=index;
             console.log($scope.imgIndex);
             $scope.colorUrl=$scope.product.colors[$scope.colorIndex];
         };
         $scope.setColorImage = function(color,index) {
           $scope.colorUrl=color;
           $scope.imgIndex=index;
           $scope.imgUrl=$scope.product.images[$scope.imgIndex];
           console.log($scope.imgIndex);
       };
       },
        templateUrl:'Components/productDetails/colors.html',
    };
});
