(function (window){

  var time = 2000;
  var INTERVAL = null;
  var TIMER = null;

  var timerInterval = function(){
    //setInterval의 객체를 받아와서 clearInterval을 수행해 주어야 한다.
    INTERVAL = setInterval(rollingBannerLeft,time);
  }

  function stopInterval(){
    clearInterval(INTERVAL);
    INTERVAL = null;
  }

  window.onload = function(){
    timerInterval();
  }

  $(document).ready(function(){

    getCategories();
    getProductCount();
    loadAllCategory();

  });

  //Scroll이 제일 하단으로 이동되는 경우 '더보기 버튼 없이' 상품 리스트 추가
  $(window).scroll(function(){
    if($(window).scrollTop() === $(document).height() - $(window).height()){

      var selectedId = $('.section_event_tab').find('.active').parents('.item').data('category');
      if(selectedId === 0){
        loadAllCategory();
      } else {
        loadOneCategory(selectedId);
      }
    }
  });

  $('.btn_pre_e').mouseenter(function(){

    if(INTERVAL != null){
      clearInterval(INTERVAL);
      INTERVAL = null;
    }
    if(TIMER != null){
      TIMER = null;
    }

    TIMER = setTimeout(timerInterval(),4000);
  });

  $('.btn_nxt_e').mouseenter(function(){
    if(INTERVAL != null){
      clearInterval(INTERVAL);
      INTERVAL = null;
    }
    if(TIMER != null){
      TIMER = null;
    }
    TIMER = setTimeout(timerInterval(),4000);
  });

  $('.btn_pre_e').on('click',function(){
    if(TIMER != null){
      clearTimeout(TIMER);
      TIMER = null;
    }
    if(INTERVAL != null){
      clearInterval(INTERVAL);
      INTERVAL = null;
    }
    rollingBannerLeft();
    timerInterval();

  });

  $('.btn_nxt_e').on('click',function(){
    //rollingBannerLeft();
    if(TIMER != null){
      clearTimeout(TIMER);
      TIMER = null;
    }
    if(INTERVAL != null){
      clearInterval(INTERVAL);
      INTERVAL = null;
    }
    rollingBannerRight();
    timerInterval();
  });

  function rollingBannerLeft(){
    var rollRoot = $('.visual_img').parents('.container_visual');
    //너비설정
    var width = $('.visual_img > .item').width();

    var $item = $('<li class="item"></li>') //background-image, width 추가
    var $atag = $('<a href="#"></a>');
    var $imgBtmBorder = $('<span class="img_btm_border"></span>');
    var $imgRightBorder = $('<span class="img_right_border"></span>');
    var $imgBgGra = $('<span class="img_bg_gra"</span>');
    var $eventTxt = $('<div class="event_txt"></div>');
    var $eventTxtTit = $('<h4 class="event_txt_tit"></h4>');
    var $eventTxtAdr = $('<p class="event_txt_adr"></p>');
    var $eventTxtDsc = $('<p class="event_txt_dsc"></p>');

    $item.css('background-image',$('.visual_img > .item:first').css('background-image'));
    $item.css('width',$('.visual_img > .item:first').css('width'));
    $eventTxtTit.text($('.visual_img > .item:first > a > div > .event_txt_tit').text());
    $eventTxtAdr.text($('.visual_img > .item:first > a > div > .event_txt_adr').text());
    $eventTxtDsc.text($('.visual_img > .item:first > a > div > .event_txt_dsc').text());

    $item.append($atag);
    $atag.append($imgBtmBorder).append($imgRightBorder).append($imgBgGra).append($eventTxt);
    $eventTxt.append($eventTxtTit).append($eventTxtAdr).append($eventTxtDsc);

    //마지막에 맨 처음 태그 추가
    $('.visual_img').append($item);

    //맨 처음 페이지 왼쪽으로 이동
    $('.visual_img > .item:first').animate({marginLeft:-width},{duration:500,complete:function(){
      $(this).remove();
    }});
  }

  function rollingBannerRight(){
    var rollRoot = $('.visual_img').parents('.container_visual');
    //너비설정
    var width = $('.visual_img > .item').width();

    console.log($('.visual_img > .item:last').css('background-image'));
    console.log($('.visual_img > .item:last').css('width'));

    var $item = $('<li class="item"></li>') //background-image, width 추가
    var $atag = $('<a href="#"></a>');
    var $imgBtmBorder = $('<span class="img_btm_border"></span>');
    var $imgRightBorder = $('<span class="img_right_border"></span>');
    var $imgBgGra = $('<span class="img_bg_gra"</span>');
    var $eventTxt = $('<div class="event_txt"></div>');
    var $eventTxtTit = $('<h4 class="event_txt_tit"></h4>');
    var $eventTxtAdr = $('<p class="event_txt_adr"></p>');
    var $eventTxtDsc = $('<p class="event_txt_dsc"></p>');

    $item.css('background-image',$('.visual_img > .item:last').css('background-image'));
    $item.css('width',$('.visual_img > .item:last').css('width'));
    $item.css('margin-left',-1*width);
    $eventTxtTit.text($('.visual_img > .item:last > a > div > .event_txt_tit').text());
    $eventTxtAdr.text($('.visual_img > .item:last > a > div > .event_txt_adr').text());
    $eventTxtDsc.text($('.visual_img > .item:last > a > div > .event_txt_dsc').text());

    $item.append($atag);
    $atag.append($imgBtmBorder).append($imgRightBorder).append($imgBgGra).append($eventTxt);
    $eventTxt.append($eventTxtTit).append($eventTxtAdr).append($eventTxtDsc);

    //마지막에 맨 처음 태그 추가
    $('.visual_img').prepend($item);

    //맨 처음 페이지 왼쪽으로 이동
    $('.visual_img > .item:first').animate({marginLeft:0},{duration:500,complete:function(){

      $('.visual_img > .item:last').remove();
    }});
  }


  function getCategories(){
    $.ajax({
      url: './categories/list',
      method: 'GET',
      dataType: 'json',
      success: function(response){
        var template = Handlebars.compile(source3);
        var html = template(response);
        $('.section_event_tab').find('ul').append(html);
      }
    })
  }

  //상품리스트 비우는 함수
  function truncateProductList(){
    var $first = $('.wrap_event_box > .lst_event_box:first-child');
    var $second = $first.next();
    $first.empty();
    $second.empty();
  }

  $('.event_tab_lst').on('click','.item',function(event){
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
    if(curId !== preId){
      truncateProductList();
      if(curId === 0){
        loadAllCategory();
      } else {
        loadOneCategory(curId);
      }
    }
  });

  //Handlebars Id 설정
  var source = $("#lst_event_box_first").html();
  var source2 = $("#lst_event_box_second").html();
  var source3 = $("#category_list").html();

  function loadAllCategory(){
    var offset = $('.wrap_event_box').find('li').length;
    var limit = 10;

    $.ajax({
      url: './api/productlist/'+limit+'/'+offset,
      method: 'GET',
      success: function(response){


        var template = Handlebars.compile(source);
        var template2 = Handlebars.compile(source2);

        var data1 = [];
        var data2 = [];

        for(var i=0; i<response.length;i++){
          var img = response[i].saveFileName+response[i].fileName;

          if(i%2 === 0){
            data1.push({
              name:response[i].name, image:img, placeName:response[i].placeName, content:response[i].content
            });
          } else{
            data2.push({
              name:response[i].name, image:img, placeName:response[i].placeName, content:response[i].content
            })
          }
        }

        var html = template(data1);
        var html2 = template(data2);
        $('.wrap_event_box > .lst_event_box:first-child').append(html);
        $('.wrap_event_box > .lst_event_box:first-child').next().append(html2);
      }
    });
    //1
  }

  function loadOneCategory(categoryId){
    var offset = $('.wrap_event_box').find('li').length;
    var limit = 10;
    $.ajax({
      url: './api/productlist/'+limit+'/'+offset+'/'+categoryId,
      method: 'GET',
      success: function(response){
        //2
        var template = Handlebars.compile(source);
        var template2 = Handlebars.compile(source2);

        var data1 = [];
        var data2 = [];

        for(var i=0; i<response.length;i++){
          var img = response[i].saveFileName+response[i].fileName;

          if(i%2 === 0){
            data1.push({
              name:response[i].name, image:img, placeName:response[i].placeName, content:response[i].content
            });
          } else{
            data2.push({
              name:response[i].name, image:img, placeName:response[i].placeName, content:response[i].content
            })
          }
        }

        var html = template(data1);
        var html2 = template(data2);
        $('.wrap_event_box > .lst_event_box:first-child').append(html);
        $('.wrap_event_box > .lst_event_box:first-child').next().append(html2);
      }
    })
    //1
  }

  function getProductCount(){
    $.ajax({
      url: './api/productlist/count/0',
      method: 'GET',
      success: function(response){
        var str = response + "개";
        $('.event_lst_txt > .pink').text(str);
      }
    })
  }

  //더보기 버튼 클릭 시 동작
  $('.more > .btn').on('click',function(){
    var selectedId = $('.section_event_tab').find('.active').parents('.item').data('category');

    if(selectedId === 0){
      loadAllCategory();
    } else {
      loadOneCategory(selectedId);
    }
  });


})(window);
