
問 - 1 下記の関数を実装してください:
[引数]: 氏名、通貨、電話番号、メールアドレス 
[戻り値]: レコードの内部ID
[仕様]:上記引数を新規の顧客レコードに保存する。

問 - 2 下記の関数を実装してください:
[引数]: 名前
[戻り値]: 電話番号
[仕様]: 上記引数と同じ名前を持つ顧客レコードの電話番号を返却する。
した
問 - 3 下記の関数を実装してください:
[引数]: 名前、電話番号、メールアドレス
[戻り値]: 真偽値(該当するレコードがあって更新出来たかどうか)
[仕様]: 「名前」と同じ名前を持つ顧客レコードの「電話番号」と「メールアドレス」項目を更新する。

問 - 4 下記の関数を実装してください:
[引数]: 名前
[戻り値]: 真偽値(該当するレコードがあって削除出来たかどうか)
[仕様]: 上記引数と同じ名前を持つ顧客を削除する。


1. Create a function that creates a new customer record.

2. Create a function that takes "customer name" as a parameter and returns that customer's phone number

3. Create a function that takes "customer name" as a parameter and updates the email and phone number of 
	the customer record with the same "customer name". (edited)

4. Create a function that takes "customer name" as a parameter and deletes matching records.

---------------------------------------------------------------------------------------------------------

function createCustomer(name, currency, phone, email) {
	var custRec = nlapiCreateRecord("customer");
	custRec.setFieldValue('entityid', name);
	custRec.setFieldValue('currency', currency);
	custRec.setFieldValue('phone', phone);
	custRec.setFieldValue('email', email);
	custRec.setFieldValue('subsidiary', 1);
	custRec.setFieldValue('companyname', 'techcom.ltc');

	nlapiSubmitRecord(custRec);
	nlapiLogExecution('debug', JSON.stringify(custRec));
	return custRec.getId();

}
createCustomer('sonson2', 1, 12342256789, 'mien@gmail.com');



function viewPhoneNo(name) {
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('entityid',null, 'haskeywords', name);

	var results = nlapiSearchRecord('customer', null, filters, null);
	if(results){
		var customer = nlapiLoadRecord('customer', results[0].getId());
		var phone = customer.getFieldValue('phone');
		alert("phonenumber is: "+phone);
		return phone;
	}else{
		return null;
	}
}
//viewPhoneNo()
viewPhoneNo('Ronaldo');



function update_Info(name, phone, email){
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('entityid', null, 'haskeywords', name);
	var results = nlapiSearchRecord('customer', null, filters, null);

	//var results = quickSearch('customer', 'entityid', 'haskeywords', name);

	if (results) {
			nlapiLogExecution('DEBUG', JSON.stringify(results));
			alert("Hello! I am an alert box!!");

			var customer = nlapiLoadRecord('customer', results[0].getId());
			customer.setFieldValue('phone', phone);
			customer.setFieldValue('email', email);
						
			nlapiSubmitRecord(customer);		
		
			return true;
	}else{
		alert("Hello! I am false");
		return false;
	}
}

update_Info('C.Ronaldo', 123456789, 'CR7@gmail.com' )


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


function del_Customer (name){

	var results = quickSearch('customer', 'entityid', 'haskeywords', name);
	
	if(results){
		var del_result = nlapiDeleteRecord('customer',results.getId());
		return true;
 	}else{
 		alert("results nothing");
 		return false;
 	}
}

del_Customer('tran mien')



//Suu tam tren Internet
function CreateCustomerRecord(request, response)   {
     
    if (request.getMethod() == 'POST') {
        var customer = nlapiCreateRecord('customer', {stage: 'lead'});
        customer.setFieldValue('isperson', 'T');
        customer.setFieldValue('firstname', request.getParameter('firstname'));
        customer.setFieldValue('lastname', request.getParameter('lastname'));
        customer.setFieldValue('companyname', request.getParameter('companyname'));
        customer.setFieldValue('phone', request.getParameter('phone'));
        customer.setFieldValue('email', request.getParameter('email'));
        customer.setFieldValue('entitystatus', '6');    // LEAD::unqualified.
        var customerId = nlapiSubmitRecord(customer, true);
        
        response.write(customerId);
    }
}