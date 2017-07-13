
/*NetSuite Suitelets plays vital part in integrating 3rd party web applications with the NetSuite. 
Writing a suitelet is as easy as writing a simple javascript except that it runs on server-side. 
Here is a couple of examples on how to write a suitelet. 
The first example creates a customer of a type LEAD-Unqualified from a POSTed web submissions.*/

function CreateCustomerRecord(request, response) {
	if(request.getMethod()=='POST') {
		var customer = nlapiCreateRecord('customer', {stage: 'lead'});
		customer.setFieldValue('isperson', 'T');
		customer.setFieldValue('firstname', request.getParameter('firstname'));
		customer.setFieldValue('lastname', request.getParameter('lastname'));
		customer.setFieldValue('companyname', request.getParameter('companyname'));
		customer.setFieldValue('phone', request.getParameter('phone'));
		customer.setFieldValue('email', request.getParameter('email'));
		customer.setFieldValue('entitystatus', '6');    //LEAD:: unqualified.
		var customerId = nlapiSubmitRecord(customer, true);

		response.write(customerId);
	}
}



/*The second example illustrates on how to retrieve a sales order from an order number,
and update the record with new data. It is a bit complex than the first example, 
but the basic idea is the same. The sales order number is mapped to transId of the Sales Order Record, 
and we'll use it to find the internal ID of the sales order. 
Once we have the internalID of the sales order, 
updating a record is as easy as assigning the values and submitting a record.*/

function UpdateSalesOrder(request, response) {
	if(request.getMethod() == 'POST') {
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('tranId', null, 'is', request.getParameter('order_number'));

		var columns = new Array();
		columns[0] = new nlobjSearchColumn('internalId')

		var searchresults = nlobjSearchRecord('salesorder', null, filters, columns);
		if(searchresults != null && searchresults != ''){
			var order = nlapiLoadRecord("salesorder", searchresults[0].getValue('internalId'));

			order.setFieldValue("shipdate", request.getParameter('ship_date'));
			order.setFieldValue("shipmethod", request.getParameter('ship_method'));

			nlapiSubmitRecord(order, true);
		}
	}else{
		response.write("Error: This page cannot be accessed directly.");
	}
}