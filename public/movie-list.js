
$(document).ready(function(){

	function resetForm(){
		$('#movie').val("");
		$('#genre').val("");
		$('#rate').val("");
		$('#description').val("");
	}

	function ajaxPost() {
		var genreArray = $('#genre').val().split(", ");
		console.log(genreArray);
		var formData = {
			movie: $('#movie').val(),
			genre: genreArray,
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

	$("#sort_button").on('click', function(){
		const sortMethod = document.getElementById("sort_option").value;
		var sortParam;
		if (sortMethod == "md")
		{
			sortParam = "md";
		}
		else if(sortMethod == "ma")
		{
			sortParam = "ma";
		}
		else if(sortMethod == "rd")
		{
			sortParam = "rd";
		}
		else if(sortMethod == "ra")
		{
			sortParam = "ra";
		}
		//console.log(sortMethod);
		//console.log("sort param:" + sortParam);
		$.ajax({
			type: 'GET',
			url: '/' + sortParam,
			success: function() {
				var option;
				if(sortParam === "md")
				{
					option = "md";
				}
				else if(sortParam === "ma")
				{
					option = "ma";
				}
				else if(sortParam === "rd")
				{
					option = "rd";
				}
				else if(sortParam === "ra")
				{
					option = "ra";
				}
				location.replace('/' + sortParam);
				
				/*
				var optionToSelect = window.document.getElementById(option);
				console.log(optionToSelect.id);
				optionToSelect.selected = "true";
				console.log("set to true");
				
				var sortBy = window.document.getElementById("sort_option");
				console.log(sortBy.id);
				var temp = sortBy.selectedIndex;
				console.log(temp);
				*/
			}
		});
	});


	/*
	$("#view_button").on('click', function(){
		var viewOption = document.getElementById("view_option").value;
		$.ajax({
			type: 'GET',
			url: '/view/' + viewOption,
			success: function() {
				location.replace('/view/' + viewOption);
			}
		});
	});
	*/

	function ajaxPut(id) {
		var formData = {
			movie: $('#movie').val(),
			genre: $('#genre').val(),
			rate: $('#rate').val(),
			description: $('#description').val()
		};
		$.ajax({
			type: 'PUT',
			url: '/edit/' + id,
			data: formData,
			success: function(data) {
				location.reload();
			}
		});
	}

	$("#rating_input").on('submit', function(e){
		e.preventDefault(); //prevents default browser handling of forms
		ajaxPost();
	});

	$("#rating_input_edit").on('submit', function(e){
		e.preventDefault();
		var id = $(this).attr("data-id");
		ajaxPut(id);
	});

	$('[id="delete_icon"]').on('click', function() { //id = "..." when there are multiple elements with that id
		var id = $(this).attr("data-id");
		$.ajax({
			type: 'DELETE',
			url: '/movies/' + id,
			success: function(data) {
				location.reload();
			}
		});
		
	});
});
