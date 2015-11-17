define(["require","angular"], function(require,ng) { 
    var module=ng.module("app.menu",[]);
	module.directive('menuList',['$location','$q','$http','funcUtils','httpUtils','$rootScope','$state',function($location,$q,$http,funcUtils,httpUtils,$rootScope,$state){
		return {
			trstrice:"EA",
			scope:{
				url:"@",
				menuData:"="
			},
			templateUrl:cmpConfig.directivesPath+"menu-list.html",
			link:function(scope,ele,attrs){
				//get Static Resource from server
				if(scope.url){
					if(scope["url"].indexOf(cmpConfig.apiTestUrl)==-1){
						scope.url = cmpConfig.apiUrl+scope.url;
					}
					httpUtils.httpGet(scope.url).then(function(data) {
			            scope.menus = data.resultObject || data;
			            if("app"!=$state.current.name){
			            	_setActive(scope.menus,$state.current.name + "(" + JSON.stringify($state.params).replace(/"/g,'\'') + ")");  
			            }
			        }, function() {
			             scope.menus = [];
			        });
				}else{
					scope.$watch('menuData', function(newValue, oldValue, scope) {
						scope.menus = newValue;
						if(scope.menus){
							if("app"!=$state.current.name){
				            	_setActive(scope.menus,$state.current.name + "(" + JSON.stringify($state.params).replace(/"/g,'\'') + ")");  
				            }
						}
					});
				}
		        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
					var url = toState.name + "(" + JSON.stringify(toParams).replace(/"/g,'\'') + ")";
				    _setActive(scope.menus,url);
				}); 
				scope.expand=function(menu){
					menu.expand=!menu.expand;
					if(!menu.params) return;
					var params = menu.params.replace(/'/g,'"');
					if(menu.goto){
						$state.go(menu.urlState,angular.fromJson(params));
					}
				}
				function _checkUrl(state,url){
					var url = decodeURIComponent(url);
					return url.indexOf(state)!=-1 
				};
				function _setActive(children,url){
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