var db = require('./db');
var template = require('./template.js');
exports.page = function(response){
    db.query("SELECT * FROM AUTHOR",function(err,authors){
        if(err){
            console.log(err);
        }
        db.query("SELECT * FROM topic", function(err2,topics){
            if(err2){
                console.log(err2);
            }
            var list = template.list(topics);
            var html = template.html('Author',list,template.authorList(authors),` `);
            response.writeHead(200);
            response.end(html);
        });
    });
}
exports.create = function(response){
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if(error){
            throw error;
        }
            var title = 'Author_Create';
            var list = template.list(topics);
            var html = template.html(title, list,
                `<form action = "/author_create_process" method="post">
				<!--post메소드를 통해 쿼리 스트링 생성 없이 안전하게 전송-->
				<p><input type = "text" name ="name" placeholder = "name"></p>
				<p>
				<textarea name ="profile" placeholder = "profile"></textarea>
				</p>
				<p>
				<input type = "submit" value="저자 만들기">
				</p>
				</form>`, '');
            response.writeHead(200);
            response.end(html);
    });
}
exports.create_process = function(request,response,qs){
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        console.log(post);
        db.query(`INSERT INTO author(name,profile) VALUES(?,?);`, [post.name, post.profile],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/author` });
                response.end();
            }
        );
    });
}
exports.update = function (response, queryData) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(`SELECT * FROM author WHERE id=?`, [queryData.id], function (error2, author) {
            if (error2) {
                throw error2;
            }
            var list = template.list(topics);
            var html = template.html('Author', list,
                `<form action = "/author_update_process"
                method="post">
                <input type ="hidden" name = "id" value="${author[0].id}">
                <!--post메소드를 통해 쿼리 스트링 생성 없이 안전하게 전송-->
                <p><input type = "text" name ="name" placeholder = "name" value = ${author[0].name}></p>
                <p>
                <textarea name ="profile" placeholder = "profile">${author[0].profile}</textarea>
                </p>
                <input type = "submit">
                </form>`, ' ');
            response.writeHead(200);
            response.end(html);
        });
    });
}
exports.update_process = function (request, response, qs) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`UPDATE author SET name=?,profile=? WHERE id = ?`, [post.name, post.profile, post.id], function (error, result) {
            if (error) {
                throw error;
            }
            response.writeHead(302, { Location: `/author` });
            response.end();
        }
        );
    });
}
//저자 삭제하기
exports.delete = function(response,queryData){
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(`SELECT * FROM author`, function (error2, authors) {
            if (error2) {
                throw error2;
            }
            var list = template.list(topics);
            var html = template.html('Author', list,template.deleteAuthor(authors,queryData.id), ' ');
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
			db.query(`DELETE FROM topic WHERE author_id=?`, [id], function (error, result) {
                if(error){
                    throw error;
                }
                console.log("글 삭제 완료");
                db.query(`DELETE FROM author WHERE id=?`, [id], function (error2, result){
                    if(error2){
                        throw error;
                    }
                    console.log("저자 삭제 완료");
                    response.writeHead(302, { Location: `/author` });
				    response.end();
                });
			});
		});
}