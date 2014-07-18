// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var API = {
  habitats: function () {
    return DATA.habitats;
  }
};

angular.module('starter', ['ionic'])
.directive('buttonStudy', function () {
  return {
    restrict: 'E',
    templateUrl: 'button-study.html'
  };
})
.config(function ($stateProvider, $urlRouterProvider, $sceProvider) {
  
  $sceProvider.enabled(false);
  
  // $sceDelegateProvider.resourceUrlWhitelist([
  //   'self',
  //   'http://birdweb.org/**'
  // ]);
  
  var stepper = {
    i: 5,
    n: 5,
    N: 10,
    step: function () {
      if (this.i === this.N) {
        this.i = this.n;
      } else if (this.i+this.n >= this.N) {
        this.i = this.N;
      } else {
        this.i += this.n;
      }
      return this.i;
    }
  }

  $stateProvider
    .state('/home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: function ($scope, $ionicScrollDelegate) {
        $scope.habitats = HABITATS;
      }
    })
    .state('/bird/show', {
      url: '/bird/:h/:i',
      templateUrl: 'about.html',
      controller: function ($scope, $stateParams) {
        var bird = HABITATS[$stateParams.h].birds[$stateParams.i];
        $scope.bird = bird;
      }
    })
    .state('/game', {
      url: '/game',
      templateUrl: 'game.html',
      controller: function ($scope, $location, $timeout) {
        
        var player = document.getElementById('player');
        
        // Initialize the game state
        $scope.habitat = HABITATS[0];
        stepper.N = $scope.habitat.birds.length;
        $scope.birds = _($scope.habitat.birds).first(stepper.i);
        $scope.count = stepper.i;
        
        var dealBird = function () {
          $scope.secretBird = _.sample($scope.birds);        
          $scope.state = 'play';
        };
        
        dealBird();
        
        var clearGuesses = function () {
          var birds = $scope.birds;
          for (var i = 0, N = birds.length; i < N; i++) {
            delete birds[i].goodGuess;
            delete birds[i].badGuess;
          }
          
          dealBird();
        };
        var makeGuess = function (bird) {
          if (bird === $scope.secretBird) {
            bird.goodGuess = true;
            $scope.state = 'fadeout';
            player.pause();
            $timeout(function () {
              clearGuesses();
            }, 500);
          } else {
            bird.badGuess = true;
          }
          
        };
        $scope.mainAction = function () {
          player.play();
          $scope.state = 'guess';
        };
        $scope.shuffle = function () {
          $scope.birds = _.chain($scope.habitat.birds)
            .shuffle()
            .first($scope.count)
            .value();
        };
        $scope.toggleCount = function () {
          $scope.count = stepper.step();
          $scope.birds = _($scope.habitat.birds).first($scope.count);
        };
        $scope.clickBird = function (bird, index) {
          if ($scope.state == 'play') {
            $location.path('/bird/'+bird.id);
          } else if ($scope.state == 'guess') {
            makeGuess(bird);
          }
        }
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
