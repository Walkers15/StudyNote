var fs = require('fs');
console.log('A');
//result = fs.readFileSync('exercise/sample.txt','utf-8');
fs.readFile('exercise/sample.txt','utf-8',function(err,result){
	console.log(result); //콜백
});
console.log('C');