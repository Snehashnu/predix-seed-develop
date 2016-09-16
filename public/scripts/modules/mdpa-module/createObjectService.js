
define(['angular', './mdpa-module'], function (angular, serviceModule) {
    'use strict';


    serviceModule.factory('createObjectService',['$http','adminConstants',function ($http,adminConstants) {
		var factory = { };
			factory.getAppSite = function(successHandler) {
				console.log("In CreateObjectService appSiteObj --->"+adminConstants.appSiteObj);
				$http({
					url: adminConstants.appSiteObj,
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
					console.log("Error in fetching App Site List");
				});
				
			}
		
			factory.getAppId = function(appSite, successHandler) {
			
				console.log("In CreateObjectService---> getAppId");
				$http({
					url: adminConstants.appIdObj,
					method: "GET",
					dataType: "JSON",
					params: {
						appSite: appSite
					},
					headers: { 'Content-Type': 'application/json' }
					//headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function(resp, status) {
					console.log(' status '+status+'\t resp '+resp)
					successHandler(resp, status);
				}).error( function(resp, status) {
					console.log("Error in fetching App Id List");
				});
			}
			
			factory.getAppType = function(appId,appSite ,successHandler) {
				
				console.log("In CreateObjectService---> getAppType");
				$http({
					url: adminConstants.appTypeObj,
					method: "GET",
					dataType: "JSON",
					data: {
						info: 'getNavInfo'
					},
					params: {
						appId: appId, appSite:appSite 
						
                         						
					}, 
					
					headers: { 'Content-Type': 'application/json' }
					//headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function(resp, status) {
					console.log(' status '+status+'\t resp ',resp)
					successHandler(resp, status);
				}).error( function(resp, status) {
					console.log("Error in fetching App Type List");
				});
			}
			
			factory.getObjDataList = function(successHandler) {
				console.log("In CreateObjectService appSiteObj --->"+adminConstants.objectData);
				$http({
					url: adminConstants.objectData,
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
					console.log("Error in fetching App Site List");
				});
			}
			
			factory.submitObject = function(appId,appType,objDataList,successHandler) {
				
				console.log("In submitObject function, objDataList length->",objDataList);
				var config = { headers: { 'Content-Type': 'application/JSON' } };
				var idList = [];
				for(var i=0;i<objDataList.length;i++){
					idList.push(objDataList[i].key);
				}
				console.log("ID List---------->",idList);
				/*class A {
				S oI;
				S oD;
				}
				
				class B{
				
				List<A> aList;
				S aId;
				S aT;
 				
				}
				
				{ aId : '' , aT : '', aList : [{oI:'', oD:''},{oI:'', oD : ''}]
				
				  
				  }*/
				
				/*var dataObj = {
						appId : appId,
						appType : appType,
						objetcId : idList
				};*/
				//console.log("dataObj---------->",dataObj);
				//var res = $http.post(adminConstants.lookupdata, dataObj, config);*/
				//res.success(function(data, status, headers, config) {
				$http({
					url: adminConstants.lookupdata,
					method: "GET",
					dataType: "JSON",
					params: {
						'appId' : appId,
						'appType' : appType,
						'objectList' : idList
					 						
					},
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function(resp, status) {
					console.log(' status '+status+'\t resp '+resp)
					successHandler(resp, status);
				}).error(function(data, status, headers, config) {
					console.log("Could not retrieve lookupData");
				});
			}
			
			factory.getCountryList = function(successHandler) {
				console.log("In Services folder countryListObj1 -->"+adminConstants.stwCountryListObj);
				$http({
					url: adminConstants.stwCountryListObj,
					method: "GET",
					dataType: "JSON",
					data: {
						info: 'getNavInfo'
					},
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function(resp, status) {
					console.log(' status '+status+'\t resp ',resp)
					successHandler(resp, status);
				}).error( function(resp, status) {
					console.log("Error in fetching Country List");
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
			
			factory.getfirstquestion = function(successHandler){
				console.log("In getfirstquestion  --->"+adminConstants.appSiteObj);
				$http({
					url: adminConstants.getfirstquestion,
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
					console.log("Error in getfirstquestion");
				});
			}
			
			factory.getchildquest = function(seqId,successHandler){
				console.log('In Get Child Question');
				$http({
					url: adminConstants.getchildquest,
					method: "GET",
					dataType: "JSON",
					params:{answers:seqId},
					headers:{'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(resp,status){
					successHandler(resp,status);
				}).error(function(resp, status){
					console.log('Error is getting child question');
				});
			}
			
			factory.getTags = function(seqIdList,successHandler){
				console.log('In Get Tags');
				$http({
					url: adminConstants.gettags,
					method: "GET",
					dataType: "JSON",
					params:{'seqId1':seqIdList[0],'seqId2':seqIdList[1],'seqId3':seqIdList[2],'seqId4':seqIdList[3]},
					headers:{'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(resp,status){
					successHandler(resp,status);
				}).error(function(resp,status){
					console.log('Error in getTags-'+status);
				});
			}
			
			factory.applyTags = function(strAppId,strAppType,objName,tagSeqId,userSSO,successHandler){
				console.log('In Apply Tags');
				$http({
					url: adminConstants.gettags,
					method: "GET",
					dataType: "JSON",
					params:{'strAppId':strAppId,'strAppType':strAppType,'objName':objName,'tagSeqId':tagSeqId,'userSSO':userSSO},
					headers:{'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(resp,status){
					successHandler(resp,status);
				}).error(function(resp,status){
					console.log('Error in Apply Tags-'+status);
				});
			}
		return factory;
	}]);
	
});