
define(['angular', './mdpa-module'], function (angular, serviceModule) {
    'use strict';


    serviceModule.factory('updateRegulationService',['$http','adminConstants',function ($http,adminConstants ) {
		var factory = { };
			//var newCountry =   {"name":"New Country","code":"none"};
			factory.getCountryList = function(successHandler) {
				console.log("In Services folder countryListObj -->");
				$http({
					url: adminConstants.countryListObj,
					method: "GET",
					dataType: "JSON",
					data: {
						info: 'getNavInfo'
					},
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function(resp, status) {
					console.log(' status '+status+'\t resp '+resp)
					successHandler(resp, status);
				}).error( function(resp, status) {
					console.log("Error in fetching Country List");
				});
				
			}
		
		factory.getDataList = function(countryCode, successHandler) {
			//console.log(" countryDataObj -->"+countryDataObj);
			//console.log(" countryCode -->"+countryCode);
			$http({
				url: adminConstants.countryDataObj,
				method: "GET",
				dataType: "JSON",
				params: {
					countrycode: countryCode
				},
				headers: { 'Content-Type': 'application/json' }
				//headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(resp, status) {
				console.log(' status '+status+'\t resp '+resp)
				successHandler(resp, status);
			}).error( function(resp, status) {
				console.log("Error in fetching Country Data List");
		});
				
	}
			
			factory.getJurisdictionList = function(countryName, successHandler) {
				//console.log(" jurisdictionListObj -->"+jurisdictionListObj+" countryName "+countryName);
				$http({
					url: adminConstants.jurisdictionListObj,
					method: "GET",
					dataType: "JSON",
					data: {
						info: 'getNavInfo'
					},
					
					params: {
						countryname: countryName
					},
					
					headers: { 'Content-Type': 'application/json' }
					//headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function(resp, status) {
					console.log(' status '+status+'\t resp ',resp)
					successHandler(resp, status);
				}).error( function(resp, status) {
					console.log("Error in fetching jurisdiction List");
				});
				
			}
		return factory;
	}]);
	
});