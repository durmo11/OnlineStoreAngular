var OnlineStoreApp=angular.module('OnlineStoreApp', [
  'ui.router',
  'ngMaterial',
  'OnlineStoreServices',
  'cartDirectives',
  'topbarDirective',
  'categoryDirective',
  'productDirective',
  'productDetailsDirective',
  'checkoutDirective'
]);
OnlineStoreApp.config (['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
  function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.otherwise('/categories');
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/categories',
            template: '<ng-category>'
        })

        // Product list view filtered by category =================================
        .state('productList', {
          url: '/categories/:id',
          template: '<ng-product>'
        })
          // Product details view =================================
        .state('productDetails', {
          url: '/categories/products/:id',
          template: '<ngproduct-details>'
        })
        .state('checkout', {
          url: '/categories/checkout/',
          controller:"productController",
          template: '<ng-checkout>'
        });

    $mdThemingProvider.theme('default')
          .primaryPalette('grey');
}])
.run(['$rootScope', 'ngCart','ngCartItem', 'store', function ($rootScope, ngCart, ngCartItem, store) {

    $rootScope.$on('ngCart:change', function(){
        ngCart.$save();
    });

    if (angular.isObject(store.get('cart'))) {
        ngCart.$restore(store.get('cart'));

    } else {
        ngCart.init();
    }

}]);
