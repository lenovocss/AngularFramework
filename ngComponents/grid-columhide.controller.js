define(['require','angular',"components/app-components.module"],function (require,ng,module){
	module.controller('GridColumnsShowHideCtrl',['$scope','$translate','$modalInstance','columns',
        function($scope,$translate,$modalInstance,columns){
        	// $modalInstance.close();
        	$scope.columns=columns;
        	$scope.cancel=function(){
        		$modalInstance.dismiss('cancel');
        		// columns=$scope.columns
        		// $modalInstance.close(columns);
        	} 
        }
    ]); 
});