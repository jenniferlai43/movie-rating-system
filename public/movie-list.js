
$(document).ready(function(){

	function resetForm(){
		$('#movie').val("");
		$('#genre').val("");
		$('#rate').val("");
		$('#description').val("");
	}

	function ajaxPost() {
		var formData = {
			movie: $('#movie').val(),
			genre: $('#genre').val(),
			rate: $('#rate').val(),
			description: $('#description').val()
		};
		console.log(formData);
		$.ajax({
			type: 'POST',
			url: '/movies',
			data: formData,
			success: function(data) {
				location.reload();
			}
		});
		//return false;
	}

	function ajaxPut() {
		
	}

	$("#rating_input").on('submit', function(e){
		e.preventDefault(); //prevents default browser handling of forms
		ajaxPost();
	});

	$("#rating_input_edit").on('submit', function(e){
		e.preventDefault();
		ajaxPut();
	});

	$('[id="delete_icon"]').on('click', function() { //id = "..." when there are multiple elements with that id

		/*var divToDel = $(this).parent().prev();
		var title = divToDel.find('#title').text().replace(/ /g, "-"); //replaces spaces with dashes
		console.log(title);*/
		var id = $(this).attr("data-id");
		$.ajax({
			type: 'DELETE',
			url: '/movies/' + id,
			success: function(data) {
				location.reload();
			}
		});
		
	});
	
	/*
	$('[id="edit_icon"]').on('click', function() {
		var divToEdit = $(this).parent().prev();
		var title = divToEdit.find('#title').text().replace(/ /g, "-");
		console.log(title);
		var id = $(this).attr("data-id");
		$.ajax({
			type: 'GET',
			url: '/edit/' + title,
			success: function(data) {
			}
		});
	});
	*/
});
