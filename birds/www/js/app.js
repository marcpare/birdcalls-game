// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var API = {
  habitats: [        
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
  ]   
};

angular.module('starter', ['ionic'])
.directive('buttonStudy', function () {
  return {
    restrict: 'E',
    templateUrl: 'button-study.html'
  };
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('/home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: function ($scope, $ionicScrollDelegate) {
        $scope.habitats = API.habitats;     
      }
    })
    .state('/bird/show', {
      url: '/bird/:id',
      templateUrl: 'about.html',
      controller: function ($scope, $stateParams) {
        $scope.id = $stateParams.id;
      }
    })
    .state('/game', {
      url: '/game',
      templateUrl: 'game.html',
      controller: function ($scope) {
        $scope.habitat = API.habitats[0];
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
