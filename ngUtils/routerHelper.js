/*
*	 widgets sub modules for router
*/
define(["require",'utils/dependencyResolver','angular-route',"angular"], function(require,dependencyResoleverFor) { 
	return function(routerCfg){
		var self = this;
		this.config([
			'$stateProvider',
			'$urlRouterProvider',
			'$locationProvider',
			'$controllerProvider',
			'$compileProvider',
			'$filterProvider',
			'$provide',
			function($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
				self.controller = $controllerProvider.register;
				self.directive  = $compileProvider.directive;
				self.filter     = $filterProvider.register;
				self.factory    = $provide.factory;
				self.service    = $provide.service;
				if(routerCfg.routers){
					angular.forEach(routerCfg.routers,function(router,path){
						var tempRouter={
							'url':router['url'],
							resolve:dependencyResoleverFor(router.dependencies)
						};
						if(router['views']){
							tempRouter['views']=router['views'];
						}else{
							if(router['templateUrl'])
								tempRouter['templateUrl']=router['templateUrl'];
							else
								tempRouter['template']=router['template'];
							tempRouter['controller']=router['controller'];
							tempRouter['parent']=router['parent'];
						} 
						if(router['abstract']){
							tempRouter['abstract']=router['abstract']; 
						}
						$stateProvider.state(path,tempRouter);
					});
				}
				if(routerCfg.defaultRoutePaths){
					$urlRouterProvider.otherwise(routerCfg.defaultRoutePaths);
				}
		}]); 
	}
});