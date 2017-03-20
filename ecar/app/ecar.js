var app = angular.module('ecar', ['ionic','ngAnimate']);

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
  $urlRouterProvider.otherwise('/start');

  $stateProvider
    .state('start', {
      url: '/start',
      templateUrl: 'tpl/start.html',
      controller:'startCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'tpl/main.html',
      controller: 'mainCtrl'
    })
    .state('detail', {
      url: '/detail/:id',
      templateUrl: 'tpl/detail.html',
      controller:'detailCtrl'
    })
    .state('service', {
      url: '/service/:id',
      templateUrl: 'tpl/service.html',
      controller:'orderCtrl'
    })
    .state('login', {
      url: '/myOrder',
      templateUrl: 'tpl/login.html',
      controller:'myOrderCtrl'
    })

});

app.controller('parentCtrl', ['$scope', '$state', function ($scope, $state) {
      $scope.jump = function (stateName,arg) {
        $state.go(stateName,arg);
      }
    }]);
    app.controller('startCtrl',['$scope','$timeout','$interval','$state',
      function($scope,$timeout,$interval,$state){
        $scope.secondNumber = 5;
        $timeout(function(){
          $state.go('main');
        },5000);
        $interval(function(){
          if($scope.secondNumber>0)
            $scope.secondNumber--;
        },1000);
      }]);
//侧边栏
//app.controller('sideMenuCtrl',
//    ['$scope', '$ionicSideMenuDelegate',
//      function ($scope, $ionicSideMenuDelegate) {
//
//        $scope.openRight = function () {
//          $ionicSideMenuDelegate.toggleRight();
//        }
//
//      }]);
app.controller('mainCtrl', ['$scope', '$http','$timeout',function($scope, $http){
  //轮播数据
  $scope.imgList = ['res/img/car-img/banner01.jpg','res/img/car-img/banner02.jpg',
    'res/img/car-img/banner03.jpg','res/img/car-img/banner04.jpg' ];


  $scope.myActiveSlide = 1;
  $http.get('data/dish_getbypage.php?start=0')
      .success(function (data) {
        $scope.carList = data;
        //console.log($scope.carList);
      })
  $scope.inputTxt = {kw: ''};
  $scope.$watch('inputTxt.kw',function (){
    if($scope.inputTxt.kw){
      $http.get('data/dish_getbykw.php?kw=' + $scope.inputTxt.kw)
          .success(function (data) {
            $scope.dishList = data;
          })
    }
  })
}]);

//,'$ionicActionSheet','$ionicPopover','$ionicModal',     ,$ionicActionSheet,$ionicPopover,$ionicModal
app.controller('detailCtrl',['$scope','$http','$stateParams',
  function($scope,$http,$stateParams){
  //加载更多功能
  $scope.hasMore = true;
  $http.get('data/dish_getbypage.php?start=0')
      .success(function (data) {
        $scope.dishList = data;
        //console.log($scope.dishList);
      });
  $scope.loadMore = function () {
    $scope.dishList=[];
    $http.get('data/dish_getbypage.php?start=' + $scope.dishList.length)
        .success(function (data) {
          if (data.length < 8) {
            $scope.hasMore = false;
          }
          $scope.dishList = $scope.dishList.concat(data);
          console.log(data);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
  }
  //$scope.inputTxt = {kw: ''};
  //$scope.$watch('inputTxt.kw', function () {
  //  if($scope.inputTxt.kw){
  //    $http.get('data/dish_getbykw.php?kw=' + $scope.inputTxt.kw)
  //        .success(function (data) {
  //          $scope.dishList = data;
  //        })
  //  }

  $http.get('data/dish_getbyid.php?id='+$stateParams.id)
    .success(function(data){
      //console.log(data);
      $scope.dish=data[0];
    });
    //筛选功能
    $scope.showModal=function(){
      没度搜卡夫卡门票收入款gf.d;'rgl[pegq][l4e;-  '
      alert(090);
    };

}]);
app.controller('orderCtrl',['$scope','$http','$stateParams','$httpParamSerializerJQLike','$rootScope',function($scope,$http,$stateParams,$httpParamSerializerJQLike,$rootScope){
  $scope.order={did:$stateParams.id};
  $scope.sumbmitOrder = function(){
    var str = $httpParamSerializerJQLike($scope.order);
    //console.log(str);
    $http.get('data/order_add.php?'+str)
      .success(function(data){
        //console.log(data);
        if(data[0].msg=='succ'){
          $rootScope.phone = $scope.order.phone;
          $scope.succMsg = "订餐成功，您的定单编号:"+data[0].oid;
        }else{
          $scope.errMsg = "订餐失败";
        }
      });
  }
}]);
app.controller('myOrderCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
  //console.log($rootScope.phone);
  $http.get('data/order_getbyphone.php?phone='+$rootScope.phone)
    .success(function(data){
      $scope.dishList = data;
    });
}]);