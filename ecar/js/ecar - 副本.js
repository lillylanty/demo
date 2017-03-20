var app = angular.module('kaifanla', ['ionic']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider
    .state('start', {
      url: '/start',
      templateUrl: 'tpl/start.html'
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
app.controller('mainCtrl', ['$scope', '$http',function($scope, $http){
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


app.controller('detailCtrl',['$scope','$http','$stateParams','$ionicActionSheet',
  function($scope,$http,$stateParams,$ionicActionSheet){
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

  //选择排序
  $scope.showChoice = function(){
    var hideSheet = $ionicActionSheet.show({
      buttons:[{text:'按品牌'}, {text:'按价格'}, {text:'按车型'}],
      destructiveText:'取消',
      cancelText:'cancel',
      cancel:function(){
        console.log('u canceled!');
      },
      buttonClicked:function(index){
        return true;
      }
    });
  }
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