(function (window){

	//perform an asynchronous HTTP (Ajax) request
	function deleteCategory(id){
		$.ajax({
			url: './categories/delete/'+id,
			method: 'DELETE',
			headers: { 'Content-Type':'application/json'},
			dataType:'json',
			success: function(response){
				var delete_id="#"+id;
				$(delete_id).remove();

				alert("카테고리를 삭제 했습니다.");
			},
			error: function(e){
				alert("카테고리 삭제를 실패했습니다. \n\n HTTP Status Code: "+e.status);
			}
		})
	}

	//create form tag and submit
	function updateCategory(id, update_value){
		var url = './categories/update/'+id;
		var form = $('<form></form>');
		form.attr('action', url);
		form.attr('method', 'POST');	//form method 중 post방식을 사용
		form.appendTo('body');

		var str = '<input name="uvalue" type="hidden" value="' + update_value.val() +'"/>';
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
		var update_value = $(this).siblings('#update_val');
		var present_value = $(this).parents('td').siblings('#cat').html();

		if(update_value.val()==""){
			alert("수정할 카테고리 명을 확인해 주세요!");
			update_value.val("");
			return ;
		}

		if(present_value == update_value.val()){
			alert("현재 카테고리 명과 일치합니다!");
			update_value.val("");
			return ;
		}

		//call update Category function
		updateCategory(id, update_value);
		update_value.val("");
		alert("카테고리 명이 수정되었습니다.");
	});

})(window);
