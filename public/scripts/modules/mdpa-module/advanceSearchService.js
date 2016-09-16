define(['angular', './mdpa-module'], function (angular, serviceModule) {
    'use strict';


    serviceModule.factory('advanceSearchService',['$http','adminConstants',function ($http,adminConstants) {
		var factory = { };
		
		factory.getSearchResults = function(searchText, successHandler) {
			console.log("getSearchResults SERVICE Search text -->"+searchText);
			$http({
				url: adminConstants.searchResultObj,
				method: "GET",
				dataType: "JSON",
				params: {
					strLuceneQuery: searchText
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(resp, status) {
				console.log('Lucene Search status '+status+'\t resp '+resp)
				successHandler(resp, status);
			}).error( function(resp, status) {
				console.log("Error in fetching Search Result: ",resp);
			});
			
		}
		factory.getSearchHistory = function(successHandler) {
			//console.log("getSearchResults SERVICE Search text -->"+searchText);
			$http({
				url: adminConstants.searchHistoryObj,
				method: "GET",
				dataType: "JSON",
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(resp, status) {
				console.log('Search History status '+status+'\t resp '+resp)
				successHandler(resp, status);
			}).error( function(resp, status) {
				console.log("Error in fetching Search History: ",resp);
			});
			
		}
		return factory;
	}]);
	
});