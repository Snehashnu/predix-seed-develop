define(['angular', './mdpa-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('UpdateRegulationCtrl', ['$scope', '$log', '$http','updateRegulationService',   function ($scope, $log , $http ,updateRegulationService) {
    	$scope.success = "alert alert-success";
    	$scope.failure = "alert alert-danger";
    	$scope.message = "";
    	$scope.countryList = [];
    	$scope.jurisdiction = [];
    	$scope.countryList = [];
		$scope.jurisdictionList = [];
		$scope.countryData = {};
		$scope.jurisdictionData = {};
		$scope.jKeyyy = {};
		$scope.countryClass="btn btn-primary dropdown-toggle ";
		$scope.jurisClass="btn btn-primary ";
		$scope.subCtryCls="btn btn-primary";
		$scope.addJrdCls="btn btn-primary";
		$scope.addJrdCls="btn btn-primary btn-md";
		$scope.uploadCls="btn btn-primary btn-md";
		$scope.addCtryDsbl = false;
		$scope.addJrdDsbl = true;
		$scope.selectedCountry = {};
		$scope.selectedJurisdiction = {};
		//console.log("from constants.js countryListObj---->"+countryListObj);
		var changed = false;
		$scope.hideAllDivs = function(){
    		console.log("Hiding Divs");
    		angular.element('#messageId').hide();
    		angular.element('#countryDetailsDiv').hide();
			angular.element('#addCountryDiv').hide();
			angular.element('#jurisdictionDiv').hide();
			angular.element('#jurisdictionDetailsDiv').hide();
			angular.element('#jurisdictionDetailsDivUpload').hide();/*rajeswari*/
		}
		$scope.hideAllDivs();
		$scope.selectedCtry = "Select Country";
		$scope.selectedJuris = "Select Jurisidiction";
		$scope.country1 = "Select Country";
    	$scope.country = "Select Country";
    	updateRegulationService.getCountryList(function(response, status){
			if(status == 200){
				$scope.countryList = response.lstCountry;
				$scope.countryList.unshift({val:"New Country",key:"none"});
				console.log(' countryList retrieved ');
				//$scope.checkRespStatus(true, false);
				$scope.hideAllDivs();
			}
		});
    	
    	$scope.countryChange = function(countryObj){
    		$scope.selectedCtry = countryObj.val;
    		$scope.selectedCountry = countryObj;
    		console.log(" country key "+ $scope.selectedCountry.key);
    		console.log(" country val "+ $scope.selectedCountry.val);
    		changed = true;
			angular.element('#messageId').hide();
			$scope.jurisClass="btn btn-primary dropdown-toggle";
			$scope.jurisdictionList = [];
			$scope.selectedJuris = "Select Jurisidiction";
			if($scope.selectedCountry == null ){
				$scope.countryClass="btn btn-primary dropdown-toggle";
				$scope.addCtryDsbl = false;
				$scope.addJrdDsbl = true;
				$scope.hideAllDivs();
			} else {
				if ($scope.selectedCountry.key != "none") {
					angular.element('#isoDiv').hide();
						console.log("inside if country code->"+$scope.selectedCountry.key);
						$scope.countryClass="btn btn-success dropdown-toggle";
//						$scope.checkRespStatus(true, true);
						updateRegulationService.getDataList($scope.selectedCountry.key,function(response, status){
							console.log(" countryData status "+ status);
							if(status == 200){
								console.log(" country data list-> ",response.lstCountryDetail[0]);
								$scope.countryData = response.lstCountryDetail[0];
								updateRegulationService.getJurisdictionList($scope.selectedCountry.val,function(response, status){
									if(status == 200){
										$scope.jurisdictionList = response;
										$scope.jurisdictionList.unshift({"name":"Add Jurisdiction","class":"none"});
										$scope.hideAllDivs();
										angular.element('#countryDetailsDiv').show();
										angular.element('#jurisdictionDiv').show();
									}else{
										$scope.checkRespStatus(false, true);
									}
								});
							}else{
								$scope.checkRespStatus(false, true);
							}
						});
						$scope.countryDataDisable = true;	
					} else {
						console.log('changing to blue');
						angular.element('#isoDiv').show();
						$scope.countryClass="btn btn-primary dropdown-toggle";
						$scope.countryData.name = "";
						$scope.countryData.code = "";
						$scope.countryData.iso = "";
						$scope.countryDataDisable = false;
						$scope.hideAllDivs();
						angular.element('#countryDetailsDiv').show();
						angular.element('#addCountryDiv').show();
				}
			}
			console.log(" jurisdictionList-> ",$scope.jurisdictionList);
		}
    	
    	$scope.addCountry = function(){
    		if ($scope.countryData.name == null || $scope.countryData.name == "" || $scope.countryData.code == null || $scope.countryData.code == "" || $scope.countryData.iso == null || $scope.countryData.iso == "") {
    			$scope.message = "All fields are mandatory, please provide input";
    			angular.element('#messageId').show();
				document.getElementById('messageId').className='alert alert-danger';
				$scope.addCtryDsbl = false;
				$scope.addJrdDsbl = true;
    	        return false;
    	    }
			$scope.countryList.push({val:$scope.countryData.val,key:$scope.countryData.key});
			var config = { headers: { 'Content-Type': 'application/JSON' } }
			var dataObj = {
			countryName : $scope.countryData.name,
			countryCode : $scope.countryData.code,
			isoCode :     $scope.countryData.iso ,
			user : '502431862'
			//flag :'E'
			}; 
			var res = $http.post('http://localhost:8080//mdpa-pw-admin/updateRegulation/addnewcountry1', dataObj, config);
			res.success(function(data, status, headers, config) {
			$scope.message = "Added Country Successfully";
			$scope.addCtryDsbl = true;
			$scope.addJrdDsbl = false;
			$scope.subCtryCls="btn btn-success";
			document.getElementById('messageId').className='alert alert-success';
			angular.element('#messageId').show();
			});
			res.error(function(data, status, headers, config) {
				angular.element('#messageId').show();
				$scope.message = "Unable to Add Country";
				document.getElementById('messageId').className='alert alert-danger';
			alert( "failure message: " + JSON.stringify({data: data}));
			}); 
		
    	}
    	$scope.jurisdictionChange = function(jursObj){
    		$scope.selectedJuris = jursObj.name;
    		$scope.selectedJurisdiction={name: jursObj.name,class:jursObj.class};
    		$scope.jurisdictionDisable=false;
    		if($scope.selectedJurisdiction == null ){
				angular.element('#jurisdictionDetailsDiv').hide();
				angular.element('#jurisdictionDetailsDivUpload').hide(); /*rajeswari*/
				$scope.jurisClass="btn btn-success dropdown-toggle";
			}else{
				console.log(" code " , $scope.selectedJurisdiction.name);
				angular.element('#jurisdictionDetailsDiv').show();
				angular.element('#jurisdictionDetailsDivUpload').show(); /*rajeswari*/
				   angular.element('#uploadBtnId').hide();
		    	   angular.element('#chooseFileDiv').show();
				if($scope.selectedJurisdiction.name=='Add Jurisdiction'){
					$scope.jurisdictionDisable=false;
					$scope.selectedJurisdiction={};
					$scope.jurisClass="btn btn-primary dropdown-toggle";
				}else{
					$scope.jurisdictionDisable=true;
					$scope.jurisClass="btn btn-success dropdown-toggle";
				}
			}
			// Need to implement
		}
    	
    	$scope.addNewJurisdiction = function(){
			console.log(' addNewJurisdiction ');
			angular.element('#jurisdictionDiv').hide();
			$scope.selectedJurisdiction=null;
			$scope.jurisdictionDisable=false;
			angular.element('#jurisdictionDetailsDiv').show();
			angular.element('#jurisdictionDetailsDivUpload').show();
		    $scope.jurisdictionList.push({name:$scope.selectedJurisdiction.name,code:$scope.selectedJurisdiction.code});
			
		}
    	
    	$scope.downloadTemplate = function () {
	    	console.log('Download template started' );
	    	
	    	console.log('$scope.selectedJurisdiction.name::',$scope.selectedJurisdiction.name );

				$http({
					url: 'http://localhost:8080/mdpa-pw-admin/updateRegulation/downloadexcel',
					method: "POST",
					data: {
						countryName : $scope.countryData.name,
						countryCode : $scope.countryData.code,
						jurisdictionName : $scope.selectedJurisdiction.name,
						//jurisdictionName : 'IN SCOMET',
						isoCode :     $scope.countryData.iso ,
						user : '502431862'
					},
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					},
					responseType: 'arraybuffer'
				}).success(function (data, status) {
					console.log('inside res.success' );
					var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
				//	saveAs(blob, 'UpdateRegulations.xls');
					 saveAs(blob, 'UpdateRegulations_' + $scope.countryData.name + '_' + $scope.selectedJurisdiction.name + '.xls');
				}).error(function (data, status) {
					console.log("Failed to download the file");
				});
	 	
	 	    	}
    	$scope.uploadedFile = function(element) {
	    	 $scope.$apply(function($scope) {
	    	   $scope.files = element.files;  
	    	   console.log('Files set'+element.files.length);
	    	   $scope.uploadCls="btn btn-primary btn-md";
	    	   angular.element('#uploadBtnId').show();
	    	   angular.element('#chooseFileDiv').hide();
	    	 });
	    	}
    	
    	$scope.saveFile = function(param) {
			 
			 console.log('$scope.selectedJurisdiction:',$scope.selectedJurisdiction);
			 console.log('$scope.selectedJurisdiction.name::',$scope.selectedJurisdiction.name );
			 console.log('$scope.selectedJurisdiction.class:::--',$scope.selectedJurisdiction.class );
			 if ($scope.countryData.name == null || $scope.countryData.name == "" || $scope.countryData.code == null || $scope.countryData.code == "" || $scope.countryData.iso == null || $scope.countryData.iso == "") {
	    			$scope.message = "Please provide country Info";
	    			angular.element('#messageId').show();
					document.getElementById('messageId').className='alert alert-danger';
	    	        return false;
	    	    }
			 if ($scope.selectedJurisdiction.name == null || $scope.selectedJurisdiction.name == "" || $scope.selectedJurisdiction.class == null || $scope.selectedJurisdiction.class == "" ) {
				 $scope.message = "Please provide Jurisdiction Info";
				 angular.element('#messageId').show();
				 document.getElementById('messageId').className='alert alert-danger';
				 return false;
			 }
			 if($scope.selectedJurisdiction == 'Add Jurisdiction' ){
				 console.log('testing new jurisdiction');
			 }
		     var fileData = new FormData();
		     //validations pending for url and uploaded documents.
		     fileData.append('inputFile', $scope.files[0]);
		     fileData.append('countryName' , $scope.countryData.name);
		     fileData.append('countryCode', $scope.countryData.code);
		     fileData.append('jurisdictionName' , $scope.selectedJurisdiction.name);
		     fileData.append('classType' , $scope.selectedJurisdiction.class);
		     fileData.append('isoCode', $scope.countryData.iso);
		     fileData.append('user','502431862');
		     var uploadUrl ='http://localhost:8080/mdpa-pw-admin/updateRegulation/uploadregulation';
		     $http.post(uploadUrl, fileData, 
		     {
		            transformRequest: angular.identity,
		            headers: {'Content-Type': undefined}
		     })
		        .then(function successCallback(response){
		        	console.log("Uploaded successfully");
		        	$scope.message = "Uploaded Successfully";
		        	 $scope.uploadCls="btn btn-success btn-md";
		        	$scope.addJrdCls="btn btn-primary btn-md";
		        	document.getElementById('messageId').className='alert alert-success';
					angular.element('#messageId').show();
		        	}, function errorCallback(response) {
		        		$scope.message = "Unable to Upload File";
						angular.element('#messageId').show();
						document.getElementById('messageId').className='alert alert-danger';
		        		console.log("errorCallback response-->" +response);
		        });
		     angular.element('#uploadBtnId').hide();
	    	 angular.element('#chooseFileDiv').show();
		     console.log('Save method ends');
		}
    	
    	
    	$scope.styleDefault = function(){
    		
    		var elem1 = document.getElementById("countryListDropdown");
    		var elem2 = document.getElementById("jurisListDropdown");
    		if(elem1 != null || elem1 != undefined){
				elem1.style.backgroundColor="#31b0d5";
			}
    		if(elem2 != null || elem2 != undefined){
				elem2.style.backgroundColor="#31b0d5";
			}
    		changed = false;
    	}
    }]);
});
