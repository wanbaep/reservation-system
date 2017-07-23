var carouselModule = (function(){
    function init(){
        var childWidth = 0;
        var rootElement = null;
        var defaultDuration = 500;

        function ready(param){
            console.log("ready %o", param.find("li:last"));
            rootElement = param;
            childWidth = rootElement.find("li:last").width();   //414
            console.log("child width %o",rootElement.find("li:last").width());
            var clonedChildElement = rootElement.find("li:last").clone();
            rootElement.prepend(clonedChildElement);
            rootElement.css({left:-childWidth});
            console.log(rootElement, rootElement.width());
        }
        function duplicatedRootReady(param){
            rootElement = param;
            childWidth = rootElement.find("li:last").width();   //414
        }
        function movePrev(){
            if(rootElement !== null){
                rootElement.stop(true,true).animate({left:0},{
                    duration : defaultDuration,
                    complete : function(){
                        rootElement.find("li:last").remove();
                        var clonedChildElement = rootElement.find("li:last").clone();
                        rootElement.prepend(clonedChildElement);
                        rootElement.css({left:-childWidth});
                    }
                });
            }
        }
        function moveNext(){
            if(rootElement !== null){
                rootElement.stop(true,true).animate({left:-childWidth*2},{
                    duration : defaultDuration,
                    complete : function(){
                        rootElement.find("li:first").remove();
                        var clonedChildElement = rootElement.find("li:first").clone();
                        rootElement.append(clonedChildElement);
                        rootElement.css({left:-childWidth});

                    }
                });
            }
        }
        function getRootElement(){
            return rootElement;
        }
        function getChildWidth(){
            return childWidth;
        }

        return {
            ready : ready,
            movePrev : movePrev,
            moveNext : moveNext,
            getRootElement : getRootElement,
            duplicatedRootReady : duplicatedRootReady,
            getChildWidth : getChildWidth
        };
    }
    return {
        getInstance : function(){
            return init();
        }
    }

})();

//ajax Request Module
var ajaxModule = (function() {
    var aVar = {
        ajaxUrl: null,
        ajaxMethod: null,
        ajaxDataType: null
    }

    function doAjax() {
        return $.ajax({
            url: aVar.ajaxUrl,
            method: aVar.ajaxMethod,
            dataType: aVar.ajaxDataType
        });
    }

    function resetAjaxVar() {
        for (var i in aVar) {
            aVar[i] = null;
        }
    }

    //module pattern에서 private value로 쓰이는 값을 반환하기 위해서
    //public 영역에서 return 해주어야 한다.
    return {
        cleanAjax: resetAjaxVar,
        setting: function(pUrl, pMethod, pDataType) {
            aVar.ajaxUrl = pUrl;
            aVar.ajaxMethod = pMethod;
            aVar.ajaxDataType = pDataType;
        },
        getAjax: doAjax
    }
})();