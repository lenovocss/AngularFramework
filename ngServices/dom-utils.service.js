define(['require','angular','services/app-utils.module'], function(require,ng,module){
    module.factory('domUtils',['$window',function($window){ 
            var funcs = {
                "createDownloadLink" : createDownloadLink
            };
            
            return funcs;

            function createDownloadLink(filePath){

                function eventFire(el, etype){
                    if (el.fireEvent) {
                        (el.fireEvent('on' + etype));
                    } else {
                        var evObj = document.createEvent('Events');
                        evObj.initEvent(etype, true, false);
                        el.dispatchEvent(evObj);
                    }
                }

                var link = document.createElement("a");
                link.download = attachment.FileName;
                link.href = filePath;
                eventFire(link, "click");
            }
        }
    ]);
});