
//Timer Module for carousel
var timerModule = (function() {
    // privates scope
    var carouselInstance = null;
    var carouselInterval = null;
    var carouselTimer = null;
    var delayTime = 2000;

    function initTimerModule(){
        console.log("init");
        carouselInstance = carouselModule.getInstance();
        carouselInstance.ready($(".visual_img"));
    }

    function startInterval() {
        carouselInterval = setInterval(carouselInstance.moveNext, delayTime);
    }
    function stopInterval() {
        if (carouselInterval != null) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }
    function startTimer() {
        carouselTimer = setTimeout(startInterval, delayTime);
    }
    function stopTimer() {
        if (carouselTimer != null) {
            clearTimeout(carouselTimer);
            carouselTimer = null;
        }
    }

    //public scope
    return {
        mouseEvent: function() {
            stopInterval();
            stopTimer();
            startTimer();
        },
        initTimerModule : initTimerModule,
        intervalSet: startInterval,
        clickButton: function(whichButton){
            stopInterval();
            stopTimer();
            //If whichButton 'true' then left and 'false' then right
            whichButton ? carouselInstance.movePrev() : carouselInstance.moveNext();
            startInterval();
        }
    };
})();

$('.btn_pre_e').mouseenter(timerModule.mouseEvent.bind(this));
$('.btn_nxt_e').mouseenter(timerModule.mouseEvent.bind(this));

$('.btn_pre_e').on('click', timerModule.clickButton.bind(this,true));   //move to left
$('.btn_nxt_e').on('click', timerModule.clickButton.bind(this,false));  //move to right



//Category list를 받아오는 함수
function getCategories() {
    var categoryListSrc = $("#category_list").html();

    $.ajax({
        url : "/api/categories",
        method : "GET",
    }).done(function(res) {
        //응답이 잘못된 경우 해당 영역은 실행되지 않는다.
        var categoryListTemplate = Handlebars.compile(categoryListSrc);
        var categoryListHtml = categoryListTemplate(res);
        $('.section_event_tab').find('ul').append(categoryListHtml);
    });
}

//Module for productList    
var productModule = (function() {
    var productLeftSrc = $("#lst_event_box_left").html();
    var productRightSrc = $("#lst_event_box_right").html();
    var productLeftTemplate = Handlebars.compile(productLeftSrc);
    var productRightTemplate = Handlebars.compile(productRightSrc);
    var productObj = {
        leftItem: [],
        rightItem: [],
        leftHtml: null,
        rightHtml: null
    }
    var option = {
        offset: null,
        limit: 10
    }

    function resetProductObj() {
        productObj.leftItem = [];
        productObj.rightItem = [];
        productObj.leftHtml = null;
        productObj.rightHtml = null;
    }
    function templateToHtml() {
        productObj.leftHtml = productLeftTemplate(productObj.leftItem);
        productObj.rightHtml = productRightTemplate(productObj.rightItem);
    }

    return {
        setOffset: function() {
            option.offset = $('.wrap_event_box').find('li').length;
        },
        getObject: function() {
            return productObj;
        },
        getOption: function() {
            return option;
        },
        cleanProduct: resetProductObj,
        runCompile: templateToHtml
    }
})();

//product전체 개수를 가져오는 함수
function getProductCount() {
    $.ajax({
        url : "./api/productlist/count/0",
        method : "GET",
    }).done(function(res) {
        var str = res + "개";
        $('.event_lst_txt > .pink').text(str);
    });
}

//전체 productList를 가져오는 함수
function getProducts() {
    productModule.setOffset();
    var temp = productModule.getOption();
    var url = './api/productlist?limit=' + temp.limit + '&offset=' + temp.offset + '&categoryId=0';

    $.ajax({
        url : url,
        method : "GET",
    }).done(function(res) {
        //응답이 잘못된 경우 해당 영역은 실행되지 않는다.
        divideProduct(res);
        productModule.runCompile();

        $('.wrap_event_box > .lst_event_box:first').append(productModule.getObject().leftHtml);
        $('.wrap_event_box > .lst_event_box:last').append(productModule.getObject().rightHtml);

        productModule.cleanProduct();
    });

}

//Category에 따라서 ProductList를 가져오는 함수
/*
 *getProducts와 getProductByCategory를 전체인 경우에 url만 다르게 설정해서 함수를 합치도록 할 것
 *
 */
 function getProductByCategory(categoryId) {
    productModule.setOffset();
    var temp = productModule.getOption();
    var url = './api/productlist?limit=' + temp.limit + '&offset=' + temp.offset + '&categoryId=' + categoryId;

    $.ajax({
        url : url,
        method : "GET",
    }).done(function(res) {
        divideProduct(res);
        productModule.runCompile();

        $('.wrap_event_box > .lst_event_box:first').append(productModule.getObject().leftHtml);
        $('.wrap_event_box > .lst_event_box:last').append(productModule.getObject().rightHtml);

        productModule.cleanProduct();
    });
}

//Rest API로 받아온 productList를 좌우 영역으로 나누는 function
function divideProduct(items) {
    for (var i = 0; i < items.length; i++) {
        var img = "/files/"+items[i].fileId;
        if (i % 2 === 0) {
            productModule.getObject().leftItem.push({
                id: items[i].id,
                name: items[i].name,
                image: img,
                placeName: items[i].placeName,
                content: items[i].content
            });
        } else {
            productModule.getObject().rightItem.push({
                id: items[i].id,
                name: items[i].name,
                image: img,
                placeName: items[i].placeName,
                content: items[i].content
            })
        }
    }
}

//상품리스트 비우는 함수 -- 대신 html함수로 덮어씌우기 가능할 것으로 판단
function truncateProductList() {
    var $first = $('.wrap_event_box > .lst_event_box:first-child');
    var $second = $first.next();
    $first.empty();
    $second.empty();
}

$('.event_tab_lst').on('click', '.item', function(event) {
    //1. Category Id를 가져온다.
    event.stopPropagation();
    var curId = $(this).data('category');

    //2. anchor class 변환
    //$('a[class="anchor active"]').attr('class','anchor');
    var selectedAnchor = $(this).parents('.section_event_tab').find('.active');
    var preId = selectedAnchor.parents('.item').data('category');
    selectedAnchor.removeClass('active');

    $(this).children('.anchor').addClass("active");

    //3. 선택된 Category의 product를 하단에 받아와서 출력
    if (curId !== preId) {
        truncateProductList();
        if (curId === 0) {
            getProducts();
        } else {
            getProductByCategory(curId);
        }
    }
});

//더보기 버튼 클릭 시 동작
$('.more > .btn').on('click', function() {
    var selectedId = $('.section_event_tab').find('.active').parents('.item').data('category');

    if (selectedId === 0) {
        getProducts();
    } else {
        getProductByCategory(selectedId);
    }
});

//Scroll이 제일 하단으로 이동되는 경우 '더보기 버튼 없이' 상품 리스트 추가
$(window).scroll(function() {
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {

        var selectedId = $('.section_event_tab').find('.active').parents('.item').data('category');
        if (selectedId === 0) {
            getProducts();
        } else {
            getProductByCategory(selectedId);
        }
    }
});



$(".wrap_event_box").on("click",".item_preview",function(e){
    var productId = $(this).data("product");
    var url = "./detail/" + productId;

    //redirect to product page
    //similar behavior as clicking on a link
    window.location.href=url;
    //similar behavior as an HTTP redirect
    // window.location.replace("./detail/1");
});



//document ready
$(function() {
    getCategories();
    getProductCount();
    getProducts();
});

$(window).on("load",function(){
    timerModule.initTimerModule();
    timerModule.intervalSet();
});
