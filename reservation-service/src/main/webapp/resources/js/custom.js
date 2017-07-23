var carouselModule = (function(){
    function init(){
        var childWidth = 0;
        var rootElement = null;
        var defaultDuration = 500;

        function ready(param){
            rootElement = param;
            childWidth = rootElement.find("li:last").width();   //414

            var clonedChildElement = rootElement.find("li:last").clone();
            rootElement.prepend(clonedChildElement);
            rootElement.css({left:-childWidth});
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