define(["angular"], function(ng){
    return function(moduleName)
    {
        var deferred = $.Deferred();
        try{
          var md= ng.module(moduleName);
          return md;
        }catch(e){
            console.log(ng.module('app.lazyHelper').value('FUTURE_STATES'));
        }
    	
            // require(dependencies, function(){
            //         deferred.resolve();
            // });
        return deferred.promise; 
        //return ng.module(moduleName);
    }
});