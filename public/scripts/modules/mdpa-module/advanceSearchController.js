  define(['angular', './mdpa-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('AdvanceSearchController', ['$scope','$window','$compile', '$log', '$http', 'advanceSearchService',  function ($scope, $window, $compile, $log , $http , advanceSearchService) {

    	$scope.searchResults=[];
    	$scope.searchHistory=[];
    	$scope.searchText='';
    	$scope.resultStatement='';
    	$scope.appIdLinks = {};
    	$scope.hideResultTable = true;
    	//Filters
    	$scope.hideFilterTable = true;
    	$scope.appSiteFilters = {};
    	$scope.appTypeFilters = {};
    	$scope.taggerFilters = {};
    	$scope.expStatusFilters = {};
    	$scope.eccnFilters = {};
    	$scope.dateRangeFilters = {};
    	$scope.countryFilters = {};
    	var minFilterDisplay = 5;
    	$scope.appSiteFilterCount = minFilterDisplay;
    	$scope.appTypeFilterCount = minFilterDisplay;
    	$scope.taggerFilterCount = minFilterDisplay;
    	$scope.expStatusFilterCount = minFilterDisplay;
    	$scope.eccnFilterCount = minFilterDisplay;
    	$scope.dateRangeFilterCount = minFilterDisplay;
    	$scope.countryFilterCount = minFilterDisplay;
    	$scope.removeAppSiteFilter = true;
    	$scope.removeAppTypeFilter = true;
    	$scope.removeTaggerFilter = true;
    	$scope.removeExpStatusFilter = true;
    	$scope.removeEccnFilter = true;
    	$scope.removeDateFilter = true;
    	$scope.removeCountryFilter = true;
    	$scope.datepickerStart = '';
    	$scope.datepickerEnd = '';
    	//More Less links
    	$scope.hideAppSiteMore = false;
    	$scope.hideAppTypeMore = false;
    	$scope.hideTaggerMore = false;
    	$scope.hideExpStatusMore = false;
    	$scope.hideEccnMore = false;
    	$scope.hideDateRangeMore = false;
    	$scope.hideCountryMore = false;
    	var searchString ='';
    	var searchAnd = ' AND ';
    	var isRefineSearch = false;
    	var refineSearchText = '';
    	//Date range selection
    	$scope.rangeErrorMsg = [];
    	$scope.hideRangeError = true;
    	//List View of results
    	$scope.viewSelected = {view:"list"};
    	$scope.listResultCount = 10;
    	$scope.pager={};
    	$scope.setPage = setPage;
    	
    	
    	function initPgnation(){
    		// initialize to page 1
            $scope.setPage(1);
    	}
    	
    	function setPage(page) {
            if (page < 1 || page > $scope.pager.totalPages) {
                return;
            }
            // get pager object from service
            $scope.pager = getPager($scope.searchResults.length, page);
            // get current page of items
            $scope.items = $scope.searchResults.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        }

    	$scope.changeView = function(){
    		//console.log("viewSelected--->  "+$scope.viewSelected.view);
    		if($scope.viewSelected.view == 'table' && screen.width>768){
    			document.getElementById('searchResultsTable').style.display='block';
    			document.getElementById('searchResultsList').style.display='none';
    		}else{
    			document.getElementById('searchResultsList').style.display='block';
    			document.getElementById('searchResultsTable').style.display='none';
    		}
    	}
    	
     	advanceSearchService.getSearchHistory(function(response, status){
    		if(status == 200){
    			$scope.searchHistory = response;
    			//console.log('Search History  retrieved-->> '+$scope.searchHistory);
    		}else{
    			console.log('Error in fetching Search History ',response);
    		}
    	});
    	
    	$scope.getSearchResults = function(){
    		var searchQuery = '';
    		$scope.setDefaultCount();
    		if(isRefineSearch){
    			searchQuery = refineSearchText;
    			//console.log("Refined Search for ->"+searchQuery);
    		}else{
    			//console.log("Search For ->"+searchQuery);
    			searchQuery = $scope.searchText;
    		}
    		advanceSearchService.getSearchResults(searchQuery,function(response, status){
    			if(status == 200){
    				$scope.searchResults  = response.searchList;
    				$scope.resultStatement='Found '+response.totalSearchCount+" results for search term:  "+ $scope.searchText +"  in "+response.elapsedTime+" Seconds";
    				//console.log('Search Results  retrieved-->> '+$scope.resultStatement);
    				//FILTERS--
    				if($scope.searchResults != undefined && $scope.searchResults != null){
    					$scope.hideFilterTable = false;
    					$scope.hideResultTable = false;
    					
    					$scope.appSiteFilters = response.AppSiteFacet;
        				if($scope.appSiteFilters===undefined || $scope.appSiteFilterCount >= $scope.appSiteFilters.length){
        					$scope.hideAppSiteMore = true;
        				}else{
        					$scope.hideAppSiteMore = false;
        				}
    					$scope.appTypeFilters = response.AppTypeFacet;
          				if($scope.appTypeFilters===undefined || $scope.appTypeFilterCount >= $scope.appTypeFilters.length){
        					$scope.hideAppTypeMore = true;
        				}else{
        					$scope.hideAppTypeMore = false;
        				}
        				$scope.taggerFilters = response.TaggerNameFacet;
        				if($scope.taggerFilters===undefined || $scope.taggerFilterCount >= $scope.taggerFilters.length){
        					$scope.hideTaggerMore = true;
        				}else{
        					$scope.hideTaggerMore = false;
        				}
        				$scope.expStatusFilters = response.ExpStatusFacet;
        				if($scope.expStatusFilters===undefined || $scope.expStatusFilterCount >= $scope.expStatusFilters.length){
        					$scope.hideExpStatusMore = true;
        				}else{
        					$scope.hideExpStatusMore = false;
        				}
        				$scope.eccnFilters = response.EccNFacet;
        				if($scope.eccnFilters===undefined || $scope.eccnFilterCount >= $scope.eccnFilters.length){
        					$scope.hideEccnMore = true;
        				}else{
        					$scope.hideEccnMore = false;
        				}
        				//$scope.dateRangeFilters = response.DateRangeFacet;
        				if(searchQuery.indexOf('LastUpdated') != -1){
        					var startDayString = searchQuery.substring(searchQuery.indexOf('LastUpdated')+13,searchQuery.indexOf('LastUpdated')+21);
    						startDayString = startDayString.substring(0,4)+'-'+startDayString.substring(4,6)+'-'+startDayString.substring(6);
    						//console.log("startDay->"+startDayString);
    						var startDate = new Date(startDayString);
    						var diff =  Math.floor(( new Date() - startDate ) / 86400000);
    						if(diff === 30){
    							$scope.dateRangeFilters = [{"filterchild":"Last one month"}];
    						}else if(diff === 90){
    							$scope.dateRangeFilters = [{"filterchild":"Last three months"}];
    						}else if(diff === 180){
    							$scope.dateRangeFilters = [{"filterchild":"Last six months"}];
    						}else if(diff === 365){
    							$scope.dateRangeFilters = [{"filterchild":"Last one year"}];
    						}else{
    							$scope.dateRangeFilters = [{"filterchild":"Date range selection"}];
    						}
        				}else{
        					$scope.dateRangeFilters = [{"filterchild":"Last one month"},{"filterchild":"Last three months"},
              				          				 {"filterchild":"Last six months"},{"filterchild":"Last one year"},
              				        				 {"filterchild":"Date range selection"}];
        				}
        				if($scope.dateRangeFilters===undefined || $scope.dateRangeFilterCount >= $scope.dateRangeFilters.length){
        					$scope.hideDateRangeMore = true;
        				}else{
        					$scope.hideDateRangeMore = false;
        				}
        				$scope.countryFilters = response.CountryFacet;
        				if($scope.countryFilters===undefined || $scope.countryFilterCount >= $scope.countryFilters.length){
        					$scope.hideCountryMore = true;
        				}else{
        					$scope.hideCountryMore = false;
        				}
        				initPgnation();
        			}else{
        				$scope.hideFilterTable = true;
    					$scope.hideResultTable = true;
        			}
    				//--FILTERS
    			}else{
    				console.log('Error in fetching Search Results ',response);
    			}
    		});
    	}
    	
    	$scope.search = function(msg){
    		if(msg != '' && msg.length>0){
    			//console.log("History Search for-->"+msg);
    			$scope.searchText = msg;
    		}
    		searchString ='';
    		refineSearchText = '';
    		isRefineSearch = false;
    		$scope.removeFilterIcons();
    		if($scope.searchText != undefined && $scope.searchText !=null && $scope.searchText !=''){
    			$scope.getSearchResults();
    			refineSearchText =  $scope.searchText;
    		}
    	} 
    	
    	$scope.refineSearch = function(filter,count,$event){
    		//console.log("In refineSearch ,refineSearchText(BEFORE) ===>"+refineSearchText);
    		isRefineSearch = true;
    		if(filter === 'ApplicationSite'){
    			$scope.removeAppSiteFilter = false;
    		}else if(filter === 'ApplicationType'){
    			$scope.removeAppTypeFilter = false;
    		}else if(filter === 'Tagger'){
    			$scope.removeTaggerFilter = false;
    		}else if(filter === 'ExportStatus'){
    			$scope.removeExpStatusFilter = false;
    		}else if(filter === 'ECCN'){
    			$scope.removeEccnFilter = false;
    		}else if(filter === 'LastUpdated'){
    			$scope.removeDateFilter = false;
    		}else if(filter === 'Country'){
    			$scope.removeCountryFilter = false;
    		}
    		var elem = event.target;
    		
    		//console.log("Filter text clicked for --> "+filterText+'('+count+')');
    		var filterText = elem.innerText;
    		if(filterText != 'Date range selection'){
    			if(filter === 'LastUpdated'){
        			if(filterText != null && filterText!=undefined){
            			if(filterText== 'Last one month'){
            				filterText = filterDate(30)+ ' TO ' +filterDate(0);
            			}else if(filterText== 'Last three months'){
            				filterText = filterDate(90)+ ' TO ' +filterDate(0);
            			}else if(filterText== 'Last six months'){
            				filterText = filterDate(180)+ ' TO ' +filterDate(0);
            			}else if(filterText== 'Last one year'){
            				filterText = filterDate(365)+ ' TO ' +filterDate(0);
            			}
            			filterText = searchAnd+filter+':'+'['+filterText.trim()+']';
            			console.log("filterText===>"+filterText);
            		}
        		}else{
        			if(filterText != null && filterText!=undefined){
            			if(filterText.indexOf('('+count+')' != -1)){
            				filterText = filterText.substring(0,filterText.lastIndexOf('('+count+')'));
            			}
            			filterText = searchAnd+filter+':'+'\"'+filterText.trim()+'\"';
            			console.log("filterText===>"+filterText);
            		}
        		}
        		if(refineSearchText.indexOf(filterText) === -1 ){
        			refineSearchText = refineSearchText+filterText;
        			console.log("calling getSearchResults, refineSearchText(AFTER) ===>"+refineSearchText);
            		$scope.getSearchResults();
        		}
    		}else{
    			if($scope.dateRangeFilters.length === 5){
    				$scope.dateRangeFilters.splice(0,4);
        			document.getElementById('dateRangeIcon').click();
    			}
    		}
    		
    	}
    	
    	$scope.rangeFilter = function(){
    		$scope.hideRangeError = true;
    		isRefineSearch = true;
    		var isValid = true;
    		var msg=[];
    		$scope.rangeErrorMsg = [];
    		if(refineSearchText.indexOf('AND LastUpdated:') != -1){
    			refineSearchText = refineSearchText.substring(0,refineSearchText.indexOf('AND LastUpdated:'))
    								+refineSearchText.substring(refineSearchText.indexOf('AND LastUpdated:')+38);
    		}
    		//console.log("Start Date"+$scope.datepickerStart);
    		//console.log("End Date"+$scope.datepickerEnd);
    		var start = '';
    		var end = '';
    		if($scope.datepickerStart === undefined || $scope.datepickerStart === ''){
    			//alert('Please select Start Date');
    			msg.push('Please select Start Date');
    			isValid = false;
    		}else{
    			start = $scope.datepickerStart.replace(/[^a-zA-Z 0-9.]+/g,'');
    		}
    		if($scope.datepickerEnd === undefined || $scope.datepickerEnd === ''){
    			//alert('Please select End Date');
    			msg.push('Please select End Date');
    			isValid = false;
    		}else{
    			end = $scope.datepickerEnd.replace(/[^a-zA-Z 0-9.]+/g,'');
    		}
    		if($scope.datepickerStart > $scope.datepickerEnd && isValid){
    			//alert('Start date can not be greater than end date.');
    			msg.push('Start date can not be greater than end date.');
    			isValid = false;
    		}
    		if(!isValid){
    			$scope.rangeErrorMsg = msg;
    			$scope.hideRangeError = false;
    		}
    		if(start != undefined && start != '' && end != undefined && end != ''){
    			var filterText = searchAnd+'LastUpdated:'+'['+start+' TO '+end+']';
    			console.log("range filterText===>"+filterText);
    		}
    		if(refineSearchText.indexOf(filterText) === -1 && isValid){
    			refineSearchText = refineSearchText+filterText;
    			console.log("calling getSearchResults, refineSearchText(AFTER) ===>"+refineSearchText);
        		$scope.getSearchResults();
        		$scope.removeDateFilter = false;
    		}
    	}
    	
    	$scope.removeFilter =function(filter,filterValue){
    		var toRemove = '';
    		console.log("Remove filter for--"+filter+"  value-- "+filterValue);
    		if(filter === 'ApplicationSite'){
    			$scope.removeAppSiteFilter = true;
    		}else if(filter === 'ApplicationType'){
    			$scope.removeAppTypeFilter = true;
    		}else if(filter === 'Tagger'){
    			$scope.removeTaggerFilter = true;
    		}else if(filter === 'ExportStatus'){
    			$scope.removeExpStatusFilter = true;
    		}else if(filter === 'ECCN'){
    			$scope.removeEccnFilter = true;
    		}else if(filter === 'LastUpdated'){
    			$scope.removeDateFilter = true;
    		}else if(filter === 'Country'){
    			$scope.removeCountryFilter = true;
    		}
    		if(filter === 'LastUpdated'){
    			if(filterValue != null && filterValue!=undefined){
    				if(filterValue != 'Date range selection'){
    					if(filterValue== 'Last one month'){
            				filterValue = filterDate(30)+ ' TO ' +filterDate(0);
            			}else if(filterValue== 'Last three months'){
            				filterValue = filterDate(90)+ ' TO ' +filterDate(0);
            			}else if(filterValue== 'Last six months'){
            				filterValue = filterDate(180)+ ' TO ' +filterDate(0);
            			}else if(filterValue== 'Last one year'){
            				filterValue = filterDate(365)+ ' TO ' +filterDate(0);
            			}
            			filterValue = searchAnd+filter+':'+'['+filterValue.trim()+']';
            			console.log("to Remove filterText===>"+filterValue);
            			toRemove = filterValue;
    				}else{
    					document.getElementById('dateRangeIcon').click();
    					//setTimeout(5000);
    					filterValue =searchAnd+filter+':'+'['+$scope.datepickerStart.replace(/[^a-zA-Z 0-9.]+/g,'') + ' TO '+$scope.datepickerEnd.replace(/[^a-zA-Z 0-9.]+/g,'')+']';
    					toRemove = filterValue;
    					$scope.datepickerStart = '';
    			    	$scope.datepickerEnd = '';
    				}
        			
        		}
    			
    		}else{
    			toRemove = searchAnd+filter+':\"'+filterValue.trim()+'\"';
    		}
    		
    		console.log("refineSearchText Before-->"+refineSearchText);
    		console.log("toRemove-->"+toRemove);
    		refineSearchText = refineSearchText.replace(toRemove,'');
    		if(refineSearchText !=null && refineSearchText!=undefined && refineSearchText!= ''){
    			refineSearchText = refineSearchText.trim();
    		}
    		console.log("refineSearchText After-->"+refineSearchText);
    		$scope.getSearchResults();
    	}
    	
    	$scope.setDefaultCount = function(){
    		$scope.appSiteFilterCount = minFilterDisplay;
        	$scope.appTypeFilterCount = minFilterDisplay;
        	$scope.taggerFilterCount = minFilterDisplay;
        	$scope.expStatusFilterCount = minFilterDisplay;
        	$scope.eccnFilterCount = minFilterDisplay;
        	$scope.dateRangeFilterCount = minFilterDisplay;
        	$scope.countryFilterCount = minFilterDisplay;
        	$scope.appSiteFilters = {};
        	$scope.appTypeFilters = {};
        	$scope.taggerFilters = {};
        	$scope.expStatusFilters = {};
        	$scope.eccnFilters = {};
        	$scope.dateRangeFilters = {};
        	$scope.countryFilters = {};
    	}
    	
       	$scope.removeFilterIcons = function(){
    		$scope.removeAppSiteFilter = true;
        	$scope.removeAppTypeFilter = true;
        	$scope.removeTaggerFilter = true;
        	$scope.removeExpStatusFilter = true;
        	$scope.removeEccnFilter = true;
        	$scope.removeDateFilter = true;
        	$scope.removeCountryFilter = true;
    	}
    	
    	$scope.addMore = function($event){
    		var elem = event.target;
   		 	var selectedId = elem.getAttribute('id');
   		 	//console.log("Add more for selectedId->  ",elem);
   		 	if(elem.className.indexOf('glyphicon-menu-down') !=-1){
   		 		if(selectedId == 'showMoreAppSite'){
   		 			$scope.appSiteFilterCount = $scope.appSiteFilterCount + minFilterDisplay;
		 		    if($scope.appSiteFilterCount >= $scope.appSiteFilters.length){
		 		    	elem.innerText = "  show less";
		 		    	elem.className = "glyphicon glyphicon-menu-up";
		 		    }
   		 		}else if(selectedId == 'showMoreAppType'){
   		 		    $scope.appTypeFilterCount = $scope.appTypeFilterCount + minFilterDisplay;
   		 		    if($scope.appTypeFilterCount >= $scope.appTypeFilters.length){
   		 		    	elem.innerText = "  show less";
   		 		    	elem.className = "glyphicon glyphicon-menu-up";
   		 		    }
   		 		}else if(selectedId == 'showMoreTagger'){
   		 		    $scope.taggerFilterCount = $scope.taggerFilterCount + minFilterDisplay;
   		 		    if($scope.taggerFilterCount >= $scope.taggerFilters.length){
   		 		    	elem.innerText = "  show less";
   		 		    	elem.className = "glyphicon glyphicon-menu-up";
   		 		    }
   		 		}else if(selectedId == 'showMoreExpStatus'){
   		 			$scope.expStatusFilterCount = $scope.expStatusFilterCount + minFilterDisplay;
   		 			if($scope.expStatusFilterCount >= $scope.expStatusFilters.length){
		 		    	elem.innerText = "  show less";
		 		    	elem.className = "glyphicon glyphicon-menu-up";
		 		    }
   		 		}else if(selectedId == 'showMoreEccn'){
   		 			$scope.eccnFilterCount = $scope.eccnFilterCount + minFilterDisplay;
   		 			if($scope.eccnFilterCount >= $scope.eccnFilters.length){
		 		    	elem.innerText = "  show less";
		 		    	elem.className = "glyphicon glyphicon-menu-up";
		 		    }
   		 		}else if(selectedId == 'showMoreDateRange'){
   		 			$scope.dateRangeFilterCount = $scope.dateRangeFilterCount + minFilterDisplay;
   		 			if($scope.dateRangeFilterCount >= $scope.dateRangeFilters.length){
		 		    	elem.innerText = "  show less";
		 		    	elem.className = "glyphicon glyphicon-menu-up";
		 		    }
   		 		}else if(selectedId == 'showMoreCountry'){
   		 			$scope.countryFilterCount = $scope.countryFilterCount + minFilterDisplay;
   		 			if($scope.countryFilterCount >= $scope.countryFilters.length){
		 		    	elem.innerText = "  show less";
		 		    	elem.className = "glyphicon glyphicon-menu-up";
		 		    }
   		 		}
	 		
   		 	}else if(elem.className.indexOf('glyphicon-menu-up') !=-1){
   		 		if(selectedId == 'showMoreAppSite'){
   		 			$scope.appSiteFilterCount = minFilterDisplay;
		 			elem.innerText = "  more";
		 			elem.className = "glyphicon glyphicon-menu-down";
   		 		}else if(selectedId == 'showMoreAppType'){
   		 			$scope.appTypeFilterCount = minFilterDisplay;
   		 			elem.innerText = "  more";
   		 			elem.className = "glyphicon glyphicon-menu-down";
		 		}else if(selectedId == 'showMoreTagger'){
		 			$scope.taggerFilterCount = minFilterDisplay;
   		 			elem.innerText = "  more";
   		 			elem.className = "glyphicon glyphicon-menu-down";
		 		}else if(selectedId == 'showMoreExpStatus'){
		 			$scope.expStatusFilterCount = minFilterDisplay;
   		 			elem.innerText = "  more";
   		 			elem.className = "glyphicon glyphicon-menu-down";
		 		}else if(selectedId == 'showMoreEccn'){
		 			$scope.eccnFilterCount = minFilterDisplay;
   		 			elem.innerText = "  more";
   		 			elem.className = "glyphicon glyphicon-menu-down";
		 		}else if(selectedId == 'showMoreDateRange'){
		 			$scope.dateRangeFilterCount = minFilterDisplay;
   		 			elem.innerText = "  more";
   		 			elem.className = "glyphicon glyphicon-menu-down";
		 		}else if(selectedId == 'showMoreCountry'){
		 			$scope.countryFilterCount = minFilterDisplay;
   		 			elem.innerText = "  more";
   		 			elem.className = "glyphicon glyphicon-menu-down";
		 		}
   		 	}
   		}
    	
    	function filterDate(days) {
    		var returnDate = new Date();
    		returnDate.setTime( returnDate.getTime() - days* 86400000 );
    		returnDate = returnDate.toISOString().substring(0,10);
    		returnDate = returnDate.replace(/[^a-zA-Z 0-9.]+/g,'');
    	    return returnDate;
    	}
    	
    	$scope.clickFilterBtn = function(){
    		setTimeout(function(){angular.element('#smFilterBtn').trigger('click')}, 1000);
    	};
    	
    	$scope.replaceDiv =function (msg, $event){
    		console.log('msg-->'+msg);
    		 //var elem = event.target.parentElement;
    		
    		 if(msg !=null && msg != undefined){
                var selectedId = msg;
                var angularElement= document.getElementById(selectedId);
                var searchElement=document.getElementById("searchFilterDiv");
                var innerHTML=angular.element(searchElement).html();
                var $elem = angular.element(angularElement);
                $elem.html($compile(innerHTML)($scope));
    		 }else{
    			 console.log("error in elem-->",elem);
    		 }
    		 console.log("AppType Filter Count-->",$scope.appTypeFilters);
    	}
    	
    	function getPager(totalItems, currentPage, pageSize) {
    	        // default to first page
    	        currentPage = currentPage || 1;
    	 
    	        // default page size is 10
    	        pageSize = pageSize || 10;
    	 
    	        // calculate total pages
    	        var totalPages = Math.ceil(totalItems / pageSize);
    	 
    	        var startPage, endPage;
    	        if (totalPages <= 10) {
    	            // less than 10 total pages so show all
    	            startPage = 1;
    	            endPage = totalPages;
    	        } else {
    	            // more than 10 total pages so calculate start and end pages
    	            if (currentPage <= 6) {
    	                startPage = 1;
    	                endPage = 10;
    	            } else if (currentPage + 4 >= totalPages) {
    	                startPage = totalPages - 9;
    	                endPage = totalPages;
    	            } else {
    	                startPage = currentPage - 5;
    	                endPage = currentPage + 4;
    	            }
    	        }
    	 
    	        // calculate start and end item indexes
    	        var startIndex = (currentPage - 1) * pageSize;
    	        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    	 
    	        // create an array of pages to ng-repeat in the pager control
    	        var pages = _.range(startPage, endPage + 1);
    	 
    	        // return object with all pager properties required by the view
    	        return {
    	            totalItems: totalItems,
    	            currentPage: currentPage,
    	            pageSize: pageSize,
    	            totalPages: totalPages,
    	            startPage: startPage,
    	            endPage: endPage,
    	            startIndex: startIndex,
    	            endIndex: endIndex,
    	            pages: pages
    	        };
    	    }
    	//}
	//Export to Excel functionality
    function generateArray(table) {
	    var out = [];
	    var rows = table.querySelectorAll('tr');
	    var ranges = [];
	    for (var R = 0; R < rows.length; ++R) {
	        var outRow = [];
	        var row = rows[R];
	        var columns = row.querySelectorAll('td');
	        for (var C = 0; C < columns.length; ++C) {
	            var cell = columns[C];
	            var colspan = cell.getAttribute('colspan');
	            var rowspan = cell.getAttribute('rowspan');
	            var cellValue = cell.innerText;
	            if(cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

	            //Skip ranges
	            ranges.forEach(function(range) {
	                if(R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
	                    for(var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
	                }
	            });

	            //Handle Row Span
	            if (rowspan || colspan) {
	                rowspan = rowspan || 1;
	                colspan = colspan || 1;
	                ranges.push({s:{r:R, c:outRow.length},e:{r:R+rowspan-1, c:outRow.length+colspan-1}});
	            };
	            
	            //Handle Value
	            outRow.push(cellValue !== "" ? cellValue : null);
	            
	            //Handle Colspan
	            if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
	        }
	        out.push(outRow);
	    }
	    return [out, ranges];
	};

	function datenum(v, date1904) {
		if(date1904) v+=1462;
		var epoch = Date.parse(v);
		return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
	}
	 
	function sheet_from_array_of_arrays(data, opts) {
		var ws = {};
		var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
		for(var R = 0; R != data.length; ++R) {
			for(var C = 0; C != data[R].length; ++C) {
				if(range.s.r > R) range.s.r = R;
				if(range.s.c > C) range.s.c = C;
				if(range.e.r < R) range.e.r = R;
				if(range.e.c < C) range.e.c = C;
				var cell = {v: data[R][C] };
				if(cell.v == null) continue;
				var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
				
				if(typeof cell.v === 'number') cell.t = 'n';
				else if(typeof cell.v === 'boolean') cell.t = 'b';
				else if(cell.v instanceof Date) {
					cell.t = 'n'; cell.z = XLSX.SSF._table[14];
					cell.v = datenum(cell.v);
				}
				else cell.t = 's';
				if(R===0){
					cell.s = 'background-color:green;font-weight:bold;';
				}
				ws[cell_ref] = cell;
			}
		}
		if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		return ws;
	}
	 
	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}
	 
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i){
			view[i] = s.charCodeAt(i) & 0xFF;
		} 
		return buf;
	}

	$scope.export_table_to_excel = function (id) {
		var theTable = document.getElementById(id);
		var oo = generateArray(theTable);
		var ranges = oo[1];
		/* original data */
		var data = oo[0];
		if(id === 'expExcelTable'){
			var ws_name = "EXPORT_TO_EXCEL_TEMPLATE";
			var fileName = "SearchExportToExcel_SpreadSheet.xlsx"
		}else{
			var ws_name = "BULK_DOWNLOAD_TEMPLATE";
			var fileName = "Search_ExportClassification_SpreadSheet.xlsx"
		}
		var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
		/* add ranges to worksheet */
		ws['!merges'] = ranges;

		/* add worksheet to workbook */
		wb.SheetNames.push(ws_name);
		wb.Sheets[ws_name] = ws;
		var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:false, type: 'binary'});
		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fileName)
	}

    	document.querySelector('px-app-nav').toggleNav();
    }]);
  });