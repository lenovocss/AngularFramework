define(['require','angular','services/app-utils.module','components/index'], function(require,ng,module){
    

    module.factory('uiGridUtils',['$window',"$http","$q",'$modal','uiGridConstants',function($window,$http,$q,$modal,uiGridConstants){ 
            var funcs = { 
				"setTableCheckAll":setTableCheckAll,
				"initTableSelect":initTableSelect,
				"gridColumnsModal":gridColumnsModal,
				"resetGridSelection":resetGridSelection
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
			
			function resetGridSelection(gridApi){
				gridApi.selection.clearSelectedRows();
				gridApi.grid.selection.selectedCount=0;
			}
        }
    ]);
});