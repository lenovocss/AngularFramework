define(['require','angular','services/app-utils.module','angular-bootstrap'], function(require,ng,module,angularBootstrap){
    module.factory("modalUtils",['$injector','$q',function($injector,$q){
		return {
			modalExist : modalExist,
			closeAllModals : closeAllModals,
			showConfirmDlg : showConfirmDlg,
			showInfoDlg : showInfoDlg,
			showErrorDlg : showErrorDlg,
			showDlg : showDlg,
			showSmallDlg : showSmallDlg,
			showLargeDlg : showLargeDlg
		};
		
		function modalExist(){
			var $modalStack = $injector.get("$modalStack");
			return !!$modalStack.getTop();
		}
		
		function closeAllModals(){
			var $modalStack = $injector.get("$modalStack");
			return $modalStack.dismissAll();
		}
		
		function showDlg(dlgParams){
			var $modal = $injector.get("$modal"),deferred = $q.defer();
			var modalInstance=$modal.open({
				templateUrl:dlgParams.tpl,
				controller:dlgParams.ctrl,
				backdrop:'static',
				resolve:{
					params: function(){
						return dlgParams.params || {};
					}
				},
				size: dlgParams.size || "md",
				windowClass: dlgParams.windowClass || "",
			});
			modalInstance.result.then(function (result) {
				deferred.resolve(result);
			},function(reason){
				deferred.reject(reason);
			});
			
			return deferred.promise;
		}
		
		function showSmallDlg(dlgParams){
			dlgParams.size = "sm";
			return showDlg(dlgParams);
		}
		
		function showLargeDlg(dlgParams){
			dlgParams.size = "lg";
			return showDlg(dlgParams);
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
		
		function showInfoDlg(options){
			var $modal = $injector.get("$modal"),deferred = $q.defer();
			var modalInstance = $modal.open({
				templateUrl: cmpConfig.componentsPath + 'info-dialog.html',
				controller: 'MessageDialogCtrl',
				backdrop:'static',
				size:'sm',
				windowClass:"info-dlg",
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