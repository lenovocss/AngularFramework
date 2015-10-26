define(["require","angular"], function(require,ng) { 
    var module=ng.module("app.menu",[]);
	module.directive('menuList',['$location','$q','$http','funcUtils','httpUtils','$rootScope','$state',function($location,$q,$http,funcUtils,httpUtils,$rootScope,$state){
		return {
			trstrice:"EA",
			scope:{
				url:"@"
			},
			templateUrl:cmpConfig.directivesPath+"menu-list.html",
			link:function(scope,ele,attrs){
				if($location.search()["debug"]){
					scope.url = "../testdata/menu.json";
				}
				httpUtils.httpGet(cmpConfig.apiUrl+scope.url).then(function(data) {
		            scope.menus = data.resultObject || data;
		            if("app"!=$state.current.name)
		            	_setActive(scope.menus,$state.current.name);  
		        }, function() {
		             scope.menus = [];
		        });   
		    	
		        $rootScope.$on('$stateChangeStart', 
				function(event, toState, toParams, fromState, fromParams){ 
				    _setActive(scope.menus,toState.name);
				}); 
				scope.expand=function(menu){
					menu.expand=!menu.expand;
					if(menu.goto){
						$state.go(menu.urlState);
					}
				}
				_checkUrl=function(state,url){
					return url.indexOf(state)!=-1 
				};
				_setActive=function(children,url){
					$.each(children,function(i,v){
						v.children = v.children || v.childen;
		        		v.activate=false; 
		        		if(_checkUrl(v.href,url)&&(!v.children || v.children.length == 0))
							v.activate=true;
		        		if(v.children&&v.children.length>0){
		        			_setActive(v.children,url);
		        		}
		        	});
				};   
			}
		}
	}]);
});