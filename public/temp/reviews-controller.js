define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('ReviewsCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.context = {
            url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/CA/San_Ramon.json?callback=JSON_CALLBACK'
        };
        
        $scope.reviewschartData = '[ [1,0,0] , [0,2,0], [0,0,3]]';
        $scope.sample='jesus';
        console.log($scope.reviewsData);
        console.log('jesus');
        $scope.mySelectedRows ='jesus';
        $scope.mySelectedItems= [];// ='[{"FieldName":"Review Title","FieldId":1,"DraftBegun":false,"MeetingProposed":false,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false,"RoleId":1}]';
        var i ='[{"key":"1","val":"One"}, {"key":"2","val":"Two"}, {"key":"3","val":"Three"}, {"key":"4","val":"Four"}]';       
        $scope.dropDown = i;
        
        $http.get('http://localhost:8080/hello/getroles').success(function(data) {
        	 $scope.roles = data;
        	 $scope.selectedRole=$scope.roles[0];
            console.log('success on hello/getroles -->'+$scope.user);
          
       });
        
        $http.get('http://localhost:8080/hello/getstates').success(function(data) {
       	 $scope.states = data;
       	 $scope.selectedState=$scope.states[0];
           console.log('success on hello/getstates -->'+$scope.user);
      });
        
        $http.get('http://localhost:8080/hello/getmatrix/1').success(function(data) {
        	console.log('role-->'+$scope.selectedRole);
        	console.log('matrix data -->'+JSON.stringify(data));
        	 $scope.pendingreviewsdata = JSON.stringify(data);
          
       });
        
        $scope.getFieldsMatrix = function() {
        	console.log('getFieldsMatrix method called -->' + $scope.selectedRole.id);
        	 $scope.mySelectedItems= [];
        	  $http.get('http://localhost:8080/hello/getmatrix/'+$scope.selectedRole.id).success(function(data) {
              	console.log('role-->'+$scope.selectedRole);
           //   	console.log('matrix data -->'+JSON.stringify(data));
              	 $scope.pendingreviewsdata = JSON.stringify(data);
                
             });
        }
        
        $scope.getAvatar = function() {
        	  	console.log('getFieldsMatrix method called -->' + $scope.selectedRole.id);
        	 $scope.mySelectedItems= [];
        	  $http.get('http://localhost:8080/hello/getmatrix/'+$scope.selectedRole.id).success(function(data) {
              	console.log('role-->'+$scope.selectedRole);
           //   	console.log('matrix data -->'+JSON.stringify(data));
              	 $scope.pendingreviewsdata = JSON.stringify(data);
                
             });
        }

        
        $scope.saveMatrix = function() {
        	//var jsonString = JSON.stringify($scope.pendingreviewsdata);
        	//var jsonString = angular.fromJson($scope.pendingreviewsdata); //input table data
        	  $scope.mySelectedItems = document.getElementById("myDataTable").selectedRows;
        	 console.log("save matrix--::"+angular.fromJson($scope.mySelectedItems));
        	 var jsonString = angular.fromJson($scope.mySelectedItems); //only selected rows
        	

        	//console.log("save matrix::"+jsonString);
        	 $http({
       			method : 'POST',
       		   //url : 'https://predix-launchapp-techm.run.aws-usw02-pr.ice.predix.io/predixLaunch/springBoot/getProjectData',
       			url : 'http://localhost:8080/hello/saveMatrix/',
       			data: jsonString,
       		 headers: {
  	           'Content-type': 'application/json'
  	        },
       		//	url : 'http://localhost:8080/predixLaunch/springBoot/getProjectData',
       		}).then(function successCallback(response){
       			//	handler("success",response);
       			console.log("success rep -->" +JSON.stringify(response.data));
       		 }, function errorCallback(response) {
     			//handler("error",response);
       			console.log("err response -->" +JSON.stringify(response));
     		  });
        	 
        	/*
        	 $http.post("http://localhost:8080/hello/saveMatrix/", $scope.pendingreviewsdata)
             .success(function (data, status, headers, config) {
                console.log('success on savematrix' +status+data);
             })
             .error(function (data, status, header, config) {
                console.log('failure on save matrix'+status);
             });*/
            
        }
        
       

      /*  $http({
  			method : 'GET',
  		   //url : 'https://predix-launchapp-techm.run.aws-usw02-pr.ice.predix.io/predixLaunch/springBoot/getProjectData',
  			url : 'http://localhost:8080/hello/retrieve',
  		//	url : 'http://localhost:8080/predixLaunch/springBoot/getProjectData',
  		}).then(function successCallback(response){
  			//	handler("success",response);
  			console.log("success rep -->" +JSON.stringify(response.data));
  		 }, function errorCallback(response) {
			//handler("error",response);
  			console.log("err response -->" +JSON.stringify(response));
		  });*/
        //read data
        /*$scope.pendingreviewsdata =  [{ReviewId:"CFM56-5-2015-04986",ReviewTitle:"EDW", CEOReviewType:"1", ReviewArea: "HP Turbine", DueDate: "2016-06-28",state:"Draft Begun", style: "none"},
              		                {ReviewId:"CF6-6-2015-04988",ReviewTitle:"DRB Engg", CEOReviewType:"5",ReviewArea: "HP Turbine", DueDate: "2016-06-28",state:"Meeting/Scope Approved", style: "none"},
            		                {ReviewId:"CF6-6-2015-04919",ReviewTitle:"IT ReviewTitle", CEOReviewType:"3",ReviewArea: "", DueDate: "2016-06-27",state:"Meeting/Scope Approved",style: "none"},
            		                {ReviewId:"CFM56-5-2015-05638",ReviewTitle:"hello Plant",CEOReviewType:"1",ReviewArea: "",DueDate: "2016-06-27",state:"Meeting Proposed",style: "none"},
            		                {ReviewId:"CFE738-6-2015-0893",ReviewTitle:"Design Practises", CEOReviewType:"3",ReviewArea: "HP Turbine",DueDate: "2016-06-20",state:"Meeting Proposed",style: "none"},
            		                {ReviewId:"CFE738-6-2015-01345",ReviewTitle:"Plant plant plant", CEOReviewType:"5",ReviewArea: "",DueDate: "2016-06-20",state:"Meeting Proposed",style: "none"},
            		                {ReviewId:"CFE738-6-2015-04894",ReviewTitle:"Design App", CEOReviewType:"55",ReviewArea: "test Area",DueDate: "2016-06-20",state:"Meeting Proposed",style: "none"},
            		                {ReviewId:"CFM56-5-2015-04987",ReviewTitle:"Air worthiness center", CEOReviewType:"2",ReviewArea: "Plant",DueDate: "2016-06-20",state:"Draft Begun",style: "none"}]; 
        */
        
      /*  $scope.pendingreviewsdata =  [{FieldName:"title",MeetingScopeApproved:true , draft:"<input type=checkbox checked=true>"},
                                      {FieldName:"abs",MeetingScopeApproved:true , draft:"javascript:alert('hi');"},
                                      {FieldName:"comments",MeetingScopeApproved:false , draft:true}
        
              		               ]; */
        
      //  $scope.pendingreviewsdata =  [{"FieldName":"REVIEW_TITLE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"CEO_REVIEW_TYPE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"PROPOSED_REVIEW_DATE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REVIEW_DURATION","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"APPLICABLE_REVIEWS","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"APPLICABLE_DPS","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"DRB_ARTICLE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"PURPOSE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"BACKGROUND","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"PROGRAM","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"PRODUCT_AREA","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"PRODUCT_TYPE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"CUSTOMER","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"PROGRAM_TOLLGATE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"CHARGE_NUMBER","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"TOLLGATE_DATE","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REVIEW_OWNER","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REVIEW_APPROVER","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REVIEW_CHAIR","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"DESIGN_TEAM","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REVIEW_TEAM","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"ENG_DEPT","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REQUESTOR_ONE_OVER_MANAGER","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REQUESTOR_MANAGER","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"ADDITIONAL_INVITEES","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"ADDITIOANL_RECIPIENTS","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}, {"FieldName":"REVIEW_TAGGER","DraftBegun":true,"MeetingProposed":true,"Meeting/ScopeApproved":false,"MeetingCompleted":false,"AllAI/ChitsClosed":false,"AI/ChitIssued":false,"SubmittedForClosure":false,"Closed":false,"DesignManagerApproval":false,"TagPending":false}];
          
        
        // fields Matrix:
        $scope.fieldsMatrix= [{FieldName:"Review Title"} ,
                              {FieldName:"Abstract"} ,
                              {FieldName:"Engine Model"} ,
                              {FieldName:"Review Area"} ,
                              {FieldName:"Discipline Area"} ,
                              {FieldName:"Toll Number"} ,
                              {FieldName:"Program"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Program Type"} ,
                              {FieldName:"Tollgate Date"} ];
        
       /* $scope.roles =[{RoleName:"Author", RoleId:"1"} ,
                       {RoleName:"Reviewer", RoleId:"2"} 
                        ];*/
        
        $scope.reviewstates =[{StateName:"Draft", StateId:"1"} ,
                       {StateName:"Meeting Proposed", StateId:"2"} ,
                       {StateName:"Meeting Scope Approved", StateId:"3"} ,
                       {StateName:"AI/Chit Issued", StateId:"4"} ,
                        ];
        
        
    }]);
});
