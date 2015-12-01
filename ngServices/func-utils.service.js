define(['require','angular','services/app-utils.module'], function(require,ng,module){
    

    module.factory('funcUtils',['$window',"$http","$q",'$modal','uiGridUtils','COMMON_REGEX_PATTERN',function($window,$http,$q,$modal,uiGridUtils,COMMON_REGEX_PATTERN){ 
            /***WARN: Don't put grid functions in here,please use uigrid-utils.service**/
			var funcs = {
				"generateId" : generateId,
				"delArrayByIndex" : delArrayByIndex,
				"delArrayItems" : delArrayItems,
				"formatStr" : formatStr, 
				"setTableCheckAll":uiGridUtils.setTableCheckAll,
				"initTableSelect":uiGridUtils.initTableSelect,
				"openMask":openMask,
				"closeMask":closeMask,
				"gridColumnsModal":uiGridUtils.gridColumnsModal,
                "setFieldFilter":setFieldFilter,
                "throttle":throttle,
                "debounce":debounce,
				"queryString":queryString
			};
			
			return funcs;
			
			function openMask(){
				if(ng.element('#load-mask').hasClass("hide"))
					ng.element('#load-mask').removeClass("hide");
			}

			function closeMask(){
				if(!ng.element('#load-mask').hasClass("hide"))
					ng.element('#load-mask').addClass("hide");
			}

			function generateId(){ 
				var id = 1;
				return function (){
					return id++;
				};
			}
			
			function delArrayByIndex(arr,callback){
				for(var i=0;i<arr.length;i++){
					if(callback(arr[i],i)){
						return arr.splice(i,1);
					}
				}
			}
			
			/**
			* 从arr中删除所有属于items数组中的元素
			* 根据cb返回值确定相等性
			**/
			function delArrayItems(arr,items,cb){
				for(var j=0;j<items.length;j++){
					for(var i=0;i<arr.length;i++){
						var isEqual = cb ? cb(arr[i],items[j]) : (arr[i] === items[j]);
						if(isEqual){
							arr.splice(i,1);
							break;
						}
					}
				}
			}
			
			function formatStr(){

				var s = arguments[0],
					i = arguments.length;

				while (i-- >= 1) {
					s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
				}
				return s;

			}
            function setFieldFilter(scope){
                scope.maxlen = COMMON_REGEX_PATTERN.MAX_LENGTH;
                scope.minlen = COMMON_REGEX_PATTERN.MIN_LENGTH;
                scope.display_name = COMMON_REGEX_PATTERN.DISPLAY_NAME;
                scope.email = COMMON_REGEX_PATTERN.E_MAIL;
                scope.des = COMMON_REGEX_PATTERN.REGEXP_DESC;
                scope.positive_integer = COMMON_REGEX_PATTERN.POSITIVE_INTEGER;
                scope.maxNumber = COMMON_REGEX_PATTERN.maxNumber;
            }

            /**
            * 频率控制函数， fn执行次数不超过 1 次/delay
            * @param fn{Function}     传入的函数
            * @param delay{Number}    时间间隔
            * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
            *                         如果想忽略结束边界上的调用则传入 {trailing:false},
            * @returns {Function}     返回调用函数
            */
            function throttle(fn,delay,options) {
                var wait=false;
                if (!options) options = {};
                return function(){
                    var that = this,args=arguments;
                    if(!wait){
                        if (!(options.leading === false)){
                            fn.apply(that,args);
                        }
                        wait=true;
                        setTimeout(function () {
                            if (!(options.trailing === false)){
                                fn.apply(that,args);
                            }
                            wait=false;
                        },delay);
                    }
                }
            }

            /**
             * 空闲控制函数， fn仅执行一次
             * @param fn{Function}     传入的函数
             * @param delay{Number}    时间间隔
             * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
             *                         如果想忽略结束边界上的调用则传入 {trailing:false},
             * @returns {Function}     返回调用函数
             */
            function debounce(fn, delay, options) {
                console.log(111);
                var timeoutId;
                if (!options) options = {};
                var leadingExc = false;

                return function() {
                    var that = this,
                        args = arguments;
                    if (!leadingExc&&!(options.leading === false)) {
                        fn.apply(that, args);
                    }
                    leadingExc=true;
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    timeoutId = setTimeout(function() {
                        if (!(options.trailing === false)) {
                            fn.apply(that, args);
                        }
                        leadingExc=false;
                    }, delay);
                }
            }
			function queryString(data) { 
                var str = ""; 
                for (var i in data) 
                    str += (str ? ("&" + i + "=" + data[i]) : (i + "=" + data[i])); 
                return "?" + str; 
            }
        }
    ]);
});