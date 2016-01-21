define(["require","angular","directives/app-directives.module"], function(require,ng,module) { 
	var PAGE_COUNT_LIST = [{label:"10",value:10},{label:"20",value:20},{label:"50",value:50}]
	
	module.directive('gridPaging',['$window','$stateParams','domUtils','funcUtils',function($window,$stateParams,domUtils,funcUtils){
	   	return { 
	   		restrict:"AE",
		   	replace:true,
		   	transclude:true,
		   	scope:{
	 			pagingParam:"=",
	 			searchFilters:"=",
	 			searchFun:"&",
	 			navFun:"&",
	 			showPaging:"@"
	 		},
	 		templateUrl : cmpConfig.directivesPath+"paging.html",
		   	controller:["$scope","$element",'$stateParams',function($scope, $element,$stateParams){
		   		var temp={};
		   		$scope.pagingParam = $scope.pagingParam || {itemsDeletionCount:-1};

		   		$scope.pageCountList = $scope.pagingParam.pageCountList || PAGE_COUNT_LIST;
		   		$scope.pagingParam.limit = $scope.pageCountList[0];

                 
		   		 if($scope.searchFilters ){
		   		 	//console.log("searchfilters is not null");
		   		 }else{
		   		 	//console.log("searchfilters is null");
			   		 $scope.searchFilters=[{
			   		 	key:'tag_key',
			   		 	value:'标签KEY ='
			   		 },{
			   		 	key:'tag_value',
			   		 	value:'标签值 ='
			   		 },{
			   		 	key:'name',
			   		 	value:'名称 like'
			   		 },{
			   		 	key:'status',
			   		 	value:'状态 ='
			   		 }];
		   		}

		   		activate();
				
				function activate(){
					$scope.keyTypes = $scope.searchFilters;
					$scope.value="";
					$scope.keyType=$scope.keyTypes[0]; 
					
					if(!$scope.pagingParam.selfDefineSearch){
						for(var i=0;i<$scope.keyTypes.length;i++){
							if($stateParams[$scope.keyTypes[i].key]){
								$scope.keyType = $scope.keyTypes[i];
								$scope.value = $stateParams[$scope.keyTypes[i].key];
							}
						}
					}
				}

				var unwatchItemsCount = $scope.$watch('pagingParam.itemsCount', function(newValue, oldValue, scope) {
					
					
					newValue = newValue * 1;
					if(newValue > 0 || (newValue ==0 && $scope.refreshForDeleting)){//delete the last item
						_computePages(newValue);
						setPageNav();
						$scope.refreshForDeleting && $scope.navFun()();
						
						//reset deletion mark
						$scope.refreshForDeleting = false;
						$scope.pagingParam.itemsDeletionCount = -1;
					}
					
				});
				
				var unwatchItemsDeletionCount = $scope.$watch('pagingParam.itemsDeletionCount', function(newValue, oldValue, scope) {
					
					
					if(newValue > 0){
						$scope.pagingParam.itemsCount -= newValue;
						$scope.refreshForDeleting = true;
					}
					
				});


				function setPageNav(){
					if($scope.pagingParam.currentPage <= 1){
						$scope.canBePrevious = false;
					}
					else{
						$scope.canBePrevious = true;
					}

					if($scope.pagingParam.currentPage >= $scope.pagingParam.totalPages){
						$scope.canBeNext = false;
					}
					else{
						$scope.canBeNext = true;
					}
					console.log("setPageNav");
				}

				$scope.previous = function(){
					if($scope.pagingParam.currentPage > 1){
						$scope.pagingParam.currentPage--;
						$scope.navFun()();
					}
					setPageNav();
				}

				$scope.next = function(){
					if($scope.pagingParam.currentPage < $scope.pagingParam.totalPages){
						$scope.pagingParam.currentPage++;
						$scope.navFun()();
					}
					setPageNav();
				}

				$scope.nav = function(page){
					if(page != $scope.pagingParam.currentPage){
						$scope.pagingParam.currentPage = page;
						setPageNav();
						$scope.navFun()();
					}
				}

				$scope.changePageCount = function(){
					
					_computePages($scope.pagingParam.itemsCount);
					$scope.navFun()();
				}

				function _computePages(itemsCount){
					var totalPages = parseInt(itemsCount / $scope.pagingParam.limit.value,10);
					if(itemsCount % $scope.pagingParam.limit.value != 0){
						totalPages++;
					}
					if($scope.pagingParam.itemsDeletionCount > 0){//deletion refresh
						($scope.pagingParam.currentPage > totalPages) && ($scope.pagingParam.currentPage = totalPages);
					}
					else{//search refresh
						$scope.pagingParam.currentPage = 1;
					}
					
					$scope.pagingParam.totalPages = totalPages;
					$scope.pageList = [];
					for(var i=0;i<totalPages;i++){
						$scope.pageList.push(String(i+1));
					}
				}

				$scope.resetSearch = function(){
						
					$(".grid-seach-input").get(0).select();
					$(".grid-seach-input").get(0).focus();
				}
				$scope.search = funcUtils.debounce(_search,500,{leading:false});

		   		function _search(event,keyType,value){ 
					temp = {};
		   		 	if(value || 
		   		 		(!value && (event.keyCode == 8 || event.keyCode == 46))){//backspace or delete
		   		 		temp[keyType['key']]=value;
				   		for(var key in temp){
							if(temp[key]==''){
								delete temp[key];
							}
						}
		   		 		$scope.searchFun()(temp);
		   		 	}
		   		}

		   		$scope.$on("$destroy", function() {
			        unwatchItemsCount();
					unwatchItemsDeletionCount();
			    });
		   	}],
	   		link:function(scope,el,attrs){ 
	   		}
	   	}
	   }]);
 
});