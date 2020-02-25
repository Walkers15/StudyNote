var http = require('http');
var url = require('url'); //모듈!
var qs = require('querystring');
var templatee = require('./lib/template.js');
var db = require('./lib/db');
var topic = require('./lib/topic');
var author = require('./lib/author');
var app = http.createServer(function (request, response) {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	console.log(pathname);
	var title = queryData.id;
	if (pathname === '/') {
		if (queryData.id === undefined) {
			topic.home(request,response);
		} else {
			topic.page(response,queryData);
		}
	} else if (pathname === '/create') {
		topic.create(response);
	} else if (pathname === '/create_process') {
		topic.create_process(response,request,qs); 
	} else if (pathname === '/update') {
		topic.update(response,queryData);
	} else if (pathname === '/update_process') {
		topic.update_process(request,response,qs);
	} else if (pathname === '/delete') {
		topic.delete(response,queryData);
	} else if (pathname === '/delete_process') {
		topic.delete_process(request,response,qs);
	}
	else if (pathname === '/author'){
		author.page(response);
	} else if (pathname === '/author_create'){
		author.create(response);
	} else if (pathname === '/author_create_process'){
		author.create_process(request,response,qs);
	} else if (pathname === '/author_update'){
		author.update(response,queryData);
	} else if (pathname === '/author_update_process'){
		author.update_process(request,response,qs);
	} else if (pathname === '/author_delete'){
		author.delete(response,queryData);
	} else if (pathname === '/author_delete_process'){
		author.delete_process(request,response,qs);
	} else {
		topic.notFound(response);
	}
});
app.listen(3000);