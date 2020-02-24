function a(){
	console.log('A');
}
var b = function(){ //익명 함수
	console.log('b');
}//함수형, 자바스크립트에서는 함수도 값이다!
a();
b();
function slowfunc(callback){//calback : 변수인데 함수임ㅋㅋ
	callback();
}
slowfunc(a);