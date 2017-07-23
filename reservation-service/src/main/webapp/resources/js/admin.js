(function (window){

	//perform an asynchronous HTTP (Ajax) request
	function deleteCategory(id){
		$.ajax({
			url: '/api/categories'+id,
			method: 'DELETE',
			dataType:'json',
		}).done(function(response, status){
			var delete_id="#"+id;
			$(delete_id).remove();
			console.log(response, status);
			alert("카테고리를 삭제 했습니다.");
		}).fail(function(jQueryXhr, status){
			console.log(jQueryXhr, status);
			alert("카테고리 삭제를 실패했습니다. \n\n HTTP Status Code: "+ status);
		});
	}

	//create form tag and submit
	function updateCategory(id, updateValue){
		var url = '/api/categories'+id;
		var form = $('<form></form>');
		form.attr('action', url);
		form.attr('method', 'POST');	//form method 중 post방식을 사용
		form.appendTo('body');

		var str = '<input name="uvalue" type="hidden" value="' + updateValue.val() +'"/>';
		var input = $(str);

		form.append(input);
		form.submit();
	}

	//delete event handler function
	$('.category-list').on('click','.delete',function(){
		var id = $(this).parents('.category').attr('id');
		deleteCategory(id);
	});

	//update event handler function
	$('.category-list').on('click','.update',function(){
		var id = $(this).parents('.category').attr('id');
		var updateValue = $('#update_val');
		var presentValue = $('#cat').html();

		if(updateValue.val()==""){
			alert("수정할 카테고리 명을 확인해 주세요!");
			updateValue.val("");
			return ;
		}

		if(presentValue == updateValue.val()){
			alert("현재 카테고리 명과 일치합니다!");
			updateValue.val("");
			return ;
		}

		//call update Category function
		updateCategory(id, updateValue);
		updateValue.val("");
		alert("카테고리 명이 수정되었습니다.");
	});

})(window);
