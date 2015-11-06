define(['require','angular','utils/dependencyResolver'],function(require,ng,dependencyResoleverFor){
	return function ($stateProvider,routers){
		angular.forEach(routers,function(router,path){
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
});