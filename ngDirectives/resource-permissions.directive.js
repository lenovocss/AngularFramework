define(["require","angular","utils/interceptor"], function(require,ng) { 
	angular.module('app.interceptors')
	 .directive('permissionKey',['$rootScope','permissionService',function($rootScope,permissionService){
	 	return {
	 		restrict: 'EA',
	 		replace: true,  
	 		scope:{
	 			permissionKey:"@",
	 			permissionValue:"@",
	 			permissionClick:"&"
	 		},
	 		link: function($scope, $elm, $attrs) {
	 			$scope.show=false; 
	 			$scope.$on('check-permission', function(event,data) {
				    $scope.show=permissionService.checkPermission($scope.permissionKey,$scope.permissionValue); 
				    if($scope.show){
				    	$elm.removeAttr("disabled");
				    	$elm.removeClass("permission-disabled"); 
				    }
				});
				$elm.on('click',function(event){
					if($scope.show)
						$scope.permissionClick()();
				});
	 		}
	 	}
	 }]); 
});