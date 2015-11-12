define(['require','angular','services/app-utils.module','components/index'], function(require,ng,module){
    

    module.factory('funcUtils',['$window',"$http","$q",'$modal','uiGridConstants','Global_Conf_Map',function($window,$http,$q,$modal,uiGridConstants,Global_Conf_Map){ 
            var funcs = {
				"generateId" : generateId,
				"delArrayByIndex" : delArrayByIndex,
				"formatStr" : formatStr, 
				"setTableCheckAll":setTableCheckAll,
				"initTableSelect":initTableSelect,
				"openMask":openMask,
				"closeMask":closeMask,
				"gridColumnsModal":gridColumnsModal,
                "setFieldFilter":setFieldFilter,
                "throttle":throttle,
                "debounce":debounce,
				"queryString":queryString
			};
			
			return funcs;
			function gridColumnsModal(columns,gridApi){
				var modalInstance = $modal.open({
         			templateUrl: cmpConfig.componentsPath + 'grid-columns-show-hide.html',
	                controller: 'GridColumnsShowHideCtrl',
	                backdrop:'static',
	                size:'md',
	                resolve:{
	                	'columns': function () {
							return columns;
						}
	                }
         		})
         		modalInstance.result.then(function(){
         			gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
         		},function(){
         			gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
         		})
			}
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
			
			function formatStr(){

				var s = arguments[0],
					i = arguments.length;

				while (i-- >= 1) {
					s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
				}
				return s;

			}
            function setFieldFilter(scope){
                scope.maxlen = Global_Conf_Map.MAX_LENGTH;
                scope.minlen = Global_Conf_Map.MIN_LENGTH;
                scope.display_name = Global_Conf_Map.DISPLAY_NAME;
                scope.email = Global_Conf_Map.E_MAIL;
                scope.des = Global_Conf_Map.REGEXP_DESC,
                scope.positive_integer = Global_Conf_Map.POSITIVE_INTEGER
            }
			 

			function setTableCheckAll(scope){
				var allcount=scope.gridOptions.data.length;
				var selectcount=scope.gridApi.grid.selection.selectedCount;
				if(allcount==selectcount){
					scope.gridApi.grid.selection.selectAll=true;
				}else{
					scope.gridApi.grid.selection.selectAll=false;
				}
			}

			function initTableSelect(scope,checkActionStatus){
				
				if(!scope.gridApi){
					throw new Error("scope.gridApi is not exists");
				}
				
				scope.gridApi.selection.on.rowSelectionChanged(scope,function(row){
					setTableCheckAll(scope);
                    if(typeof checkActionStatus=="function"){
                        checkActionStatus();
                        var rows = scope.gridApi.selection.getSelectedRows();
                        if(rows.length==1){
                            scope.entity=rows[0];
                            scope.resourceId=scope.entity.id;
                        }else{
                            scope.entity={};
                            scope.resourceId="";
                        }
                    }
				}); 
				scope.gridApi.selection.on.rowSelectionChangedBatch(scope,function(row){
	                setTableCheckAll(scope);
	                var rows = scope.gridApi.selection.getSelectedRows();
                    if(typeof checkActionStatus =="function"){
                        checkActionStatus();
                        scope.entity=rows[0];
                    }
	            })
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