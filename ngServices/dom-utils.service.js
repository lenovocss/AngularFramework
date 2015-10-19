define(['require','angular','services/app-utils.module'], function(require,ng,module){
    module.factory('domUtils',['$window',function($window){ 
            var funcs = {
				"setHeight" : setHeight
			};
			
			return funcs;
			
			function setHeight(el,val){
				$(el).height($window.innerHeight + val); 
			}
        }
    ]);
});