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