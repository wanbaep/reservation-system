

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


//펼쳐보기 접기 Evnet처리
$("._open").on("click", function(){
	$(".store_details").toggleClass("close3");
	$("._open").css("display","none");
	$("._close").css("display","block");
});

$("._close").on("click", function(){
	$(".store_details").toggleClass("close3");
	$("._close").css("display","none");
	$("._open").css("display","block");
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

//------------------ 예매자 한줄평
// function loadComment(){
// 	//1. server로부터 값 가져오기
// 	//  - 총 건수, 총(전체) 평점
// 	//  - 예매자 한줄평 데이터
// 	//	   - 평점, 사진, 텍스트, 아이디, 작성일, 
// 	//     - limit 3 row
	
	// review list 
	// $(".list_short_review").append(".list_item");
	// handlebars를 이용
// }

/*
<ul class="list_short_review">
<script id="review_list" type="text/x-handlebars-template">
{{#each this}}
<li class="list_item">
    <div>
        <div class="review_area">
            {{#if image}}
            <div class="thumb_area">
                <a href="#" class="thumb" title="이미지 크게 보기"> <img width="90" height="90" class="img_vertical_top" src="http://naverbooking.phinf.naver.net/20170306_3/1488772023601A4195_JPEG/image.jpg?type=f300_300" alt="리뷰이미지"> </a>
                <span class="img_count">1</span>                                                
            </div>
            {{/if}}
            <h4 class="resoc_name">{{productName}}</h4>
            <p class="review">{{reviewText}}</p>
        </div>
        <div class="info_area">
            <div class="review_info"> <span class="grade">{{score}}</span> <span class="name">{{username}}</span> <span class="date">{{creadDate}}. 방문</span> </div>
        </div>
    </div>
</li>
{{/each}}
*/

var reviewModule = (function(){
	/*var reviewList = $("#review_list").html();
	var reviewListTemplate = Handlebars.compile(reviewList);

*/
})();

function review(){
	/*var reviewList = $("#review_list").html();
	var reviewListTemplate = Handlebars.compile(reviewList);
*/
	var reviewObj = [];

	ajaxModule.setting("/api/comment?productid=3&limit=3&offset=0", "GET");
	var result = ajaxModule.getAjax();

    result.done(function(res) {
        
        console.log(res);

        for(var i = 0; i < res.length; i++){
        	if(i > 0){
        		if(reviewObj[i-1].userId === res[i].userId){
        			reviewObj.push({
	        			comment: res[i].comment,
		        		createDate: res[i].createDate,
		        		id: res[i].id,
		        		productId : res[i].productId,
		        		score: res[i].score,
		        		userId: res[i].userId
	        		});
        		}
        	} else{
        		reviewObj.push({
        			comment: res[i].comment,
	        		createDate: res[i].createDate,
	        		id: res[i].id,
	        		productId : res[i].productId,
	        		score: res[i].score,
	        		userId: res[i].userId
        		});
        	}
        	
        }

        console.log(reviewObj);

        ajaxModule.cleanAjax();
    });


}

$(".info_tab_lst").on("click","li",function(){
	$(this).toggleClass("active");
});

$(document).ready(function(){
	//countImage();
	titleModule.initDisplay();
	titleModule.setImgCount();


	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);	//productId slice

	review();
});

$(window).on("load",function(){
	// image resource가 모두 load된 다음 동작 할 수 있게 window load에 위치
	titleModule.initEvent();
});