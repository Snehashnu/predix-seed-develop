define(['angular', './mdpa-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('CreateObjectController', ['$scope', '$log', '$http', 'createObjectService',  function ($scope, $log , $http , createObjectService) {
    	console.log("In create Obj Controller1");
    	$scope.message = "";
    	$scope.messageClass = "alert alert-danger";
    	$scope.appSiteList = [];
    	$scope.appIdList = [];
    	$scope.appTypeList = [];
    	$scope.countryList = [];
    	$scope.tempCountryList = [];
    	$scope.selectedAppSite = {};
    	$scope.selectedAppId = {};
    	$scope.selectedAppType = {};
    	$scope.appSiteClass = "form-control btn btn-primary dropdown-toggle";
    	$scope.ctrySiteClass = "form-control btn btn-primary dropdown-toggle";
    	$scope.appIdClass = "form-control btn btn-primary dropdown-toggle";
    	$scope.appTypeClass = "form-control btn btn-primary dropdown-toggle";
    	$scope.displayAppSite = "-Select-";
    	$scope.displayAppId = "-Select-";
    	$scope.displayAppType = "-Select-";
    	$scope.tagStepBtnClass = "btn1 btn--primary";
    	$scope.fOnePgBtnClass = "btn1 btn--primary";
    	$scope.stwPgBtnClass = "btn1 btn--primary";
    	$scope.lookupData = [];
    	var changed = false;
    	$scope.objDataList =[];
    	$scope.tempObjDataList =[];
    	$scope.tagObjNav =[];
    	$scope.objDataList1 =[];
    	$scope.countryBtnClass = "btn1 btn--primary btn--large";   
    	$scope.jurisBtnClass = "btn1 btn--primary";   
    	$scope.jurisdictionList = [];
    	$scope.items = [];
    	$scope.tagObject = [];
    	$scope.countryId="";
    	$scope.countryJursid="";
    	$scope.countryCplmtry="";
    	$scope.countryItar="";
    	$scope.countryTag="";
    	$scope.countryIsGov="";
    	$scope.tempUML="UML";
    	$scope.showSTWSubmit = false;
    	//411 Tag
    	$scope.viewSelected = {view:"411"};
    	$scope.hideSTWDiv = true;
		$scope.hide411Div = false;
		var tagStepCount = 0;
		$scope.firstQuestion ={};
		$scope.childQuestion ='';
    	var firstAnsId =0;
    	var secondAnsId =0;
    	var thirdAnsId =0;
    	var fourthAnsId =0;
    	var answerSeqIdList=[0,0,0,0];
    	$scope.question2Data = {};
    	$scope.question3Data = {};
    	$scope.question4Data = {};
    	$scope.displayFirstAns = '--Select--';
    	$scope.displaySecAns = '--Select--';
    	$scope.displayThirdAns = '--Select--';
    	$scope.displayFourthAns = '--Select--';
    	$scope.firstAnsClass = "form-control btn btn-primary dropdown-toggle";
    	$scope.secAnsClass = "form-control btn btn-primary dropdown-toggle";
    	$scope.thirdAnsClass = "form-control btn btn-primary dropdown-toggle";
    	$scope.fourthAnsClass = "form-control btn btn-primary dropdown-toggle";
		$scope.firstIconClass= "glyphicon glyphicon-question-sign";
		$scope.secIconClass= "glyphicon glyphicon-question-sign";
		$scope.thirdIconClass= "glyphicon glyphicon-question-sign";
		$scope.fourthIconClass= "glyphicon glyphicon-question-sign";
		$scope.tagsList={};
		$scope.hideTagResults = true;
		$scope.hideTagStep2 =true;
		$scope.hideTagStep3 =true;
		$scope.hideTagStep4 =true;
		
    	$scope.hideAllDivs = function(){
    		console.log("Hiding Divs");
    		angular.element('#messageId').hide();
    		angular.element('#appIdDiv').hide();
			angular.element('#appTypeDiv').hide();
			angular.element('#objInputDiv').hide();
			angular.element('#objDeleteBtn').hide();
			angular.element('#411PgBtn').hide();
			angular.element('#stwPgBtn').hide();
//			angular.element('#stwDiv').hide(); commented by naidu
			angular.element('#jurisSelectDiv').hide();
			angular.element('#jurisDetailsDiv').hide();
			angular.element('#tagMessageId').hide();
			angular.element('#objNavBar').hide();
			angular.element('#objNavBar1').hide();
			angular.element('#objNavBar2').hide();
    	}
    	
		$scope.hideAllDivs();
		
    	createObjectService.getAppSite(function(response, status){
			if(status == 200){
				$scope.appSiteList = response;
				console.log(' appSiteList retrieved ');
				$scope.items=$scope.appSiteList;//TESTING
				console.log("ITEMS----",$scope.items);
			}else{
				console.log('Error in fetching App Site List');
			}
		});
    	
    	$scope.appSiteChange=function(appSiteObj){
    		//console.log('App Site changed. selectedAppSite val===>'+$scope.selectedAppSite.value);
    		$scope.displayAppSite = appSiteObj.value;
    		$scope.selectedAppSite = appSiteObj;
    		$scope.displayAppId = "-Select-";
    		$scope.displayAppType = "-Select-";
    		changed = true;
    		if($scope.selectedAppSite == null || $scope.selectedAppSite.value == null){
    			$scope.appSiteClass ='form-control btn btn-primary dropdown-toggle';
				$scope.hideAllDivs();
			} else {
				angular.element('#appTypeDiv').hide();
				angular.element('#objInputDiv').hide();
				$scope.appIdClass = "form-control btn btn-primary dropdown-toggle";
				$scope.appSiteClass ='form-control btn dropdown-toggle btn-success';
				angular.element('#appIdDiv').show();
				createObjectService.getAppId($scope.selectedAppSite.value,function(response, status){
					console.log(" getAppId status "+ status);
					if(status == 200){
						console.log(" country App ID list-> ",response);
						$scope.appIdList = response;
					}else{
						console.log("Error in fetching App ID list: Status Code:"+status);
					}
				});
			}
    	}
    	
    	$scope.appIdChange=function(appIdObj){
    		//console.log('App Site Changed. selectedAppId val===>'+$scope.selectedAppId.value);
    		$scope.displayAppId = appIdObj.value;
    		$scope.selectedAppId = appIdObj;
    		$scope.displayAppType = "-Select-";
    		if($scope.selectedAppId == null || $scope.selectedAppId.value == null){
    			$scope.appIdClass = "form-control btn btn-primary dropdown-toggle";
    			$scope.appTypeClass ='form-control btn btn-primary dropdown-toggle';
    		} else {
				$scope.appTypeClass ='form-control btn btn-primary dropdown-toggle';
				$scope.appIdClass = 'form-control btn btn-success dropdown-toggle';
				angular.element('#appTypeDiv').show();
				createObjectService.getAppType($scope.selectedAppId.value,$scope.selectedAppSite.value,function(response, status){
					console.log(" getAppType status "+ status);
					if(status == 200){
						console.log(" country App Type list-> ",response);
						$scope.appTypeList = response;
					}else{
						console.log("Error in fetching App Type list: Status Code:"+status);
					}
				});
			}
    	}
    	
    	$scope.appTypeChange=function(appTypeObj){
    		$scope.displayAppType = appTypeObj.value;
    		$scope.selectedAppType = appTypeObj;
    		//console.log('App Type Changed. selectedAppType val===>'+$scope.selectedAppType.value);
    		if($scope.selectedAppType == null ){
    			$scope.appTypeClass ='form-control btn btn-primary dropdown-toggle';
				//$scope.hideAllDivs();
			} else {
				angular.element('#objInputDiv').show();
				$scope.appTypeClass ='form-control btn dropdown-toggle btn-success';
				$scope.objDataList =[];
				$scope.objDataList.push({key:"",value:""});
				/*angular.element('#objDeleteBtn').show();*/
				/*createObjectService.getObjDataList(function(response, status){
					console.log(" getAppType status "+ status);
					if(status == 200){
						console.log(" country App Type list-> ",response);
						$scope.objDataList = response;
						if($scope.objDataList.length>1){
							angular.element('#objDeleteBtn').show();
						}
					}else{
						console.log("Error in fetching App Type list: Status Code:"+status);
					}
				});*/
			}
    	}
    	
    	$scope.tagObjLoad=function(index){
    		var nextIndex=6+index;
    		$scope.tagObjIndex=0;
    		$scope.tempObjDataList = $scope.objDataList.slice(index,nextIndex);
    		if($scope.tempObjDataList.length<6){
   			 angular.element('#objNavBar').hide();
   			 angular.element('#objNavBar1').hide();
   			 angular.element('#objNavBar2').hide();
   		 	} else{
   		 	angular.element('#objNavBar').show();	
   		 	angular.element('#objNavBar1').show();	
   		 	angular.element('#objNavBar2').show();	
   		 	}
    		
    	}
    	$scope.tagObjIndex=0;
    	$scope.getTagObj=function(index){
    		$scope.tagObjIndex=$scope.tagObjIndex+6;
    		$scope.tempObjDataList = $scope.objDataList.slice(index,$scope.tagObjIndex);
    	}
    	$scope.tagObjAll=function(){
    		$scope.tempObjDataList = $scope.objDataList;
    	}
    	$scope.tagObjInit=function(index){
    		var nextIndex=6+index;
    		$scope.tempObjDataList = $scope.objDataList.slice(index,nextIndex);
    	}
    	$scope.tagObjPrev=function(){
    		if($scope.tagObjIndex<6){
    			$scope.tagObjIndex=0;
    		}
    		else{
    			$scope.tagObjIndex=$scope.tagObjIndex-6;
    		}
    		$scope.tagObjInit($scope.tagObjIndex);
    	}
    	$scope.tagObjNext=function(){
    		if($scope.tagObjIndex<5){
    			$scope.tagObjIndex=5;
    		}
    		else if($scope.tagObjIndex>=($scope.objDataList.length-6)){
    			$scope.tagObjIndex=$scope.objDataList.length-6;
    		}
    		else{
    			$scope.tagObjIndex=$scope.tagObjIndex+6;
    		}
    		$scope.tagObjInit($scope.tagObjIndex);
    	}
    	$scope.tagShowAll=function(){
    		$scope.tagObjIndex=$scope.objDataList.length;
    		$scope.tempObjDataList = $scope.objDataList.slice(0,$scope.tagObjIndex);$scope.tagObjIndex=0;
    	}
    	$scope.tagObjLast=function(){
    		$scope.tagObjIndex=$scope.objDataList.length-6;
    		$scope.tagObjInit($scope.tagObjIndex);
    	}
    	$scope.addObject=function(){
    		$scope.objDataList.push({key:"",value:""});
        	angular.element('#objDeleteBtn').show();
    	}
    	
    	
    	$scope.deleteObject = function() {
    		var tempArray =[];
    		for(var i=0; i<$scope.objDataList.length;i++){
    			//console.log("Test for -->"+$scope.objDataList[i].key+"  checked -->"+$scope.objDataList[i].checked);
    			if(! $scope.objDataList[i].checked){
    				tempArray.push($scope.objDataList[i]);
    				//console.log("tempArray length-->"+tempArray.length);
    			}
    		}
    		if(tempArray.length==0){
    			$scope.showMessage("Can not delete all objects");
    		}else{
    			$scope.resetMessage();
    			$scope.objDataList =[];
        		$scope.objDataList = tempArray;
        		if($scope.objDataList.length == 1){
        			angular.element('#objDeleteBtn').hide();
        		}
    		}
    	}
    	 $scope.getTempCtry =function (){
    		 $scope.countryList.forEach($scope.createTempCtry);
    	 }
    	 $scope.createTempCtry=function (item, index){
    		 $scope.tempCountryList.push({key:item.key,val:item.val,clas:"btn1 btn--primary "});
        }
        $scope.saveContinue = function() {
        	console.log("CLICKED!!!!!!!!!!!!!");
        	var objInputValid = document.getElementById('objForm').checkValidity();
        	if(objInputValid){
        		$scope.resetMessage();
        		$scope.tagStepBtnClass = "btn1 btn--green";
            	$scope.fOnePgBtnClass = "btn1 btn--red";
            	$scope.stwPgBtnClass = "btn1 btn--red";
            	angular.element('#411PgBtn').show();
    			angular.element('#stwPgBtn').show();
    			document.body.scrollTop = document.documentElement.scrollTop = 0;
    			createObjectService.submitObject($scope.selectedAppId.value,$scope.selectedAppType.value,$scope.objDataList,function(response, status){
					console.log(" Submit object Status"+ status);
					if(status == 200){
						console.log(" Submit object success. Response-> ",response);
						$scope.lookupData = response.lstLookupData;
						console.log("$scope.lookupData-->",$scope.lookupData);
						
						createObjectService.getCountryList(function(response, status){
			    			if(status == 200){
			    				$scope.countryList = response.lstCountry;
			    				$scope.getTempCtry();
			    				console.log(' countryList retrieved Size--->'+$scope.tempCountryList.length);
			    			}else{
			    				console.log('Error in retrieving countryList ');
			    			}
			    		});
						clearAnswerList();
						createObjectService.getfirstquestion(function(response, status){
			 				if(status == 200){
			 					$scope.firstQuestion = response;
			 					console.log("firstQuestion-->"+$scope.firstQuestion);
			 					$scope.firstAnsList = response.lstAnsOpt;
			 					console.log(' firstAnswerList retrieved ');
			 				}else{
			 					console.log('Error in fetching firstAnswerList');
			 				}
			 			});
					}else{
						console.log("Could notsubmit object.  Status Code:"+status);
					}
				});
        	}else{
        		$scope.showMessage("Please enter Object Id and Object Description before submitting.");
        	}
        	setTimeout(function(){document.getElementById('tagObjPageId').click()}, 1000);
        	$scope.tagObjLoad(0);
        } 
        
        $scope.showSTWPage = function(){
        	angular.element('#tagStepDiv').hide();
        	angular.element('#objInputDiv').hide();
        	$scope.stwPgBtnClass = "btn1 btn--primary";
//        	angular.element('#stwDiv').show(); commented by naidu
           	
        }
        
        $scope.backToTagStep=function(){
    		angular.element('#tagStepDiv').show();
    		if($scope.selectedAppType.value != "" 
    			&& $scope.selectedAppType.value != "-Select-" 
    				&& $scope.selectedAppType.value !=undefined){
    			angular.element('#objInputDiv').show();
    		}
//    		angular.element('#stwDiv').hide(); commented by naidu
    	}
        
        $scope.getJursidData = function(object, $event){
        
        	console.log("$scope.selectedCountry-->",object.val);
        	
        	createObjectService.getJurisdictionList(object.val,function(response, status){
				if(status == 200){
					console.log("getJurisdictionList success");
					$scope.jurisdictionList = response;
					angular.element('#jurisSelectDiv').show();
				}else{
					console.log("getJurisdictionList failed");
					$scope.checkRespStatus(false, true);
				}
			});
        }
        
        $scope.showJurisData = function(object, $event){
        	var jElm =document.getElementById('jurisSelectDiv').querySelectorAll("input");
        	for (var i=0; i<jElm.length; i++) {
        		var isBtn = jElm[i].classList.contains('btn1');
        		if(isBtn){
        			jElm[i].className =  "btn1 btn--primary";
        		}
        	}
        	var elem = event.target;
        	elem.className = "btn1 btn--green";
        	console.log("$scope.selectedJuris-->",object+"    Element",elem);
        	angular.element('#jurisDetailsDiv').show();
        	$scope.showSTWSubmit = false;
        }
        
    	$scope.styleDefault = function(msg, $event){
    		var elem = event.target;
    		if(elem.options!=null){
    			for(var i=0; i<elem.length;i++){
        			elem.options[i].style.backgroundColor="#fff";
        			elem.options[i].style.color="#555";
        		}
    			changed = false;
    		}
    	}
    	
    	$scope.resetMessage=function(){
    		$scope.message = "";
    		angular.element('#messageId').hide();
    		angular.element('#tagMessageId').hide();
    	}
    	
    	$scope.showMessage=function(msg){
    		$scope.message = msg;
    		angular.element('#messageId').show();
    	}
    	$scope.SelectedCode = [];
    	$scope.afterSelectedCode = function (selected){
    		console.log("afterSelectedCode");
    		if(selected){
    			$scope.SelectedCode.push(selected.originalObject);
    			console.log("$scope.SelectedCode",$scope.SelectedCode);
    		}
    	}
    	 $scope.saveContinueSTW = function() {
    		 angular.element('#jurisDetailsDiv').hide();
    		 $scope.showSTWSubmit = true;
    	 }
    	 
    	 $scope.replaceDiv =function (msg, $event){
    		 console.log("msg: "+msg);
    		 var elem = event.target;
    		 var selectedId = elem.getAttribute('href').replace('#','');
    			document.getElementById(selectedId).innerHTML =document.getElementById("formId").innerHTML;
    			$scope.resetTagInfo();
    			$scope.countryId = selectedId;
    			$scope.updateTagObj();
    	}
    	 $scope.replaceCountry1 =function (object){
    		 console.log("VVVAL: "+object.key);
    		 document.getElementById(object.key).innerHTML =document.getElementById("formId").innerHTML;
 			$scope.resetTagInfo();
 			$scope.countryId = object.val;
 			$scope.updateTagObj();
 			$scope.getJursidData(object);
// 			object.clas="btn1 btn-success btn--large";
 			$scope.tempObj=object
    	 }
    	 
    	 $scope.replaceCountry =function (object){
    			document.getElementById("formId").style.display ='block';
    			$scope.resetTagInfo();
    			$scope.countryId = object.val;
    			$scope.updateTagObj();
    			$scope.getJursidData(object);
    			$scope.resetClass(object);
    			if(!$scope.isExist){
    				object.clas="btn1 btn-warning  ";
    			}
    			$scope.tempObj=object;
    			$scope.isExist=false;
    			if($scope.jurisdictionList.length==1){
    				$scope.jurisBtnClass = "btn1 btn-success";  
    			}
    			 
    	}
    	 
    	 // Start: checking if this country is already saved by user or not
    	 $scope.selectedCountryId='';
    	 $scope.tempUML='';
    	 $scope.tempCtryId='';
    	 $scope.isSaved=false;
    	 $scope.isExist=false;
    	 $scope.resetClass=function (obj){
    		 $scope.selectedCountryId=obj.val;
    		 $scope.tempCountryList.forEach($scope.loopCountries);
    		 $scope.selectedCountryId='';
    	 }
    	 $scope.loopCountries =function (item, index){
    		 $scope.tempCtryId=item.val;
    	 if($scope.selectedCountryId != item.val){
    			 if($scope.tagObject.length>0){
    				 $scope.tagObject.forEach($scope.loopTagObjects);
            		 if(!$scope.isSaved){
            			 item.clas="btn1 btn--primary ";
            		 } 
    			 } else {
    				 item.clas="btn1 btn--primary ";
    			 }
    			 
    			  
    		 }
    		 
    		 $scope.isSaved=false;
    	 }
    	 $scope.loopTagObjects =function (item, index){
    		 if( $scope.tempCtryId==item.countryId){ // If country is already saved to by user then do not change the color
    			 $scope.isSaved=true;
    		 }
    		 if($scope.countryId == item.countryId){
    			 $scope.isExist=true;
    		 }
    		
    	 }
    	// End: checking if this country is already saved by user or not
    	 
    	 $scope.resetTagInfo =function (){
    		 $scope.jurisBtnClass = "btn1 btn--primary";  
    		 $scope.SelectedCode = [];
    		 $scope.countryId = "";
    		 $scope.umlCode = "";
    		 $scope.classification = "";
    		 $scope.umlCode = "";
    		 $scope.selectedRationale = "";
    		 $scope.tagName = "";
    		 $scope.contactInfo = "";
    		 $scope.caseNum = "";
    		 $scope.message = "";
    		 $scope.countryCplmtry="";
        	 $scope.countryItar="";
        	 $scope.countryTag="";
        	 $scope.countryIsGov="";
    		 $scope.complYClass = "btn1 btn--primary btn-sm";
    		 $scope.complNClass = "btn1 btn--primary btn-sm";
    		 $scope.itarYClass = "btn1 btn--primary btn-sm";
    		 $scope.itarNClass = "btn1 btn--primary btn-sm";
    		 $scope.tagyClass = "btn1 btn--primary btn-sm";
    		 $scope.tagNClass = "btn1 btn--primary btn-sm";
    		 $scope.isGovYClass = "btn1 btn--primary btn-sm";
    		 $scope.isGovNClass = "btn1 btn--primary btn-sm";
    		 angular.element('#tagMessageId').hide();
 	}
    	 $scope.addContinue =function (){
    		 $scope.addToArray();
    		 document.getElementById('confirmTagId').click();
    	 }
    	 $scope.addToArray =function (){
    		 $scope.removeFromArray($scope.countryId);
    		 $scope.tagObject.splice($scope.tagObject.length, 0 ,
    				 {
    			 		countryId:$scope.countryId, countryJursid:$scope.countryJursid, countryCplmtry:$scope.countryCplmtry, classification:$scope.classification ,
    			 		
    			 		countryItar:$scope.countryItar,SelectedCode:$scope.SelectedCode, displayAppSite:$scope.displayAppSite ,
    			 		
    			 		umlCode:$scope.umlCode, selectedRationale:$scope.selectedRationale, countryTag:$scope.countryTag, 
    			 		
    			 		tagName:$scope.tagName, contactInfo:$scope.contactInfo, countryIsGov:$scope.countryIsGov, 
    			 		
    			 		caseNum:$scope.caseNum, ctryDate: $scope.ctryDate
    				 } );
    		 $scope.tempObj.clas="btn1 btn-success ";
    		 $scope.message = " "+$scope.countryId+" country tagging information added into queue.";
    		 angular.element('#tagMessageId').show();
    	 }
    	
    	 $scope.tagCountryId='';
    	 $scope.tempObj=[];
    	 $scope.removeCountryTagInfo =function (){
    		 $scope.removeFromArray($scope.countryId);
    		 $scope.tempObj.clas="btn1 btn--primary ";
    		 $scope.resetTagInfo();
    	 }
    	 $scope.removeFromArray =function (){
    		 $scope.tagCountryId=$scope.countryId;
    		 $scope.tagObject.forEach($scope.checkTagObj);
    		 $scope.tagCountryId='';
    	 }
    	 $scope.checkTagObj =function (item, index){
    		 if( $scope.tagCountryId==item.countryId){
    			 $scope.tagObject.splice(index, 1);
    		 }
        }
    	 $scope.updateTagObj=function (){
    		 $scope.tagCountryId=$scope.countryId;
    		 $scope.tagObject.forEach($scope.findTagObj);
    		 $scope.tagCountryId='';
    	 }
    	 $scope.findTagObj =function (item, index){
    		 if( $scope.tagCountryId==item.countryId){
    			 $scope.countryJursid = item.countryJursid;
    			 $scope.setCplmtry(item.countryCplmtry);
        		 $scope.classification = item.classification;
        		 $scope.umlCode = item.umlCode;
        		 $scope.selectedRationale = item.selectedRationale;
        		 $scope.setItar(item.countryItar);
        		 $scope.SelectedCode = item.SelectedCode;
        		 $scope.setTag(item.countryTag);
        		 $scope.countryTag = item.countryTag;
        		 $scope.tagName = item.tagName;
        		 $scope.contactInfo = item.contactInfo;
        		 $scope.caseNum = item.caseNum;
        		 $scope.setIsGov(item.countryIsGov);
    		 }
    	 }
    	 $scope.setCplmtry =function (param){
    		 $scope.countryCplmtry=param;
    		 if(($scope.countryCplmtry == "Yes")){
    			 $scope.complYClass = "btn1 btn-success btn-sm";
    			 $scope.complNClass = "btn1 btn--primary btn-sm";
    		 }else if(($scope.countryCplmtry == "No")){
    			 $scope.complYClass = "btn1 btn-primary btn-sm";
    			 $scope.complNClass = "btn1 btn-success btn-sm";
    		 }
    	 }
    	 $scope.setItar =function (param){
    		 $scope.countryItar=param;
    		 if(($scope.countryItar == "Yes")){
    			 $scope.itarYClass = "btn1 btn-success btn-sm"; 
    			 $scope.itarNClass = "btn1 btn-primary btn-sm";
    		 }else if(($scope.countryItar == "No")){
    			 $scope.itarYClass = "btn1 btn-primary btn-sm"; 
    			 $scope.itarNClass = "btn1 btn-success btn-sm";
    		 }
    	 }
    	 $scope.setTag =function (param){
    		 $scope.countryTag=param;
    		 if(($scope.countryTag == "Yes")){
    			 $scope.tagyClass = "btn1 btn-success btn-sm"; 
    			 $scope.tagNClass = "btn1 btn-primary btn-sm";
    		 }else if(($scope.countryTag == "No")){
    			 $scope.tagyClass = "btn1 btn-primary btn-sm"; 
    			 $scope.tagNClass = "btn1 btn-success btn-sm";
    		 }
    	 }
    	 $scope.setIsGov =function (param){
    		 $scope.countryIsGov=param;
    		 if(($scope.countryIsGov == "Yes")){
    			 $scope.isGovYClass = "btn1 btn-success btn-sm";
    			 $scope.isGovNClass = "btn1 btn-primary btn-sm";
    		 }else if(($scope.countryIsGov == "No")){
    			 $scope.isGovYClass = "btn1 btn-primary btn-sm";
    			 $scope.isGovNClass = "btn1 btn-success btn-sm";
    		 }
    	 }
    	 $scope.setJursid =function (param){
    		 $scope.countryJursid=param;
    		 $scope.tempUML=param;
//    		 document.getElementById(param).className="btn1 btn-success btn-sm";
    		 var searchEles = document.getElementById("jurisSelectDiv").children;
    		 for(var i = 0; i < searchEles.length; i++) {
    		     if(searchEles[i].type== 'button' ) {
    		        if(searchEles[i].value==param){
    		        	searchEles[i].className="btn1 btn-success btn-sm";
    		        }else {
    		        	searchEles[i].className="btn1 btn-primary btn-sm";
    		        }
    		     }
    		 }
    		 
    	 }
    	 
    	 
    	 $scope.selectedCountry='';
    	 $scope.removeCountry =function (key){
    		 $scope.selectedCountry=key;
    		 $scope.tempObjDataList.forEach($scope.remCtryObj);
    		 $scope.selectedCountry='';
    	 }
    	 
    	 $scope.remCtryObj =function (item, index){
    		 if( $scope.selectedCountry==item.key){
    			 $scope.tempObjDataList.splice(index, 1);
    		 }
    		 if($scope.tempObjDataList.length<4){
    			 angular.element('#objNavBar1').hide();
    			 angular.element('#objNavBar2').hide();
    			 clearAnswerList();
    		 }
        }
    	 $scope.changeView = function(){
    		tagStepCount = 0;
     		console.log("viewSelected--->  "+$scope.viewSelected.view);
     		if($scope.viewSelected.view == 'STW'){
     			$scope.hideSTWDiv = false;
     			$scope.hide411Div = true;
     		}else{
     			$scope.hideSTWDiv = true;
     			$scope.hide411Div = false;
     		}
     	}
    	 
    	$scope.getChildQues=function(ans,quesId,$event){
    		console.log('Ques ID-->'+quesId);
    		var elem = event.target;
    		console.log("selected element-->",elem);
    		if(quesId == '1'){
    			firstAnsId = ans.value;
    			answerSeqIdList = [firstAnsId,0,0,0];
    			$scope.displayFirstAns = ans.title;
    			$scope.firstIconClass= "glyphicon glyphicon-check";
    			$scope.firstAnsClass = "form-control btn btn--green dropdown-toggle";
    			document.getElementById('tagStep1Div').style.borderTopColor='#2eb72e';
				console.log('$scope.displaySecAns->'+$scope.displaySecAns);
				$scope.hideTagStep2 =true;
	    		$scope.hideTagStep3 =true;
	    		$scope.hideTagStep4 =true;
	    		$scope.hideTagResults = true;
	    		$scope.displaySecAns = '--Select--';
	        	$scope.displayThirdAns = '--Select--';
	        	$scope.displayFourthAns = '--Select--';
    		}else if(quesId == '2'){
    			secondAnsId= ans.value;
    			answerSeqIdList = [firstAnsId,secondAnsId,0,0];
    			$scope.displaySecAns = ans.title;
    			$scope.secIconClass= "glyphicon glyphicon-check";
    			$scope.secAnsClass = "form-control btn btn--green dropdown-toggle";
    			document.getElementById('tagStep2Div').style.borderTopColor='#2eb72e';
				console.log('$scope.displaySecAns->'+$scope.displaySecAns);
				$scope.hideTagStep3 =true;
				$scope.hideTagStep4 =true;
				$scope.hideTagResults = true;
				$scope.displayThirdAns = '--Select--';
	        	$scope.displayFourthAns = '--Select--';
	    	}else if(quesId == '3'){
    			thirdAnsId= ans.value;
    			answerSeqIdList = [firstAnsId,secondAnsId,thirdAnsId,0];
    			$scope.displayThirdAns = ans.title;
    			$scope.thirdIconClass= "glyphicon glyphicon-check";
    			$scope.thirdAnsClass = "form-control btn btn--green dropdown-toggle";
    			document.getElementById('tagStep3Div').style.borderTopColor='#2eb72e';
				console.log('$scope.displayThirdAns->'+$scope.displayThirdAns);
				$scope.hideTagStep4 =true;
				$scope.hideTagResults = true;
				$scope.displayFourthAns = '--Select--';
    		}else{
    			fourthAnsId = ans.value;
    			answerSeqIdList = [firstAnsId,secondAnsId,thirdAnsId,fourthAnsId];
    			$scope.displayFourthAns = ans.title;
    			$scope.fourthIconClass= "glyphicon glyphicon-check";
    			$scope.fourthAnsClass = "form-control btn btn--green dropdown-toggle";
    			document.getElementById('tagStep4Div').style.borderTopColor='#2eb72e';
				console.log('$scope.displayFourthAns->'+$scope.displayFourthAns);
    		}
    		if(quesId == '4'){
    			createObjectService.getTags(answerSeqIdList,function(response, status){
    				if(status==200){
    					console.log(response);
    					$scope.tagsList = response.lstTags;
    					$scope.hideTagResults = false;
    				}else{
    					console.log('Error in getting Tags');
    				}
    			});
    		}else{
    			createObjectService.getchildquest(answerSeqIdList,function(response, status){
        			if(status==200){
        				if(response.quesId == '2'){
        					$scope.question2Data= response;
        					$scope.hideTagStep2 =false;
        				}else if(response.quesId == '3'){
        					$scope.question3Data= response;
        					$scope.hideTagStep3 =false;
        				}else if(response.quesId == '4'){
        					$scope.question4Data= response;
        					$scope.hideTagStep4 =false;
        				}
        				console.log('Child Quest-->'+$scope.childQuestion);
        				$scope.childAnsList = response.lstTags;
        				console.log( 'child Answer List retrieved',$scope.childAnsList);
        			}else{
        				console.log('Error in getting child answers');
        			}
        		});
    		}
    	}
    	$scope.applyTag = function(){
    		/*createObjectService.applyTags($scope.selectedAppId.value,$scope.selectedAppType.value,$scope.objDataList,tagSeqId,userSSO,function(response, status){
				if(status==200){
					console.log(response);
					
					
				}else{
					console.log('Error in Apply Tags');
				}
			});*/
    	}
    	function clearAnswerList(){
    		firstAnsId =0;
        	secondAnsId =0;
        	thirdAnsId =0;
        	fourthAnsId =0;
        	answerSeqIdList=[0,0,0,0];
        	$scope.question2Data= {};
        	$scope.question3Data= {};
        	$scope.question4Data= {};
        	$scope.displayFirstAns = '--Select--';
        	$scope.displaySecAns = '--Select--';
        	$scope.displayThirdAns = '--Select--';
        	$scope.displayFourthAns = '--Select--';
        	$scope.firstAnsClass = "form-control btn btn-primary dropdown-toggle";
        	$scope.secAnsClass = "form-control btn btn-primary dropdown-toggle";
        	$scope.thirdAnsClass = "form-control btn btn-primary dropdown-toggle";
        	$scope.fourthAnsClass = "form-control btn btn-primary dropdown-toggle";
        	$scope.firstIconClass= "glyphicon glyphicon-question-sign";
    		$scope.secIconClass= "glyphicon glyphicon-question-sign";
    		$scope.thirdIconClass= "glyphicon glyphicon-question-sign";
    		$scope.fourthIconClass= "glyphicon glyphicon-question-sign";
    		$scope.tagsList={};
    		$scope.hideTagResults = true;
    		$scope.hideTagStep2 =true;
    		$scope.hideTagStep3 =true;
    		$scope.hideTagStep4 =true;
    	}
    	
    }]);
    });