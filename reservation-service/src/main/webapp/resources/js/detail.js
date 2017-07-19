

var titleModule = (function(){
	var totalImgCount = $(".visual_img li").length;
	var currentElement = $(".figure_pagination span:first");
	var currentImgOffset = currentElement.text();

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
		moveRight: rightBehavior,
		moveLeft: leftBehavior,
		setImgCount: setImgCount,
		initEvent: initEvent,
		initDisplay: initDisplay
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

//------------------ 예매하기 클릭 시
// 1. 판매종료 & 매진
//	 - 판매기간 종료, 매진
// function(){
// 	if(판매종료){
// 		$(".section_btn span").text("판매기간 종료");
// 	} else if(매진){
// 		$(".section_btn span").text("매진");
// 	}
// }

var touch_start_y = 0;
var touch_start_x = 0;
var save_x = 0;
var save_y = 0;
var move_dx = 0;

function touchInit(e){
	touch_start_x = e.touches[0].pageX;
	touch_start_y = e.touches[0].pageY;
	console.log(e.touches);
	console.log("x: %o",touch_start_x);
	console.log("y: %o",touch_start_y);
}

function touchService(e){
	var drag_dist = 0;
	var scroll_dist = 0;
	var width = $(this).width();

	console.log("width %o", width);
	//음수 양수에 따라서
	drag_dist = e.touches[0].pageX - touch_start_x;
	console.log("drag_dist : %o",drag_dist);
	scroll_dist = e.touches[0].pageY - touch_start_y;
	move_dx = (drag_dist/width) * 100;
	console.log("move_dx: %o", move_dx);
	if(Math.abs(drag_dist) > Math.abs(scroll_dist) && Math.abs(drag_dist) > (width>>1)){

		//이동된 값만큼 animate
	}
}

function touchDestroy(e){
	if(Math.abs(move_dx) > 40){
		if(move_dx < 0)
			carouselToLeft();
		else
			carouselToRight();
	} else{
		//저장된 save_x 혹은 save_y만큼 이동했다가.. 돌아올것?
	}
	console.log("move_dx %o", move_dx);

	touch_start_x = 0;
	touch_start_y = 0;
	move_x = 0;
	move_y =0;
	move_dx = 0;

	e.preventDefault();
}

$(".visual_img").bind("touchstart", touchInit);
$(".visual_img").bind("touchmove", touchService);
$(".visual_img").bind("touchend", touchDestroy);


$(".info_tab_lst").on("click","li",function(){
	$(this).toggleClass("active");
});

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

		var productDetailSource = $("#product_detail").html();
		var productDetailTemplate = Handlebars.compile(productDetailSource);
		var storeLocationInfoSource = $("#store_location_info").html();
		var storeLocationInfoTemplate = Handlebars.compile(storeLocationInfoSource);
		var groupBtnSource = $("#group_btn").html();
		var groupBtnTemplate = Handlebars.compile(groupBtnSource);

		console.log("res %o", res);

		placeLot = res.productDetail.placeLot;
		//have to make image download url on server
		var images = [];

		for(var i = 0; i < res.images.length; i++){

		}

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

		//---------------------------------------
		//dsc 값 채워주기
		$(".store_details .dsc").text(res.productDetail.description);

		//---------------------------------------
		//event정보가 있다면 값 채워주기
		if(res.productDetail.event === null){
			$(".section_event").hide();
		} else{
			$(".event_info .in_dsc").text(res.productDetail.event);
		}

		var temp = $(".detail_info_group .in_dsc").text(res.productDetail.content);
		$(".box_store_info").append(storeLocationInfoTemplate(res.productDetail));
		$(".group_btn_goto").append(groupBtnTemplate(res.productDetail));

	}).fail(function(jQueryXhr, status){

	});
}
// to use handlebars
// <div class="group_btn_goto">
//     <script id="product_detail" type="text/x-handlebars-template">
//     <a class="btn_goto_home" title="홈페이지" href="#" target="siteUrl"> <i class="fn fn-home1"></i> </a>
//     <a class="btn_goto_tel" title="전화" href="#"> <i class="fn fn-call1"></i> </a>
//     <a class="btn_goto_mail" title="이메일" href="#"> <i class="fn fn-mail1"></i> </a>
//     <a href="#" class="btn_goto_path" title="길찾기"> <i class="fn fn-path-find1"></i> </a>
//     <a href="#" class="fn fn-share1 naver-splugin btn_goto_share" title="공유하기"></a>
//     </script>
// </div>

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

//-------------------------------------------------
//reservation_commnet
function getComment(){
	var limit = 3;
	var offset = 0;
	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);
	//http://localhost:8080/api/comment?productid=3&limit=3&offset=0
	var url = "/api/comment?productid="+productId+"&limit="+limit+"&offset="+offset;

	var commentSource = $("#comment_list").html();
	var commentTemplate = Handlebars.compile(commentSource);
	
	$.ajax({
		url : url,
		method : "GET",
	}).done(function(res,status){
		console.log(res);
		var fileId = res.fileIdDto;
		var userComment = res.userComment;
		
		var result = [];
		var arr = [];

		for(var i = 0; i<fileId.length;i++){
			arr[fileId[i].userId] = [];
		}

		for(var i = 0; i<fileId.length;i++){			
			arr[fileId[i].userId].push(fileId[i].id);
		}
		console.log("arr %o", arr);
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


//-------------------------------------------------
//예매 한줄평 평점, 전체 리뷰수
function getUserCommentCommonInfo(){
	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);
	$.ajax({
		url : "/api/comment/commoninfo/"+productId,
		method : "GET",
	}).done(function(res, status){
		var commonInfoSource = $("#comment_commoninfo").html();
		var commonInfoTemplate = Handlebars.compile(commonInfoSource);
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

//-------------------------------------------------
//naver map
// 1. 주소 -> 좌표 api
// 	- 좌표 get
// 2. StaticMap api
// 	- 지정된 좌표로 네이버 지도 이미지 출력
//Client ID : AiZisW993TeCGaS7Wq87
//Client secret : 3oLOkvQf_Q
//address : 서울특별시 강남구 역삼동 825-11

function getStaticNaverMapImage(){
	var temporalAddress = "서울특별시 노원구 월계동 411-3";//"서울특별시 강남구 역삼동 825-11";
	var encodedAddress = encodeURI(temporalAddress);
	console.log(encodedAddress);
	$.ajax({
		url : "/api/map/"+encodedAddress,
		method : "GET",
	}).done(function(res, status){
		// console.log("%o, %o, %o",res, res.result.items[0].point.x, res.result.items[0].point.y);
		
		var commonInfoSource = $("#store_location").html();
		var commonInfoTemplate = Handlebars.compile(commonInfoSource);

		var coordinate = {
			x : res.location.items[0].point.x,
			y : res.location.items[0].point.y
		}

		console.log(res);
		console.log(status);
		$(".store_location").append(commonInfoTemplate(coordinate));
	}).fail(function(jQueryXhr, status){

	});
}

//-------------------------------------------------
//layer popup


$(document).ready(function(){
	//countImage();
	getProductDetail();
	getComment();
	getUserCommentCommonInfo();
	getStaticNaverMapImage();
	
	titleModule.initDisplay();
	titleModule.setImgCount();
	titleModule.initEvent();
});

$(window).on("load",function(){
	// image resource가 모두 load된 다음 동작 할 수 있게 window load에 위치
	
});
