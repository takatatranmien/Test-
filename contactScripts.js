
function pageInit(type) {
	if (type == 'create'){
		var context = nlapiGetContext();
		var username = context.getName();
		alert("Hello" + username +" Hello Kity, :D");
	}
}