

var titleModule = (function(){
	var totalImgCount = 0;
	var currentElement = '';
	var currentImgOffset = 0;

	function init(){
		totalImgCount = $(".visual_img li").length;
		currentElement = $(".figure_pagination span:first");
		currentImgOffset = currentElement.text();
		initDisplay();
		setImgCount();
		initEvent();
	}
	function rightBehavior(){
		if(--currentImgOffset <= 0){
			currentImgOffset = totalImgCount;
		}
		carouselToRight();
		currentElement.text(currentImgOffset);
	}
	function leftBehavior(){
		if(++currentImgOffset > totalImgCount){
			currentImgOffset = 1;
		}
		carouselToLeft();
		currentElement.text(currentImgOffset);
	}
	function setImgCount(){
		$(".figure_pagination span:last").text(totalImgCount);
	}
	function initEvent(){
		if(totalImgCount > 1){
			$(".btn_nxt").on("click",titleModule.moveLeft);
			$(".btn_prev").on("click",titleModule.moveRight);
		}
	}
	function initDisplay(){
		if(totalImgCount <= 1){
			$(".btn_nxt").css("display","none");
			$(".btn_prev").css("display","none");
		}
	}

	return {
		initAfterProuductDetailLoad : init,
		moveRight: rightBehavior,
		moveLeft: leftBehavior,
	}
})();

var placeLot = '';

//펼쳐보기 접기 Evnet처리
$("._open").on("click", function(){
	$(".store_details").toggleClass("close3");
	$("._open").hide();
	$("._close").show();
});

$("._close").on("click", function(){
	$(".store_details").toggleClass("close3");
	$("._close").hide();
	$("._open").show();
});

//------- 예매하기 값 ---------
// 1. 판매종료 & 매진
//	 - 판매기간 종료, 매진
// function(){
// 	if(판매종료){
// 		$(".section_btn span").text("판매기간 종료");
// 	} else if(매진){
// 		$(".section_btn span").text("매진");
// 	}
// }

////////////////
// touch area //
////////////////
var touch_start_y = 0;
var touch_start_x = 0;
var save_x = 0;
var save_y = 0;
var move_dx = 0;

function touchInit(e){
	touch_start_x = e.touches[0].pageX;
	touch_start_y = e.touches[0].pageY;
}

function touchService(e){
	var drag_dist = 0;
	var scroll_dist = 0;
	var width = $(this).width();

	//음수 양수에 따라서
	drag_dist = e.touches[0].pageX - touch_start_x;
	scroll_dist = e.touches[0].pageY - touch_start_y;
	move_dx = (drag_dist/width) * 100;
	if(Math.abs(drag_dist) > Math.abs(scroll_dist) && Math.abs(drag_dist) > (width>>1)){

		//이동된 값만큼 animate
	}
}

function touchDestroy(e){
	if(Math.abs(move_dx) > 40){
		if(move_dx < 0)
			titleModule.moveLeft();
		else
			titleModule.moveRight();
	} else{
		//저장된 save_x 혹은 save_y만큼 이동했다가 돌아올것
	}

	touch_start_x = 0;
	touch_start_y = 0;
	move_x = 0;
	move_y =0;
	move_dx = 0;

	e.preventDefault();
}

function titleTouchInit(){
	$(".visual_img").bind("touchstart", touchInit);
	$(".visual_img").bind("touchmove", touchService);
	$(".visual_img").bind("touchend", touchDestroy);
}

function titleTouchDestroy(){
	$(".visual_img").unbind("touchstart", touchInit);
	$(".visual_img").unbind("touchmove", touchService);
	$(".visual_img").unbind("touchend", touchDestroy);
}

function popupTouchInit(){
	$(".visual_pop").bind("touchstart", touchInit);
	$(".visual_pop").bind("touchmove", touchService);
	$(".visual_pop").bind("touchend", touchDestroy);
}

function popupTouchDestroy(){
	$(".visual_pop").unbind("touchstart", touchInit);
	$(".visual_pop").unbind("touchmove", touchService);
	$(".visual_pop").unbind("touchend", touchDestroy);
}


$(".info_tab_lst").on("click","li",function(){
	$(this).toggleClass("active");
});

///////////////////////
//Product Detail area//
///////////////////////
var productDetailSource = $("#product_detail").html();
var productDetailTemplate = Handlebars.compile(productDetailSource);
var storeLocationInfoSource = $("#store_location_info").html();
var storeLocationInfoTemplate = Handlebars.compile(storeLocationInfoSource);
var groupBtnSource = $("#group_btn").html();
var groupBtnTemplate = Handlebars.compile(groupBtnSource);

function getProductDetail(){
	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);
	var url = "/api/product/"+productId;

	$.ajax({
		url : url,
		method : "GET",
	}).done(function(res, status){
		var name = res.productDetail.name;
		var productDetail = [];
		// placeLot = res.productDetail.placeLot;
		
		for(var i = 0; i < res.images.length; i++){
			var imageUrl = "/files/"+res.images[i];
			productDetail[i] = {
				title : res.productDetail.name,
				dsc : res.productDetail.description,
				image : imageUrl
			}
		}

		var html = productDetailTemplate(productDetail);
		$(".visual_img").append(html);

		//dsc 값 채워주기
		$(".store_details .dsc").text(res.productDetail.description);

		//event정보가 있다면 값 채워주기
		if(res.productDetail.event === null){
			$(".section_event").hide();
		} else{
			$(".event_info .in_dsc").text(res.productDetail.event);
		}

		var temp = $(".detail_info_group .in_dsc").text(res.productDetail.content);
		$(".box_store_info").append(storeLocationInfoTemplate(res.productDetail));
		$(".group_btn_goto").append(groupBtnTemplate(res.productDetail));

		titleModule.initAfterProuductDetailLoad();

	}).fail(function(jQueryXhr, status){

	});
}


$(".info_tab_lst").on("click", ".anchor", function(e){
	if($(this).closest("li").hasClass("_detail")){
		//_detail이 클릭된 경우
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$(this).closest("ul").find("._path a").removeClass("active");
			$(".detail_area_wrap").removeClass("hide");
			$(".detail_location").addClass("hide");
		}
	} else{
		//_path가 클릭된 경우
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$(this).closest("ul").find("._detail a").removeClass("active");
			$(".detail_area_wrap").addClass("hide");
			$(".detail_location").removeClass("hide");
		}
	}
});

//////////////////////////////
//UserCommentCommonInfo area//
//////////////////////////////
var commonInfoSource = $("#comment_commoninfo").html();
var commonInfoTemplate = Handlebars.compile(commonInfoSource);

function getUserCommentCommonInfo(){
	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);

	$.ajax({
		url : "/api/comment/commoninfo/"+productId,
		method : "GET",
	}).done(function(res, status){
		
		var avgScoreFixed = res.avgScore.toFixed(1);
		var percentScore = (avgScoreFixed/5.0) * 100;

		result = {
			count : res.count,
			avgScore : avgScoreFixed,
			percentScore : percentScore
		};

		$(".grade_area").append(commonInfoTemplate(result));

	}).fail(function(jQueryXhr, status){

	});

}

////////////////////////////
//reservation_commnet area//
////////////////////////////
var commentSource = $("#comment_list").html();
var commentTemplate = Handlebars.compile(commentSource);
var result = [];

function getComment(){
	var limit = 3;
	var offset = 0;
	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);

	var url = "/api/comment?productid="+productId+"&limit="+limit+"&offset="+offset;

	$.ajax({
		url : url,
		method : "GET",
	}).done(function(res,status){
		var fileId = res.fileIdDto;
		var userComment = res.userComment;
		
		result = [];
		var arr = [];

		for(var i = 0; i<fileId.length;i++){
			arr[fileId[i].userId] = [];
		}

		for(var i = 0; i<fileId.length;i++){			
			arr[fileId[i].userId].push(fileId[i].id);
		}
		var img = '';
		for(var i=0;i<userComment.length;i++){
			if(arr[i] !== undefined){
				img = "/files/"+arr[i][0];
			} else{
				img = 0;
			}
			// 
			result[i] = {
				comment : userComment[i].comment,
				createDate : userComment[i].createDate,
				id : userComment[i].id,
				score : userComment[i].score.toFixed(1),
				userId : userComment[i].userId,
				images : arr[i],
				firstImage : img
			}
		}

		$(".list_short_review").append(commentTemplate(result));
		
	}).fail(function(jQueryXhr, status){

	});
}


////////////////////////////////////
//naver map
// 1. 주소 -> 좌표 api
// 	- 좌표 get
// 2. StaticMap api
// 	- 지정된 좌표로 네이버 지도 이미지 출력
////////////////////////////////////
function getStaticNaverMapImage(){
	var temporalAddress = "서울특별시 노원구 월계동 411-3";//"서울특별시 강남구 역삼동 825-11";
	var encodedAddress = encodeURI(temporalAddress);

	$.ajax({
		url : "/api/map/"+encodedAddress,
		method : "GET",
	}).done(function(res, status){
		
		var commonInfoSource = $("#store_location").html();
		var commonInfoTemplate = Handlebars.compile(commonInfoSource);

		var coordinate = {
			x : res.location.items[0].point.x,
			y : res.location.items[0].point.y
		}

		$(".store_location").append(commonInfoTemplate(coordinate));
	}).fail(function(jQueryXhr, status){

	});
}

////////////////
//layer popup //
////////////////
// <div id="photoviwer">
    
//     <div class="container_visual" style="width: 414px;">
//         <ul class="visual_img">
//             <li class="item" style="width: 414px;"> 
//                 <img alt="{{title}}" class="img_thumb" src="{{image}}"> <span class="img_bg"></span>
//                 <div class="visual_txt">
//                     <div class="visual_txt_inn">
//                         <h2 class="visual_txt_tit"> <span>{{title}}</span> </h2>
//                         <p class="visual_txt_dsc">{{dsc}}</p>
//                     </div>
//                 </div>
//             </li>
//         </ul>
//     </div>
    
// </div>

var popupSource = $("#popup_image").html();
var popupTemplate = Handlebars.compile(popupSource);

$(".list_short_review").on("click", ".thumb", function(e){
	
	titleTouchDestroy();
	var commentId = $(this).closest('li').data('comment');

	if(commentId !== undefined || commentId !== 0){
		commentId -= 1;
	}

	console.log(result[commentId]);
	var temp = result[commentId];
	var arr = [];

	for(var i = 0; i < temp.images.length; i++){
		arr[i] = {
			images : "/files/" + result[commentId].images[i]
		}
	}
	
	console.log(arr);
	console.log("images %o", result[commentId].images);

	// $(".pop-container").append(popupTemplate(arr))
	$(".pop-layer .visual_pop").html(popupTemplate(arr));
	$(".dim-layer").fadeIn();

	
	popupTouchInit();
	// $('#popup_layer').css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");

});

$('.layer .dimBg').click(function(){
    // popupTouchDestroy();
    $('.dim-layer').fadeOut();
    // titleTouchInit();
});

$(document).mouseup(function(e){
	console.log(e);
	var $container = $(".pop-layer");
	if($container.has(e.target).length === 0){
		$('.dim-layer').fadeOut();
	}
});

$(document).ready(function(){
	getProductDetail();
	getUserCommentCommonInfo();
	getComment();
	getStaticNaverMapImage();

});

$(window).on("load",function(){
	// image resource가 모두 load된 다음 동작 할 수 있게 window load에 위치
	titleTouchInit();
});
