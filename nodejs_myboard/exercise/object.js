
// array, object
var f = function(){ //함수는 값이 될 수 있다!
	console.log(1+1);
	console.log(1+2);
}
//var i = if(true){console.log(1)}; 조건문, 반복문 등은 값이 될 수 없음
var a = [f];
a[0]();

var o = {
	func:f
};
o.func();
/***********구분선******************/
var v1 = 'v1';
// 10000 code
v1 = 'shoon';
var v2 = 'v2';

var o = {
	v1 : 'v1',
	v2 : 'v2',
	f1 : function (){
		console.log(this.v1);
	},
	f2 : function (){
		console.log(this.v2);
	}
};
o.f1(); o.f2();