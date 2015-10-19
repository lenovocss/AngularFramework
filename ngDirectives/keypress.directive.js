define(["require","angular","directives/app-directives.module"], function(require,ng,module) { 
/*
copy https://github.com/varunvairavan/angularjs-keypress
Then use the keypress attribute on the element to bind methods for different keypress.

<input type="text" keypress="13:enterPressed(), 8 || 46 : backSpacePressed()">

If the Enter key(13) is pressed the method enter pressed is invoked in your scope, Similarly if backspace or delete (8 || 46) is pressed the backspacePressed method is invoked. The || operator can be used to split any number of key events.
*/
	module.directive('keypress',['$animate','$q','$http','funcUtils','httpUtils','$rootScope','$state',function($animate,$q,$http,funcUtils,httpUtils,$rootScope,$state){
		return {
			restrict: 'A',
			link: function(scope, elem, attr, ctrl) { 
				final_key_mappings={};
				var actions=attr.keypress.split(",");
				for(var i=0;i<actions.length;i++) {
					if(actions[i].trim()) {
						var key_mappings=actions[i].split(":");
						if(key_mappings.length==2 && key_mappings[0].trim() && key_mappings[1].trim()) {
							key=key_mappings[0].trim().split("||");
							if(key.length!=1) {
								for(var j=0;j<key.length;j++) {
									if(key[j].trim()) {
										final_key_mappings[key[j].trim()]=key_mappings[1].trim();
									}
								}
							} else {
								final_key_mappings[key_mappings[0].trim()]=key_mappings[1].trim();
							}
						}
					}
				};
				elem.bind('keydown', function(e){
					if(final_key_mappings[e.which]) {
						scope.$apply(function(s) {
							s.$eval(final_key_mappings[e.which]);
						});
					}
				});
			}
		}
	}]);
});