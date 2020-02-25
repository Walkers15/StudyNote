var db = require('./db');
var templatee = require('./template.js');
var sanitizeHtml = require('sanitize-html');

//메인화면
exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        var title = 'Welcome';
        var description = 'Hello, Node.js<BR>Hi MySQL!';
        var list = templatee.list(topics);
        var html = templatee.html(title, list,
            `<h2>${title}</h2>${description}`, '');
        response.writeHead(200);
        response.end(html);
    });
}
//글 상세보기
exports.page = function (response, queryData) {
    //response : http모듈의 응답 신호
    //queryData : 쿼리스트링에서 가져온 데이터
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function (error2, topic) {
            if (error2) {
                throw error2;
            }
            var title = topic[0].title;
            var description = topic[0].description;
            var list = templatee.list(topics);
            var html = templatee.html(title, list,
                `<h2>${sanitizeHtml(title)}</h2>
            <h4>by ${sanitizeHtml(topic[0].name)}</h4>${sanitizeHtml(description)}`, `<a class = "docu" href="/update?id=${queryData.id}">글 수정하기</a> <a class = "docu" href="/delete?id=${queryData.id}">글 삭제하기</a>`);
            response.writeHead(200);
            response.end(html);
        });
    });
}
//글쓰기
exports.create = function (response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        db.query(`SELECT * FROM author`, function (error2, authors) {
            var title = 'Create';
            var list = templatee.list(topics);
            var html = templatee.html(title, list,
                `<form action = "/create_process" method="post">
				<!--post메소드를 통해 쿼리 스트링 생성 없이 안전하게 전송-->
				<p><input type = "text" name ="title" placeholder = "title"></p>
				<p>
				<textarea name ="description" placeholder = "description" cols="50" rows="5"></textarea>
				</p>
				${templatee.authorSelect(authors)}
				<p>
				<input type = "submit">
				</p>
				</form>`, '');
            response.writeHead(200);
            response.end(html);
        });
    });
}
//작성한 글 서버에 전달
exports.create_process = function (response,request,qs) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        post.description = post.description.replace(/\n/gi,"<BR>");
        db.query(`INSERT INTO topic(title,description,created,author_id)
			 VALUES(?,?,NOW(),?);`
            , [post.title, post.description, post.author],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/?id=${result.insertId}` });
                response.end();
            }
        );
    });
}
//글 수정하기
exports.update = function(response,queryData){
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (error2, topic) {
            if (error2) {
                throw error2;
            }
            db.query(`SELECT * FROM author`, function (error3, authors) {
                if (error3) {
                    throw error3;
                }
                var title = topic[0].title;
                console.log(title);
                var description = topic[0].description;
                var list = templatee.list(topics);
                var html = templatee.html(title, list,
                    `<form action = "/update_process"
                method="post">
                <input type ="hidden" name = "id" value="${topic[0].id}">
                <!--post메소드를 통해 쿼리 스트링 생성 없이 안전하게 전송-->
                <p><input type = "text" name ="title" placeholder = "title" value = '${title}'></p>
                <p>
                <textarea name ="description" placeholder = "description" cols="50" rows="5">${description}</textarea>
                </p>
                ${templatee.authorSelect(authors, topic[0].author_id)}
                <p>
                <input type = "submit">
                </p>
                </form>`, ' ');
                response.writeHead(200);
                response.end(html);
            });
        });
    });
}
//수정 데이터 서버 전달
exports.update_process = function(request,response,qs){
    var body = '';
		request.on('data', function (data) {
			body += data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			var id = post.id;
			var title = post.title;
			var description = post.description;
			console.log(post);
			db.query(`UPDATE topic SET title=?,description=?,author_id=?,created=NOW() WHERE id = ?`, [title, description,post.author,post.id], function (error, result) {
				response.writeHead(302, { Location: `/?id=${id}` });
				response.end();
			});
		});
}
//글 삭제하기
exports.delete = function(response,queryData){
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (error2, topic) {
            if (error2) {
                throw error2;
            }
            var title = topic[0].title;;
            var list = templatee.list(topics);
            var html = templatee.html(title, list,
                `<h2>${title}</h2>글을 삭제합니다.<p>
                <form action = "/delete_process"
                method="post">
                <input type ="hidden" name = "id" value="${topic[0].id}">
                <input type = "submit" class = "submit" value="삭제">
                </p>
                </form></p>`, ' ');
            response.writeHead(200);
            response.end(html);
        });
    });
}
//삭제할 데이터 서버 전달
exports.delete_process = function(request,response,qs){
    var body = '';
		request.on('data', function (data) {
			body += data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			var id = post.id;
			db.query(`DELETE FROM topic WHERE id=?`, [id], function (error, result) {
				console.log("파일 삭제 완료")
				response.writeHead(302, { Location: `/` });
				response.end();
			});
		});
}
//주소 오류
exports.notFound = function(response){
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