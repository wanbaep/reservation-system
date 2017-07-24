var titleModule = (function(){
	var totalImgCount = 0;
	var currentElement = '';
	var currentImgOffset = 1;
	var clickInstance = null;
	var initTouchModuleOption = 1;

	function init(){
		totalImgCount = $(".visual_img li").length;
		currentElement = $(".figure_pagination span:first");
		
		decideButtonDisplay();
		setTotalImgCount();
		if(totalImgCount > 1){
			initClickCarousel();
			initTouchCarousel();
		}
	}
	function initClickCarousel(){
		clickInstance = carouselModule.getInstance();
		clickInstance.ready($(".visual_img"));
		$(".prev_inn").on("click", increaseCountByPrevClick);
		$(".nxt_inn").on("click", increaseCountByNxtClick);
	}
	function initTouchCarousel(){
		var initTouchModuleOption = 1;
		touchModule.initTouchModule(initTouchModuleOption, carouselModule.getInstance(),$(".visual_img"));
		$(".visual_img").bind("touchstart", touchModule.touchInit);
		$(".visual_img").bind("touchmove", touchModule.touchService);
		$(".visual_img").bind("touchend", controlCountByTouchEnd.bind(this));
	}
	function increaseCountByPrevClick(){
		if(--currentImgOffset <= 0){
			currentImgOffset = totalImgCount;
		}
		clickInstance.movePrev();
		currentElement.text(currentImgOffset);
	}
	function increaseCountByNxtClick(){
		if(++currentImgOffset > totalImgCount){
			currentImgOffset = 1;
		}
		clickInstance.moveNext();
		currentElement.text(currentImgOffset);
	}
	function controlCountByTouchEnd(event){
		var direction = touchModule.touchEnd(event);
		currentImgOffset += direction;

		if(currentImgOffset <= 0){
			currentImgOffset = totalImgCount;
		} else if(currentImgOffset > totalImgCount){
			currentImgOffset = 1;
		}
		currentElement.text(currentImgOffset);
	}
	function setTotalImgCount(){
		$(".figure_pagination span:last").text(totalImgCount);
	}
	function decideButtonDisplay(){
		if(totalImgCount <= 1){
			$(".btn_nxt").hide();
			$(".btn_prev").hide();
		}
	}

	return {
		init : init,
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
var touchModule = (function(){
	var carouselInstance = null;
	var touchStartY = 0;
	var touchStartX = 0;
	var moveDistanceX = 0;

	function initTouchModule(option, carousel, root){
		carouselInstance = carousel;//carouselModule.getInstance();
		if(option === 0){
			carouselInstance.ready(root);
		} else if(option === 1){
			carouselInstance.duplicatedRootReady(root);
		}
	}
	function touchInit(e){
		touchStartX = e.touches[0].pageX;
		touchStartY = e.touches[0].pageY;
	}

	function touchService(e){
		var dragDistance = 0;
		var scrollDistance = 0;
		var fakeMove = 0;
		var width = carouselInstance.getChildWidth();

		//음수 양수에 따라서
		dragDistance = e.touches[0].pageX - touchStartX;
		scrollDistance = e.touches[0].pageY - touchStartY;
		moveDistanceX = (dragDistance/width) * 100;

		if(Math.abs(dragDistance) > width){
			dragDistance = (dragDistance < 0) ? -width : width;
		}
		if(dragDistance > 0){
			fakeMove = dragDistance - width;
		} else{
			fakeMove = dragDistance -width;
		}

		if(Math.abs(dragDistance) > Math.abs(scrollDistance)){
			carouselInstance.getRootElement().stop(true,true).animate({left: fakeMove},500);
		}
	}

	function touchEnd(e){
		var width = carouselInstance.getChildWidth();
		var direction = 0;
		if(Math.abs(moveDistanceX) > 53){
			if(moveDistanceX < 0){
				carouselInstance.moveNext();
				direction = 1;
			}
			else {
				carouselInstance.movePrev();
				direction = -1;
			}
		} else{
			carouselInstance.getRootElement().stop(true,true).animate({left:-width},500);
		}

		touchStartX = 0;
		touchStartY = 0;
		moveDistanceX = 0;
		e.preventDefault();

		return direction;
	}

	return {
		initTouchModule : initTouchModule,
		touchInit : touchInit,
		touchService : touchService,
		touchEnd : touchEnd
	}

})();


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

function getDetailpageMainVisual(){
	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);
	var url = "/api/product/"+productId;

	$.ajax({
		url : url,
		method : "GET",
	}).done(function(res, status){
		_productId = res.productDetail.id;
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

		titleModule.init();

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

	
	// $('#popup_layer').css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");

});

$('.layer .dimBg').click(function(){
    $('.dim-layer').fadeOut();
});

$(document).mouseup(function(e){
	console.log(e);
	var $container = $(".pop-layer");
	if($container.has(e.target).length === 0){
		$('.dim-layer').fadeOut();
	}
});

$(function(){
	getDetailpageMainVisual();
	getUserCommentCommonInfo();
	getComment();
	getStaticNaverMapImage();
	
	//예매하기 버튼
	$(".section_btn").on("click",function(e){
		var pathname = $(location).attr('pathname');
		var productId = pathname.slice(-1);
	    var url = "/reserve/" + productId;
	    window.location.href=url;
	});

});

$(window).on("load",function(){
	// image resource가 모두 load된 다음 동작 할 수 있게 window load에 위치

});
