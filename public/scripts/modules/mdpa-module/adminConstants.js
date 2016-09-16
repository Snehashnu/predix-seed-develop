/*global define */
define(['angular', './mdpa-module'], function (angular, module) {
    'use strict';
    /**
    * TCTViewService is a contains all the application specific properties 
    */
    module.factory('adminConstants', [  function ( ) {
     var baseUrl = "http://3.209.239.122:8888/tctpwAdmin/";
     var baseUrl2 = "";
     var serviceUrl = 'http://localhost:8080//mdpa-pw-admin';
     var adminServiceUrl = serviceUrl + '/admin';
     var tagServiceUrl = serviceUrl + '/411tag';
     var udateRegulationServiceUrl = serviceUrl + '/updateRegulation';
     var countryListObj = udateRegulationServiceUrl + '/getcountry';
     var countryDataObj = 'http://localhost:8080/mdpa-pw-admin/updateRegulation/getcountrydetails';
     var jurisdictionListObj = 'http://localhost:8080/mdpa-pw-admin/updateRegulation/getJurisdiction';
     
     //general module
     //D:\gegdc\SP105336\New folder\workspace\tctpw_Naidu\src\main\resources\static\scripts\modules\mdpa-module\sampleData\appSite.json
     var appSiteObj = 'http://localhost:8080/mdpa-pw/stwtag/getappsite';
     var appIdObj =    'http://localhost:8080/mdpa-pw/stwtag/getappid';
     var appTypeObj = 'http://localhost:8080/mdpa-pw/stwtag/getapptype';
     var objectData = 'http://localhost:8080/mdpa-pw/stwtag/getlookupdata';
     var objectData = '/scripts/modules/mdpa-module/sampleData/objectData.json';
     var lookupdata = '/scripts/modules/mdpa-module/sampleData/lookupdata.json';
     /*var lookupdata = 'http://localhost:8080/mdpa-pw/stwtag/getlookupdata';*/
     var stwCountryListObj = '/scripts/modules/mdpa-module/sampleData/countryListTest.json';
     var stwJurisdictionListObj = '/scripts/modules/mdpa-module/sampleData/jurisdictionList.json';
     //Advance Search
     var searchResultObj = 'http://localhost:8080/mdpa-pw-admin/luceneSearch/getSearch';
     /*var searchResultObj = '/scripts/modules/mdpa-module/sampleData/searchresult.json';*/
     var searchHistoryObj = '/scripts/modules/mdpa-module/sampleData/searchHistory.json';
     //411 Tag
     var getfirstquestion = 'http://localhost:8080/mdpa-pw/411tag/getfirstquestion';
     var getchildquest = 'http://localhost:8080/mdpa-pw/411tag/getchildquest';
     var gettags = 'http://localhost:8080/mdpa-pw/411tag/gettags';
     var applytags = 'http://localhost:8080/mdpa-pw/411tag/applytags';
    return {
     baseUrl: baseUrl,
     baseUrl2: baseUrl2,
     serviceUrl: serviceUrl,
     adminServiceUrl: adminServiceUrl,
     tagServiceUrl: tagServiceUrl,
     countryListObj: countryListObj,
     countryDataObj: countryDataObj,
     jurisdictionListObj: jurisdictionListObj,
     //general module
     appSiteObj: appSiteObj,
     appIdObj: appIdObj,
     appTypeObj: appTypeObj,
     objectData: objectData,
     lookupdata: lookupdata,
     stwCountryListObj: stwCountryListObj,
     stwJurisdictionListObj: stwJurisdictionListObj,
     //advance search
     searchResultObj: searchResultObj,
     searchHistoryObj:searchHistoryObj,
     //411Tag
     getfirstquestion:getfirstquestion,
     getchildquest:getchildquest,
     gettags:gettags,
     applytags:applytags
      };
    }]);
});