function createCustomer(firstname, lastname, currency, phone, email) {
	alert("HELLO HELLO WORLD !!!!!");
	
	var custRec = nlapiCreateRecord("customer");
	custRec.setFieldValue('firstname', firstname);
	custRec.setFieldValue('lastname', lastname);
	custRec.setFieldValue('currency', currency);
	custRec.setFieldValue('phone', phone);
	custRec.setFieldValue('email', email);

	nlapiLogExecution('debug', JSON.stringify(custRec));

	return custRec.getId();
	nlapiSubmitRecord(custRec);

}
//createCustomer(firstname, lastname, currency, phone, mail)
createCustomer('john', 'smith', 0, 123456789, 'abc@gmail.com');