define(["require","angular","directives/app-directives.module"], function(require,ng,module) { 
	var PAGE_COUNT_LIST = [{label:"10",value:10},{label:"20",value:20},{label:"50",value:50}]
	
	module.directive('gridPaging',['$window','domUtils','funcUtils',function($window,domUtils,funcUtils){
	   	return { 
	   		restrict:"AE",
		   	replace:true,
		   	scope:{
	 			pagingParam:"=",
	 			searchParame:"=",
	 			searchFilters:"=",
	 			searchFun:"&",
	 			navFun:"&",
	 			showPaging:"@"
	 		},
	 		templateUrl : cmpConfig.directivesPath+"paging.html",
		   	controller:["$scope","$element",function($scope, $element){
		   		var temp={};
		   		$scope.pagingParam = $scope.pagingParam || {};

		   		$scope.pageCountList = PAGE_COUNT_LIST;
		   		$scope.pagingParam.limit = PAGE_COUNT_LIST[0];

                 console.log($scope.searchFilters);
		   		 if($scope.searchFilters ){
		   		 	console.log("searchfilters is not null");
		   		 }else{
		   		 	console.log("searchfilters is null");
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

		   		$scope.keyTypes = $scope.searchFilters;
		   		$scope.value="";
		   		$scope.keyType=$scope.keyTypes[0]; 

				var unwatch = $scope.$watch('pagingParam.itemsCount', function(newValue, oldValue, scope) {
					console.log("itemsCount:",newValue,oldValue);
					
					newValue = newValue * 1;
					if(newValue > 0){
						_computePages(newValue);
						setPageNav();
						oldValue && $scope.navFun()();;
						
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
					console.log("changePageCount:",$scope.pagingParam.limit);
					_computePages($scope.pagingParam.itemsCount);
					$scope.navFun()();
				}

				function _computePages(itemsCount){
					var totalPages = parseInt(itemsCount / $scope.pagingParam.limit.value,10);
					if(itemsCount % $scope.pagingParam.limit.value != 0){
						totalPages++;
					}

					$scope.pagingParam.currentPage = 1;
					$scope.pagingParam.totalPages = totalPages;
					$scope.pageList = [];
					for(var i=0;i<totalPages;i++){
						$scope.pageList.push(String(i+1));
					}
				}


				$scope.search = funcUtils.debounce(_search,500,{leading:false});

		   		function _search($event){ 
		   			console.log("$event:",$event.keyCode);
		   		 	delete temp['tag_key'];
		   		 	delete temp['tag_value'];
		   		 	delete temp['name'];
		   		 	delete temp['status'];
		   		 	if($scope.value || 
		   		 		(!$scope.value && ($event.keyCode == 8 || $event.keyCode == 46))){//backspace or delete
		   		 		temp[$scope['keyType']['key']]=$scope.value;
				   		for(var key in temp){
							if(temp[key]==''){
								delete temp[key];
							}
						}
		   		 		$scope.searchFun()(temp);
		   		 	}
		   		}

		   		$scope.$on("$destroy", function() {
			        unwatch();
			    });
		   	}],
	   		link:function(scope,el,attrs){ 
	   		}
	   	}
	   }]);
 
});