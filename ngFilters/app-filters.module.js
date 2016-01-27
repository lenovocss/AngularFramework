define(["require","angular"], function(require,ng) { 
	var module = angular.module('app.filters',[]);
	
	module.filter("decode_html",['$filter',function($filter) {
		
	    var decodeHtml = function(text) {
	 
	        return !!text ? text
		        .replace(/&amp;/g, "&")
		        .replace(/&gt;/g, ">")
		        .replace(/&lt;/g, "<")
		        .replace(/&quot;/g, '"')
		        .replace(/&#039;/g, "'") : text;
	    };
	    return decodeHtml;
	}]);

    module.filter("unit_conversion",function(){
		return function(byteSize,num){
			var arr = ["byte","KB","MB","GB","TB"];
			var count =0;
			function unit_conversion(byteSize){
				if(byteSize>=1024){
					count++;
					byteSize = byteSize/1024;
					return unit_conversion(byteSize) //arguments.callee(byteSize);
				}
				return byteSize;
			}
			return parseFloat(unit_conversion(byteSize)).toFixed(num || 4)+arr[count];
		}
	});
	
	module.filter('trustAsHtml', ['$sce',function($sce) {
		return function(html) {
			return $sce.trustAsHtml(html);
		};
	}]);
	
	
	return module;
});