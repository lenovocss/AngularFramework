define(["require","angular","directives/app-directives.module"], function(require,ng,module) { 
	module.directive('menuSide',['$window','$timeout','$animate',function($window,$timeout,$animate){
	   		return {
	   			link:function($scope,el,attrs){
	   				$scope.sideWidth={
	   					"width":'216px'
	   				}
	   				$scope.contentLeft={
	   					"left":'216px'
	   				}  
	   				el.find(".menu-side-button").on('click',function(){
	   					// $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass); 
	   					if(el.find(".menu-side-button").hasClass("side-close")){
	   						$scope.sideWidth['width']="196px";
	   						$scope.contentLeft['left']="196px";
	   						$animate.addClass(el.find(".menu-wrap"), "slideOutRight"); 
	   						$animate.removeClass(el.find(".menu-wrap"), "slideOutLeft");
	   						$animate.removeClass(el.find(".menu-side-button"), "side-close");
	   						el.find(".menu-side-button").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAoCAYAAAAR87HlAAAAjklEQVR42u3XPQrAIAwGUG/VHqt36eQ1eptOugm6ObpEUyqU0s0vbYcEAk6P4B+JMWc45xbv/d6SRvMA22KNMVIphRDBFU4hBEIGo1vOGYvyHqBDUUUV/Ry11mJRBqFoB2HoFYSgd3AYfQL/WanYnoqdvtg9FXtR+kspqujrTW9DZ3h73geJlBJukJAYeSp/Da8VHxk6/gAAAABJRU5ErkJggg==");
	   						$animate.addClass(el.find(".taget-content-wrap"), "slideOutRight"); 
	   						$animate.removeClass(el.find(".taget-content-wrap"), "slideOutLeft");
	   					}else{
	   						$scope.sideWidth['width']="22px";
	   						$scope.contentLeft['left']="22px";
	   						$animate.addClass(el.find(".menu-wrap"), "slideOutLeft"); 
	   						$animate.removeClass(el.find(".menu-wrap"), "slideOutRight");
	   						$animate.addClass(el.find(".menu-side-button"), "side-close");
	   						el.find(".menu-side-button").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAoCAYAAAAR87HlAAAAi0lEQVR42u3XMQ6AIAwFUG6lx/IuTlzD2ziVjQQ2RpZKja4KWIShP2nC9EIgkFapKwCwGGP2VPi1TjAtVuccxhiRI7TDyVqLnCF0CyHwonQG3BFUUEF/R7XWbdASuAjNhYvRHLgKfYOr0Sd4nJ2Of/vjvyj5+gQVtGvTm9CZvT2/BwnvPd8g0WLkOQDcbq8VOawzNAAAAABJRU5ErkJggg==");
	   						$animate.addClass(el.find(".taget-content-wrap"), "slideOutLeft"); 
	   						$animate.removeClass(el.find(".taget-content-wrap"), "slideOutRight");
	   					} 
	   					$scope.$apply();
	   				});
	   			} 
	   		}
	    }])
	   .directive('gridSide',['$window','$animate','domUtils','funcUtils',function($window,$animate,domUtils,funcUtils){
	   		return {
	   			scope:{
	   				topMappingSize:"@"
	   			},
	   			link:function($scope,el,attrs){
	   				var top=el.position().top;
	   				if($('div[grid-paging]').length){
	   					top+=45;
	   				}
	   				el.css("top",top);
	   				el.css("position","absolute");
	   				var gridHeight = el.height();
	   				
	   				if(el.find(".grid-detaile-wrap").length==1){
	   					var setConsoleHeight = gridHeight/4>50?50:gridHeight/4;
	   					el.find(".grid-detaile-wrap").height(setConsoleHeight)
		   				el.find(".grid-body-wrap").css("bottom",setConsoleHeight+"px");

		   				el.find(".min-btn").on('click',function(){
		   					el.find(".grid-detaile-wrap").height(setConsoleHeight);
		   					el.find(".grid-body-wrap").css("bottom",setConsoleHeight+"px");
		   				});
		   				el.find(".md-btn").on('click',function(){
		   					el.find(".grid-detaile-wrap").height(gridHeight/2);
		   					el.find(".grid-body-wrap").css("bottom",gridHeight/2+"px");
		   				});
		   				el.find(".lg-btn").on('click',function(){
		   					el.find(".grid-detaile-wrap").height(gridHeight/4*3);
		   					el.find(".grid-body-wrap").css("bottom",gridHeight/4*3+"px");
		   				});
		   				var hander=function(){
			   				el.find(".md-btn").trigger('click');
		   				};
		   				
		   				hander();
						window.onresize=funcUtils.debounce(function(){
							gridHeight=el.height();
							var detailWrapHeight = el.find(".grid-detaile-wrap").height();
							if(gridHeight<=detailWrapHeight+50&&gridHeight>150){
								el.find(".md-btn").trigger("click");
							}
						},50,{leading:false});
	   				}else{
	   					el.find(".grid-body-wrap").css("bottom","0");
	   				}
	   				
	   			}
	   		}
	   }])
	   .directive('autoSizeDiv',['$window','$timeout',function($window,$timeout){
	   	return {
	   		scope:{
	   			topSize:"@",
	   			leftSize:"@",
	   			bottomSize:"@",
	   			rightSize:"@"
	   		},
	   		replace: true,
	   		link:function($scope,el,attrs){  
	   			var setSize =function(){
	   				if(!$scope.topSize)
		   				$scope.topSize=0;
		   			if(!$scope.bottomSize)
		   				$scope.bottomSize=0;
		   			if(!$scope.leftSize)
		   				$scope.leftSize=0;
		   			if(!$scope.rightSize)
		   				$scope.rightSize=0;  
	   				var height=(parseInt($(el).parent().height())-$scope.topSize-$scope.bottomSize)+'px';
	   				el.css('height',height); 
	   			};  
	   			angular.element($window).on('resize', function () {
					 setSize();
				}); 
				$timeout(setSize, 0);
				$scope.$on('$destroy', function () { 
	                $timeout.cancel(setSize);
	            });
	   		}
	   	}
	   }])
	   .directive('maxHeight',['$window','domUtils',function($window,domUtils){
		   console.log("max height....");
	   	return {
	   		link:function(scope,el,attrs){
	   			domUtils.setHeight(el,-62);
	   			angular.element($window).on('resize', function () {
					 domUtils.setHeight(el,-62);
				});
	   		}
	   	}
	   }])
	   .directive('toolTip',['$window',function($window){
		   	return {
		   		trstrice:"EA",
				scope:{
					title: "@"
				},
		   		link:function(scope,el,attrs){
		   			$(el).tooltip(); 
		   		}
		   	}
	   }])
	   .directive("compareTo",function(){
		   return {
				require: "ngModel",
				scope: {
					otherModelValue: "=compareTo"
				},
				link: function(scope, element, attributes, ngModel) {
					
					ngModel.$parsers.unshift(function(value) {
						var valid = (scope.otherModelValue == value);
						ngModel.$setValidity('confirmPassword', valid);
						return valid ? value : undefined;
					});

					ngModel.$formatters.unshift(function(value) {
						ngModel.$setValidity('confirmPassword', scope.otherModelValue == value);
						return value;
					});
		 
					/*scope.$watch("otherModelValue", function() {
						ngModel.$validate();
					});*/
				}
			};
	   })
	   .directive("scrollLoad",["$window",function ($window){
	   		return{
	   			scope:{
	   				scrollOptions:"=",
	   				container:"@",
	   				gotopId:"@"
	   			},
	   			link:function (scope,element,attributes){
	   				var container=$(scope.container);
	   				scope.show=true;
	   				var topObj=$("#"+scope.gotopId);
				    container.bind('scroll', function() { 
				      //是否设置自动返回顶部ID
				      if(topObj){
					      if(scope.show){
					      	 scope.show=false;
					 	     if(container[0].scrollTop > 0){
					 	     	topShow(topObj);
					 	     }
						  }else if(container[0].scrollTop<=10){
						  	scope.show=true;
						  	 topHide(topObj);
						  }
					  }
				      if (container[0].scrollTop+container[0].offsetHeight >= container[0].scrollHeight) { 
				        scope.$apply(function (){
				        	scope.scrollOptions.loadData();
				        })
				      } 
				    }); 
				    function topHide(obj){
						obj.stop(true,false).animate({"right":-40},300);
				   	}
				   	function topShow(obj){
				   		obj.stop(true,false).animate({"right":50},300);
				   	}
				   	function setScrollTop(value) {
				        container[0].scrollTop = value;
				    }
				   	topObj.on('click',function(){
				    	var goTop = setInterval(scrollMove, 10);
				        function scrollMove() {
				            setScrollTop(container[0].scrollTop / 1.1);
				            if (container[0].scrollTop < 1) {
				            	clearInterval(goTop);
				            }
				        }
				    })
	   			}
	   		}
	   }]).directive('isNumber', ['$q', function($q){
			//文本框只允许输入数字
			return {
				trstrice:"EA",
				require:['?ngModel'],
				scope: {
					min:"@",
					max:"@",
					defaultValue:"@value"	
				}, 
				link: function($scope, iElm, iAttrs, controller) {
					var ngModel=controller[0];
					if(ngModel){
						ngModel.$setViewValue($scope.defaultValue);
					}
					$(iElm).keypress(function(event) {
			            var keyCode = event.which; 
			            if (keyCode == 46 || (keyCode >= 48 && keyCode <=57)||keyCode==8||keyCode==0){
			            	return true;
			            }
			            else{ 
			                return false;  
			            } 
			        }).blur(function() {
			        	var value=parseInt($(iElm).val());
			        	if(!value){
			        		$(iElm).val($scope.defaultValue);
			        	}else{
			        		if($scope.min&&$scope.max){
			        			if(value>=$scope.min&&value<=$scope.max){
			        				$(iElm).val(value);
			        			}else{
			        				$(iElm).val($scope.defaultValue);
			        				
			        			}
			        		}else{
			        			$(iElm).val($scope.defaultValue);
			        		}
			        		if($(iElm).val()==$scope.defaultValue){
				        		ngModel.$setViewValue($scope.defaultValue);
				        	}
			        	}
			        	
			        }); 
				}
			};
		}]).directive('imgLoad', ['$http', function($http){
		   	// Runs during compile
		   	return {
		   		restrict:"AE",
		   		scope:{
		   			url:"@"
		   		},
		   		compile:function(){
		   			return {
		   				pre:function(){},
		   				post:function(scope, element, attributes){
		   					loadImage(scope.url,imgComplete)
				   			function loadImage(url, callback) { 
				   				//创建一个Image对象，实现图片的预下载    
							    var img = new Image();     
							    //绑定onload事件
							    img.onload = function(){
							    	//避免循环加载
							        img.onload = null;
							        //预加载成功后执行回调函数
							        callback(img);
							    }
							    img.src = scope.url; 
							}
							function imgComplete(img){
								//图片是否在缓存中
								if (img.complete) {
									$(element).attr("src",scope.url)
								}
							}
		   				}
		   			}
		   		}
		   	};
		}])
		.directive('fileUpload', ['$http', function($http){
		   	return {
		   		restrict:"AE",
		   		scope:{
		   			uploader:"=",
		   		},
		   		replace:true,
		   		templateUrl:cmpConfig.appPath+"components/upload.html",
		   		compile:function(){
		   			return {
		   				pre:function(){},
		   				post:function(scope, element, attributes){
		   					var btngroup=$(element).find("a").first();
		   					btngroup.bind("click",function(){
		   						 $(element).find("input[type='file']").trigger('click'); 
		   					})
		   				}
		   			}
		   		}
		   	};
		}]).directive('accorOpen', ['$q', function($q){
			//下拉面板展开指令，调整ui.bootstrap/accordion样式
			return {
				scope: {
					title:"@",
					innerHtml:"@",
					openStatus:"="
				}, 
				replace: true,
				link: function($scope, iElm, iAttrs, controller) {
					var status = null;
					$scope.openStatus?(status = 'down'):(status = 'right');
					$(iElm).find(".panel-heading").css("cursor",'pointer');
					$(iElm).find(".panel-title").html('<i class="pull-left fa fa-caret-'+status+'"></i>&nbsp;'+$scope.title+$scope.innerHtml);
					$(iElm).find(".panel-heading").on('click',function(){
						$scope.$apply(function(){
							$scope.openStatus=!$scope.openStatus;
							if($scope.openStatus){
								$(iElm).find(".panel-title").html('<i class="pull-left fa fa-caret-down"></i>&nbsp;'+$scope.title+$scope.innerHtml);
							}else{
								$(iElm).find(".panel-title").html('<i class="pull-left fa fa-caret-right"></i>&nbsp;'+$scope.title+$scope.innerHtml);
							}
						})
					})
				}
			};
		}]).directive('isTab', ['$q', function($q){
			//下拉面板展开指令，调整ui.bootstrap/accordion样式
			return {

				replace: true,
				link: function($scope, iElm, iAttrs, controller) {
					$(iElm).css("width",'200');
					/*$(iElm).find(".panel-title").html($scope.title+'<i class="pull-right glyphicon glyphicon-chevron-down"></i>');
					$(iElm).find(".panel-heading").on('click',function(){
						$scope.$apply(function(){
							$scope.openStatus=!$scope.openStatus;
							if($scope.openStatus){
								$(iElm).find(".panel-title").html($scope.title+'<i class="pull-right glyphicon glyphicon-chevron-down"></i>');
							}else{
								$(iElm).find(".panel-title").html($scope.title+'<i class="pull-right glyphicon glyphicon-chevron-right"></i>');
							}
						})
					})*/
				}
			};
		}]).directive('errorTip',['$window',function($window){
		   	return {
				template:"<div><p class='help-block' ng-show='titles.length >= 1' ng-repeat = 'title in titles'>{{title}}</p></div>",
				replace: true,
				require: 'ngModel',
				scope:{
					config: "@",
					multiple: "@",
					form:"=",
					field:"="
				},
		   		link:function(scope,el,attrs,ngModel){
		   			var configJson = JSON.parse(scope.config),oldFieldError;
					
					function handleErrors(errors){
						scope.titles = [];
						for(var i=0;i<configJson.length;i++){
							if(checkTypes(errors,configJson[i]) && (scope.field.$invalid && !scope.field.$pristine ||!ngModel.$modelValue&& scope.form.$submitted)){
								console.log("ngModel",scope.multiple,ngModel.$modelValue);	
								if(scope.titles.length < 1){
									scope.titles.push(configJson[i].tip);
								}
								else{
									scope.multiple && scope.titles.push(configJson[i].tip);
								}
							}
						}
					}
					
					function checkTypes(errors,configJson){
						var result = false;
						if(configJson.type){
							result = errors[configJson.type];
						}
						else if(configJson.types){
							for(var i=0;i<configJson.types.length;i++){
								result = result || errors[configJson.types[i]]
							}
						}
						return result;
					}
					
					var unwatchError = scope.$watchCollection('field.$error',function(newValue, oldValue, scope){
						console.log("fieldError:",scope.field.$error,newValue,oldValue);
						if(oldValue){
							handleErrors(newValue);
						}
					});
					
					unwatchSubmitted = scope.$watchCollection('form.$submitted',function(newValue, oldValue, scope){
						if(newValue){
							handleErrors(scope.field.$error);
						}
					});
					
					scope.$on('$destroy',function(){
						unwatchError();
						unwatchSubmitted();
					});
					
		   		}
		   	}
	   }]);
});