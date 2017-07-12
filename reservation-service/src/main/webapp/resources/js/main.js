(function (window){

    function startTimer(){

      setInterval(function(){
        rollingBannerLeft();
      },2000);

    }

  $(document).ready(function(){

    truncateProductList();

    //load categories
    getCategories();
    getProductCount();
    loadAllCategory();
    startTimer();

    //rollingBannerLeft();
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
  })



  $('.btn_pre_e').hover(function(){
    $('.visual_img').stop();
    //$('.visual_img > .item:first').stop();

  });

  $('.btn_pre_e').on('click',function(){
    rollingBannerRight();

  //  $('.visual_img > .item:first').stop();
  //  $('.visual_img > .item:last').stop();
  });

  $('.btn_nxt_e').on('click',function(){
    rollingBannerLeft();
  })

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
    $('.visual_img > .item:first').animate({marginLeft:-width},{duration:2000,complete:function(){

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
    $('.visual_img > .item:first').animate({marginLeft:0},{duration:2000,complete:function(){

      $('.visual_img > .item:last').remove();
    }});
  }


  function getCategories(){
    $.ajax({
      url: './categories/list',
      method: 'GET',
      dataType: 'json',
      success: function(response){
        var $category_parent = $('.section_event_tab').find('ul');
        var $category = $('<li></li>');
        var $anchor=$('<a></a>');
        var $span = $('<span></span>');

        //category list 삭제
        $category_parent.empty();

        //'전체'에 해당하는 Category tag생성 후 append
        $category.addClass('item');
        //$category.data('category',0);
        $category.attr('data-category','0');

        $anchor.addClass('anchor');
        $anchor.addClass('active');

        $span.text('전체');

        $category_parent.append($category);
        $category.append($anchor);
        $anchor.append($span);

        for(var i = 0; i < response.length; i++){
          var category = $('<li></li>');
          var anchor=$('<a></a>');
          var span = $('<span></span>');

          category.addClass('item');
          category.attr('data-category',response[i].id);

          anchor.attr('class','anchor');
          span.text(response[i].name);

          $category_parent.append(category);
          category.append(anchor);
          anchor.append(span);
        }
        //last element 'last' class add
        anchor.addClass('last');
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



  function loadAllCategory(){
    var offset = $('.wrap_event_box').find('li').length;
    var limit = 10;

    $.ajax({
      url: './api/productlist/'+limit+'/'+offset,
      method: 'GET',
      success: function(response){
        //2
        //root -> .wrap_event_box
        //children -> .lst_evnet_box 좌우 2개
        var $first = $('.wrap_event_box > .lst_event_box:first-child');
        var $second = $first.next();//$('.wrap_event_box > .lst_event_box:last-child');

        var parent = new Array();
        parent[0]=$first;
        parent[1]=$second;

        for(var i = 0; i<response.length; i++){
          var $item = $('<li class="item"></li>');
          var $itemBook = $('<a href="#" class="item_book"></a>');
          var $itemPreview = $('<div class="item_preview"></div>');
          var $imgThumb = $('<img class="img_thumb">');   //alt=name, src=saveFileName+fileName
          var $imgBorder = $('<span class="img_border"></span>');
          var $eventTxt = $('<div class="event_txt"></div>');
          var $eventTxtTit = $('<h4 class="event_txt_tit"></h4>');
          var $span = $('<span></span>'); //text(name);
          var $small = $('<small class="sm"></small>'); //text(placeName)
          var $eventTxtDsc = $('<p class="event_txt_dsc"></p>'); //text(content)

//          $first.append($item);
          parent[i%2].append($item);
          $item.append($itemBook);
          $itemBook.append($itemPreview).append($eventTxt);
          $itemPreview.append($imgThumb).append($imgBorder);
          $eventTxt.append($eventTxtTit).append($eventTxtDsc);
          $eventTxtTit.append($span).append($small);

          $imgThumb.attr('alt',response[i].name);
          $imgThumb.attr('src',response[i].saveFileName+response[i].fileName);
          $span.text(response[i].name);
          $small.text(response[i].placeName);
          $eventTxtDsc.text(response[i].content);
        }
      }
    })
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
        var $first = $('.wrap_event_box > .lst_event_box:first-child');
        var $second = $first.next();//$('.wrap_event_box > .lst_event_box:last-child');

        var parent = new Array();
        parent[0]=$first;
        parent[1]=$second;

        for(var i = 0; i<response.length; i++){
          var $item = $('<li class="item"></li>');
          var $itemBook = $('<a href="#" class="item_book"></a>');
          var $itemPreview = $('<div class="item_preview"></div>');
          var $imgThumb = $('<img class="img_thumb">');   //alt=name, src=saveFileName+fileName
          var $imgBorder = $('<span class="img_border"></span>');
          var $eventTxt = $('<div class="event_txt"></div>');
          var $eventTxtTit = $('<h4 class="event_txt_tit"></h4>');
          var $span = $('<span></span>'); //text(name);
          var $small = $('<small class="sm"></small>'); //text(placeName)
          var $eventTxtDsc = $('<p class="event_txt_dsc"></p>'); //text(content)

//          $first.append($item);
          parent[i%2].append($item);
          $item.append($itemBook);
          $itemBook.append($itemPreview).append($eventTxt);
          $itemPreview.append($imgThumb).append($imgBorder);
          $eventTxt.append($eventTxtTit).append($eventTxtDsc);
          $eventTxtTit.append($span).append($small);

          $imgThumb.attr('alt',response[i].name);
          $imgThumb.attr('src',response[i].saveFileName+response[i].fileName);
          $span.text(response[i].name);
          $small.text(response[i].placeName);
          $eventTxtDsc.text(response[i].content);
        }

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
