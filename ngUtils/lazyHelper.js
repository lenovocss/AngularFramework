define(["require","angular"], function(require,ng){
	var  lazyHerper=angular.module("app.lazyHelper",[]);
	lazyHerper.factory('lazyHerper', ['$rootScope','FUTURE_STATES','$q',
		function($rootScope,FUTURE_STATES,$q){
			var service = {
				getLazyModuleCfg:function(){  
				 	if(FUTURE_STATES&&FUTURE_STATES.length>0){
				 		var deferred = $q.defer();
						require(FUTURE_STATES, function(){
							if(arguments&&arguments.length>0){
								var temp=[]
								for(i=0;i<arguments.length;i++){
									if(arguments[i]&&arguments[i].lazyCfg)
									temp.push(arguments[i].lazyCfg);
								}
								 deferred.resolve(temp); 
							}else{
								 deferred.reject();
							} 
			            });
				       	return deferred.promise;
				 	}
				} 
			}
		return service;
	}]);
	return lazyHerper;
});