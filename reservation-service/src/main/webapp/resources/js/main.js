(function (window){


  $(document).ready(function(){

    $('visual_img').animate({left:-338},200);

    //load categories
    getCategories();
  });

  function getCategories(){
    $.ajax({
      url: './categories/list',
      method: 'GET',
      dataType: 'json',
      success: function(response){
        var $category_parent = $('.section_event_tab').children('ul');

        $category_parent.empty();

        anchor_class = 'anchor active';

        for(var i = 0; i < response.length; i++){
          var $category = $('<li></li>');
          $category.attr('class',"item");
          $category.attr('data-category',response[i].id);

          var $anchor=$('<a></a>');

          $anchor.attr('class',anchor_class);

          var $span = $('<span></span>');
          $span.html(response[i].name);

          $category_parent.append($category);
          $category.append($anchor);
          $anchor.append($span);

          anchor_class = 'anchor';
        }
        console.log($('a[class="anchor active"]').children('span').text());
      }
    })
  }

  $('.event_tab_lst').on('click','.item',function(){
    //1. Category Id를 가져온다.
    var cat_id = $(this).attr('data-category');

    //2. anchor class 변환
    $('a[class="anchor active"]').attr('class','anchor');
    $(this).children('.anchor').addClass("active");

    //3. 선택된 Category의 product를 하단에 받아와서 출력

  });

  //console.log($('.visual_img').children('li').length);

  $('.btn_nxt_e').on('click',function(){
    var cur = $('.visual_img > .item');
    var nxt = cur.next();

    $('visual_img > .item').not([cur, nxt]).css('z-index',1);
  });
  //$('.visual_img').animate({left:338})

})(window);
