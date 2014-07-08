// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.directive('scrolly', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var raw = element[0];
      element.bind('scroll', function () {
        // using prop('offsetTop'), what divider is currently showing?
        // console.log(element.prop('offsetTop'));
         // console.log(element[0].querySelectorAll('.item-divider'));
//          console.log([].forEach.call(element[0].querySelectorAll('.item-divider'), function (e) {
//            console.log(e.offsetTop);
//          }));
        
        //console.log(attrs);
        //console.log(attrs.scrolly);
        //console.log(scope.logScroll);
      });
    }
  };
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('/home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: function ($scope, $ionicScrollDelegate) {
        
        $scope.habitats = [        
        {
          habitat: 'Marsh',
          birds: [
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2}
          ]
        },
        {
          habitat: 'Beach',
          birds: [
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird1.png', id:1},
            {src: 'img/bird2.png', id:2},
            {src: 'img/bird3.png', id:3}
          ]
        }          
        ];
        
        $scope.logScroll = function (e) {
          //console.log('...');
          console.log($ionicScrollDelegate);
          
          var v = $ionicScrollDelegate.getScrollView();
          console.log('heres the list');
          console.log(v);
          for (var i = 0; i < v.length; i++) {
            console.log(getPositionInParent(v[i]));
          }
          
          //getPositionInParent()
          //console.log($ionicScrollDelegate.getScrollPosition());
        };
      }
    })
    .state('/bird/show', {
      url: '/bird/:id',
      templateUrl: 'about.html',
      controller: function ($scope, $stateParams) {
        $scope.id = $stateParams.id;
      }
    });
  $urlRouterProvider.otherwise("/home");
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
