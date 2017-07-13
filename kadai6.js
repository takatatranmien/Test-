
error
date
order#
items{}

2017/7/12    order#:00001    error:Segmentation fault!
//2017/7/12    order#:00001    BalmudaThePot    Qty:1    Amt:100000
logError(date, orderNumber, errorMessage)





function createCustomer(customerName ,date, orderNumber, errorMessage) {
	var custRec = nlapiCreateRecord("customrecordbalmuda1");
	custRec.setFieldValue('name', customerName);
	custRec.setFieldValue('custrecorddateid1', date);
	custRec.setFieldValue('custrecordornoid', orderNumber);
	custRec.setFieldValue('custrecorderrormessageid', errorMessage);
	
	nlapiSubmitRecord(custRec);
	nlapiLogExecution('debug', JSON.stringify(custRec));
	return custRec.getId();
}
createCustomer('bCustom1234', '2017/7/12', '00001', 'this is an Error !');




function add_Logs(customerName, orderNumber, errorMessage){
	var rec_name = quickSearch('customrecordbalmuda1', 'name', 'haskeywords', customerName);
	if(rec_name){
		var LoadsRec = nlapiLoadRecord('customrecordbalmuda1', rec_name.getId());

		var logOrNo = LoadsRec.getFieldValue('custrecordornoid');
		LoadsRec.setFieldValue('custrecordornoid',logOrNo+'\n'+orderNumber);

		var logError = LoadsRec.getFieldValue('custrecorderrormessageid');
		LoadsRec.setFieldValue('custrecorderrormessageid',logError+'\n'+errorMessage);

		var id = nlapiSubmitRecord(LoadsRec);
		return id;
	}else{
		alert("Nothing !!!");
	}
}
add_Logs('bCustom1234', '00002', 'this is an Error ! 2')



function quickSearch(recordId, column, operator, value) {
    try {
        var filters = new Array();
        filters[0] = new nlobjSearchFilter(column, null, operator, value);

        var columns = new Array();
        columns[0] = new nlobjSearchColumn(column);

        var results = nlapiSearchRecord(recordId, null, filters, columns);
    }
    catch (e) {
        nlapiLogExecution("ERROR", "quickSearch(): " + e.message);
    }
    if (results) {
        return results[0];
    }
    return null;
}