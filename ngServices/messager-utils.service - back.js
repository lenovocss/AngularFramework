define(['require','angular','services/app-utils.module'], function(require,ng,module){
    module.factory('msgUtils',['$window',"$q","$timeout",function($window,$q,$timeout){ 
            var funcs = {
				"showSuccess" : showSuccess,
				"showError" : showError,
				"showInfo" : showInfo
			};
			var errorArray=[];
			return funcs;
			function loopMessageArray(){
				while (errorArray.length>0){
					var message=errorArray.shift();
				//	console.log("@@@@@@");
				//	console.log(message);
					$.map(errorArray, function(n){
					  return n.message ==message.message ? message:null;
					});
					console.log(errorArray.length);
					$timeout(function(){
						show(message.message,message.icon,!!message.showCloseButton);
					},2000); 
				}
			}

			function shiftMessage(){

			}

			function pushMessage(message){ 
				errorArray.push(message);
				if(errorArray.length==1){
					loopMessageArray();
				}
			}

			function checkMessage(message){
				if(message.single){ 
					pushMessage(message);
				}else{

				}
			}

			function showSuccess(message,showCloseButton){
				return show(message,'success',!!showCloseButton);
			}
			
			function showError(message,showCloseButton,response){
				checkMessage({
					'message':message,
					'errorCode':response.status,
					'showCloseButton':showCloseButton,
					'icon':"error",
					'single':true
				});
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
						"showCloseButton": showCloseButton
					});
				}
				else{
					msg = Messenger().post(message);
				}
				return msg;
			}
        }
    ]);
});