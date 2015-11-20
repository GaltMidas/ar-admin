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
        templateUrl: 'app/account/tmpl.li.html',
        controller: 'AccountController',
        controllerAs: 'AccountCtrl',
        abstract: true,
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "CurrentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$waitForAuth();
          }]
        }
      })
      .state('li.matchups', {
        url: '/matchups',
        abstratc: true,
        template: '<ui-view flex layout="column" />'
      })
      .state('li.matchups.index', {
        url: '/index',
        templateUrl: 'app/matchups/tmpl.index.html',
        controller: 'MatchupsController',
        controllerAs: 'MatchupsCtrl'
      });

    $urlRouterProvider.otherwise('/app/matchups/index');

  }

})();
