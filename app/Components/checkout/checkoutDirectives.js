var checkoutDirective=angular.module('checkoutDirective',[]);

checkoutDirective.directive('ngCheckout', ['ProductService',
  function(ProductService){
    return {
        restrict : 'E',
        require:'^ngProduct',
        controller : 'productController',
        scope: {

        },
        transclude: true,
        templateUrl: 'Components/checkout/checkout.html',
    };
}]);
