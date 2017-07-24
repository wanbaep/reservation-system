//Display Component
function Display(){

}
Display.prototype = new eg.Component();
Display.prototype.constructor = Display;
Display.prototype.update = function(e, qty, totalQty){

	$(e.target).siblings(".count_control_input").val(qty);

	var price = $(e.target).closest(".qty").find(".product_price").data("price");

	var result = price*qty;
	$(e.target).closest(".qty").find(".total_price").text(result.toLocaleString());
	this.displayTotalQty(totalQty);
};
Display.prototype.displayTotalQty = function(totalQty){
	var inlineTxtFront = $(".inline_txt").text().split(",")[0];
	var inlineTxtBehind = ", 총 " + totalQty +"매";
	$(".inline_txt").text(inlineTxtFront+inlineTxtBehind);
}

//Subject Component
function Subject(){

}
Subject.prototype = new eg.Component();
Subject.prototype.constructor = Subject;
Subject.prototype.totalCount = 0;
Subject.prototype.display = new Display();
Subject.prototype.setplus = function(e){
	var qty = $(e.target).siblings(".count_control_input").val();
	qty++;
	this.totalCount++;
	if(this.totalCount > 0){
		$(e.target).siblings(".ico_minus3").removeClass("disabled");
	}
	this.notify(e, qty, this.totalCount);
};
Subject.prototype.setminus = function(e){
	var qty = $(e.target).siblings(".count_control_input").val();
	if(qty !== "0"){
		qty--;
		if(qty === 0){
			$(e.target).addClass("disabled");
		}
		this.totalCount--;
		this.notify(e, qty, this.totalCount);
	}
};
Subject.prototype.registerPlusObserver = function(){
	this.on("plus", this.setplus);
};
Subject.prototype.registerMinusObserver = function(){
	this.on("minus", this.setminus);
};
Subject.prototype.unRegisterPlusObserver = function(){
	this.off("plus", this.setplus);
};
Subject.prototype.unRegisterMinusObserver = function(){
	this.off("minus", this.setminus);
};
Subject.prototype.init = function(){
	this.display.on("update",this.display.update);
}
Subject.prototype.notify = function(e, qty, totalQty){
	this.display.trigger("update",e, qty, totalQty);
};

var UserInfoInspectionModule = (function(){
	var telExp = /^\d{3}-\d{3,4}-\d{4}$/;
	var emailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	function inspectTelNumber(){
		if(!telExp.test($("#tel").val())){
			return false;
		} else{
			return true;
		}
	}
	function inspectEmailAddress(){
		if(!emailExp.test($("#email").val())){
			return false;
		} else{
			return true;
		}
	}
	return {
		inspectTelNumber : inspectTelNumber,
		inspectEmailAddress : inspectEmailAddress
	}

})();
//상품 요약 영역
function productSummary(data){
	//제목
	var titleImage = data.titleImage;
	var priceInfo = data.priceInfo;
	var displayInfo = data.displayInfo;
	var weekDay = ["(일)","(월)","(화)","(수)","(목)","(금)","(토)"];
	$(".title").text(displayInfo.name);

	//사진
	if(titleImage !== null) {
		$(".visual_img img").prop("src","/files/"+titleImage.fileId);
	}
		//사진 내부 text
	$(".preview_txt_tit").text(displayInfo.name);
	$(".preview_txt em:first").text("₩"+priceInfo[0].price.toLocaleString()+" ~ ");
	var startDate = new Date(displayInfo.salesStart);
	var endDate = new Date(displayInfo.salesEnd);
	var period = displayInfo.salesStart + weekDay[startDate.getDay()] + " ~ " + displayInfo.salesEnd + weekDay[endDate.getDay()];
	$(".preview_txt em:last").text(period);

	//요약 정보
	var $titSummaryEle = $(".store_details .in_tit");
	var $dscSummaryEle = $(".store_details .dsc");
	$($titSummaryEle[0]).text(displayInfo.name);
	$($dscSummaryEle[0]).html("장소 : " + displayInfo.placeName	+ "<br>기간 : " + period);

	$($titSummaryEle[1]).text("관람시간");
	$($dscSummaryEle[1]).html(displayInfo.observationTime);

	$($titSummaryEle[2]).text("요금");
	var dscText = "";
	for(var i = 0; i < priceInfo.length; i++){
		if(priceInfo[i].priceType === 1){
			dscText += "성인(만 19~64세) ";
		} else if(priceInfo[i].priceType === 2){
			dscText += "청소년(만 13~18세) ";
		} else if(priceInfo[i].priceType === 3){
			dscText += "유아(만 4~12세) ";
		}
		dscText += priceInfo[i].price.toLocaleString()+"원 ";
		if(i%2 === 0 && i+1 !== priceInfo.length){
			dscText += "/ ";
		} else if(i%2 === 1 && i+1 !== priceInfo.length){
			dscText += "<br>";
		}
	}
	$($dscSummaryEle[2]).html(dscText);
}


//예약 티켓 수 선택 영역
function reservationTicketArea(priceInfo){
	var ticketSource = $("#ticket-list").html();
	var ticketTemplate = Handlebars.compile(ticketSource);

	var ticketPrice = [];
	var priceType = '';
	var discountedPrice ='';
	for(var i = 0; i < priceInfo.length; i++){
		if(priceInfo[i].priceType === 1){
			priceType = "성인";
		} else if(priceInfo[i].priceType === 2){
			priceType = "청소년";
		} else if(priceInfo[i].priceType === 3){
			priceType = "유아";
		} else{
			priceType = "기타";
		}

		discountedPrice = priceInfo[i].price*(1-priceInfo[i].discountRate.toFixed(1));
		ticketPrice[i] = {
			type : priceInfo[i].priceType,
			priceType : priceType,
			price : priceInfo[i].price.toLocaleString(),
			actualPrice : discountedPrice,
			discountPrice : discountedPrice.toLocaleString(),
			discountRate : (priceInfo[i].discountRate*100)
		}
	}

	$(".ticket_body").append(ticketTemplate(ticketPrice));
}


//예매자 정보 영역 -> session값으로 처리


//약관 동의 영역
function agreementArea(){
	$(".section_booking_agreement").on("click", ".btn_agreement", function(){
		console.log(this);
		$(this).closest(".agreement").toggleClass("open");
	});

	$(".chk_agree").on("click", function(){
		if($(".chk_agree").hasClass("checked")){
			$(".chk_agree").removeClass("checked");
			$(".bk_btn_wrap").addClass("disable");
		} else{
			$(".chk_agree").addClass("checked");
			$(".bk_btn_wrap").removeClass("disable");
		}
	});
}

//예약하기 버튼 영역
function reservationButtonArea(){
	$(".bk_btn_wrap").on("click",function(){
		if(!$(this).hasClass("disable")){
			console.log("예약하기로 넘어가기");

			var telExp = /^\d{3}-\d{3,4}-\d{4}$/;
			var emailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

			if(!telExp.test($("#tel").val())){
				console.log("잘못된 번호");
				return ;
			}

			if(!emailExp.test($("#email").val())){
				console.log("잘못된 email");
				return ;
			}
		}
	});
}

//document ready
$(function(){
	var pathname = $(location).attr('pathname');
	var productId = pathname.slice(-1);
	$.ajax({
		url: "/api/reserve/"+productId,
		method: "GET",
	}).done(function(response, status){
		productSummary(response);
		reservationTicketArea(response.priceInfo);

	}).fail(function(jQueryXhr, status){

	});
	agreementArea();
	reservationButtonArea();
	//이전페이지로 이동
	$(".btn_back").on("click",function(){
		history.back();
	});


	// $(".ticket_body").on("click",".btn_plus_minus", function(e){
	// 	console.log(e);
	// 	console.log(this);
	// 	$(this).addClass("disabled");
	// });

	var subject = new Subject();
	subject.init();
	subject.registerPlusObserver();
	subject.registerMinusObserver();

	$(".ticket_body").on("click", ".btn_plus_minus", function(e){
		if($(this).hasClass("ico_plus3")) {
			subject.trigger("plus",e);
		} else if($(this).hasClass("ico_minus3")) {
			subject.trigger("minus",e);
		}
	});

});

