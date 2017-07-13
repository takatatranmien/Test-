// define search filters
var filters = new Array();
filters[0] = new nlobjSearchFilter('trandate', null, 'onOrAfter', 'daysAgo90');
filters[1] = new nlobjSearchFilter('projectedamount', null, 'between', 1000, 10000);
filters[2] = new nlobjSearchFilter('salesrep', 'customer', 'anyOf', -5, null);

//Define search columns
var columns = new Array();
columns[0] = new nlobjSearchColumn('salesrep');
columns[1] = new nlobjSearchColumn('expectedclosedate');
columns[2] = new nlobjSearchColumn('entity');
columns[3] = new nlobjSearchColumn('projectedamount');
columns[4] = new nlobjSearchColumn('probability');
columns[5] = new nlobjSearchColumn('email','customer');
columns[6] = new nlobjSearchColumn('email', 'salesrep');


for(var i=0; searchresult !=null && i<searchresult.length; i++){
	var searchresult = searchresult[i];
	var record = searchresult.getId();
	var rectype = searchresult.getRecordType();
	var salesrep = searchresult.getValue('salesrep');
	var salesrep_display = searchresult.getText('salesrep');
	var salesrep_email = searchresult.getValue('email', 'salesrep');
	var customer = searchresult.getValue('entity');
	var customer_email = searchresult.getValue('email', 'customer');
	var expectedclose= searchresult.getValue('expectedclosedate');
	var projectedamount = searchresult.getValue('projectedamount');
	var probability = searchresult.getValue('probability');
} 

//Define search filter expression
var filterExpression = [['trandate', 'onOrAfter', 'daysAgo90'], 
						'or', 
						['projectedamount', 'between', 1000, 10000], 
						'or',
						'not', ['customer.salesrep', 'anyOf', -5]];


//Define search columns

var columns = new Array();
columns[0] = new nlobjSearchColumn('salesrep');
columns[1] = new nlobjSearchColumn('expectedclosedate');
columns[2] = new nlobjSearchColumn('entity');
columns[3] = new nlobjSearchColumn('projectedamount');
columns[4] = new nlobjSearchColumn('probability');
columns[5] = new nlobjSearchColumn('email', 'customer');
columns[6] = new nlobjSearchColumn('email', 'salesrep');

var searchresult = nlapiSearchRecord('opportunity', null, filterExpression, columns);

for (var i = 0; searchresult !=null && i < searchresult.length; i++) {
	var searchresult = searchresult[i];
	var record = searchresult.getId();
	var rectype = searchresult.getRecordType();
	var salesrep = searchresult.getValue('salesrep');
	var salesrep_display = searchresult.getText('salesrep');
	var salesrep_email = searchresult.getValue('email', 'salesrep');
	var customer = searchresult.getValue('entity');
	var customer_email = searchresult.getValue('email', 'customer');
	var expectedclose = searchresult.getValue('expectedclosedate');
	var projectedamount = searchresult.getValue('projectedamount');
	var probability = searchresult.getValue('probability');
}

function testPortlet(portlet) {
	portlet.setTitle('Memorized Cash Sales');

	var filters = new Array();
	filters[0] = new nlobjSearchFilter('name', null, 'equalTo', '87', null);
	filters[1] = new nlobjSearchFilter('memorized', null, 'is', 'T', null);

	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('memorized');

	var searchresult = nlapiSearchRecord('cashsale', null, filters, columns);
	for(var i=0; searchresult !=null && i<searchresult.length; i++){
		var searchResult =searchresult[i];
		portlet.addLine(i+": "+searchResult.getValue('internalid')+","+searchResult.getValue('memorized'), null, 0);
	}
}