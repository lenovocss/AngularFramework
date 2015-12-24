define(['require','angular','services/app-utils.module','angular-bootstrap'], function(require,ng,module,angularBootstrap){
    module.factory("modalUtils",['$injector','$q',function($injector,$q){
		return {
			modalExist : modalExist,
			closeAllModals : closeAllModals,
			showConfirmDlg : showConfirmDlg,
			showInfoDlg : showErrorDlg,
			showErrorDlg : showErrorDlg
		};
		
		function modalExist(){
			var $modalStack = $injector.get("$modalStack");
			return !!$modalStack.getTop();
		}
		
		function closeAllModals(){
			var $modalStack = $injector.get("$modalStack");
			return !!$modalStack.getTop();
		}
		
		function showConfirmDlg(options){
			var $modal = $injector.get("$modal"),deferred = $q.defer();
			var modalInstance = $modal.open({
				templateUrl: cmpConfig.componentsPath + 'confirm-dialog.html',
				controller: 'MessageDialogCtrl',
				backdrop:'static',
				size:'md',
				windowClass:"confirm-dlg",
				resolve:{
					'entity': function () {
						return options;
					}
				}
			})
			modalInstance.result.then(function(){
				deferred.resolve({status:true});
			},function(){
				deferred.reject("cancel");
			});
			
			return deferred.promise;
		}
		
		function showErrorDlg(options){
			var $modal = $injector.get("$modal"),deferred = $q.defer();
			var modalInstance = $modal.open({
				templateUrl: cmpConfig.componentsPath + 'error-dialog.html',
				controller: 'MessageDialogCtrl',
				backdrop:'static',
				size:'sm',
				windowClass:"error-dlg",
				resolve:{
					'entity': function () {
						return options;
					}
				}
			})
			modalInstance.result.then(function(){
				deferred.resolve();
			},function(){
				deferred.reject("cancel");
			});
			
			return deferred.promise;
		}
		
		
	}])
});