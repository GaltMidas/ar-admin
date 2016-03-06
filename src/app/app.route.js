(function() {
  'use strict';

  angular
    .module('arAdmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/tmpl.login.html',
        controller: 'LoginController',
        controllerAs: 'LoginCtrl'
      })
      .state('li', {
        url: '/app',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "CurrentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }],
          "API_KEY": ["FIREBASE_URL", "$firebaseObject", function (FIREBASE_URL, $firebaseObject) {
            var itemsRef = new Firebase(FIREBASE_URL + "/edmunds_key");
            var obj = $firebaseObject(itemsRef);

            return obj.$loaded();

          }]
        },
        templateUrl: 'app/account/tmpl.li.html',
        controller: 'AccountController',
        controllerAs: 'AccountCtrl',
        abstract: true
      })
      .state('li.matchups', {
        url: '/matchups',
        abstratc: true,
        template: '<ui-view flex layout="column" />',
        controller: 'MatchupsController',
        controllerAs: 'MatchupsCtrl'
      })
      .state('li.matchups.index', {
        url: '/index',
        templateUrl: 'app/matchups/tmpl.index.html',
        controller: 'MatchupsIndexController',
        controllerAs: 'MatchupsIndexCtrl',
        data: {
          title: 'Matchups Index'
        }
      })
      .state('li.matchups.detail', {
        url: '/id/:id',
        templateUrl: 'app/matchups/tmpl.detail.html',
        data: {
          title: 'Matchup Detail'
        }
      })
      .state('li.matchups.edit', {
        url: '/id/:id/edit',
        templateUrl: 'app/matchups/tmpl.edit.html',
        controller: 'MatchupsEditController',
        controllerAs: 'MatchupsEditCtrl',
        data: {
          title: 'Edit Matchup'
        }
      })
      .state('li.matchups.create', {
        url: '/create',
        templateUrl: 'app/matchups/tmpl.create.html',
        data: {
          title: 'Create Matchup'
        }
      });

    $urlRouterProvider.otherwise('/app/matchups/index');

  }

})();
