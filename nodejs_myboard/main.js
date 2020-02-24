var http = require('http');
var fs = require('fs');
var url = require('url'); //모듈!
var qs = require('querystring');
var templatee = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var app = http.createServer(function(request,response){
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url,true).pathname;
	console.log(pathname);
	console.log(templatee.test);
	var title = queryData.id;
	if(pathname === '/'){
		if(queryData.id === undefined){
			fs.readdir('./data',function(error, filelist){
				var title = 'Welcome';
				var description = 'Hello, Node.js';
				/*
				var list = templateList(filelist);
				var template = templateHTML(title,list,`<h2>${title}</h2>${description}`,'');
				response.writeHead(200);
				response.end(template);
				*/
				var list = templatee.list(filelist);
				var html = templatee.html(title,list,
					`<h2>${title}</h2>${description}`,'');
				response.writeHead(200);
				response.end(html);
			})

		}else{
			fs.readdir('./data',function(error, filelist){
				var filteredID = path.parse(queryData.id).base;
				var list = templatee.list(filelist);
				fs.readFile(`data/${filteredID}`,'utf8',function(err,description){
					var sanitizedTitle = sanitizeHtml(title);
					var sanitizedDescription = sanitizeHtml(description, {
						allowedTags:['h1']
					});
					var html = templatee.html(sanitizedTitle,list,`<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
						`<a class = "docu" href="/update?id=${sanitizedTitle}">글 수정하기</a> <a class = "docu" href="/delete?id=${sanitizedTitle}">글 삭제하기</a>`);
					response.writeHead(200);
					response.end(html);
				});
			});
		}
	}else if(pathname === '/create'){
		fs.readdir('./data',function(error, filelist){
			var title = 'WEB - Create';
			var list = templatee.list(filelist);
			var html = templatee.html(title,list,`v 
				<form action = "/create_process"
				method="post">
				<!--post메소드를 통해 쿼리 스트링 생성 없이 안전하게 전송-->
				<p><input type = "text" name ="title" placeholder = "title"></p>
				<p>
				<textarea name ="description" placeholder = "description"></textarea>
				</p>
				<p>
				<input type = "submit">
				</p>
				</form>
				`,'');
			response.writeHead(200);
			response.end(html);
		});
	}
	else if(pathname === '/create_process'){
		var body = '';
		request.on('data',function(data){
			body += data;
		});
		request.on('end',function(){
			var post =qs.parse(body);
			var title = post.title;
			var description = post.description;
			fs.appendFile(`data/${title}`,description,'utf8',function(err){
				if(err) throw err;
				console.log(title);
				response.writeHead(302,{Location:`/?id=${title}`});
				response.end();
				console.log('save!');
			});
		});
	}
	else if(pathname === '/update'){
		fs.readdir('./data',function(error, filelist){
			var list = templatee.list(filelist);
			var filteredID = path.parse(queryData.id).base;
			fs.readFile(`data/${filteredID}`,'utf8',function(err,description){
				var title = queryData.id;
				var html = templatee.html(title,list,
					`<form action = "/update_process"
					method="post">
					<input type ="hidden" name = "id" value="${title}">
					<!--post메소드를 통해 쿼리 스트링 생성 없이 안전하게 전송-->
					<p><input type = "text" name ="title" placeholder = "title" value = ${title}></p>
					<p>
					<textarea name ="description" placeholder = "description">${description}</textarea>
					</p>
					<p>
					<input type = "submit">
					</p>
					</form>`,' ');
				response.writeHead(200);
				response.end(html);
			});
		});
	}else if(pathname==='/update_process'){
		var body = '';
		console.log("aasd");
		request.on('data',function(data){
			body += data;
		});
		request.on('end',function(){
			var post =qs.parse(body);
			var id = post.id;
			var title = post.title;
			var description = post.description;
			console.log(post);
			fs.rename(`data/${id}`,`data/${title}`,function(error){
				fs.writeFile(`data/${title}`,description,'utf8',function(err){
					if(err) throw err;
					response.writeHead(302,{Location:`/?id=${title}`});
					response.end();
					console.log('save!');
				});
			})
		});
	}else if(pathname==='/delete'){
		fs.readdir('./data',function(error, filelist){
			var list = templatee.list(filelist);
			var filteredID = path.parse(queryData.id).base;
			fs.readFile(`data/${filteredID}`,'utf8',function(err,description){
				var html = templatee.html(title,list,`<h2>${title}</h2>글을 삭제합니다.<p>
					<form action = "/delete_process"
					method="post">
					<input type ="hidden" name = "id" value="${title}">
					<input type = "submit" class = "submit" value="삭제">
					</p>
					</form></p>`,
					' ');
				response.writeHead(200);
				response.end(html);
			});
		});
	} else if(pathname==='/delete_process'){
		var body='';
		request.on('data',function(data){
			body += data;
		});
		request.on('end',function(){
			var post = qs.parse(body);
			var id = post.id;
			var filteredID = path.parse(id).base;
			fs.unlink(`data/${filteredID}`,function(err){
				console.log("파일 삭제 완료")
				response.writeHead(302,{Location:`/`});
				response.end();
			});
		});

	}else {
		response.writeHead(404);
		var template = `
		<!doctype html>
		<html>
		<head>
		<title>Error Page</title>
		<meta charset="utf-8">
		</head>
		<body>
		<h1>잘못된 주소입니다</h1>
		<a href="/">홈으로 가기</a>
		</body>
		</html>
		`
		response.end(template);
	}
});
app.listen(3000);