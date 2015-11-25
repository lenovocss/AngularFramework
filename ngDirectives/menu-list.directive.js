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
			        _httpData(scope.url);
				}else{
					scope.$watch('url', function(newValue, oldValue, scope) {
						var url = newValue;
						if(url){
							_httpData(url);
						}
					});
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
					scope.toState = toState;
					var url = toState.name + "(" + JSON.stringify(toParams).replace(/"/g,'\'') + ")";
					/*angular.forEach(scope.menus, function(menu, key){
						if(toState.name == "app.metric"){
							scope.menus[key].href = url;
							scope.menus[key].urlState = url;
						}
						
					});*/
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
				function _httpData(url){
					if(url.indexOf(cmpConfig.apiTestUrl)==-1){
						url = cmpConfig.apiUrl+url;
					}
					httpUtils.httpGet(url).then(function(data) {
			            scope.menus = data.resultObject || data;
			            if("app"!=$state.current.name){
			            	_setActive(scope.menus,$state.current.name + "(" + JSON.stringify($state.params).replace(/"/g,'\'') + ")");  
			            }
			        }, function() {
			             scope.menus = [];
			        });
				}
				function _checkUrl(menu,url){
					var url = decodeURIComponent(url);
					var href = decodeURIComponent(menu.href);
					//直接刷新scope.toState.name=undefine，取$state.current.name
					var stateName = $state.current.name;
					//跳转取scope.toState.name
					if(scope.toState){
						stateName = scope.toState.name
					}
					if(menu.noIndexof && href.indexOf(stateName)!=-1){
						return true;
					}else{
						return url.indexOf(href)!=-1
					}
				};
				function _setActive(children,url){
					$.each(children,function(i,v){
						v.children = v.children || v.childen;
		        		v.activate=false; 
		        		if(_checkUrl(v,url)&&(!v.children || v.children.length == 0))
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