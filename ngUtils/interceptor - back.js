define(["require","angular",'i18n/i18nHelper'], function(require,ng,i18nHelper) { 
	var  interceptor=angular.module("app.interceptors",[]);
	i18nHelper.call(interceptor);

	interceptor.service('permissionService', ['$rootScope',function($rootScope){
		var permissionMap=permissionMap||{};
		var service = {
			addPermission:function(response){ 
				if(response&&response.data&&response.data.actions
					&&response.config&&response.config.url){
					var key=response.config.url,endIndex=key.length;
					if(key.indexOf("?")!=-1)
						endIndex=key.indexOf("?");
					key=key.substring(key.lastIndexOf("/")+1,endIndex); 
					permissionMap[key]=response.data.actions;
					$rootScope.$broadcast('check-permission',{});
				} 
			},
			checkPermission:function(urlKey,permissionValue){

				if(permissionMap&&permissionMap[urlKey]){
					return (permissionMap[urlKey].join("").indexOf(permissionValue)!=-1);
				}else{
					return false;
				}
			}
		}
		return service;
	}]);

	interceptor.factory('errorService', ['$rootScope','$filter','msgUtils',function($rootScope,$filter,msgUtils){
		var $translate = $filter("translate"),
			service = {
			handleErrors:function(response){ 
				var statusCode = response.status;
				this[statusCode] ? this[statusCode](response) : this["unknownError"](response);
			},
			"400" : function badRequest(response){
				msgUtils.showError(response.data.errors?response.data.errors.message:response.data.error.message,true,response);
			}, 
			"405" : function methodNotAllowed(response){
				msgUtils.showError($translate("ERROR_METHOD_NOT_ALLOWED"),true,response);
			},
			"415" : function unsupportedMediaType(response){
				msgUtils.showError($translate("ERROR_UNSUPPORTED_MEDIA_TYPE"),true,response);
			},
			"401" : function sessionFailure(response){
				var messages=response.data.error.message;
				var msg = msgUtils.showError({
				  	message: messages?messages:$translate("ERROR_SESSION_TIMEOUT"),
				  	type: 'error',
				  	hideAfter: 120,
				  	id: "login",
				  	actions: {
				    	cancel: {
				      		label: $translate("OK"),
				      		action: function() { 
				      			if(response.data.error.code==4012)
				      				window.location.href ="/#login"; 
				      			return msg.cancel();
				     		}
				   		}
				  	}
				},false,response);
			},
			"502" : function badGateway(response){
				msgUtils.showError($translate("ERROR_BAD_GATEWAY"),true,response);
			},
			"409":function repeatErro(response){
				var messages=response.data.error.message;
				msgUtils.showError(messages,true,response);
			},
			"unknownError":function(response){
				msgUtils.showError($translate("ERROR_UNKNOW"),true,response);
			}

		}
		service["419"] = service["401"];
		return service;
	}]);

	interceptor.factory('promptService', ['$rootScope','$q','$filter','msgUtils',function($rootScope,$q,$filter,msgUtils){
		var $translate = $filter("translate"),
			service = {
			 checkPrompt:function(url){
			 	return /\/[Dd]{1}elet.+/g.test(url)||/\/[Rr]{1}emove.+/g.test(url)||/\/[Uu]{1}nbind.+/g.test(url);
			 },
			 showAlert:function(config){
			 	var defer=$q.defer();
			 	var promise = defer.promise;
			 	var msg = msgUtils.showError({
				  	message: $translate("TIP_MAKE_SURE"),
				  	type: 'error',
				  	hideAfter: 10000000,
				  	actions: { 
				    	"delete": {
					      	label: $translate("OK"),
					      	action: function(){
					        	defer.resolve(config);
					      		return msg.cancel();
					      	}
				    	},
				   	 	cancel: {
					      	label: $translate("CANCEL"),
					      	action: function() {
					        	return msg.cancel();
					      	}
				    	}
				  	}
				})
			 	return promise;
			 }
		}
		return service;
	}]);

	interceptor.factory('requestHeadService', ['$rootScope','$q',function($rootScope){
		var service = {
			 addHeadToken:function(config){ 
			 	if(cmpConfig.loginUser&&cmpConfig.loginUser.token)
			 		config.headers['Authorization']=cmpConfig.loginUser.token;
			 	return config;
			 },
			 addRandomParam:function(config){
			 	var url=config.url;
			 	if(/\/[Cc]{1}reate.+/g.test(url)||
			 		/\/[Uu]{1}pdate.+/g.test(url)||
			 		/\/[Dd]{1}elete.+/g.test(url)||
			 		/\/[Gg]{1}et.+/g.test(url)||
			 		/\/[Ll]{1}ist.+/g.test(url)){
			 		config.url=config.url+"?t="+(new Date()).getTime();
			 	} 
			 } 
		}
		return service;
	}]);

	interceptor.factory('resourceInterceptor', ['$q','permissionService','errorService','promptService','requestHeadService',function($q,permissionService,errorService,promptService,requestHeadService) { 
	    var resourceInterceptor = {
	        response: function(response) {
	            permissionService.addPermission(response);
	            return response; 
	        },
	        responseError: function(response) {
	        	errorService.handleErrors(response);
	        	return $q.reject(response);
	        },
	        request: function(config) {
	        	requestHeadService.addHeadToken(config); 
	        	requestHeadService.addRandomParam(config);
	        	if(promptService.checkPrompt(config.url)){ 
	            	return promptService.showAlert(config);
	            }else {
	          	  return config;
	            }
	        }
	    }; 
	    return resourceInterceptor;
	}]);
	return interceptor;
});