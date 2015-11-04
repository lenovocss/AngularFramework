define(["require","angular"], function(require,ng) { 
	var  interceptor=angular.module("app.interceptors",[]);
    
	interceptor.factory('errorService', ['$rootScope','$filter','msgUtils',function($rootScope,$filter,msgUtils){
		var service = {
			handleErrors:function(response){
				var statusCode = response.status;
				if(statusCode>=300)
				 	this["unknownError"](response);
			}, 
			unknownError:function(response){
				if( (response.config.url.indexOf("/foam/service/proxy/servers/GetServer")==-1)
				 && (response.config.url.indexOf("/foam/service/proxy/volumes/GetVolume")==-1) 
				 ){
					var messages=this.getMessages(response.data.errors)
					msgUtils.showError(messages.join(","),true);
				}
			},
			getMessages:function(errors){
				var temp=[];
				$.each(errors,function(index,value){
					temp.push(value.message);
				});
				return temp;
			}
		}
		return service;
	}]);

	 
	interceptor.factory('maskService', ['$rootScope','$q','$timeout',function($rootScope,$q,$timeout){
		var service = {
			 showMask:function(config){  
			 	if(/\/List.+/g.test(config.url)){
			 		$('#load-mask').removeClass("hide");
			 	}   
			 },
			 hideMask:function(response){ 
			 	if(/\/List.+/g.test(response.config.url)){
			 		$timeout( function() { 
                            $('#load-mask').addClass("hide"); 
                    },200);
			 	} 
			 } 
		}
		return service;
	}]);
	 
	 

	interceptor.factory('resourceInterceptor', ['$q','errorService','maskService',function($q,errorService,maskService) { 
	    var resourceInterceptor = { 
	        responseError: function(response) {
	        	maskService.hideMask(response);
	        	errorService.handleErrors(response);
	        	return $q.reject(response);
	        },
	        request: function(config) {
	        	maskService.showMask(config);
	          	return config; 
	        },
	        response: function(response) {
	            maskService.hideMask(response);
	            return response; 
	        }
	    }; 
	    return resourceInterceptor;
	}]);

	interceptor.factory('failureMsgInterceptor', ['$q','$location','errorService',function($q,$location,errorService) { 
	    var resourceInterceptor = {
	        response: function(response) {
	            //console.log("......response.....",response.config.url,response.status);
				if(response &&  response.config.url.indexOf("login") == -1 
					&& response.data && typeof response.data == "object" && !response.data.success){
	            	//console.log("......response failure.....",response.data);
					if(response.data.resultCode == "02802"){
						//alert("登陆超时，您需要重新登陆");
						return response;
					}
					else if(response.data.resultCode == "00215"){
						//alert("登陆超时，您需要重新登陆");
						$location.path('/login');
					}
					else{
						alert(response.data.resultMsg);
					}
	            	return $q.reject(response);
	            }
	            return response; 
	        }
	    }; 
	    return resourceInterceptor;
	}]);
	
	return interceptor;
});