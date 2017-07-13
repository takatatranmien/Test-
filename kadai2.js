最初の課題:

問-1. 下記の関数を実装せよ
[引数]: 顧客名, 住所
[戻り値]: なし
[仕様]: 「顧客名」引数に該当顧客レコードに「住所」を紐付けて下さい(サブリストを使う必要があります)。

1. Implement the following function.
[Params]: Customer name, Customer address
[Return value]: void
[Specs]: Add the value of [Customer Address]  to the Customer record with the name [Customer Name]. 
It will be necessary to use sublists, so please read about them in the Suitescript manual.
//


function add_Address(name, address){
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('entityid', null, 'haskeywords', name);
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('entityid');

	var results = nlapiSearchRecord('customer', null, filters, columns);
	if(results){
		alert("have !!!");
		
		var customer = nlapiLoadRecord('customer', results[0].getId());
		var Count_Line = customer.getLineItemCount('addressbook');
		alert("Count ITEM: "+Count_Line);	
		customer.insertLineItem('addressbook', Count_Line+1);
		customer.selectLineItem('addressbook', Count_Line+1);
		customer.setCurrentLineItemValue('addressbook', 'addr1', address);

		customer.commitLineItem('addressbook');
		nlapiSubmitRecord(customer);
	}
}
	add_Address('sonson', 'Tokyo')



function del_Address(name){
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('entityid', null, 'haskeywords', name);
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('entityid');

	var results = nlapiSearchRecord('customer', null, filters, columns);
	if(results){
		alert("have !!!");

		var customer = nlapiLoadRecord('customer', results[0].getId());
		var Count_Line = customer.getLineItemCount('addressbook');
		//alert("Count ITEM: "+Count_Line);
		for (var i = 1; i < Count_Line; i++) {
			alert("here is: "+i);
			customer.removeLineItem('addressbook', '1');
		}
		nlapiSubmitRecord(customer);
	}
}
	del_Address('sonson')	

	
