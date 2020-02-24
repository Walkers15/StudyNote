var fs = require('fs');
fs.readFile('exercise/sample.txt','utf-8',function(err,data){
	console.log(data);
})