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
	   				if(el.prevAll('div[grid-paging]').length){
	   					top+=45;
	   				}
	   				el.css("top",Math.floor(top));
	   				el.css("position","absolute");
	   				var gridHeight = el.height();
	   				function set(){
	   					var sizeMap = {
	   						"min-btn": gridHeight/3,
	   						"md-btn" : gridHeight/2,
	   						"lg-btn" : gridHeight/3*2
	   					};
	   					var that = $(this);
	   					if(that.hasClass("min-btn")){
	   						setHeight(sizeMap["min-btn"]);
	   					}else if(that.hasClass("md-btn")){
	   						setHeight(sizeMap["md-btn"]);
	   					}else if(that.hasClass("lg-btn")){
	   						setHeight(sizeMap["lg-btn"])
	   					}
	   				}
	   				function  setHeight(h){
	   					el.find(".grid-detaile-wrap").height(Math.ceil(h));
	   					el.find(".grid-body-wrap").css("bottom",Math.ceil(h)+"px");
	   				}
	   				
	   				if(el.find(".grid-detaile-wrap").length==1){

	   					setHeight(gridHeight/2);

		   				el.find(".min-btn").on('click',set);
		   				el.find(".md-btn").on('click',set);
		   				el.find(".lg-btn").on('click',set);

						window.onresize=funcUtils.debounce(function(){
							gridHeight=el.height();
							var detailWrapHeight = el.find(".grid-detaile-wrap").height();
							if(gridHeight<=detailWrapHeight+50&&gridHeight>150){
								el.find(".md-btn").trigger("click");
							}
						},50,{leading:false});
						$scope.$on("$destroy",function(){
							el.find(".min-btn").off('click',set);
			   				el.find(".md-btn").off('click',set);
			   				el.find(".lg-btn").off('click',set);
						});
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
	   .directive('heightInContent',['$window','domUtils',function($window,domUtils){
			return {
				link:function(scope,el,attrs){
					
					$(function(){
						var  h = $(".content-wrap").height();
						$(el).css({"height":h + scope.$eval(attrs.heightInContent,{height:h})});
					});
					
					angular.element($window).on('resize', function () {
						var  h = $(".content-wrap").height();
						$(el).css({"height":h + scope.$eval(attrs.heightInContent,{height:h})});
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
					
					ngModel.$validators.same = function(modelValue) {
						return modelValue == scope.otherModelValue;
					};
		 
					scope.$watch("otherModelValue", function() {
						ngModel.$validate();
					});
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
		   		templateUrl:cmpConfig.directivesPath+"upload.html",
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
					$scope.$watch('openStatus',function(newValue,oldValue){
						if(newValue){
							$(iElm).find(".panel-title").html('<i class="pull-left fa fa-caret-down"></i>&nbsp;'+$scope.title+$scope.innerHtml);
						}else{
							$(iElm).find(".panel-title").html('<i class="pull-left fa fa-caret-right"></i>&nbsp;'+$scope.title+$scope.innerHtml);
						}
					});
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
		}]).directive('highchartResizer', ['$timeout', function($timeout){
			//resize highchart size when chart in tabset
			return {

				require: '^tabset',
				link: function($scope, ele, attrs, controller) {
					
					var oldSelect = controller.tabs[attrs.highchartResizer].onSelect;
					
					controller.tabs[attrs.highchartResizer].onSelect = function(){

						if(!$scope.reflow){
							var charts = $(ele).find(".highcharts-container");
							$.each(charts,function(idx,ele){
								$.each(Highcharts.charts,function(i,hc){
									if(hc && hc.container.id == ele.id){
										(function(index){
											$timeout(function(){
												Highcharts.charts[index].reflow();
											},0);
										})(i);
									}
								});
							});
							
							$scope.reflow = true;
						}
					
						oldSelect && oldSelect();
						
					}	
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
								//console.log("ngModel",scope.multiple,ngModel.$modelValue);	
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
						//console.log("fieldError:",scope.field.$error,newValue,oldValue);
						if(oldValue){
							handleErrors(newValue);
						}
					});
					
					unwatchSubmitted = scope.$watch('form.$submitted',function(newValue, oldValue, scope){
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
	   }]).directive('optimusPrime', ['$q','$timeout', function($q,$timeout){
	    	return {
	    		scope:{
	    			data:"="
	    		},
	    		link: function($scope, iElm, iAttrs, controller) {
	    			var height = $(iElm).height();
	    			var pillarbar = $(iElm).find("#pillarbar");
	    			/*var overplus = $(iElm).find("#overplus");
	    			var used = $(iElm).find("#used");*/
	    			$scope.$watch('data',function(new_val,old_val){
	    				if(new_val&&new_val.used){
	    					var nowheight = parseInt(height*(new_val.used/new_val.total));
			    			//console.log(nowheight);
			    			
		    				pillarbar.animate({
						      height:nowheight
						    });
			    			
	    				}
	    			})
	    			
	    		}
	    	};
	    }]).directive('downLoadFile',['$timeout',function($timeout){
	    	return {
	    		restrict:"EA",
	    		scope:{
	    			formConfig:"="
	    		},
	    		replace:true,
	    		transclude:true,
	    		templateUrl:cmpConfig.directivesPath+"download.html",
	    		link:function($scope,ele,attrs,parentCtrl){
	    			$scope.$watch("formConfig.submit",function(new_val,old_val){
	    				if(new_val!=old_val&&new_val==true){
	    					$timeout(function(){
	    						ele.submit();
	    						$scope.formConfig.submit=false;
	    					},0);
	    				}	
	    			});
	    		}

	    	}
	    }]).directive('autoSelectInput',['$rootScope','$timeout',function($rootScope,$timeout){
	    	return {
	    		restrict:"EA",
	    		link:function($scope,ele,attrs,parentCtrl){
					
					$rootScope.$on(attrs.autoSelectInput,function(){
						$timeout(function(){
							$(ele).get(0).select();
							$(ele).get(0).focus();
						},100);
						
					});
					
	    			
	    		}

	    	}
	    }]).directive('inputRepeatChecker',['$rootScope','$interval',function($rootScope,$interval){
	    	return {
	    		restrict:"EA",
				require: 'ngModel',
	    		link:function(scope,ele,attrs,ngModel){
					var inputClass = attrs.inputRepeatChecker,vals = [];
					
					ngModel.$validators.repeat = function (modelValue, viewValue) {
						
						vals.length = 0;
						$("." + inputClass).each(function(){
							if($(this).get(0) !== $(ele).get(0)){//remove self
								$(this).val() && vals.push($(this).val());
							}
						});
						
						if(vals.indexOf(viewValue) == -1) {
						  return true
						}
						return false;
					};
					
					var checkHandler = $interval(function(){
						ngModel.$validate();
					},100);
					
					scope.$on("$destroy",function(){
						$interval.cancel(checkHandler);
					});
	    		}
	    	}
	    }]).directive('optionalRequired',['$rootScope','$interval',function($rootScope,$interval){
	    	return {
	    		restrict:"EA",
				require: 'ngModel',
	    		link:function(scope,ele,attrs,ngModel){
					var inputClass = attrs.inputRepeatChecker,vals = [];
					
					ngModel.$validators.optional = function (modelValue, viewValue) {
						
						vals.length = 0;
						$("." + inputClass).each(function(){
							if($(this).get(0) !== $(ele).get(0)){//remove self
								$(this).val() && vals.push($(this).val());
							}
						});
						
						if(modelValue == "" && vals.length == 0) {
						  return false
						}
						
						return true;
					};
					
					var checkHandler = $interval(function(){
						ngModel.$validate();
					},100);
					
					scope.$on("$destroy",function(){
						$interval.cancel(checkHandler);
					});
	    		}
	    	}
	    }]).directive('gridEmptyTip',['$window',function($window){
			return {
				template:'<div><div class="no-rows" ng-show="firstLoad && !init"><div class="msg"><span class="loading"></span><span>{{loadingTip}}</span></div></div><div class="no-rows" ng-show="init && gridOptions.data.length === 0"><div class="msg"><span>{{tip}}</span></div></div></div>',
				replace: true,
				scope:{
					tip: "@",
					loadingTip: "@",
					init: "=",
					gridOptions:"="
				},
				link:function($scope,el,attrs,ngModel){
					$scope.loadingTip = $scope.loadingTip || "正在加载数据...";
					
					$scope.firstLoad = true;
					
					var watchListener = $scope.$watch('init',function(newVal,oldVal){
						newVal && ($scope.firstLoad = false);
					})
					
					$scope.$on("$destroy",function(){
						watchListener();
					});
				}
			}
	    }]);
});