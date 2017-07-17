function carouselToLeft() {
    var width = $('.visual_img > li:first').width();
    var carouselFirst = $('.visual_img > li:first').clone();
    $('.visual_img').append(carouselFirst);

    //맨 처음 페이지 왼쪽으로 이동
    $('.visual_img > li:first').animate({ marginLeft: -width }, {
        duration: 500,
        complete: function() {
            $(this).remove();
        }
    });
}

function carouselToRight() {
    var width = $('.visual_img > li:last').width();
    var carouselLast = $('.visual_img > li:last').clone();
    $(carouselLast).css('margin-left', -1 * width);
    $('.visual_img').prepend(carouselLast);

    //맨 처음 페이지 왼쪽으로 이동
    $('.visual_img > li:first').animate({ marginLeft: 0 }, {
        duration: 500,
        complete: function() {
            $('.visual_img > li:last').remove();
        }
    });
}

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