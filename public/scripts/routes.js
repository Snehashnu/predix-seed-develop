/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('administrator', { url: 'administrator', templateUrl: 'views/administrator.html'  })
            .state('general', { url: '/general', templateUrl: 'views/general.html'})
            .state('tctHelp', { url: '/tctHelp', templateUrl: 'views/tctHelp.html'  })
        	.state('assignRole', { url: '/assignRole', templateUrl: 'views/assignRole.html' })
        	.state('createGroup', { url: '/createGroup', templateUrl: 'views/createGroup.html' })
        	.state('bulkUpload', { url: '/bulkUpload', templateUrl: 'views/bulkUpload.html' })
        	.state('updateRegulation', { url: '/updateRegulation', templateUrl: 'views/updateRegulation.html',
        		controller: 'UpdateRegulationCtrl'})
        	.state('tagFeature', { url: '/tagFeature', templateUrl: 'views/tagFeature.html'})
        	.state('createObject',{url:'/createObject' ,templateUrl:'views/createObject.html', controller: 'CreateObjectController'})
        	.state('advanceSearch',{url:'/advanceSearch',templateUrl:'views/advanceSearch.html', controller: 'AdvanceSearchController'});
        


       /* $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/dashboards');
            $state.go('administrator');
        });*/

    }]);
});
