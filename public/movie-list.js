
$(document).ready(function(){

	/*
		This block of code changes default selected values of filtering options based on query string	
	*/
	var queryString = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
	console.log(queryString);
	if (queryString.length == 2)
	{
		var sortMethod = queryString[0].slice(queryString[0].indexOf('=')+1); 
		console.log(sortMethod);
		var genreType = queryString[1].slice(queryString[1].indexOf('=')+1);
		console.log(genreType);
		$('#sort_option > option').each(function() {
			if (this.value == sortMethod)
			{
				this.selected = 'true';
			}
		});
		$('#view_option > option').each(function() {
			if (this.value == genreType.replace(/\-/g, " "))
			{
				this.selected = 'true';
			}
		});
	}

	function resetForm(){
		$('#movie').val("");
		$('#genre').val("");
		$('#rate').val("");
		$('#description').val("");
	}

	function ajaxPost() {
		var genreArray = $('#genre').val().split(/,/g);
		var formData = {
			movie: $('#movie').val(),
			genre: genreArray,
			rate: $('#rate').val(),
			description: $('#description').val()
		};
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

	$("#filter_button").on('click', function(){
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
		const genreType = document.getElementById("view_option").value.replace(/ /g, "-");
		$.ajax({
			type: 'GET',
			url: '/?sortMethod=' + sortParam + '&genreType=' + genreType,
			success: function() {
				location.replace('/?sortMethod=' + sortParam + '&genreType=' + genreType);
			}
		});
	});

	function ajaxPut(id) {
		var genreArray = $('#genre').val().split(/,/g);
		var formData = {
			movie: $('#movie').val(),
			genre: genreArray,
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
