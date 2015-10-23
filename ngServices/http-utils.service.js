define(['require','angular','services/app-utils.module'], function(require,ng,module){
	
    module.factory('httpUtils',['$window',"$http","$q",function($window,$http,$q){ 
            var funcs = {
				"httpGet" : httpGet,
				"httpPost" : httpPost,
				"httpPut" : httpPut,
				"httpDelete" : httpDelete
			}; 
			return funcs;
			
			function httpGet(url){
				var deferred = $q.defer(),
				dataPromise = deferred.promise;
				if(url.indexOf('?') == -1){//prevent from cache
					url+="?";
				}
				else{
					(url[url.length-1] != '&') && (url+="&"); 
				}
				url+="dt="+Math.random();
				
				$http.get(url).success(function(data) { 
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('Failed to load data');
				});
				return dataPromise;
			}

			function httpDelete(url){
				var deferred = $q.defer(),
				dataPromise = deferred.promise;
				$http["delete"](url).success(function(data) { 
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('Failed to load data');
				});
				return dataPromise;
			}
			
			function httpPost(url,params){
				var deferred = $q.defer(),
				dataPromise = deferred.promise;
				$http.post(url,params).success(function(data) { 
					deferred.resolve.apply(this,Array.prototype.slice.call(arguments));
				}).error(function() {
					deferred.reject('Failed to load data');
				});
				return dataPromise;
			}

			function httpPut(url,params){
				var deferred = $q.defer(),
				dataPromise = deferred.promise;
				$http.put(url,params).success(function(data) { 
					deferred.resolve.apply(this,Array.prototype.slice.call(arguments));
				}).error(function() {
					deferred.reject('Failed to load data');
				});
				return dataPromise;
			}
        }
    ]);
});