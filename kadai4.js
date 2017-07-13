
* Make a new 'Custom Record Type' (Like this one: https://system.na1.netsuite.com/app/common/custom/custrecord.nl?id=276&e=T )
* Create a record of that type and save a string


function createCustomer(name ,custRecId, name2, age) {
	var custRec = nlapiCreateRecord("customrecordcusrecnewstyleid");
	custRec.setFieldValue('name', name);
	custRec.setFieldValue('custrecordnaibuid', custRecId);
	custRec.setFieldValue('custrecordnameid', name2);
	custRec.setFieldValue('custrecordageid', age);
	
	nlapiSubmitRecord(custRec);
	nlapiLogExecution('debug', JSON.stringify(custRec));
	return custRec.getId();
}
createCustomer('mien1234', 'cusrecord123ID', 'mien222222', 30);



function createRecordErrLog(name ,custRecId, date) {
	var custRec = nlapiCreateRecord("customrecordlogerrid");
	custRec.setFieldValue('name', name);
	custRec.setFieldValue('custrecordlogerrfieldid', custRecId);
	custRec.setFieldValue('custrecorddateid', date);
	nlapiSubmitRecord(custRec);
}
createRecordErrLog('LogErrName1', 'cusrecord123ID', '2017/07/10');


/*function CreateCustomerRecord() { 
	var customerRec = nlapiCreateRecord('customrecord12345'); //---Mandatory 
	customerRec.setFieldValue('companyname', 'Mindfire Solutions'); 
	//--- Set the line items. 
	customerRec.setLineItemValue('addressbook', 'addr1', 1, 'Mindfire Solutions'); 
	customerRec.setLineItemValue('addressbook', 'addr2', 1, 'IDCO Tower 2000'); 
	customerRec.setLineItemValue('addressbook', 'city', 1, 'Bhubaneswar'); 
	customerRec.setLineItemValue('addressbook', 'zip', 1, '751010'); 
	var customerId = nlapiSubmitRecord(customerRec, true); 
}
CreateCustomerRecord() */