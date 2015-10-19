define(['require','angular','services/app-utils.module'], function(require,ng,module){
    module.factory("refreshStatu",["$timeout",function($timeout){
        var tasksMap={};
        var taskCallback={};
        var funcs = {
                "registTask" : _registTask,
                "destroyTask" : _destroyTask
            }; 
    	return funcs;

        function _registTask(task,callback,success,fail,timer){
            if(!tasksMap[task.id]){
                tasksMap[task.id]=task;
                _loopTask(task,callback,success,fail,timer);
            }
        }

        function _loopTask(task,callback,success,fail,timer){
            if(tasksMap[task.id]){
                var taskTime = $timeout(function(){
                    callback().then(function(item){
                        success(item);
                        _loopTask(task,callback,success,fail,timer);
                    },function(erro){
                        fail(erro);
                        $timeout.cancel(taskCallback[task.id]);
                    });
                },timer);
                taskCallback[task.id]=taskTime;
            }
        }

        function _destroyTask(task){
            if(tasksMap[task.id]){
               $timeout.cancel(taskCallback[task.id]);
               delete tasksMap[task.id];
            }
        }
    }]);
});