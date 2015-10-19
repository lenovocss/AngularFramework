define(['require','angular','services/app-utils.module','socket','io'], function(require,ng,module,socket,io){
    module.factory('socket', ['socketFactory', function(socketFactory){

	 	var ioSocket = io.connect('http://cmp.lenovows.com/',{"reconnect":false,"auto connect":false,"force new connection":false,path:"/socket_io/socket.io"});
	 	//尝试连接3次失败，客户端就不在发起连接)
	 	ioSocket.io._reconnectionAttempts = 3;
	 	var socket = socketFactory({
	    	ioSocket: ioSocket
	  	});
		return {socket:socket,ioSocket:ioSocket,io:io};
	}]).factory("scoketListen",["socket",function(socket){
		var socketMap = {
			"instance":"instances",
			"harddisk":"volumes"
		}

		return function (scope,location,callback){
			var uri = location.$$absUrl;
			var reg = /#\/(\w+)(?:\/\w+\/(\w+))?/;
			var uriArr = reg.exec(uri);
 			socket.socket.forward(socketMap[uriArr[1]],scope);
			scope.$on("socket:"+socketMap[uriArr[1]],function(ev,data){
				callback(ev,data);
			});
		}
	}]).factory('scopeListenByType', ['socket', function(){
		var socketMap = {
			"instance":"instances",
			"harddisk":"volumes",
			"image":"images"
		}

		return function (scope,location,callback){
			var uri = location.$$absUrl;
			var reg = /#\/(\w+)(?:\/\w+\/(\w+))?/;
			var uriArr = reg.exec(uri);
			scope.$on(socketMap[uriArr[1]],function(ev,data){
				callback(ev,data);
			});	
		};
	}])
});
//id instances 唯一