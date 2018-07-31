function collapse()
{
	var div = document.getElementsByClassName("collapse_form");
	if (div[0].style.display == "none")
	{
		div[0].style.display = "block";
	}
	else
	{
		div[0].style.display = "none";
	}
}
