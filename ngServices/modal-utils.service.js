define(['require','angular','services/app-utils.module','angular-bootstrap'], function(require,ng,module,angularBootstrap){
    module.factory("modalUtils",['$modalStack',function($modalStack){
		return {
			modalExist : function(){
				return !!$modalStack.getTop();
			},
			closeAllModals : function(){
				$modalStack.dismissAll();
			}
		}
	}])
});