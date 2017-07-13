Goal:
	* エラーをCustom Recordにログする関数を作る

 * 手順:
	* Custom Recordに”Logs”というLong Textフィールドを作る
	* 以下のような関数を作る:
		* そのレコードをロードする（もうすでに制作されている）
		* 新しい行をそのTextフィールドに追加する
		* レコードを保存
 * Process:
	* Add a "Long Text" field to a Custom Record.
	* Create a function that:
 		* Loads (not creates) an existing record of that type.
 		* Writes a string in a new line to the Long Text field
 		* Saves the record

 * Example:
for(var i = 0; i < 3; i++)
	logError("Oh no! This is an error\n");
}

>>> Custom RecordのLong Text Fieldに以下を追加します：
Oh no! This is an error
Oh no! This is an error
Oh no! This is an error
//




function add_Logs(customerName, string){
	var rec_name = quickSearch('customrecordcusrecnewstyleid', 'name', 'haskeywords', customerName);
	if(rec_name){
		var LoadsRec = nlapiLoadRecord('customrecordcusrecnewstyleid', rec_name.getId());
		var log = LoadsRec.getFieldValue('custrecordlog');
		LoadsRec.setFieldValue('custrecordlog',log+'\n'+string);
		var id = nlapiSubmitRecord(LoadsRec);
		return id;
	}else{
		alert("Nothing !!!");
	}
}
add_Logs('mien1234', 'this an error !')



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


function del_logs(customerName, string){
	var rec_name = quickSearch('customrecordcusrecnewstyleid', 'name', 'haskeywords', customerName);
	if(rec_name){
		var LoadsRec = nlapiLoadRecord('customrecordcusrecnewstyleid', rec_name.getId());
		LoadsRec.setFieldValue('custrecordlog',string);
		var id = nlapiSubmitRecord(LoadsRec);
			return id;
	}else{
				alert("Nothing !!!");
		}
}
del_logs('mien1234', '')




function add_Image(customerName, url){
	var rec_name = quickSearch('customrecordcusrecnewstyleid', 'name', 'haskeywords', customerName);
	if(rec_name){
		var LoadsRec = nlapiLoadRecord('customrecordcusrecnewstyleid', rec_name.getId());
	
		LoadsRec.setFieldValue('custrecordimage',url);
		var id = nlapiSubmitRecord(LoadsRec);
		return id;
	}else{
		alert("Nothing !!!");
	}
}
add_Image('mien1234', 'https://www.google.co.jp/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiQ0KLez4LVAhWBErwKHQl0AJIQjRwIBw&url=http%3A%2F%2Fall-free-download.com%2Ffree-vector%2Fbackground.html&psig=AFQjCNFKhVX4zlz6sYvWrUj9AbB8TvVuag&ust=1499910383139154')


