define(["require","angular","angular-grid"], function(require,ng) { 
	var module = angular.module('app.utils',[]);
	
	module.constant("COMMON_REGEX_PATTERN",{
        "MAX_LENGTH":16,
        "MIN_LENGTH":3,
        "E_MAIL":/^([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i,
        "DISPLAY_NAME":/^[0-9a-zA-Z_\-]+$/,
        "REGEXP_DESC": /^[^/\\\\…….]+$/,
        "POSITIVE_INTEGER":/^[0-9]*[1-9][0-9]*$/,
        "MAX_NUMBER":Math.pow(2,31)-1,
    })
	
	return module;
	
});