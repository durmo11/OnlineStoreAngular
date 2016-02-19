angular.module("ngCart.fulfilment",[]).service("fulfilmentProvider",["$injector",function(t){this._obj={service:void 0,settings:void 0},this.setService=function(t){this._obj.service=t},this.setSettings=function(t){this._obj.settings=t},this.checkout=function(){var e=t.get("ngCart.fulfilment."+this._obj.service);return e.checkout(this._obj.settings)}}]).service("ngCart.fulfilment.log",["$q","$log","ngCart",function(t,e,r){this.checkout=function(){var i=t.defer();return e.info(r.toObject()),i.resolve({cart:r.toObject()}),i.promise}}]).service("ngCart.fulfilment.http",["$http","ngCart",function(t,e){this.checkout=function(r){return t.post(r.url,{data:e.toObject(),options:r.options})}}]).service("ngCart.fulfilment.paypal",["$http","ngCart",function(t,e){}]);var cartDirectives=angular.module("cartDirectives",["ngCart.fulfilment"]).controller("CartController",["$scope","ngCart",function(t,e){t.ngCart=e}]).directive("ngcartAddtocart",["ngCart",function(t){return{restrict:"E",controller:"CartController",scope:{id:"@",name:"@",quantity:"@",quantityMax:"@",price:"@",data:"="},transclude:!0,templateUrl:function(t,e){return"undefined"==typeof e.templateUrl?"Components/cart/addtocart.html":e.templateUrl},link:function(e,r,i){e.attrs=i,e.inCart=function(){return t.getItemById(i.id)},e.inCart()?e.q=t.getItemById(i.id).getQuantity():e.q=parseInt(e.quantity),e.qtyOpt=[];for(var o=1;o<=e.quantityMax;o++)e.qtyOpt.push(o)}}}]).directive("ngcartCart",[function(){return{restrict:"E",controller:"CartController",scope:{},templateUrl:function(t,e){return"undefined"==typeof e.templateUrl?"Components/checkout/cart.html":e.templateUrl},link:function(t,e,r){}}}]).directive("ngcartSummary",[function(){return{restrict:"E",controller:"CartController",scope:{},transclude:!0,templateUrl:function(t,e){return"undefined"==typeof e.templateUrl?"Components/cart/summary.html":e.templateUrl}}}]).directive("ngcartCheckout",[function(){return{restrict:"E",controller:["$rootScope","$scope","ngCart","fulfilmentProvider",function(t,e,r,i){e.ngCart=r,e.checkout=function(){i.setService(e.service),i.setSettings(e.settings),i.checkout().success(function(e,r,i,o){t.$broadcast("ngCart:checkout_succeeded",e)}).error(function(e,r,i,o){t.$broadcast("ngCart:checkout_failed",{statusCode:r,error:e})})}}],scope:{service:"@",settings:"="},transclude:!0,templateUrl:function(t,e){return"undefined"==typeof e.templateUrl?"Components/cart/checkout.html":e.templateUrl}}}]),categoryDirective=angular.module("categoryDirective",[]);categoryDirective.controller("categoryController",["$scope","CategoryService","$mdSidenav",function(t,e,r){function i(t){r(t).toggle()}t.categories=e.query(),t.toggleLeft=i("left")}]),categoryDirective.directive("ngCategory",[function(){return{restrict:"E",controller:"categoryController",scope:{},transclude:!0,templateUrl:"Components/category/category.html"}}]);var productDetailsDirective=angular.module("productDetailsDirective",[]);productDetailsDirective.controller("productDetailsController",["$scope","$stateParams","ProductService","filterFilter",function(t,e,r,i){t.products=r.query(),t.id=e.id,console.log(t.id),t.productKeyValue={id:e.id},console.log(t.productKeyValue)}]),productDetailsDirective.directive("ngproductDetails",["ProductService",function(t){return{restrict:"E",controller:"productDetailsController",scope:{},transclude:!0,templateUrl:"Components/productDetails/product-details.html"}}]);var checkoutDirective=angular.module("checkoutDirective",[]);checkoutDirective.directive("ngCheckout",["ProductService",function(t){return{restrict:"E",require:"^ngProduct",controller:"productController",scope:{},transclude:!0,templateUrl:"Components/checkout/checkout.html"}}]);var productDirective=angular.module("productDirective",[]);productDirective.controller("productController",["$scope","ngCart","$stateParams","ProductService",function(t,e,r,i){e.setTaxRate(7.5),e.setShipping(2.99),t.products=i.query(),console.log(t.products),t.category=r.id,t.categoryKeyValue={category:r.id},console.log(t.categoryKeyValue),t.mainImageUrl="",t.setImage=function(e){t.mainImageUrl=e,console.log(t.mainImageUrl)},t.getImage=function(){return console.log("Return, ",t.mainImageUrl),t.mainImageUrl}}]),productDirective.directive("ngProduct",["ProductService",function(t){return{restrict:"E",controller:"productController",scope:{},transclude:!0,templateUrl:"Components/productList/product-list.html"}}]),productDirective.directive("productImg",function(){return{restrict:"E",transclude:!0,scope:{product:"=",imgUrl:"@"},link:function(t,e,r){t.setImage=function(e){t.imgUrl=e}},templateUrl:"Components/productList/images.html"}});var topbarDirective=angular.module("topbarDirective",[]);topbarDirective.controller("topbarController",["$scope","CategoryService","$mdSidenav",function(t,e,r){function i(t){r(t).toggle()}t.categories=e.query(),t.toggleLeft=i("left")}]),topbarDirective.directive("topbar",[function(){return{restrict:"E",controller:"topbarController",scope:{},transclude:!0,templateUrl:"Components/topbar/topbar.html"}}]);var OnlineStoreApp=angular.module("OnlineStoreApp",["ui.router","ngMaterial","OnlineStoreServices","cartDirectives","topbarDirective","categoryDirective","productDirective","productDetailsDirective","checkoutDirective"]);OnlineStoreApp.config(["$stateProvider","$urlRouterProvider","$mdThemingProvider",function(t,e,r){e.otherwise("/categories"),t.state("home",{url:"/categories",template:"<ng-category>"}).state("productList",{url:"/categories/:id",template:"<ng-product>"}).state("productDetails",{url:"/categories/products/:id",template:"<ngproduct-details>"}).state("checkout",{url:"/categories/checkout/",controller:"productController",template:"<ng-checkout>"}),r.theme("default").primaryPalette("grey")}]).run(["$rootScope","ngCart","ngCartItem","store",function(t,e,r,i){t.$on("ngCart:change",function(){e.$save()}),angular.isObject(i.get("cart"))?e.$restore(i.get("cart")):e.init()}]);var OnlineStoreServices=angular.module("OnlineStoreServices",["ngResource"]);OnlineStoreServices.factory("CategoryService",["$resource",function(t){return t("Data/:id.json",{},{query:{method:"GET",params:{id:"categories"},isArray:!0}})}]),OnlineStoreServices.factory("ProductService",["$resource",function(t){return t("Data/:id.json",{},{query:{method:"GET",params:{id:"products"},isArray:!0}})}]),OnlineStoreServices.service("ngCart",["$rootScope","ngCartItem","store",function(t,e,r){this.init=function(){this.$cart={shipping:null,taxRate:null,tax:null,items:[]}},this.addItem=function(r,i,o,n,a){var c=this.getItemById(r);if("object"==typeof c)c.setQuantity(n,!1),t.$broadcast("ngCart:itemUpdated",c);else{var s=new e(r,i,o,n,a);this.$cart.items.push(s),t.$broadcast("ngCart:itemAdded",s)}t.$broadcast("ngCart:change",{})},this.getItemById=function(t){var e=this.getCart().items,r=!1;return angular.forEach(e,function(e){e.getId()===t&&(r=e)}),r},this.setShipping=function(t){return this.$cart.shipping=t,this.getShipping()},this.getShipping=function(){return 0===this.getCart().items.length?0:this.getCart().shipping},this.setTaxRate=function(t){return this.$cart.taxRate=+parseFloat(t).toFixed(2),this.getTaxRate()},this.getTaxRate=function(){return this.$cart.taxRate},this.getTax=function(){return+parseFloat(this.getSubTotal()/100*this.getCart().taxRate).toFixed(2)},this.setCart=function(t){return this.$cart=t,this.getCart()},this.getCart=function(){return this.$cart},this.getItems=function(){return this.getCart().items},this.getTotalItems=function(){var t=0,e=this.getItems();return angular.forEach(e,function(e){t+=e.getQuantity()}),t},this.getTotalUniqueItems=function(){return this.getCart().items.length},this.getSubTotal=function(){var t=0;return angular.forEach(this.getCart().items,function(e){t+=e.getTotal()}),+parseFloat(t).toFixed(2)},this.totalCost=function(){return+parseFloat(this.getSubTotal()+this.getShipping()+this.getTax()).toFixed(2)},this.removeItem=function(e){var r=this.$cart.items.splice(e,1)[0]||{};t.$broadcast("ngCart:itemRemoved",r),t.$broadcast("ngCart:change",{})},this.removeItemById=function(e){var r,i=this.getCart();angular.forEach(i.items,function(t,r){t.getId()===e&&(t=i.items.splice(r,1)[0]||{})}),this.setCart(i),t.$broadcast("ngCart:itemRemoved",r),t.$broadcast("ngCart:change",{})},this.empty=function(){t.$broadcast("ngCart:change",{}),this.$cart.items=[],localStorage.removeItem("cart")},this.isEmpty=function(){return this.$cart.items.length>0?!1:!0},this.toObject=function(){if(0===this.getItems().length)return!1;var t=[];return angular.forEach(this.getItems(),function(e){t.push(e.toObject())}),{shipping:this.getShipping(),tax:this.getTax(),taxRate:this.getTaxRate(),subTotal:this.getSubTotal(),totalCost:this.totalCost(),items:t}},this.$restore=function(t){var r=this;r.init(),r.$cart.shipping=t.shipping,r.$cart.tax=t.tax,angular.forEach(t.items,function(t){r.$cart.items.push(new e(t._id,t._name,t._price,t._quantity,t._data))}),this.$save()},this.$save=function(){return r.set("cart",JSON.stringify(this.getCart()))}}]),OnlineStoreServices.factory("ngCartItem",["$rootScope","$log",function(t,e){var r=function(t,e,r,i,o){this.setId(t),this.setName(e),this.setPrice(r),this.setQuantity(i),this.setData(o)};return r.prototype.setId=function(t){t?this._id=t:e.error("An ID must be provided")},r.prototype.getId=function(){return this._id},r.prototype.setName=function(t){t?this._name=t:e.error("A name must be provided")},r.prototype.getName=function(){return this._name},r.prototype.setPrice=function(t){var r=parseFloat(t);r?0>=r?e.error("A price must be over 0"):this._price=r:e.error("A price must be provided")},r.prototype.getPrice=function(){return this._price},r.prototype.setQuantity=function(t,r){var i=parseInt(t);i%1===0?(r===!0?this._quantity+=i:this._quantity=i,this._quantity<1&&(this._quantity=1)):(this._quantity=1,e.info("Quantity must be an integer and was defaulted to 1"))},r.prototype.getQuantity=function(){return this._quantity},r.prototype.setData=function(t){t&&(this._data=t)},r.prototype.getData=function(){return this._data?this._data:void e.info("This item has no data")},r.prototype.getTotal=function(){return+parseFloat(this.getQuantity()*this.getPrice()).toFixed(2)},r.prototype.toObject=function(){return{id:this.getId(),name:this.getName(),price:this.getPrice(),quantity:this.getQuantity(),data:this.getData(),total:this.getTotal()}},r}]),OnlineStoreServices.service("store",["$window",function(t){return{get:function(e){if(t.localStorage[e]){var r=angular.fromJson(t.localStorage[e]);return JSON.parse(r)}return!1},set:function(e,r){return void 0===r?t.localStorage.removeItem(e):t.localStorage[e]=angular.toJson(r),t.localStorage[e]}}}]);