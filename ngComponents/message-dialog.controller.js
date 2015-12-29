define(['require','angular',"components/app-components.module"],function (require,ng,module){
	module.controller('MessageDialogCtrl', ['$scope','$modalInstance','entity', function($scope,$modalInstance,entity){
		$scope.entity=entity;
		$scope.ok=function(isValid){
			//$modalInstance.dismiss('cancel');
			angular.extend(entity,{status:true})
			$modalInstance.close(entity);
		}
		$scope.cancel = function () {
			angular.extend(entity,{status:false})
			$modalInstance.dismiss(entity);
		};
	}])
});