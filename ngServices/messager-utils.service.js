define(['require','angular','services/app-utils.module'], function(require,ng,module){
    module.factory('msgUtils',['$window',"$q",function($window,$q){ 
            var funcs = {
				"showSuccess" : showSuccess,
				"showError" : showError,
				"showInfo" : showInfo
			};
			
			return funcs;
			
			function showSuccess(message,showCloseButton){
				return show(message,'success',!!showCloseButton);
			}
			
			function showError(message,showCloseButton){
				return show(message,'error',!!showCloseButton);
			}

			function showInfo(message,showCloseButton){
				return show(message,'info',!!showCloseButton);
			}

			function show(message,type,showCloseButton){
				var msg;
				if (typeof message === "string"){
					msg = Messenger().post({
						"message": message,
						"type": type,
						"id": "login",
						"showCloseButton": showCloseButton
					});
				}
				else if(message.running){
					msg = Messenger().run(message);
				}else{
					msg = Messenger().post(message);
				}

				return msg;
			}
        }
    ]);
});