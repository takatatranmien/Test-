
次の関数を実装して下さい:
引数:顧客名、アイテム名、数量
戻り値: 注文書レコードの内部ID
仕様:「顧客名」、「アイテム名」、「数量」をもとに「注文書」を作成する。


Based on 1. Customer name, 2. Item name, and 3. Quantity, 
create a Sales Order record and return the internal Id of the record.

https://system.na1.netsuite.com/app/accounting/transactions/salesord.nl?whence=


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


function create_salesorder(customerName, itemName, quantity) {
	var rec_name = quickSearch('customer', 'entityid', 'haskeywords', customerName);
	var rec_item = quickSearch('item', 'itemid', 'haskeywords', itemName);
	var record = nlapiCreateRecord('salesorder');

	if(rec_name&&rec_item){
		record.setFieldValue('entity', rec_name.getId());
		record.setLineItemValue('item', 'item', 1, rec_item.getId());
		record.setLineItemValue('item', 'quantity', 1, quantity);
		record.setLineItemValue('item', 'amount', 1, '295');
		
		var id = nlapiSubmitRecord(record);
		return id;
	}
}
create_salesorder('sonson', 'テスト商品名', 10)



/*function create_salesorder_withID(customerID, itemId, quantity) {
	var record = nlapiCreateRecord('salesorder');
	record.setFieldValue('entity', customerID);
	record.setLineItemValue('item', 'item', 1, itemId);
	record.setLineItemValue('item', 'quantity', 1, quantity);
	record.setLineItemValue('item', 'amount', 1, '295');

	var id = nlapiSubmitRecord(record, true);
	return record.getId();
}
create_salesorder_withID('2332', '316', 10)*/



function update_item_salesorder(customerName, salesorderId, itemName, quantity, amount){
	var rec_name = quickSearch('customer', 'entityid', 'haskeywords', customerName);
	var rec_item = quickSearch('item', 'itemid', 'haskeywords', itemName);
	if(rec_name&&rec_item){
		alert("have ...")
		var record = nlapiLoadRecord('salesorder', salesorderId);

		record.setLineItemValue('item', 'item',1, rec_item.getId());
		record.setLineItemValue('item', 'quantity', 1, quantity);
		record.setLineItemValue('item', 'amount', 1, amount);  	//1 la stt dong can update
		var id = nlapiSubmitRecord(record);
		return id;
	}
}
update_item_salesorder('sonson',6966, 'テスト商品名', 100, 310)
//itemId も OK





//Suu tam tren Internet------------------------------------------------------------------------------------------------
function UpdateSalesOrder(request, response)   {
     
    if (request.getMethod() == 'POST') {
         
        // We'll first find the sales order that we need to update.
        var filters = new Array();
        filters[0] = new nlobjSearchFilter('tranId', null, 'is', request.getParameter('order_number') );
          
        var columns = new Array();
        columns[0] = new nlobjSearchColumn( 'internalId' )
         
        var searchresults = nlapiSearchRecord( 'salesorder', null, filters, columns );
        if (searchresults != null && searchresults != '') {
            // We found an internal ID of the sales order, so this record must exist.
            var order = nlapiLoadRecord("salesorder", searchresults[0].getValue("internalId"));
 
            order.setFieldValue("shipdate", request.getParameter('ship_date'));
            order.setFieldValue("shipmethod", request.getParameter('ship_method'));
 
            nlapiSubmitRecord(order, true);
        }
    } else {
        response.write("Error: This page cannot be accessed directly.");
    }
}
---------------------------------------------------------------------------------------




function add_item_salesorder(customerName, salesorderId, itemId, quantity){
	var rec_name = quickSearch('customer', 'entityid', 'haskeywords', customerName);
	var rec_item = quickSearch('item', 'itemid', 'haskeywords', itemId);
	if(rec_name&&rec_item){
		var record = nlapiLoadRecord('salesorder', salesorderId);
		var Count_line = record.getLineItemCount('item');
		alert(Count_line);
		record.selectNewLineItem('item');
		record.setCurrentLineItemValue('item', 'item', rec_item.getId());
		record.setCurrentLineItemValue('item', 'quantity', quantity);
		record.setCurrentLineItemValue('item', 'amount', 300);
		record.commitLineItem('item');
		var id = nlapiSubmitRecord(record);
		return id;
	}
}
add_item_salesorder('sonson', 6966, '12345', 15)
//itemNameで探すこと も　OK



function add_Array_items_salesorder(salesorderId, itemId, quantity){
	var record = nlapiLoadRecord('salesorder', salesorderId);
	for(var i=0; i< itemId.length; i++){		
		var rec_item = quickSearch('item', 'itemid', 'haskeywords', itemId[i]);
		if(rec_item){
			record.selectNewLineItem('item');
			record.setCurrentLineItemValue('item', 'item', rec_item.getId());
			record.setCurrentLineItemValue('item', 'quantity', quantity);
			record.setCurrentLineItemValue('item', 'amount', 220);
			record.commitLineItem('item');
		}
	}
	var id = nlapiSubmitRecord(record);
}
add_Array_items_salesorder(6966, ['test1111', 'andrewsnoninventoryitemtest'], 88)


