
//how to get price from princing in Netsuite SuiteScript.
function getPrice(productName) {
  var record = nlapiLoadRecord(RecordType, itemInternalID);
  var pricelevel=1;
  var itemCount = record.getLineItemCount('price1');

  if(itemCount>0){
   for(var line=1; line<=itemCount; line++){

     var pricelevelFind = record.getLineItemValue('price1', 'pricelevel', line);   

     if(pricelevelFind == pricelevel){
        pricelevel=  line;
        break;
      }
    }
  }

  var price1 = record.getLineItemMatrixValue('price1', 'price', pricelevel, 1); 
  var price2 = record.getLineItemMatrixValue('price1', 'price', pricelevel, 2); 
  var price3 = record.getLineItemMatrixValue('price1', 'price', pricelevel, 3); 
  var price4 = record.getLineItemMatrixValue('price1', 'price', pricelevel, 4); 
  var price5 = record.getLineItemMatrixValue('price1', 'price', pricelevel, 5);
}

function getPrice('beer asahi');