define(["require","angular"], function(require) { 
	var  interceptor=angular.module("app.interceptors",[]);
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
				//console.log("every things is ok!")
				//console.log(permissionMap);
				//console.log(urlKey);
				//console.log(permissionValue);
				if(permissionMap&&permissionMap[urlKey]){
					return (permissionMap[urlKey].join("").indexOf(permissionValue)!=-1);
				}else
					return false;
			}
		}
		return service;
	}]);
	interceptor.service('errorService', ['$rootScope',function($rootScope){
		var service = {
			handleErrors:function(response){ 
				switch(response.status){
				case 400:
				  this.badRequest(response);
				  break;
				case 401:
				  this.sessionFailure(response);
				  break;
				case 405:
				  this.methodNotAllowed(response);
				  break;
				case 415:
				  this.unsupportedMediaType(response);
				  break;
				case 419:
				  this.sessionFailure(response);
				  break;
				case 502:
				  this.badGateway(response);
				  break;
				default:
				  this.unknownError(response);
				}
			},
			badRequest:function(response){
				Messenger().post({
				  message: response.data.errors?response.data.errors.message:response.data.error.message,
				  type: 'error',
				  showCloseButton: true
				});
			},
			methodNotAllowed:function(response){
				Messenger().post({
				  message: '您没有访问此方法的权限。',
				  type: 'error',
				  showCloseButton: true
				});
			},
			unsupportedMediaType:function(response){
				Messenger().post({
				  message: '不支此种媒体类型',
				  type: 'error',
				  showCloseButton: true
				});
			},
			sessionFailure:function(response){
				var messages=response.data.error.message;
				var msg=Messenger().post({
				  message: messages?messages:'您的session已经失效，请重新登录！',
				  type: 'error',
				  hideAfter: 120,
				  actions: {
				    cancel: {
				      label: '确定',
				      action: function() { 
				      	window.location.href ="/#login"; 
				      	return msg.cancel();
				      }
				    }
				  }
				});
			},
			badGateway:function(response){
				Messenger().post({
				  message: '请求地址不能访问。',
				  type: 'error',
				  showCloseButton: true
				});
			},
			unknownError:function(response){
				Messenger().post({
				  message: '未知的错误。',
				  type: 'error',
				  showCloseButton: true
				});
			}

		}
		return service;
	}]);
	interceptor.service('promptService', ['$rootScope','$q',function($rootScope,$q){
		var service = {
			 checkPrompt:function(url){
			 	return /\/[Dd]{1}elet.+/g.test(url)||/\/[Rr]{1}emove.+/g.test(url)||/\/[Uu]{1}nbind.+/g.test(url);
			 },
			 showAlert:function(config){
			 	var defer=$q.defer();
			 	var promise = defer.promise;
			 	var msg; 
				msg = Messenger().post({
				  message: "你确定,要执行此操作？",
				  type: 'error',
				  hideAfter: 10000000,
				  actions: { 
				    delete: {
				      label: "确定",
				      action: function(){
				        defer.resolve(config);
				      	return msg.cancel();
				      }
				    },
				    cancel: {
				      label: '取消',
				      action: function() {
				        return msg.cancel();
				      }
				    }
				  }
				}); 
			 	return promise;
			 }
		}
		return service;
	}]);
	interceptor.service('requestHeadService', ['$rootScope','$q',function($rootScope){
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
	            }else 
	          	  return config;
	        }
	    }; 
	    return resourceInterceptor;
	}]);
	return interceptor;
});